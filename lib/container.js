const { Bundle } = require('./bundle')
const { enumerate, either } = require('../helpers')
const { Ingress } = require('./ingress')

class ContainerizedService extends Bundle {
  constructor ({ name, image, env = {}, port, ports = [], replicas = 1, labels = {}, annotations, build, main, livenessProbe, readinessProbe, pv }) {
    super()
    this.name = name
    this.image = image
    this.env = env
    this.port = port
    this.ports = ports
    this.replicas = replicas
    this.labels = labels
    this.annotations = annotations
    this.build = build
    this.main = main
    this.livenessProbe = livenessProbe
    this.readinessProbe = readinessProbe
    this.pv = pv

    const that = this

    this.Ingress = class extends Ingress {
      get name () { return either(this._name, that.name) }
      set name (val) { this._name = val }

      get port () { return either(this._port, that.port) }
      set port (val) { this._port = val }
    }
  }

  get livenessProbe () { return either(this._livenessProbe, this.port ? { tcpSocket: { port: this.port } } : undefined) }
  set livenessProbe (val) { this._livenessProbe = val }

  get readinessProbe () { return either(this._readinessProbe || this.livenessProbe) }
  set readinessProbe (val) { this._readinessProbe = val }

  getAllResources () {
    const ports = this.port ? [{ port: this.port }].concat(this.ports) : this.ports
    const env = this.port ? Object.assign({ PORT: this.port }, this.env) : this.env

    const deployment = {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: this.name
      },
      spec: {
        replicas: this.replicas,
        selector: {
          matchLabels: { 'solsa.ibm.com/pod': this.name }
        },
        template: {
          metadata: {
            labels: Object.assign({ 'solsa.ibm.com/pod': this.name }, this.labels)
          },
          spec: {
            containers: [{
              name: this.name,
              image: this.image,
              ports: ports.map(function ({ port, name }) { return name ? { containerPort: port, name } : { containerPort: port } }),
              env: enumerate(env)
            }]
          }
        }
      }
    }
    const objs = [{ obj: deployment, name: this.name + '-deployment.yaml' }]
    if (this.annotations) {
      deployment.spec.template.metadata.annotations = this.annotations
    }
    if (this.livenessProbe) {
      deployment.spec.template.spec.containers[0].livenessProbe = this.livenessProbe
    }
    if (this.readinessProbe) {
      deployment.spec.template.spec.containers[0].readinessProbe = this.readinessProbe
    }
    if (this.pv) {
      // Patch deployment spec with volumeMount/volumeClaim
      deployment.spec.template.spec.volumes = [{
        name: 'mypvc',
        persistentVolumeClaim: {
          claimName: this.name
        }
      }]
      deployment.spec.template.spec.containers[0].volumeMounts = [{
        mountPath: this.pv.mountPath,
        name: 'mypvc'
      }]
      if (this.pv.owner) {
        // HACK: IKS NFS storage is mounted owned by root.  The recommend fix is running an init container to chown the mount.
        deployment.spec.template.spec.initContainers = [{
          name: 'permissions-fix-hack',
          image: 'alpine:latest',
          command: ['/bin/sh', '-c', `chown ${this.pv.owner} /mount`],
          volumeMounts: [{
            name: 'mypvc',
            mountPath: '/mount'
          }]
        }]
      }
      // add pvc yaml
      const pvc = {
        apiVersion: 'v1',
        kind: 'PersistentVolumeClaim',
        metadata: {
          name: this.name
        },
        spec: {
          storageClassName: this.pv.storageClassName,
          accessModes: ['ReadWriteOnce'],
          resources: {
            requests: {
              storage: this.pv.size
            }
          }
        }
      }
      objs.push({ obj: pvc, name: `${this.name}-pvc.yaml` })
    }

    if (ports.length > 0) {
      const svc = {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: this.name
        },
        spec: {
          type: 'ClusterIP',
          ports: ports.map(function ({ port, targetPort = port, name }) { return name ? { port, targetPort, name } : { port, targetPort } }),
          selector: { 'solsa.ibm.com/pod': this.name }
        }
      }
      if (this.annotations) {
        svc.metadata.annotations = this.annotations
      }
      objs.push({ obj: svc, name: this.name + '-svc.yaml' })
    }

    return objs
  }

  getAllImages () {
    return [this.image]
  }

  getAllBuilds () {
    return this.build ? [{ name: this.image, build: this.build, main: this.main }] : []
  }
}

module.exports = { ContainerizedService }
