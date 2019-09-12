/*
 * Copyright 2019 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Resource } from './solution'
import { enumerate, dynamic, dictionary, either } from './helpers'
import { Ingress } from './ingress'

/**
 * A ContainerizedService is a higher-level abstraction for generating matched
 * Kubernetes `Deployment` and `Service` resources. A typical usage is to specify
 * a containerized microservice that is deployed as part of an overall solution.
 */
export class ContainerizedService extends Resource implements IContainerizedService {
  _livenessProbe?: any
  _readinessProbe?: any
  _port?: number
  name: string
  image: string
  env: dynamic
  port?: number
  ports: { name: string, port: number }[]
  replicas: number
  labels: dictionary
  annotations?: dictionary
  build?: string
  main?: string
  pv?: any   // FIXME: Define a more precise type here (complex record).

  get livenessProbe () { return either(this._livenessProbe, this.port ? { tcpSocket: { port: this.port } } : undefined) }
  set livenessProbe (val) { this._livenessProbe = val }

  get readinessProbe () { return either(this._readinessProbe, this.livenessProbe) }
  set readinessProbe (val) { this._readinessProbe = val }

  /**
   * Create a ContainerizedService. The properties `name` and `image` are mandatory.
   */
  constructor ({ name, image, env = {}, port, ports = [], replicas = 1, labels = {}, annotations, build, main, livenessProbe, readinessProbe, pv }: IContainerizedService) {
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
  }

  get Ingress () {
    const that = this

    return class extends Ingress {
      _port?: number

      get port () { return either(this._port, that.port) }
      set port (val) { this._port = val }

      constructor ({ name = that.name, port, endpoints }: { name?: string, port?: number, endpoints?: { paths: string[], port: number }[] } = {}) {
        super({ name, port, endpoints })
      }
    }
  }

  getResources () {
    const ports = this.port ? [{ port: this.port }].concat(this.ports) : this.ports
    const env = this.port ? Object.assign({ PORT: this.port }, this.env) : this.env

    const deployment: any = {
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
              ports: ports.map(function ({ port, name }: any) { return name ? { containerPort: port, name } : { containerPort: port } }),
              env: enumerate(env)
            }]
          }
        }
      }
    }
    const objs = [{ obj: deployment }]
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
      objs.push({ obj: pvc })
    }

    if (ports.length > 0) {
      const svc: any = {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: this.name
        },
        spec: {
          type: 'ClusterIP',
          ports: ports.map(function ({ port, targetPort = port, name }: any) { return name ? { port, targetPort, name } : { port, targetPort } }),
          selector: { 'solsa.ibm.com/pod': this.name }
        }
      }
      if (this.annotations) {
        svc.metadata.annotations = this.annotations
      }
      objs.push({ obj: svc })
    }

    return objs
  }

  getImages () {
    return [{ name: this.image, build: this.build, main: this.main }]
  }
}

export interface IContainerizedService {
  /** The name of the microservice */
  name: string
  /** The container image that implements the service */
  image: string
  /** The environment variable bindings to be defined for the executing container  */
  env?: dynamic
  /** If the service exports a single port, its port number. */
  port?: number
  /** If the service exports multiple ports, an array of their names and port numbers. */
  ports?: { name: string, port: number }[]
  /** The desired number of replicas of the container. */
  replicas?: number
  /** A dictionary of labels to apply to the `Deployment` and `Service` resources */
  labels?: dictionary
  /** A dictionary of labels to apply to the `Deployment` and `Service` resources */
  annotations?: dictionary
  /** The path to the NodeJS package that implements the service */
  build?: string
  /** The name of the entry point to be executed */
  main?: string
  /** The readiness probe for the service */
  readinessProbe?: any // FIXME: Define a more precise type here (complex record).
  /** The liveness probe for the service */
  livenessProbe?: any // FIXME: Define a more precise type here (complex record).
  /** A persistent volume to be created for each replica of the service */
  pv?: any   // FIXME: Define a more precise type here (complex record).
}
