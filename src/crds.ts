/*
 * Copyright 2019 IBM Corporationundefined
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

/* GENERATED FILE; DO NOT EDIT */

/* tslint:disable:no-unnecessary-qualifier jsdoc-format class-name */

import { KubernetesResource } from './solution'
import { core, meta, misc } from './core'
import { dynamic } from './helpers'

export namespace io_k8s_helm_charts {
  export namespace v1alpha1 {
    /**
     * Twistlock Console is installed first and provides policy, API endpoints, GUI, and makes install of Defenders on each node easy through a daemonset.
     */
    export class TwistlockConsole extends KubernetesResource {
      /**
       * Twistlock Console is installed first and provides policy, API endpoints, GUI, and makes install of Defenders on each node easy through a daemonset.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'charts.helm.k8s.io/v1alpha1', kind: 'TwistlockConsole' }, properties))
      }
    }
    /**
     * A configuration file for a Kong cluster.
     */
    export class Kong extends KubernetesResource {
      /**
       * A configuration file for a Kong cluster.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'charts.helm.k8s.io/v1alpha1', kind: 'Kong' }, properties))
      }
    }
    /**
     * Turbonomic Workload Automation for Multicloud simultaneously optimizes performance, compliance, and cost in real-time. Workloads are precisely resourced, automatically, to perform while satisfying business constraints.
     */
    export class Xl extends KubernetesResource {
      /**
       * Turbonomic Workload Automation for Multicloud simultaneously optimizes performance, compliance, and cost in real-time. Workloads are precisely resourced, automatically, to perform while satisfying business constraints.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'charts.helm.k8s.io/v1alpha1', kind: 'Xl' }, properties))
      }
    }
    /**
     * Turbonomic Workload Automation for Multicloud simultaneously optimizes performance, compliance, and cost in real-time. Workloads are precisely resourced, automatically, to perform while satisfying business constraints.
     */
    export class Kubeturbo extends KubernetesResource {
      /**
       * Turbonomic Workload Automation for Multicloud simultaneously optimizes performance, compliance, and cost in real-time. Workloads are precisely resourced, automatically, to perform while satisfying business constraints.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'charts.helm.k8s.io/v1alpha1', kind: 'Kubeturbo' }, properties))
      }
    }
    /**
     * SpinnakerOperator
     */
    export class SpinnakerOperator extends KubernetesResource {
      /**
       * SpinnakerOperator
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'charts.helm.k8s.io/v1alpha1', kind: 'SpinnakerOperator' }, properties))
      }
    }
    /**
     * Represents a CockroachDB cluster
     */
    export class Cockroachdb extends KubernetesResource {
      /**
       * Represents a CockroachDB cluster
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'charts.helm.k8s.io/v1alpha1', kind: 'Cockroachdb' }, properties))
      }
    }
    /**
     * OpsmxSpinnakerOperator
     */
    export class OpsmxSpinnakerOperator extends KubernetesResource {
      /**
       * OpsmxSpinnakerOperator
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'charts.helm.k8s.io/v1alpha1', kind: 'OpsmxSpinnakerOperator' }, properties))
      }
    }
  }
}
export namespace io_halkyon {
  export namespace v1beta1 {
    /**
     * Component spec.
     */
    export interface ComponentSpec {
      /** The type of the runtime application installed: Spring Boot, Vert.x, Tornthail, NodeJS, Quarkus */
      runtime?: string
    }
    /**
     * A component describing your microservice
     */
    export class Component extends KubernetesResource implements IComponent {
      spec: io_halkyon.v1beta1.ComponentSpec
      metadata: meta.v1.ObjectMeta
      /**
       * A component describing your microservice
       */
      constructor (properties: IComponent) {
        super({ apiVersion: 'halkyon.io/v1beta1', kind: 'Component' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IComponent {
      /** Component spec. */
      spec: io_halkyon.v1beta1.ComponentSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * A capability or service to be deployed
     */
    export class Capability extends KubernetesResource {
      /**
       * A capability or service to be deployed
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'halkyon.io/v1beta1', kind: 'Capability' }, properties))
      }
    }
    /**
     * To link the microservices or access secrets
     */
    export class Link extends KubernetesResource {
      /**
       * To link the microservices or access secrets
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'halkyon.io/v1beta1', kind: 'Link' }, properties))
      }
    }
  }
}
export namespace com_synopsys {
  export namespace v1 {
    /**
     * Manages the OpsSight Connector
     */
    export class OpsSight extends KubernetesResource {
      /**
       * Manages the OpsSight Connector
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'synopsys.com/v1', kind: 'OpsSight' }, properties))
      }
    }
    /**
     * Manages Black Duck Alert
     */
    export class Alert extends KubernetesResource {
      /**
       * Manages Black Duck Alert
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'synopsys.com/v1', kind: 'Alert' }, properties))
      }
    }
    /**
     * Manages Black Duck instances
     */
    export class Blackduck extends KubernetesResource {
      /**
       * Manages Black Duck instances
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'synopsys.com/v1', kind: 'Blackduck' }, properties))
      }
    }
  }
}
export namespace com_ibm_openaihub {
  export namespace v1alpha1 {
    /**
     * Fabric for Deep Learning
     */
    export class FfDL extends KubernetesResource {
      /**
       * Fabric for Deep Learning
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'openaihub.ibm.com/v1alpha1', kind: 'FfDL' }, properties))
      }
    }
  }
}
export namespace com_crunchydata {
  export namespace v1 {
    /**
     * Represents a Postgres workflow task
     */
    export class Pgtask extends KubernetesResource {
      /**
       * Represents a Postgres workflow task
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'crunchydata.com/v1', kind: 'Pgtask' }, properties))
      }
    }
    /**
     * Represents a Postgres primary cluster member
     */
    export class Pgcluster extends KubernetesResource {
      /**
       * Represents a Postgres primary cluster member
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'crunchydata.com/v1', kind: 'Pgcluster' }, properties))
      }
    }
    /**
     * Represents a Postgres sql policy
     */
    export class Pgpolicy extends KubernetesResource {
      /**
       * Represents a Postgres sql policy
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'crunchydata.com/v1', kind: 'Pgpolicy' }, properties))
      }
    }
    /**
     * Represents a Postgres backup task
     */
    export class Pgbackup extends KubernetesResource {
      /**
       * Represents a Postgres backup task
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'crunchydata.com/v1', kind: 'Pgbackup' }, properties))
      }
    }
    /**
     * Represents a Postgres replica cluster member
     */
    export class Pgreplica extends KubernetesResource {
      /**
       * Represents a Postgres replica cluster member
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'crunchydata.com/v1', kind: 'Pgreplica' }, properties))
      }
    }
  }
}
export namespace io_kiali {
  export namespace v1alpha1 {
    /**
     * A configuration file for a Kiali installation.
     */
    export class Kiali extends KubernetesResource {
      /**
       * A configuration file for a Kiali installation.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'kiali.io/v1alpha1', kind: 'Kiali' }, properties))
      }
    }
  }
}
export namespace io_kiali_monitoring {
  export namespace v1alpha1 {
    /**
     * A configuration file for defining an individual metric dashboard.
     */
    export class MonitoringDashboard extends KubernetesResource {
      /**
       * A configuration file for defining an individual metric dashboard.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'monitoring.kiali.io/v1alpha1', kind: 'MonitoringDashboard' }, properties))
      }
    }
  }
}
export namespace com_mattermost {
  export namespace v1alpha1 {
    /**
     * ClusterInstallation spec.
     */
    export interface ClusterInstallationSpec {
      /** If specified, affinity will define the pod's scheduling constraints */
      affinity?: { [k: string]: any }
      database?: { externalSecret?: string, replicas?: number, resources?: { [k: string]: any }, storageSize?: string, type?: string }
      elasticSearch?: { host?: string, password?: string, username?: string }
      /** Image defines the ClusterInstallation Docker image. */
      image?: string
      ingressAnnotations?: { [k: string]: string }
      /** IngressName defines the name to be used when creating the ingress rules */
      ingressName: string
      /** Secret that contains the mattermost license */
      mattermostLicenseSecret?: string
      minio?: { replicas?: number, resources?: { [k: string]: any }, storageSize?: string }
      /** NodeSelector is a selector which must be true for the pod to fit on a node. Selector which must match a node's labels for the pod to be scheduled on that node. More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/ */
      nodeSelector?: { [k: string]: string }
      /** Replicas defines the number of replicas to use for the Mattermost app servers. Setting this will override the number of replicas set by 'Size'. */
      replicas?: number
      /** Defines the resource requests and limits for the Mattermost app server pods. */
      resources?: { [k: string]: any }
      serviceAnnotations?: { [k: string]: string }
      /** Size defines the size of the ClusterInstallation. This is typically specified in number of users. This will set replica and resource requests/limits appropriately for the provided number of users. Accepted values are: 100users, 1000users, 5000users, 10000users, 250000users. Defaults to 5000users. Setting 'Replicas', 'Resources', 'Minio.Replicas', 'Minio.Resource', 'Database.Replicas', or 'Database.Resources' will override the values set by Size. */
      size?: string
      useServiceLoadBalancer?: boolean
      /** Version defines the ClusterInstallation Docker image version. */
      version?: string
    }
    /**
     * A configuration file for a Mattermost custom resource.
     */
    export class ClusterInstallation extends KubernetesResource implements IClusterInstallation {
      metadata: meta.v1.ObjectMeta
      spec: com_mattermost.v1alpha1.ClusterInstallationSpec
      /**
       * A configuration file for a Mattermost custom resource.
       */
      constructor (properties: IClusterInstallation) {
        super({ apiVersion: 'mattermost.com/v1alpha1', kind: 'ClusterInstallation' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IClusterInstallation {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** ClusterInstallation spec. */
      spec: com_mattermost.v1alpha1.ClusterInstallationSpec
    }
  }
}
export namespace org_integreatly {
  export namespace v1alpha1 {
    /**
     * GrafanaDataSource spec.
     */
    export interface GrafanaDataSourceSpec {
      name: string
      datasources: { [k: string]: any }[]
    }
    /**
     * Represents a Grafana Data Source
     */
    export class GrafanaDataSource extends KubernetesResource implements IGrafanaDataSource {
      metadata: meta.v1.ObjectMeta
      spec: org_integreatly.v1alpha1.GrafanaDataSourceSpec
      /**
       * Represents a Grafana Data Source
       */
      constructor (properties: IGrafanaDataSource) {
        super({ apiVersion: 'integreatly.org/v1alpha1', kind: 'GrafanaDataSource' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IGrafanaDataSource {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** GrafanaDataSource spec. */
      spec: org_integreatly.v1alpha1.GrafanaDataSourceSpec
    }
    /**
     * GrafanaDashboard spec.
     */
    export interface GrafanaDashboardSpec {
      name?: string
      json?: string
      plugins?: { [k: string]: any }[]
    }
    /**
     * Represents a Grafana Dashboard
     */
    export class GrafanaDashboard extends KubernetesResource implements IGrafanaDashboard {
      spec: org_integreatly.v1alpha1.GrafanaDashboardSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Represents a Grafana Dashboard
       */
      constructor (properties: IGrafanaDashboard) {
        super({ apiVersion: 'integreatly.org/v1alpha1', kind: 'GrafanaDashboard' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IGrafanaDashboard {
      /** GrafanaDashboard spec. */
      spec: org_integreatly.v1alpha1.GrafanaDashboardSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * Grafana spec.
     */
    export interface GrafanaSpec {
      /** Hostname for the ingress. Optional when --openshift is set */
      hostname?: string
      containers?: { [k: string]: any }[]
      secrets?: string[]
      /** Log level of the grafana instance, defaults to info */
      logLevel?: string
      /** Default admin user name */
      adminUser?: string
      /** Default admin password */
      adminPassword?: string
      /** Basic auth enabled */
      basicAuth?: boolean
      /** Disable login form */
      disableLoginForm?: boolean
      /** Disable signout menu */
      disableSignoutMenu?: boolean
      /** Anonymous auth enabled */
      anonymous?: boolean
      /** Grafana config */
      config?: { [k: string]: any }
      /** Create an OpenShift Route instead of Ingress */
      createRoute?: boolean
      dashboardLabelSelectors?: { [k: string]: any }[]
    }
    /**
     * Represents a Grafana Instance
     */
    export class Grafana extends KubernetesResource implements IGrafana {
      spec: org_integreatly.v1alpha1.GrafanaSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Represents a Grafana Instance
       */
      constructor (properties: IGrafana) {
        super({ apiVersion: 'integreatly.org/v1alpha1', kind: 'Grafana' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IGrafana {
      /** Grafana spec. */
      spec: org_integreatly.v1alpha1.GrafanaSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
}
export namespace io_objectbucket {
  export namespace v1alpha1 {
    /**
     * instance of an AWS S3 Bucket
     */
    export class ObjectBucket extends KubernetesResource {
      /**
       * instance of an AWS S3 Bucket
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'objectbucket.io/v1alpha1', kind: 'ObjectBucket' }, properties))
      }
    }
    /**
     * Request for an AWS S3 Bucket
     */
    export class ObjectBucketClaim extends KubernetesResource {
      /**
       * Request for an AWS S3 Bucket
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'objectbucket.io/v1alpha1', kind: 'ObjectBucketClaim' }, properties))
      }
    }
  }
}
export namespace com_percona_psmdb {
  export namespace v1 {
    /**
     * Instance of a Percona Server for MongoDB Backup
     */
    export class PerconaServerMongoDBBackup extends KubernetesResource {
      /**
       * Instance of a Percona Server for MongoDB Backup
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'psmdb.percona.com/v1', kind: 'PerconaServerMongoDBBackup' }, properties))
      }
    }
    /**
     * Instance of a Percona Server for MongoDB Restore
     */
    export class PerconaServerMongoDBRestore extends KubernetesResource {
      /**
       * Instance of a Percona Server for MongoDB Restore
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'psmdb.percona.com/v1', kind: 'PerconaServerMongoDBRestore' }, properties))
      }
    }
    /**
     * Instance of a Percona Server for MongoDB replica set
     */
    export class PerconaServerMongoDB extends KubernetesResource {
      /**
       * Instance of a Percona Server for MongoDB replica set
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'psmdb.percona.com/v1', kind: 'PerconaServerMongoDB' }, properties))
      }
    }
  }
}
export namespace com_hazelcast {
  export namespace v1alpha1 {
    /**
     * Hazelcast Enterprise cluster.
     */
    export class Hazelcast extends KubernetesResource {
      /**
       * Hazelcast Enterprise cluster.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'hazelcast.com/v1alpha1', kind: 'Hazelcast' }, properties))
      }
    }
  }
}
export namespace org_wildfly {
  export namespace v1alpha1 {
    /**
     * WildFlyServer spec.
     */
    export interface WildFlyServerSpec {
      /** ApplicationImage is the name of the application image to be deployed */
      applicationImage: string
      /** Env contains environment variables for the containers running the WildFlyServer application */
      env?: { [k: string]: any }[]
      envFrom?: { [k: string]: any }[]
      serviceAccountName?: string
      /** Number of instances for a WildFlyServer resource. */
      size: number
      /** spec to specify how standalone configuration can be read from a ConfigMap. */
      standaloneConfigMap?: { key?: string, name: string }
      /** Storage spec to specify how storage should be used. */
      storage?: { emptyDir?: { [k: string]: any }, volumeClaimTemplate?: { [k: string]: any } }
    }
    /**
     * An application running on WildFly application runtime.
     */
    export class WildFlyServer extends KubernetesResource implements IWildFlyServer {
      metadata: meta.v1.ObjectMeta
      spec: org_wildfly.v1alpha1.WildFlyServerSpec
      /**
       * An application running on WildFly application runtime.
       */
      constructor (properties: IWildFlyServer) {
        super({ apiVersion: 'wildfly.org/v1alpha1', kind: 'WildFlyServer' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IWildFlyServer {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** WildFlyServer spec. */
      spec: org_wildfly.v1alpha1.WildFlyServerSpec
    }
  }
}
export namespace io_banzaicloud_istio {
  export namespace v1beta1 {
    /**
     * RemoteIstio spec.
     */
    export interface RemoteIstioSpec {
      /** List of namespaces to label with sidecar auto injection enabled */
      autoInjectionNamespaces?: string[]
      /** Citadel configuration options */
      citadel?: { enabled?: boolean, image?: string, replicaCount?: number, resources?: { [k: string]: any } }
      /** EnabledServices the Istio component services replicated to remote side */
      enabledServices: { labelSelector: string, name: string, podIPs?: string[] }[]
      /** ExcludeIPRanges the range where not to capture egress traffic */
      excludeIPRanges?: string
      /** IncludeIPRanges the range where to capture egress traffic */
      includeIPRanges?: string
      /** Proxy configuration options */
      proxy?: { enableCoreDump?: boolean, image?: string, privileged?: boolean }
      /** Proxy Init configuration options */
      proxyInit?: { image?: string }
      /** SidecarInjector configuration options */
      sidecarInjector?: { enabled?: boolean, image?: string, initCNIConfiguration?: { binDir?: string, confDir?: string, enabled?: boolean, excludeNamespaces?: string[], image?: string, logLevel?: string }, replicaCount?: number, resources?: { [k: string]: any }, rewriteAppHTTPProbe?: boolean }
    }
    /**
     * Represents a Remote Cluster of an Istio service mesh
     */
    export class RemoteIstio extends KubernetesResource implements IRemoteIstio {
      metadata: meta.v1.ObjectMeta
      spec: io_banzaicloud_istio.v1beta1.RemoteIstioSpec
      /**
       * Represents a Remote Cluster of an Istio service mesh
       */
      constructor (properties: IRemoteIstio) {
        super({ apiVersion: 'istio.banzaicloud.io/v1beta1', kind: 'RemoteIstio' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IRemoteIstio {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** RemoteIstio spec. */
      spec: io_banzaicloud_istio.v1beta1.RemoteIstioSpec
    }
    /**
     * Istio spec.
     */
    export interface IstioSpec {
      /** List of namespaces to label with sidecar auto injection enabled */
      autoInjectionNamespaces?: string[]
      /** Citadel configuration options */
      citadel?: { enabled?: boolean, image?: string, replicaCount?: number, resources?: { [k: string]: any } }
      /** ControlPlaneSecurityEnabled control plane services are communicating through mTLS */
      controlPlaneSecurityEnabled?: boolean
      /** Set the default set of namespaces to which services, service entries, virtual services, destination rules should be exported to */
      defaultConfigVisibility?: string
      /** Enable pod disruption budget for the control plane, which is used to ensure Istio control plane components are gradually upgraded or recovered */
      defaultPodDisruptionBudget?: { enabled?: boolean }
      /** ExcludeIPRanges the range where not to capture egress traffic */
      excludeIPRanges?: string
      /** Galley configuration options */
      galley?: { enabled?: boolean, image?: string, replicaCount?: number, resources?: { [k: string]: any } }
      /** Gateways configuration options */
      gateways?: { egress?: { enabled?: boolean, maxReplicas?: number, minReplicas?: number, replicaCount?: number, resources?: { [k: string]: any }, sds?: { enabled?: boolean, image?: string }, serviceAnnotations?: { [k: string]: any }, serviceLabels?: { [k: string]: any }, serviceType?: string }, enabled?: boolean, ingress?: { enabled?: boolean, maxReplicas?: number, minReplicas?: number, replicaCount?: number, resources?: { [k: string]: any }, sds?: { enabled?: boolean, image?: string }, serviceAnnotations?: { [k: string]: any }, serviceLabels?: { [k: string]: any }, serviceType?: string } }
      /** ImagePullPolicy describes a policy for if/when to pull a container image */
      imagePullPolicy?: string
      /** IncludeIPRanges the range where to capture egress traffic */
      includeIPRanges?: string
      /** Mixer configuration options */
      mixer?: { enabled?: boolean, image?: string, maxReplicas?: number, minReplicas?: number, replicaCount?: number, resources?: { [k: string]: any } }
      /** MTLS enables or disables global mTLS */
      mtls: boolean
      /** NodeAgent configuration options */
      nodeAgent?: { enabled?: boolean, image?: string, resources?: { [k: string]: any } }
      /** Set the default behavior of the sidecar for handling outbound traffic from the application (ALLOW_ANY or REGISTRY_ONLY) */
      outboundTrafficPolicy?: { mode?: string }
      /** Pilot configuration options */
      pilot?: { enabled?: boolean, image?: string, maxReplicas?: number, minReplicas?: number, replicaCount?: number, resources?: { [k: string]: any }, traceSampling?: number }
      /** Proxy configuration options */
      proxy?: { enableCoreDump?: boolean, image?: string, privileged?: boolean }
      /** Proxy Init configuration options */
      proxyInit?: { image?: string }
      /** If SDS is configured, mTLS certificates for the sidecars will be distributed through the SecretDiscoveryService instead of using K8S secrets to mount the certificates */
      sds?: { enabled?: boolean, udsPath?: string, useNormalJwt?: boolean, useTrustworthyJwt?: boolean }
      /** SidecarInjector configuration options */
      sidecarInjector?: { enabled?: boolean, image?: string, initCNIConfiguration?: { binDir?: string, confDir?: string, enabled?: boolean, excludeNamespaces?: string[], image?: string, logLevel?: string }, replicaCount?: number, resources?: { [k: string]: any }, rewriteAppHTTPProbe?: boolean }
      /** Configuration for each of the supported tracers */
      tracing?: { enabled?: boolean, zipkin?: { address?: string } }
      /** Use the Mesh Control Protocol (MCP) for configuring Mixer and Pilot. Requires galley. */
      useMCP?: boolean
      /** Contains the intended Istio version */
      version: string
      /** Whether or not to establish watches for adapter-specific CRDs */
      watchAdapterCRDs?: boolean
      /** Whether to restrict the applications namespace the controller manages */
      watchOneNamespace?: boolean
    }
    /**
     * Represents an Istio service mesh
     */
    export class Istio extends KubernetesResource implements IIstio {
      metadata: meta.v1.ObjectMeta
      spec: io_banzaicloud_istio.v1beta1.IstioSpec
      /**
       * Represents an Istio service mesh
       */
      constructor (properties: IIstio) {
        super({ apiVersion: 'istio.banzaicloud.io/v1beta1', kind: 'Istio' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IIstio {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Istio spec. */
      spec: io_banzaicloud_istio.v1beta1.IstioSpec
    }
  }
}
export namespace com_lightbend_app {
  export namespace v1alpha1 {
    /**
     * AkkaCluster spec.
     */
    export interface AkkaClusterSpec {
      /** The desired number of pod instances in the Akka Cluster */
      replicas?: number
      /** The template used to form the cluster */
      template?: { [k: string]: any }
    }
    /**
     * An example Akka Cluster app that provides cluster visualization.
     */
    export class AkkaCluster extends KubernetesResource implements IAkkaCluster {
      metadata: meta.v1.ObjectMeta
      spec: com_lightbend_app.v1alpha1.AkkaClusterSpec
      /**
       * An example Akka Cluster app that provides cluster visualization.
       */
      constructor (properties: IAkkaCluster) {
        super({ apiVersion: 'app.lightbend.com/v1alpha1', kind: 'AkkaCluster' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IAkkaCluster {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** AkkaCluster spec. */
      spec: com_lightbend_app.v1alpha1.AkkaClusterSpec
    }
  }
}
export namespace com_sysdig {
  export namespace v1alpha1 {
    /**
     * Represents a Sysdig Agent running on each node of your cluster.
     */
    export class SysdigAgent extends KubernetesResource {
      /**
       * Represents a Sysdig Agent running on each node of your cluster.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'sysdig.com/v1alpha1', kind: 'SysdigAgent' }, properties))
      }
    }
  }
}
export namespace io_openliberty {
  export namespace v1alpha1 {
    /**
     * OpenLiberty spec.
     */
    export interface OpenLibertySpec {
      arch?: { amd64: string, ppc64le: string, s390x: string }
      autoscaling?: { enabled: boolean, minReplicas: number, maxReplicas: number, targetCPUUtilizationPercentage: number }
      deployment?: { annotations?: { [k: string]: any }, labels?: { [k: string]: any } }
      env?: { jvmArgs?: string }
      iiopService?: { enabled: boolean, nonSecurePort: number, nonSecureTargetPort?: number, securePort: number, secureTargetPort?: number, type: string }
      image?: { extraEnvs?: { name: string, value?: any }[], extraVolumeMounts?: { name: string, mountPath?: string, readOnly?: boolean }[], lifecycle?: { postStart?: { [k: string]: any }, preStop?: { [k: string]: any } }, livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, pullPolicy: string, pullSecret?: string, readinessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, repository: string, security?: { [k: string]: any }, serverOverridesConfigMapName?: string, tag: string }
      ingress?: { annotations?: { [k: string]: any }, enabled: boolean, host?: string, labels?: { [k: string]: any }, path: string, rewriteTarget: string, secretName?: string }
      jmsService?: { enabled: boolean, port: number, targetPort?: number, type: string }
      logs?: { consoleFormat: string, consoleLogLevel: string, consoleSource: string, persistLogs: boolean, persistTransactionLogs: boolean }
      microprofile?: { health?: { enabled: boolean } }
      monitoring?: { enabled: boolean }
      persistence?: { fsGroupGid?: { [k: string]: any }, name: string, selector?: { label: string, value: string }, size: string, storageClassName?: string, useDynamicProvisioning: boolean }
      pod?: { annotations?: { [k: string]: any }, extraInitContainers?: { name: string }[], extraContainers?: { name: string }[], extraVolumes?: { name: string }[], labels?: { [k: string]: any }, security?: { [k: string]: any } }
      rbac?: { install: boolean }
      /** The number of desired replica pods that run simultaneously. */
      replicaCount: number
      /** This name will be appended to the release name to form the name of resources created by the chart. */
      resourceNameOverride?: string
      /** The upper limit of CPU core. Specify integers, fractions (e.g. 0.5), or millicores values(e.g. 100m, where 100m is equivalent to .1 core). */
      resources?: { constraints: { enabled: boolean }, limits?: { cpu: string, memory: string }, requests?: { cpu: string, memory: string } }
      service?: { annotations?: { [k: string]: any }, enabled: boolean, extraPorts?: { name: string, port?: number, protocol?: string, targetPort?: number }[], extraSelectors?: { [k: string]: any }, labels?: { [k: string]: any }, name?: string, port: number, targetPort?: number, type: string }
      sessioncache?: { hazelcast?: { embedded: boolean, enabled: boolean, image?: { pullPolicy: string, repository?: string, tag: string } } }
      ssl?: { createClusterSSLConfiguration: boolean, enabled: boolean, useClusterSSLConfiguration: boolean }
    }
    /**
     * Open Liberty Application
     */
    export class OpenLiberty extends KubernetesResource implements IOpenLiberty {
      spec: io_openliberty.v1alpha1.OpenLibertySpec
      metadata: meta.v1.ObjectMeta
      /**
       * Open Liberty Application
       */
      constructor (properties: IOpenLiberty) {
        super({ apiVersion: 'openliberty.io/v1alpha1', kind: 'OpenLiberty' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IOpenLiberty {
      /** OpenLiberty spec. */
      spec: io_openliberty.v1alpha1.OpenLibertySpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
}
export namespace io_cloudbulldozer_ripsaw {
  export namespace v1alpha1 {
    /**
     * The type of benchmark for Ripsaw to be run
     */
    export class Benchmark extends KubernetesResource {
      /**
       * The type of benchmark for Ripsaw to be run
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'ripsaw.cloudbulldozer.io/v1alpha1', kind: 'Benchmark' }, properties))
      }
    }
  }
}
export namespace io_openebs {
  export namespace v1alpha1 {
    /**
     * Represents a OpenEBS Install Operator
     */
    export class OpenEBSInstallTemplate extends KubernetesResource {
      /**
       * Represents a OpenEBS Install Operator
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'openebs.io/v1alpha1', kind: 'OpenEBSInstallTemplate' }, properties))
      }
    }
  }
}
export namespace com_dev4devs_postgresql {
  export namespace v1alpha1 {
    /**
     * Backup spec.
     */
    export interface BackupSpec {
      /** Key ID of AWS S3 storage. Default Value: nil Required to create the Secret with the data to allow send the backup files to AWS S3 storage. */
      awsAccessKeyId?: string
      /** Name of AWS S3 storage. Default Value: nil Required to create the Secret with the AWS data to allow send the backup files to AWS S3 storage. */
      awsS3BucketName?: string
      /** Secret/Token of AWS S3 storage. Default Value: nil Required to create the Secret with the data to allow send the backup files to AWS S3 storage. */
      awsSecretAccessKey?: string
      /** Name of the secret with the AWS data credentials pre-existing in the cluster Default Value: nil See here the template: https://github.com/integr8ly/backup-container-image/blob/master/templates/openshift/sample-config/s3-secret.yaml */
      awsSecretName?: string
      /** Namespace of the secret with the AWS data credentials pre-existing in the cluster Default Value: nil NOTE: If the namespace be not informed then the operator will try to find it in the same namespace where it is applied */
      awsSecretNamespace?: string
      /** Name of the Database CR applied which this backup will work with Default Value: "database" */
      databaseCRName?: string
      /** Database version. (E.g 9.6). Default Value: <9.6> IMPORTANT: Just the first 2 digits should be used. */
      databaseVersion?: string
      /** Name of the secret with the Encrypt data pre-existing in the cluster Default Value: nil See here the template: https://github.com/integr8ly/backup-container-image/blob/master/templates/openshift/sample-config/gpg-secret.yaml */
      encryptKeySecretName?: string
      /** Namespace of the secret with the Encrypt data pre-existing in the cluster Default Value: nil NOTE: If the namespace be not informed then the operator will try to find it in the same namespace where it is applied */
      encryptKeySecretNamespace?: string
      /** GPG email to create the EncryptionKeySecret with this data Default Value: nil See here how to create this key : https://help.github.com/en/articles/generating-a-new-gpg-key */
      gpgEmail?: string
      /** GPG public key to create the EncryptionKeySecret with this data Default Value: nil See here how to create this key : https://help.github.com/en/articles/generating-a-new-gpg-key */
      gpgPublicKey?: string
      /** GPG trust model to create the EncryptionKeySecret with this data. the default value is true when it is empty. Default Value: nil See here how to create this key : https://help.github.com/en/articles/generating-a-new-gpg-key */
      gpgTrustModel?: string
      /** Database image:tag Default value: centos/postgresql-96-centos7 */
      image?: string
      /** Used to create the directory where the files will be stored Default Value: <postgresql> */
      productName?: string
      /** Schedule period for the CronJob. Default Value: <0 0 * * *> daily at 00:00 */
      schedule?: string
    }
    /**
     * Backup is the Schema for the backups API
     */
    export class Backup extends KubernetesResource implements IBackup {
      metadata: meta.v1.ObjectMeta
      spec: com_dev4devs_postgresql.v1alpha1.BackupSpec
      /**
       * Backup is the Schema for the backups API
       */
      constructor (properties: IBackup) {
        super({ apiVersion: 'postgresql.dev4devs.com/v1alpha1', kind: 'Backup' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IBackup {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Backup spec. */
      spec: com_dev4devs_postgresql.v1alpha1.BackupSpec
    }
    /**
     * Database spec.
     */
    export interface DatabaseSpec {
      /** Name of the configMap key where the operator should looking for the value for the database name for its env var Default value: nil */
      configMapDatabaseNameKey?: string
      /** Name of the configMap key where the operator should looking for the value for the database user for its env var Default value: nil */
      configMapDatabasePasswordKey?: string
      /** Name of the configMap key where the operator should looking for the value for the database password for its env var Default value: nil */
      configMapDatabaseUserKey?: string
      /** Name of the ConfigMap where the operator should looking for the EnvVars keys and/or values only Default value: nil */
      configMapName?: string
      /** Policy definition to pull the Database Image More info: https://kubernetes.io/docs/concepts/containers/images/ Default value: */
      containerImagePullPolicy?: string
      /** Name to create the Database container */
      containerName?: string
      /** CPU resource request which will be available for the database container Default value: 10Mi */
      databaseCpu?: string
      /** Limit of CPU request which will be available for the database container Default value: 20Mi */
      databaseCpuLimit?: string
      /** Limit of Memory which will be available for the database container Default value: 512Mi */
      databaseMemoryLimit?: string
      /** Limit of Memory Request which will be available for the database container Default value: 128Mi */
      databaseMemoryRequest?: string
      /** Value for the Database Environment Variable (spec.databaseNameKeyEnvVar). Default value: example */
      databaseName?: string
      /** Key Value for the Database Environment Variable in order to inform the database mame Note that each database version/image can expected a different value for it. Default value: nil */
      databaseNameKeyEnvVar?: string
      /** Value for the Database Environment Variable (spec.databasePasswordKeyEnvVar). Default value: postgres */
      databasePassword?: string
      /** Key Value for the Database Environment Variable in order to inform the database password Note that each database version/image can expected a different value for it. Default value: nil */
      databasePasswordKeyEnvVar?: string
      /** Value for the Database Environment Variable in order to define the port which it should use. It will be used in its container as well */
      databasePort?: number
      /** Limit of Storage Request which will be available for the database container Default value: 1Gi */
      databaseStorageRequest?: string
      /** Value for the Database Environment Variable (spec.databaseUserKeyEnvVar). Default value: postgres */
      databaseUser?: string
      /** Key Value for the Database Environment Variable in order to inform the database user Note that each database version/image can expected a different value for it. Default value: nil */
      databaseUserKeyEnvVar?: string
      /** Database image:tag Default value: centos/postgresql-96-centos7 */
      image?: string
      /** Quantity of instances Default value: 1 */
      size?: number
    }
    /**
     * Database is the Schema for the the Database Database API
     */
    export class Database extends KubernetesResource implements IDatabase {
      metadata: meta.v1.ObjectMeta
      spec: com_dev4devs_postgresql.v1alpha1.DatabaseSpec
      /**
       * Database is the Schema for the the Database Database API
       */
      constructor (properties: IDatabase) {
        super({ apiVersion: 'postgresql.dev4devs.com/v1alpha1', kind: 'Database' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IDatabase {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Database spec. */
      spec: com_dev4devs_postgresql.v1alpha1.DatabaseSpec
    }
  }
}
export namespace io_jaegertracing {
  export namespace v1 {
    /**
     * A configuration file for a Jaeger custom resource.
     */
    export class Jaeger extends KubernetesResource {
      /**
       * A configuration file for a Jaeger custom resource.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'jaegertracing.io/v1', kind: 'Jaeger' }, properties))
      }
    }
  }
}
export namespace jaegertracing_io {
  export namespace v1alpha1 {
    export class Jaeger extends KubernetesResource {
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'io.jaegertracing/v1alpha1', kind: 'Jaeger' }, properties))
      }
    }
  }
}
export namespace com_pingcap {
  export namespace v1alpha1 {
    /**
     * TidbCluster spec.
     */
    export interface TidbClusterSpec {
      pd?: { [k: string]: any }
      tikv?: { [k: string]: any }
      tidb?: { [k: string]: any }
      tikvPromGateway?: { [k: string]: any }
    }
    /**
     * A TiDB Cluster
     */
    export class TidbCluster extends KubernetesResource implements ITidbCluster {
      spec: com_pingcap.v1alpha1.TidbClusterSpec
      metadata: meta.v1.ObjectMeta
      /**
       * A TiDB Cluster
       */
      constructor (properties: ITidbCluster) {
        super({ apiVersion: 'pingcap.com/v1alpha1', kind: 'TidbCluster' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface ITidbCluster {
      /** TidbCluster spec. */
      spec: com_pingcap.v1alpha1.TidbClusterSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
}
export namespace io_github_microcks {
  export namespace v1alpha1 {
    /**
     * Represents a Microcks installation
     */
    export class MicrocksInstall extends KubernetesResource {
      /**
       * Represents a Microcks installation
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'microcks.github.io/v1alpha1', kind: 'MicrocksInstall' }, properties))
      }
    }
  }
}
export namespace com_storageos {
  export namespace v1 {
    /**
     * StorageOSUpgrade spec.
     */
    export interface StorageOSUpgradeSpec {
      /** The StorageOS Node image to upgrade to. e.g. `storageos/node:latest` */
      newImage: string
    }
    /**
     * StorageOS Upgrade automatically upgrades an existing StorageOS cluster as per the upgrade configuration.
     */
    export class StorageOSUpgrade extends KubernetesResource implements IStorageOSUpgrade {
      metadata: meta.v1.ObjectMeta
      spec: com_storageos.v1.StorageOSUpgradeSpec
      /**
       * StorageOS Upgrade automatically upgrades an existing StorageOS cluster as per the upgrade configuration.
       */
      constructor (properties: IStorageOSUpgrade) {
        super({ apiVersion: 'storageos.com/v1', kind: 'StorageOSUpgrade' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IStorageOSUpgrade {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** StorageOSUpgrade spec. */
      spec: com_storageos.v1.StorageOSUpgradeSpec
    }
    /**
     * StorageOSCluster spec.
     */
    export interface StorageOSClusterSpec {
      /** Describes the Container Storage Interface (CSI) configuration. */
      csi?: { deploymentStrategy?: string, deviceDir?: string, driverRegisterationMode?: string, driverRequiresAttachment?: string, enable?: boolean, enableControllerPublishCreds?: boolean, enableNodePublishCreds?: boolean, enableProvisionCreds?: boolean, endpoint?: string, kubeletDir?: string, kubeletRegistrationPath?: string, pluginDir?: string, registrarSocketDir?: string, registrationDir?: string, version?: string }
      /** Enables debug logging when set to true. */
      debug?: boolean
      /** When Pod Fencing is disabled, StorageOS will not perform any interaction with Kubernetes when it detects that a node has gone offline. Additionally, the Kubernetes permissions required for Fencing will not be added to the StorageOS role. */
      disableFencing?: boolean
      /** Disable StorageOS scheduler deployment. StorageOS scheduler helps improve the scheduling decision of a pod, considering the location of volumes and their replicas. */
      disableScheduler?: boolean
      /** Disable TCMU can be set to true to disable the TCMU storage driver.  This is required when there are multiple storage systems running on the same node and you wish to avoid conflicts.  Only one TCMU-based storage system can run on a node at a time.  Disabling TCMU will degrade performance. */
      disableTCMU?: boolean
      /** To disable anonymous usage reporting across the cluster, set to true. Defaults to false. To help improve the product, data such as API usage and StorageOS configuration information is collected. */
      disableTelemetry?: boolean
      /** Force TCMU can be set to true to ensure that TCMU is enabled or cause StorageOS to abort startup.  At startup, StorageOS will automatically fallback to non-TCMU mode if another TCMU-based storage system is running on the node.  Since non-TCMU has performance drawbacks, this may not always be desired. */
      forceTCMU?: boolean
      /** Defines the various container images used in the cluster. */
      images?: { csiClusterDriverRegistrarContainer?: string, csiExternalAttacherContainer?: string, csiExternalProvisionerContainer?: string, csiLivenessProbeContainer?: string, csiNodeDriverRegistrarContainer?: string, hyperkubeContainer?: string, initContainer?: string, nodeContainer?: string }
      /** Describes the ingress configuration to be configured for the cluster. */
      ingress?: { annotations?: { [k: string]: string }, enable?: boolean, hostname?: string, tls?: boolean }
      /** The join token is used for cluster discovery.  When used with the Operator, the token will be a comma-separated list of all cluster member IP addresses.  The node that owns the first IP address listed will be responsible for bootsrapping the cluster. */
      join?: string
      /** Name of the Kubernetes distribution in use, e.g. `openshift`.  This will be included in the product telemetry (if enabled), to help focus development efforts. */
      k8sDistro?: string
      /** KV store configuration to use. Defaults to embedded. `etcd` is recommended for production deployments with the address set to an external etcd instance. */
      kvBackend?: { address?: string, backend?: string }
      /** The namespace to install the StorageOS cluster into. `kube-system` is recommended so that StorageOS does not get evicted if a node becomes over-allocated. */
      namespace?: string
      /** Node selector terms can be set to control the placement of StorageOS pods using node affiinity. */
      nodeSelectorTerms?: { [k: string]: any }[]
      /** When enabled, the Operator will not perform any actions on the cluster. */
      pause?: boolean
      /** Resources is to set the resource requirements of the storageos containers. */
      resources?: { [k: string]: any }
      /** The name of the secret object that stores the api credentials. */
      secretRefName: string
      /** The name of the namespace where the secret object that stores the api credentials exists. */
      secretRefNamespace: string
      /** The cluster Service configuration. */
      service?: { annotations?: { [k: string]: string }, externalPort?: number, internalPort?: number, name: string, type: string }
      /** The shared directory where storage devices should be created.  This directory must be available to both the StorageOS Node container and the kubelet, and must have mount propagation enabled. When kubelet is running in a container, `/var/lib/kubelet/plugins/kubernetes.io~storageos` should normally be set, otherwise leave empty. */
      sharedDir?: string
      /** StorageClassName is the name of default StorageClass created for StorageOS volumes. */
      storageClassName?: string
      /** The name of the secret object that contains the etcd TLS certificates. */
      tlsEtcdSecretRefName?: string
      /** The namespace of the secret object that contains the etcd TLS certificates. */
      tlsEtcdSecretRefNamespace?: string
      /** Tolerations can be set to control the placement of StorageOS pods. */
      tolerations?: { [k: string]: any }[]
    }
    /**
     * StorageOS Cluster installs StorageOS in the cluster. It contains all the configuration for setting up a StorageOS cluster and also shows the status of the running StorageOS cluster.
     */
    export class StorageOSCluster extends KubernetesResource implements IStorageOSCluster {
      metadata: meta.v1.ObjectMeta
      spec: com_storageos.v1.StorageOSClusterSpec
      /**
       * StorageOS Cluster installs StorageOS in the cluster. It contains all the configuration for setting up a StorageOS cluster and also shows the status of the running StorageOS cluster.
       */
      constructor (properties: IStorageOSCluster) {
        super({ apiVersion: 'storageos.com/v1', kind: 'StorageOSCluster' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IStorageOSCluster {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** StorageOSCluster spec. */
      spec: com_storageos.v1.StorageOSClusterSpec
    }
    /**
     * NFSServer spec.
     */
    export interface NFSServerSpec {
      /** The annotations-related configuration to add/set on each Pod related object. */
      annotations?: { [k: string]: string }
      /** The parameters to configure the NFS export */
      export?: { name?: string, persistentVolumeClaim?: { [k: string]: any }, server?: { accessMode?: string, squash?: string } }
      /** PV mount options. Not validated - mount of the PVs will simply fail if one is invalid. */
      mountOptions?: string[]
      /** The container image of the NFS server. */
      nfsContainer?: string
      /** Reclamation policy for the persistent volume shared to the user's pod. */
      persistentVolumeReclaimPolicy?: string
      /** Resources represents the minimum resources required */
      resources?: { [k: string]: any }
      /** StorageClassName is the name of the StorageClass used by the NFS volume. */
      storageClassName?: string
      /** Tolerations is to set the placement of NFS server pods using pod toleration. */
      tolerations?: { [k: string]: any }[]
    }
    /**
     * StorageOS NFS Server provides support for shared volumes. The StorageOS control plane will automatically create and manage NFS Server instances when a PersistentVolumeClaim requests a volume with AccessMode=ReadWriteMany.
     */
    export class NFSServer extends KubernetesResource implements INFSServer {
      metadata: meta.v1.ObjectMeta
      spec: com_storageos.v1.NFSServerSpec
      /**
       * StorageOS NFS Server provides support for shared volumes. The StorageOS control plane will automatically create and manage NFS Server instances when a PersistentVolumeClaim requests a volume with AccessMode=ReadWriteMany.
       */
      constructor (properties: INFSServer) {
        super({ apiVersion: 'storageos.com/v1', kind: 'NFSServer' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface INFSServer {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** NFSServer spec. */
      spec: com_storageos.v1.NFSServerSpec
    }
    /**
     * Job spec.
     */
    export interface JobSpec {
      /** The arguments to pass to the job container. */
      args: string[]
      /** The job is marked as completed when the completion word is found in the pod logs. */
      completionWord: string
      /** The path on the host that is mounted into the job container. */
      hostPath: string
      /** The container image to run as the job. */
      image: string
      /** A label selector can be set to identify Pods created by the job. */
      labelSelector?: string
      /** The path in the job container where a volume is mounted. */
      mountPath: string
      /** Node selector terms can be set to control the placement of job pods using node affiinity. */
      nodeSelectorTerms?: { [k: string]: any }[]
      /** Tolerations can be set to control the placement of job pods. */
      tolerations?: { [k: string]: any }[]
    }
    /**
     * StorageOS Job creates special pods that run on all the node and perform an administrative task. This could be used for cluster maintenance tasks.
     */
    export class Job extends KubernetesResource implements IJob {
      metadata: meta.v1.ObjectMeta
      spec: com_storageos.v1.JobSpec
      /**
       * StorageOS Job creates special pods that run on all the node and perform an administrative task. This could be used for cluster maintenance tasks.
       */
      constructor (properties: IJob) {
        super({ apiVersion: 'storageos.com/v1', kind: 'Job' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IJob {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Job spec. */
      spec: com_storageos.v1.JobSpec
    }
  }
}
export namespace io_rook_ceph {
  export namespace v1 {
    /**
     * CephCluster spec.
     */
    export interface CephClusterSpec {
      cephVersion?: { [k: string]: any }
      dashboard?: { [k: string]: any }
      dataDirHostPath?: string
      mon: { [k: string]: any }
      network?: { [k: string]: any }
      storage?: { [k: string]: any }
    }
    /**
     * Represents a Ceph cluster.
     */
    export class CephCluster extends KubernetesResource implements ICephCluster {
      spec: io_rook_ceph.v1.CephClusterSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Represents a Ceph cluster.
       */
      constructor (properties: ICephCluster) {
        super({ apiVersion: 'ceph.rook.io/v1', kind: 'CephCluster' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface ICephCluster {
      /** CephCluster spec. */
      spec: io_rook_ceph.v1.CephClusterSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * Represents a Ceph Object Store.
     */
    export class CephObjectStore extends KubernetesResource {
      /**
       * Represents a Ceph Object Store.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'ceph.rook.io/v1', kind: 'CephObjectStore' }, properties))
      }
    }
    /**
     * Represents a Ceph Object Store User.
     */
    export class CephObjectStoreUser extends KubernetesResource {
      /**
       * Represents a Ceph Object Store User.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'ceph.rook.io/v1', kind: 'CephObjectStoreUser' }, properties))
      }
    }
    /**
     * Represents a Ceph Block Pool.
     */
    export class CephBlockPool extends KubernetesResource {
      /**
       * Represents a Ceph Block Pool.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'ceph.rook.io/v1', kind: 'CephBlockPool' }, properties))
      }
    }
  }
}
export namespace ai_containers_federatorai {
  export namespace v1alpha1 {
    /**
     * AlamedaService spec.
     */
    export type AlamedaServiceSpec = any
    /**
     * An instance of Alameda.
     */
    export class AlamedaService extends KubernetesResource implements IAlamedaService {
      metadata: meta.v1.ObjectMeta
      spec: ai_containers_federatorai.v1alpha1.AlamedaServiceSpec
      /**
       * An instance of Alameda.
       */
      constructor (properties: IAlamedaService) {
        super({ apiVersion: 'federatorai.containers.ai/v1alpha1', kind: 'AlamedaService' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IAlamedaService {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** AlamedaService spec. */
      spec: ai_containers_federatorai.v1alpha1.AlamedaServiceSpec
    }
  }
}
export namespace io_k8s_kubefed_multiclusterdns {
  export namespace v1alpha1 {
    /**
     * DNSEndpoint spec.
     */
    export interface DNSEndpointSpec {
      endpoints?: { dnsName?: string, labels?: { [k: string]: any }, recordTTL?: number, recordType?: string, targets?: string[] }[]
    }
    /**
     * DNSEndpoint is the CRD wrapper for Endpoint which is designed to act as a source of truth for external-dns.
     */
    export class DNSEndpoint extends KubernetesResource implements IDNSEndpoint {
      metadata: meta.v1.ObjectMeta
      spec: io_k8s_kubefed_multiclusterdns.v1alpha1.DNSEndpointSpec
      /**
       * DNSEndpoint is the CRD wrapper for Endpoint which is designed to act as a source of truth for external-dns.
       */
      constructor (properties: IDNSEndpoint) {
        super({ apiVersion: 'multiclusterdns.kubefed.k8s.io/v1alpha1', kind: 'DNSEndpoint' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IDNSEndpoint {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** DNSEndpoint spec. */
      spec: io_k8s_kubefed_multiclusterdns.v1alpha1.DNSEndpointSpec
    }
    /**
     * ServiceDNSRecord spec.
     */
    export interface ServiceDNSRecordSpec {
      /** AllowServiceWithoutEndpoints allows DNS records to be written for Service shards without endpoints */
      allowServiceWithoutEndpoints?: boolean
      /** DNSPrefix when specified, an additional DNS record would be created with <DNSPrefix>.<FederationDomain> */
      dnsPrefix?: string
      /** DomainRef is the name of the domain object to which the corresponding federated service belongs */
      domainRef: string
      /** ExternalName when specified, replaces the service name portion of a resource record with the value of ExternalName. */
      externalName?: string
      /** RecordTTL is the TTL in seconds for DNS records created for this Service, if omitted a default would be used */
      recordTTL?: number
    }
    /**
     * ServiceDNSRecord associates one or more Kubernetes Service resources and how to access the Service, with a scheme for constructing Domain Name System (DNS) resource records for the Service.
     */
    export class ServiceDNSRecord extends KubernetesResource implements IServiceDNSRecord {
      metadata: meta.v1.ObjectMeta
      spec: io_k8s_kubefed_multiclusterdns.v1alpha1.ServiceDNSRecordSpec
      /**
       * ServiceDNSRecord associates one or more Kubernetes Service resources and how to access the Service, with a scheme for constructing Domain Name System (DNS) resource records for the Service.
       */
      constructor (properties: IServiceDNSRecord) {
        super({ apiVersion: 'multiclusterdns.kubefed.k8s.io/v1alpha1', kind: 'ServiceDNSRecord' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IServiceDNSRecord {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** ServiceDNSRecord spec. */
      spec: io_k8s_kubefed_multiclusterdns.v1alpha1.ServiceDNSRecordSpec
    }
    /**
     * IngressDNSRecord spec.
     */
    export interface IngressDNSRecordSpec {
      /** Host from the IngressRule in Cluster Ingress Spec */
      hosts?: string[]
      /** RecordTTL is the TTL in seconds for DNS records created for the Ingress, if omitted a default would be used */
      recordTTL?: number
    }
    /**
     * IngressDNSRecord associates one or more Kubernetes Ingress and how to access the Kubernetes Ingress resources, with a scheme for constructing Domain Name System (DNS) resource records for the Ingress.
     */
    export class IngressDNSRecord extends KubernetesResource implements IIngressDNSRecord {
      metadata: meta.v1.ObjectMeta
      spec: io_k8s_kubefed_multiclusterdns.v1alpha1.IngressDNSRecordSpec
      /**
       * IngressDNSRecord associates one or more Kubernetes Ingress and how to access the Kubernetes Ingress resources, with a scheme for constructing Domain Name System (DNS) resource records for the Ingress.
       */
      constructor (properties: IIngressDNSRecord) {
        super({ apiVersion: 'multiclusterdns.kubefed.k8s.io/v1alpha1', kind: 'IngressDNSRecord' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IIngressDNSRecord {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** IngressDNSRecord spec. */
      spec: io_k8s_kubefed_multiclusterdns.v1alpha1.IngressDNSRecordSpec
    }
    /**
     * Domain is the DNS zone associated with the kubefed control plane
     */
    export class Domain extends KubernetesResource implements IDomain {
      domain?: string
      metadata: meta.v1.ObjectMeta
      nameServer?: string
      /**
       * Domain is the DNS zone associated with the kubefed control plane
       */
      constructor (properties: IDomain) {
        super({ apiVersion: 'multiclusterdns.kubefed.k8s.io/v1alpha1', kind: 'Domain' })
        this.domain = properties.domain
        this.metadata = properties.metadata
        this.nameServer = properties.nameServer
      }
    }
    export interface IDomain {
      /** Domain is the DNS zone associated with the federation */
      domain?: string
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** NameServer is the authoritative DNS name server for the federation domain */
      nameServer?: string
    }
  }
}
export namespace io_k8s_kubefed_core {
  export namespace v1alpha1 {
    /**
     * ClusterPropagatedVersion spec.
     */
    export type ClusterPropagatedVersionSpec = any
    /**
     * ClusterPropagatedVersion holds version information about the state propagated from kubefed APIs
     */
    export class ClusterPropagatedVersion extends KubernetesResource implements IClusterPropagatedVersion {
      metadata: meta.v1.ObjectMeta
      spec: io_k8s_kubefed_core.v1alpha1.ClusterPropagatedVersionSpec
      /**
       * ClusterPropagatedVersion holds version information about the state propagated from kubefed APIs
       */
      constructor (properties: IClusterPropagatedVersion) {
        super({ apiVersion: 'core.kubefed.k8s.io/v1alpha1', kind: 'ClusterPropagatedVersion' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IClusterPropagatedVersion {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** ClusterPropagatedVersion spec. */
      spec: io_k8s_kubefed_core.v1alpha1.ClusterPropagatedVersionSpec
    }
    /**
     * PropagatedVersion spec.
     */
    export type PropagatedVersionSpec = any
    /**
     * PropagatedVersion
     */
    export class PropagatedVersion extends KubernetesResource implements IPropagatedVersion {
      metadata: meta.v1.ObjectMeta
      spec: io_k8s_kubefed_core.v1alpha1.PropagatedVersionSpec
      /**
       * PropagatedVersion
       */
      constructor (properties: IPropagatedVersion) {
        super({ apiVersion: 'core.kubefed.k8s.io/v1alpha1', kind: 'PropagatedVersion' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IPropagatedVersion {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** PropagatedVersion spec. */
      spec: io_k8s_kubefed_core.v1alpha1.PropagatedVersionSpec
    }
    /**
     * FederatedServiceStatus is the observed status of the resource for a named cluster.
     */
    export class FederatedServiceStatus extends KubernetesResource implements IFederatedServiceStatus {
      clusterStatus?: { clusterName?: string, status?: { [k: string]: any } }[]
      metadata: meta.v1.ObjectMeta
      /**
       * FederatedServiceStatus is the observed status of the resource for a named cluster.
       */
      constructor (properties: IFederatedServiceStatus) {
        super({ apiVersion: 'core.kubefed.k8s.io/v1alpha1', kind: 'FederatedServiceStatus' })
        this.clusterStatus = properties.clusterStatus
        this.metadata = properties.metadata
      }
    }
    export interface IFederatedServiceStatus {
      clusterStatus?: { clusterName?: string, status?: { [k: string]: any } }[]
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
  export namespace v1beta1 {
    /**
     * KubeFedConfig spec.
     */
    export interface KubeFedConfigSpec {
      clusterHealthCheck?: { failureThreshold?: number, period?: string, successThreshold?: number, timeout?: string }
      controllerDuration?: { availableDelay?: string, unavailableDelay?: string }
      featureGates?: { configuration: string, name: string }[]
      leaderElect?: { leaseDuration?: string, renewDeadline?: string, resourceLock?: string, retryPeriod?: string }
      /** The scope of the KubeFed control plane should be either `Namespaced` or `Cluster`. `Namespaced` indicates that the KubeFed namespace will be the only target of the control plane. */
      scope: string
      syncController?: { adoptResources?: string }
    }
    /**
     * KubeFedConfig
     */
    export class KubeFedConfig extends KubernetesResource implements IKubeFedConfig {
      metadata: meta.v1.ObjectMeta
      spec: io_k8s_kubefed_core.v1beta1.KubeFedConfigSpec
      /**
       * KubeFedConfig
       */
      constructor (properties: IKubeFedConfig) {
        super({ apiVersion: 'core.kubefed.k8s.io/v1beta1', kind: 'KubeFedConfig' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IKubeFedConfig {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** KubeFedConfig spec. */
      spec: io_k8s_kubefed_core.v1beta1.KubeFedConfigSpec
    }
    /**
     * KubeFedCluster spec.
     */
    export interface KubeFedClusterSpec {
      /** The API endpoint of the member cluster. This can be a hostname, hostname:port, IP or IP:port. */
      apiEndpoint: string
      /** CABundle contains the certificate authority information. */
      caBundle?: string
      /** Name of the secret containing the token required to access the member cluster. The secret needs to exist in the same namespace as the control plane and should have a "token" key. */
      secretRef: { name: string }
    }
    /**
     * KubeFedCluster configures kubefed to be aware of a Kubernetes cluster and encapsulates the details necessary to communicate with the cluster.
     */
    export class KubeFedCluster extends KubernetesResource implements IKubeFedCluster {
      metadata: meta.v1.ObjectMeta
      spec: io_k8s_kubefed_core.v1beta1.KubeFedClusterSpec
      /**
       * KubeFedCluster configures kubefed to be aware of a Kubernetes cluster and encapsulates the details necessary to communicate with the cluster.
       */
      constructor (properties: IKubeFedCluster) {
        super({ apiVersion: 'core.kubefed.k8s.io/v1beta1', kind: 'KubeFedCluster' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IKubeFedCluster {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** KubeFedCluster spec. */
      spec: io_k8s_kubefed_core.v1beta1.KubeFedClusterSpec
    }
    /**
     * FederatedTypeConfig spec.
     */
    export interface FederatedTypeConfigSpec {
      /** Configuration for the federated type that defines (via template, placement and overrides fields) how the target type should appear in multiple cluster. */
      federatedType: { group?: string, kind: string, pluralName: string, scope: string, version: string }
      /** Whether or not propagation to member clusters should be enabled. */
      propagation: string
      /** Whether or not Status object should be populated. */
      statusCollection?: string
      /** Configuration for the status type that holds information about which type holds the status of the federated resource. If not provided, the group and version will default to those provided for the federated type api resource. */
      statusType?: { group?: string, kind: string, pluralName: string, scope: string, version: string }
      /** The configuration of the target type. If not set, the pluralName and groupName fields will be set from the metadata.name of this resource. The kind field must be set. */
      targetType: { group?: string, kind: string, pluralName: string, scope: string, version: string }
    }
    /**
     * FederatedTypeConfig programs kubefed to know about a single API type - the "target type" - that a user wants to federate.
     */
    export class FederatedTypeConfig extends KubernetesResource implements IFederatedTypeConfig {
      metadata: meta.v1.ObjectMeta
      spec: io_k8s_kubefed_core.v1beta1.FederatedTypeConfigSpec
      /**
       * FederatedTypeConfig programs kubefed to know about a single API type - the "target type" - that a user wants to federate.
       */
      constructor (properties: IFederatedTypeConfig) {
        super({ apiVersion: 'core.kubefed.k8s.io/v1beta1', kind: 'FederatedTypeConfig' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IFederatedTypeConfig {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** FederatedTypeConfig spec. */
      spec: io_k8s_kubefed_core.v1beta1.FederatedTypeConfigSpec
    }
  }
}
export namespace io_k8s_kubefed_scheduling {
  export namespace v1alpha1 {
    /**
     * ReplicaSchedulingPreference spec.
     */
    export interface ReplicaSchedulingPreferenceSpec {
      /** A mapping between cluster names and preferences regarding a local workload object (dep, rs, .. ) in these clusters. "*" (if provided) applies to all clusters if an explicit mapping is not provided. If omitted, clusters without explicit preferences should not have any replicas scheduled. */
      clusters?: { [k: string]: any }
      /** If set to true then already scheduled and running replicas may be moved to other clusters in order to match current state to the specified preferences. Otherwise, if set to false, up and running replicas will not be moved. */
      rebalance?: boolean
      /** TODO (@irfanurrehman); upgrade this to label selector only if need be. The idea of this API is to have a a set of preferences which can be used for a target FederatedDeployment or FederatedReplicaset. Although the set of preferences in question can be applied to multiple target objects using label selectors, but there are no clear advantages of doing that as of now. To keep the implementation and usage simple, matching ns/name of RSP resource to the target resource is sufficient and only additional information needed in RSP resource is a target kind (FederatedDeployment or FederatedReplicaset). */
      targetKind: string
      /** Total number of pods desired across federated clusters. Replicas specified in the spec for target deployment template or replicaset template will be discarded/overridden when scheduling preferences are specified. */
      totalReplicas: number
    }
    /**
     * ReplicaSchedulingPreference provides an automated mechanism of distributing and maintaining total number of replicas for deployment or replicaset based federated workloads into federated clusters.
     */
    export class ReplicaSchedulingPreference extends KubernetesResource implements IReplicaSchedulingPreference {
      metadata: meta.v1.ObjectMeta
      spec: io_k8s_kubefed_scheduling.v1alpha1.ReplicaSchedulingPreferenceSpec
      /**
       * ReplicaSchedulingPreference provides an automated mechanism of distributing and maintaining total number of replicas for deployment or replicaset based federated workloads into federated clusters.
       */
      constructor (properties: IReplicaSchedulingPreference) {
        super({ apiVersion: 'scheduling.kubefed.k8s.io/v1alpha1', kind: 'ReplicaSchedulingPreference' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IReplicaSchedulingPreference {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** ReplicaSchedulingPreference spec. */
      spec: io_k8s_kubefed_scheduling.v1alpha1.ReplicaSchedulingPreferenceSpec
    }
  }
}
export namespace io_kubefed_operator {
  export namespace v1alpha1 {
    /**
     * KubeFed spec.
     */
    export interface KubeFedSpec {
      scope: string
    }
    /**
     * KubeFed represents an installation of a particular version of KubeFed
     */
    export class KubeFed extends KubernetesResource implements IKubeFed {
      metadata: meta.v1.ObjectMeta
      spec: io_kubefed_operator.v1alpha1.KubeFedSpec
      /**
       * KubeFed represents an installation of a particular version of KubeFed
       */
      constructor (properties: IKubeFed) {
        super({ apiVersion: 'operator.kubefed.io/v1alpha1', kind: 'KubeFed' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IKubeFed {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** KubeFed spec. */
      spec: io_kubefed_operator.v1alpha1.KubeFedSpec
    }
  }
}
export namespace com_planetscale {
  export namespace v1alpha1 {
    /**
     * Instance of a PlanetScale Vitess Cluster
     */
    export class PsCluster extends KubernetesResource {
      /**
       * Instance of a PlanetScale Vitess Cluster
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'planetscale.com/v1alpha1', kind: 'PsCluster' }, properties))
      }
    }
  }
}
export namespace io_tremolo_myvirtualdirectory {
  export namespace v1 {
    /**
     * MyVirtualDirectory spec.
     */
    export interface MyVirtualDirectorySpec {
      image?: string
      replicas?: number
      dest_secret?: string
      dest_cfg_map?: string
      source_secret?: string
      secret_data?: string[]
      non_secret_data?: { name?: string, value?: string }[]
      myvd_props?: string
      myvd_log4j2_xml?: string
      myvd_network_configuration?: { open_port?: number, secure_port?: number, client_auth?: string, allowed_client_names?: string[], ciphers?: string[], path_to_deployment?: string, path_to_env_file?: string, secure_key_alias?: string, allowed_tls_protocols?: string[] }
      key_store?: { static_keys?: { name?: string, version?: number }[], trusted_certificates?: { name?: string, pem_data?: string }[], key_pairs?: { create_keypair_template?: { name?: string, value?: string }[], keys?: { name?: string, tls_secret_name?: string, import_into_ks?: string, replace_if_exists?: boolean, create_data?: { sign_by_k8s_ca?: boolean, server_name?: string, subject_alternative_names?: string[], key_size?: number, ca_cert?: boolean, secret_info?: { type_of_secret?: string, cert_name?: string, key_name?: string } } }[] } }
    }
    /**
     * A running MyVirtualDirectory instance
     */
    export class MyVirtualDirectory extends KubernetesResource implements IMyVirtualDirectory {
      spec: io_tremolo_myvirtualdirectory.v1.MyVirtualDirectorySpec
      metadata: meta.v1.ObjectMeta
      /**
       * A running MyVirtualDirectory instance
       */
      constructor (properties: IMyVirtualDirectory) {
        super({ apiVersion: 'myvirtualdirectory.tremolo.io/v1', kind: 'MyVirtualDirectory' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IMyVirtualDirectory {
      /** MyVirtualDirectory spec. */
      spec: io_tremolo_myvirtualdirectory.v1.MyVirtualDirectorySpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
}
export namespace com_ibm_ibmcloud {
  export namespace v1alpha1 {
    /**
     * Binding spec.
     */
    export interface BindingSpec {
      role?: string
      secretName?: string
      /** Name of the service resource to bind */
      serviceName: string
    }
    /**
     * Represents an instance of a service binding resource on IBM Cloud. A Binding creates a secret with the service instance credentials.
     */
    export class Binding extends KubernetesResource implements IBinding {
      metadata: meta.v1.ObjectMeta
      spec: com_ibm_ibmcloud.v1alpha1.BindingSpec
      /**
       * Represents an instance of a service binding resource on IBM Cloud. A Binding creates a secret with the service instance credentials.
       */
      constructor (properties: IBinding) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'Binding' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IBinding {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Binding spec. */
      spec: com_ibm_ibmcloud.v1alpha1.BindingSpec
    }
    /**
     * Service spec.
     */
    export interface ServiceSpec {
      /** Parameters []keyvaluev1.KeyValue `json:"parameters,omitempty"` */
      context?: { org: string, region: string, resourcegroup: string, resourcelocation: string, space: string }
      externalName?: string
      /** Plan for the service from the IBM Cloud Catalog */
      plan: string
      /** Service class is the name of the service from the IBM Cloud Catalog */
      serviceClass: string
      serviceClassType?: string
    }
    /**
     * Represents an instance of a Service resource on IBM Cloud.
     */
    export class Service extends KubernetesResource implements IService {
      metadata: meta.v1.ObjectMeta
      spec: com_ibm_ibmcloud.v1alpha1.ServiceSpec
      /**
       * Represents an instance of a Service resource on IBM Cloud.
       */
      constructor (properties: IService) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'Service' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IService {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Service spec. */
      spec: com_ibm_ibmcloud.v1alpha1.ServiceSpec
    }
    /**
     * Topic spec.
     */
    export interface TopicSpec {
      /** APIKey is the API key for the Topic's Event Stream service */
      apiKey?: { configMapKeyRef?: { [k: string]: any }, secretKeyRef?: { [k: string]: any } }
      /** Binding object that holds the secret for Event Streams credentials */
      bindingFrom?: { name: string, namespace?: string }
      /** Configs is an array of configuration parameters for the Topic */
      configs?: { attributes?: { [k: string]: any }, name: string, value?: { [k: string]: any }, valueFrom?: { configMapKeyRef?: { [k: string]: any }, secretKeyRef?: { [k: string]: any } } }[]
      /** KafkaAdminURL is the kafka admin URL for the Topic's Event Stream */
      kafkaAdminUrl?: { configMapKeyRef?: { [k: string]: any }, secretKeyRef?: { [k: string]: any } }
      /** NumPartitions is the number of partitions for the Topic */
      numPartitions?: number
      /** ReplicationFactor is the replication factor for the Topic */
      replicationFactor?: number
      /** TopicName is the displayed Topic name */
      topicName: string
    }
    /**
     * Represents an Event Streams Topic
     */
    export class Topic extends KubernetesResource implements ITopic {
      metadata: meta.v1.ObjectMeta
      spec: com_ibm_ibmcloud.v1alpha1.TopicSpec
      /**
       * Represents an Event Streams Topic
       */
      constructor (properties: ITopic) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'Topic' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface ITopic {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Topic spec. */
      spec: com_ibm_ibmcloud.v1alpha1.TopicSpec
    }
    /**
     * EsIndex spec.
     */
    export interface EsIndexSpec {
      /** Bind to an existing index if true, default value false */
      bindOnly?: boolean
      /** Binding object that holds the secret for elasticsearch credentials */
      bindingFrom?: { name?: string }
      /** Composed elasticsearch URI from a SecretKeyRef or a ConfigMapKeyRef. Cannot be used if binding is not empty. The vacomposed URI must be in the format https://<user>:<passwd>@hostname:port. */
      esURIComposed?: { configMapKeyRef?: { [k: string]: any }, secretKeyRef?: { [k: string]: any } }
      /** Index to be created on elasticsearch */
      indexName: string
      /** Number of replicas */
      numberOfReplicas?: number
      /** Number of shards */
      numberOfShards?: number
    }
    /**
     * Represents an Elasticsearch index
     */
    export class EsIndex extends KubernetesResource implements IEsIndex {
      metadata: meta.v1.ObjectMeta
      spec: com_ibm_ibmcloud.v1alpha1.EsIndexSpec
      /**
       * Represents an Elasticsearch index
       */
      constructor (properties: IEsIndex) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'EsIndex' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IEsIndex {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** EsIndex spec. */
      spec: com_ibm_ibmcloud.v1alpha1.EsIndexSpec
    }
    /**
     * Bucket spec.
     */
    export interface BucketSpec {
      /** API Key */
      apiKey?: { configMapKeyRef?: { [k: string]: any }, secretKeyRef?: { [k: string]: any } }
      /** Bind to existing bucket, can be used to control Retention rule and CORS policy */
      bindOnly?: boolean
      /** Use bindingFrom if using IBM Cloud Operators to control service and binding */
      bindingFrom?: { name: string, namespace?: string }
      /** Type of Bucket - Public or Private. Default to public */
      bucketType?: string
      /** Context of the operator */
      context?: { org: string, region: string, resourcegroup: string, resourcelocation: string, space: string }
      /** CORS rule - allowedOrigin, allowedHeader and allowedMethod */
      corsRules?: { allowedHeader?: string, allowedMethods?: string[], allowedOrigin?: string }
      /** Endpoints - can be found in the instance service crentials */
      endpoints?: { configMapKeyRef?: { [k: string]: any }, secretKeyRef?: { [k: string]: any } }
      /** Do not remove the bucket if it is not empty */
      keepIfNotEmpty?: boolean
      /** Default to standard */
      keyProtect?: { apiKey?: { configMapKeyRef?: { [k: string]: any }, secretKeyRef?: { [k: string]: any } }, bindingFrom?: { name: string, namespace?: string }, instanceID?: string, instanceLocation?: string, instanceName?: string, keyName: string }
      /** Location of the bucket */
      location?: string
      /** Region of the bucket */
      region?: { configMapKeyRef?: { [k: string]: any }, secretKeyRef?: { [k: string]: any } }
      /** Bucket Resiliency - Cross Region, Regional, Single Site */
      resiliency?: string
      /** Resource Instance ID of the COS Instance, can be fonud in the Service Credentials */
      resourceInstanceID?: { configMapKeyRef?: { [k: string]: any }, secretKeyRef?: { [k: string]: any } }
      /** Retention policy - Only available for the standard plan Cloud Object Storage instance */
      retentionPolicy?: { defaultRetentionDay?: number, maximumRetentionDay?: number, minimumRetentionDay?: number }
      /** Bucket Storage Class - Standard, Vault, Cold Vault, and Flex */
      storageClass?: string
    }
    /**
     * Represents a bucket of a Cloud Object Storage bucket resource  on IBM Cloud.
     */
    export class Bucket extends KubernetesResource implements IBucket {
      metadata: meta.v1.ObjectMeta
      spec: com_ibm_ibmcloud.v1alpha1.BucketSpec
      /**
       * Represents a bucket of a Cloud Object Storage bucket resource  on IBM Cloud.
       */
      constructor (properties: IBucket) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'Bucket' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IBucket {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Bucket spec. */
      spec: com_ibm_ibmcloud.v1alpha1.BucketSpec
    }
  }
}
export namespace com_mongodb {
  export namespace v1 {
    /**
     * MongoDbShardedCluster spec.
     */
    export interface MongoDbShardedClusterSpec {
      configServerCount: number
      mongodsPerShardCount: number
      mongosCount: number
      shardCount: number
      spec?: { [k: string]: any }
    }
    export class MongoDbShardedCluster extends KubernetesResource implements IMongoDbShardedCluster {
      spec: com_mongodb.v1.MongoDbShardedClusterSpec
      metadata: meta.v1.ObjectMeta
      constructor (properties: IMongoDbShardedCluster) {
        super({ apiVersion: 'mongodb.com/v1', kind: 'MongoDbShardedCluster' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IMongoDbShardedCluster {
      /** MongoDbShardedCluster spec. */
      spec: com_mongodb.v1.MongoDbShardedClusterSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * MongoDB Deployment
     */
    export class MongoDB extends KubernetesResource {
      /**
       * MongoDB Deployment
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'mongodb.com/v1', kind: 'MongoDB' }, properties))
      }
    }
    /**
     * MongoDbStandalone spec.
     */
    export interface MongoDbStandaloneSpec {
      spec?: { [k: string]: any }
    }
    export class MongoDbStandalone extends KubernetesResource implements IMongoDbStandalone {
      spec: com_mongodb.v1.MongoDbStandaloneSpec
      metadata: meta.v1.ObjectMeta
      constructor (properties: IMongoDbStandalone) {
        super({ apiVersion: 'mongodb.com/v1', kind: 'MongoDbStandalone' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IMongoDbStandalone {
      /** MongoDbStandalone spec. */
      spec: com_mongodb.v1.MongoDbStandaloneSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * MongoDbReplicaSet spec.
     */
    export interface MongoDbReplicaSetSpec {
      members: number
      spec?: { [k: string]: any }
    }
    export class MongoDbReplicaSet extends KubernetesResource implements IMongoDbReplicaSet {
      spec: com_mongodb.v1.MongoDbReplicaSetSpec
      metadata: meta.v1.ObjectMeta
      constructor (properties: IMongoDbReplicaSet) {
        super({ apiVersion: 'mongodb.com/v1', kind: 'MongoDbReplicaSet' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IMongoDbReplicaSet {
      /** MongoDbReplicaSet spec. */
      spec: com_mongodb.v1.MongoDbReplicaSetSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * MongoDBUser spec.
     */
    export interface MongoDBUserSpec {
      /** The username of the user */
      username: string
      /** The database the user is stored in */
      db: string
      /** The project the user belongs to */
      project: string
      roles?: { name: string, db: string }[]
    }
    /**
     * MongoDB x509 User
     */
    export class MongoDBUser extends KubernetesResource implements IMongoDBUser {
      spec: com_mongodb.v1.MongoDBUserSpec
      metadata: meta.v1.ObjectMeta
      /**
       * MongoDB x509 User
       */
      constructor (properties: IMongoDBUser) {
        super({ apiVersion: 'mongodb.com/v1', kind: 'MongoDBUser' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IMongoDBUser {
      /** MongoDBUser spec. */
      spec: com_mongodb.v1.MongoDBUserSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * MongoDBOpsManager spec.
     */
    export interface MongoDBOpsManagerSpec {
      version: string
      applicationDatabase: { members: number, version: string, logLevel?: string, type: string, exposedExternally?: boolean }
    }
    /**
     * MongoDB Ops Manager Alpha
     */
    export class MongoDBOpsManager extends KubernetesResource implements IMongoDBOpsManager {
      spec: com_mongodb.v1.MongoDBOpsManagerSpec
      metadata: meta.v1.ObjectMeta
      /**
       * MongoDB Ops Manager Alpha
       */
      constructor (properties: IMongoDBOpsManager) {
        super({ apiVersion: 'mongodb.com/v1', kind: 'MongoDBOpsManager' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IMongoDBOpsManager {
      /** MongoDBOpsManager spec. */
      spec: com_mongodb.v1.MongoDBOpsManagerSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
}
export namespace com_percona_pxc {
  export namespace v1 {
    /**
     * Instance of a Percona XtraDB Cluster
     */
    export class PerconaXtraDBCluster extends KubernetesResource {
      /**
       * Instance of a Percona XtraDB Cluster
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'pxc.percona.com/v1', kind: 'PerconaXtraDBCluster' }, properties))
      }
    }
    /**
     * Instance of a Percona XtraDB Cluster Backup
     */
    export class PerconaXtraDBClusterBackup extends KubernetesResource {
      /**
       * Instance of a Percona XtraDB Cluster Backup
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'pxc.percona.com/v1', kind: 'PerconaXtraDBClusterBackup' }, properties))
      }
    }
    /**
     * Instance of a Percona XtraDB Cluster Restore
     */
    export class PerconaXtraDBClusterRestore extends KubernetesResource {
      /**
       * Instance of a Percona XtraDB Cluster Restore
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'pxc.percona.com/v1', kind: 'PerconaXtraDBClusterRestore' }, properties))
      }
    }
  }
  export namespace v1alpha1 {
    /**
     * (Legacy) Instance of a Percona XtraDB Cluster Backup
     */
    export class PerconaXtraDBBackup extends KubernetesResource {
      /**
       * (Legacy) Instance of a Percona XtraDB Cluster Backup
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'pxc.percona.com/v1alpha1', kind: 'PerconaXtraDBBackup' }, properties))
      }
    }
  }
}
export namespace io_seldon_machinelearning {
  export namespace v1alpha2 {
    /**
     * A seldon engine deployment
     */
    export class SeldonDeployment extends KubernetesResource {
      /**
       * A seldon engine deployment
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'machinelearning.seldon.io/v1alpha2', kind: 'SeldonDeployment' }, properties))
      }
    }
  }
}
export namespace io_instana {
  export namespace v1alpha1 {
    /**
     * Instana Agent
     */
    export class InstanaAgent extends KubernetesResource {
      /**
       * Instana Agent
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'instana.io/v1alpha1', kind: 'InstanaAgent' }, properties))
      }
    }
  }
}
export namespace io_kubevirt {
  export namespace v1alpha3 {
    /**
     * Represents a KubeVirt deployment.
     */
    export class KubeVirt extends KubernetesResource {
      /**
       * Represents a KubeVirt deployment.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'kubevirt.io/v1alpha3', kind: 'KubeVirt' }, properties))
      }
    }
  }
}
export namespace com_aquasec_operator {
  export namespace v1alpha1 {
    /**
     * Aqua Security Enforcer Deployment with Aqua Operator
     */
    export class AquaEnforcer extends KubernetesResource {
      /**
       * Aqua Security Enforcer Deployment with Aqua Operator
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'operator.aquasec.com/v1alpha1', kind: 'AquaEnforcer' }, properties))
      }
    }
    /**
     * Aqua Security CSP Deployment with Aqua Operator
     */
    export class AquaCsp extends KubernetesResource {
      /**
       * Aqua Security CSP Deployment with Aqua Operator
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'operator.aquasec.com/v1alpha1', kind: 'AquaCsp' }, properties))
      }
    }
    /**
     * Aqua Security Database Deployment with Aqua Operator
     */
    export class AquaDatabase extends KubernetesResource {
      /**
       * Aqua Security Database Deployment with Aqua Operator
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'operator.aquasec.com/v1alpha1', kind: 'AquaDatabase' }, properties))
      }
    }
    /**
     * Aqua Security Scanner Deployment with Aqua Operator
     */
    export class AquaScanner extends KubernetesResource {
      /**
       * Aqua Security Scanner Deployment with Aqua Operator
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'operator.aquasec.com/v1alpha1', kind: 'AquaScanner' }, properties))
      }
    }
    /**
     * Aqua Security Gateway Deployment with Aqua Operator
     */
    export class AquaGateway extends KubernetesResource {
      /**
       * Aqua Security Gateway Deployment with Aqua Operator
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'operator.aquasec.com/v1alpha1', kind: 'AquaGateway' }, properties))
      }
    }
    /**
     * Aqua Security Server Deployment with Aqua Operator
     */
    export class AquaServer extends KubernetesResource {
      /**
       * Aqua Security Server Deployment with Aqua Operator
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'operator.aquasec.com/v1alpha1', kind: 'AquaServer' }, properties))
      }
    }
  }
}
export namespace com_sematext {
  export namespace v1alpha1 {
    /**
     * Represents a Sematext Agent running on each node of your cluster.
     */
    export class SematextAgent extends KubernetesResource {
      /**
       * Represents a Sematext Agent running on each node of your cluster.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'sematext.com/v1alpha1', kind: 'SematextAgent' }, properties))
      }
    }
  }
}
export namespace com_coreos_database_etcd {
  export namespace v1beta2 {
    /**
     * Represents a cluster of etcd nodes.
     */
    export class EtcdCluster extends KubernetesResource {
      /**
       * Represents a cluster of etcd nodes.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'etcd.database.coreos.com/v1beta2', kind: 'EtcdCluster' }, properties))
      }
    }
    /**
     * Represents the intent to restore an etcd cluster from a backup.
     */
    export class EtcdRestore extends KubernetesResource {
      /**
       * Represents the intent to restore an etcd cluster from a backup.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'etcd.database.coreos.com/v1beta2', kind: 'EtcdRestore' }, properties))
      }
    }
    /**
     * Represents the intent to backup an etcd cluster.
     */
    export class EtcdBackup extends KubernetesResource {
      /**
       * Represents the intent to backup an etcd cluster.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'etcd.database.coreos.com/v1beta2', kind: 'EtcdBackup' }, properties))
      }
    }
  }
}
export namespace org_falco {
  export namespace v1alpha1 {
    /**
     * Represents a Falco running on each node of your cluster.
     */
    export class Falco extends KubernetesResource {
      /**
       * Represents a Falco running on each node of your cluster.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'falco.org/v1alpha1', kind: 'Falco' }, properties))
      }
    }
  }
}
export namespace io_litmuschaos {
  export namespace v1alpha1 {
    /**
     * ChaosEngine spec.
     */
    export type ChaosEngineSpec = any
    /**
     * Represents the Chaos Schedule for an application
     */
    export class ChaosEngine extends KubernetesResource implements IChaosEngine {
      metadata: meta.v1.ObjectMeta
      spec: io_litmuschaos.v1alpha1.ChaosEngineSpec
      /**
       * Represents the Chaos Schedule for an application
       */
      constructor (properties: IChaosEngine) {
        super({ apiVersion: 'litmuschaos.io/v1alpha1', kind: 'ChaosEngine' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IChaosEngine {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** ChaosEngine spec. */
      spec: io_litmuschaos.v1alpha1.ChaosEngineSpec
    }
  }
}
export namespace io_k8s_sparkoperator {
  export namespace v1beta1 {
    /**
     * SparkApplication spec.
     */
    export interface SparkApplicationSpec {
      image?: string
      initContainerImage?: string
      imagePullPolicy?: { [k: string]: any }
      imagePullSecrets?: string[]
      mainClass?: string
      mainApplicationFile?: string
      arguments?: string[]
      sparkConf?: { [k: string]: any }
      sparkConfigMap?: string
      hadoopConf?: { [k: string]: any }
      hadoopConfigMap?: string
      volumes?: { name?: string }[]
      deps?: { [k: string]: any }
      driver?: { [k: string]: any }
      executor?: { [k: string]: any }
      nodeSelector?: { [k: string]: any }
      failureRetries?: number
      retryInterval?: number
      mode?: { [k: string]: any }
      monitoring?: { [k: string]: any }
      pythonVersion?: { [k: string]: any }
      restartPolicy?: { [k: string]: any }
      type: { [k: string]: any }
      sparkVersion: string
      memoryOverheadFactor?: string
    }
    /**
     * A configuration file for a SparkApplication custom resource.
     */
    export class SparkApplication extends KubernetesResource implements ISparkApplication {
      spec: io_k8s_sparkoperator.v1beta1.SparkApplicationSpec
      metadata: meta.v1.ObjectMeta
      /**
       * A configuration file for a SparkApplication custom resource.
       */
      constructor (properties: ISparkApplication) {
        super({ apiVersion: 'sparkoperator.k8s.io/v1beta1', kind: 'SparkApplication' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface ISparkApplication {
      /** SparkApplication spec. */
      spec: io_k8s_sparkoperator.v1beta1.SparkApplicationSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * ScheduledSparkApplication spec.
     */
    export interface ScheduledSparkApplicationSpec {
      concurrencyPolicy?: { [k: string]: any }
      failedRunHistoryLimit?: number
      schedule?: string
      successfulRunHistoryLimit?: number
      template?: { [k: string]: any }
    }
    /**
     * A configuration file for a ScheduledSparkApplication custom resource.
     */
    export class ScheduledSparkApplication extends KubernetesResource implements IScheduledSparkApplication {
      spec: io_k8s_sparkoperator.v1beta1.ScheduledSparkApplicationSpec
      metadata: meta.v1.ObjectMeta
      /**
       * A configuration file for a ScheduledSparkApplication custom resource.
       */
      constructor (properties: IScheduledSparkApplication) {
        super({ apiVersion: 'sparkoperator.k8s.io/v1beta1', kind: 'ScheduledSparkApplication' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IScheduledSparkApplication {
      /** ScheduledSparkApplication spec. */
      spec: io_k8s_sparkoperator.v1beta1.ScheduledSparkApplicationSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
}
export namespace com_altinity_clickhouse {
  export namespace v1 {
    /**
     * ClickHouseInstallation spec.
     */
    export interface ClickHouseInstallationSpec {
      defaults?: { replicasUseFQDN?: string, distributedDDL?: { profile?: string }, templates?: { podTemplate?: string, volumeClaimTemplate?: string, serviceTemplate?: string, clusterServiceTemplate?: string, shardServiceTemplate?: string, replicaServiceTemplate?: string } }
      configuration?: { zookeeper?: { nodes?: { host: string, port?: number }[], session_timeout_ms?: number, operation_timeout_ms?: number, root?: string, identity?: string }, users?: { [k: string]: any }, profiles?: { [k: string]: any }, quotas?: { [k: string]: any }, settings?: { [k: string]: any }, files?: { [k: string]: any }, clusters?: { name: string, shardsCount?: number, replicasCount?: number, templates?: { podTemplate?: string, volumeClaimTemplate?: string, serviceTemplate?: string, clusterServiceTemplate?: string, shardServiceTemplate?: string, replicaServiceTemplate?: string }, layout?: { type?: string, shardsCount?: number, replicasCount?: number, shards?: { name?: string, definitionType?: string, replicasCount?: number, weight?: number, internalReplication?: string, templates?: { podTemplate?: string, volumeClaimTemplate?: string, serviceTemplate?: string, clusterServiceTemplate?: string, shardServiceTemplate?: string, replicaServiceTemplate?: string }, replicas?: { name?: string, port?: number, templates?: { podTemplate?: string, volumeClaimTemplate?: string, serviceTemplate?: string, clusterServiceTemplate?: string, shardServiceTemplate?: string, replicaServiceTemplate?: string } }[] }[] } }[] }
      templates?: { podTemplates?: { [k: string]: any }[], volumeClaimTemplates?: { name: string, reclaimPolicy?: string, spec: { [k: string]: any } }[], serviceTemplates?: { name: string, generateName?: string, metadata?: { [k: string]: any }, spec: { [k: string]: any } }[] }
    }
    /**
     * ClickHouse Installation - set of ClickHouse Clusters
     */
    export class ClickHouseInstallation extends KubernetesResource implements IClickHouseInstallation {
      spec: com_altinity_clickhouse.v1.ClickHouseInstallationSpec
      metadata: meta.v1.ObjectMeta
      /**
       * ClickHouse Installation - set of ClickHouse Clusters
       */
      constructor (properties: IClickHouseInstallation) {
        super({ apiVersion: 'clickhouse.altinity.com/v1', kind: 'ClickHouseInstallation' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IClickHouseInstallation {
      /** ClickHouseInstallation spec. */
      spec: com_altinity_clickhouse.v1.ClickHouseInstallationSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * ClickHouseInstallationTemplate spec.
     */
    export interface ClickHouseInstallationTemplateSpec {
      defaults?: { replicasUseFQDN?: string, distributedDDL?: { profile?: string }, templates?: { podTemplate?: string, volumeClaimTemplate?: string, serviceTemplate?: string, clusterServiceTemplate?: string, shardServiceTemplate?: string, replicaServiceTemplate?: string } }
      configuration?: { zookeeper?: { nodes?: { host: string, port?: number }[], session_timeout_ms?: number, operation_timeout_ms?: number, root?: string, identity?: string }, users?: { [k: string]: any }, profiles?: { [k: string]: any }, quotas?: { [k: string]: any }, settings?: { [k: string]: any }, files?: { [k: string]: any }, clusters?: { name: string, shardsCount?: number, replicasCount?: number, templates?: { podTemplate?: string, volumeClaimTemplate?: string, serviceTemplate?: string, clusterServiceTemplate?: string, shardServiceTemplate?: string, replicaServiceTemplate?: string }, layout?: { type?: string, shardsCount?: number, replicasCount?: number, shards?: { name?: string, definitionType?: string, replicasCount?: number, weight?: number, internalReplication?: string, templates?: { podTemplate?: string, volumeClaimTemplate?: string, serviceTemplate?: string, clusterServiceTemplate?: string, shardServiceTemplate?: string, replicaServiceTemplate?: string }, replicas?: { name?: string, port?: number, templates?: { podTemplate?: string, volumeClaimTemplate?: string, serviceTemplate?: string, clusterServiceTemplate?: string, shardServiceTemplate?: string, replicaServiceTemplate?: string } }[] }[] } }[] }
      templates?: { podTemplates?: { [k: string]: any }[], volumeClaimTemplates?: { name: string, reclaimPolicy?: string, spec: { [k: string]: any } }[], serviceTemplates?: { name: string, generateName?: string, metadata?: { [k: string]: any }, spec: { [k: string]: any } }[] }
    }
    export class ClickHouseInstallationTemplate extends KubernetesResource implements IClickHouseInstallationTemplate {
      spec: com_altinity_clickhouse.v1.ClickHouseInstallationTemplateSpec
      metadata: meta.v1.ObjectMeta
      constructor (properties: IClickHouseInstallationTemplate) {
        super({ apiVersion: 'clickhouse.altinity.com/v1', kind: 'ClickHouseInstallationTemplate' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IClickHouseInstallationTemplate {
      /** ClickHouseInstallationTemplate spec. */
      spec: com_altinity_clickhouse.v1.ClickHouseInstallationTemplateSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
}
export namespace aws_service_operator {
  export namespace v1alpha1 {
    /**
     * Represents a resource for managing an Amazon ECR Repository.
     */
    export class ECRRepository extends KubernetesResource {
      /**
       * Represents a resource for managing an Amazon ECR Repository.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'service-operator.aws/v1alpha1', kind: 'ECRRepository' }, properties))
      }
    }
    /**
     * Represents a resource for managing an Amazon DynamoDB resource.
     */
    export class DynamoDB extends KubernetesResource {
      /**
       * Represents a resource for managing an Amazon DynamoDB resource.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'service-operator.aws/v1alpha1', kind: 'DynamoDB' }, properties))
      }
    }
    /**
     * Represents a resource for managing AWS CloudFormation Templates.
     */
    export class CloudFormationTemplate extends KubernetesResource {
      /**
       * Represents a resource for managing AWS CloudFormation Templates.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'service-operator.aws/v1alpha1', kind: 'CloudFormationTemplate' }, properties))
      }
    }
    /**
     * Represents a resource for managing an Amazon Simple Notification Service (SNS).
     */
    export class SNSTopic extends KubernetesResource {
      /**
       * Represents a resource for managing an Amazon Simple Notification Service (SNS).
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'service-operator.aws/v1alpha1', kind: 'SNSTopic' }, properties))
      }
    }
    /**
     * Represents a resource for managing an Amazon Simple Notification Service Subscription.
     */
    export class SNSSubscription extends KubernetesResource {
      /**
       * Represents a resource for managing an Amazon Simple Notification Service Subscription.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'service-operator.aws/v1alpha1', kind: 'SNSSubscription' }, properties))
      }
    }
    /**
     * Represents a resource for managing an Amazon S3 Bucket.
     */
    export class S3Bucket extends KubernetesResource {
      /**
       * Represents a resource for managing an Amazon S3 Bucket.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'service-operator.aws/v1alpha1', kind: 'S3Bucket' }, properties))
      }
    }
    /**
     * Represents a resource for managing an Amazon ElastiCache.
     */
    export class ElastiCache extends KubernetesResource {
      /**
       * Represents a resource for managing an Amazon ElastiCache.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'service-operator.aws/v1alpha1', kind: 'ElastiCache' }, properties))
      }
    }
    /**
     * Represents a resource for managing an Amazon Simple Queue Service (SQS).
     */
    export class SQSQueue extends KubernetesResource {
      /**
       * Represents a resource for managing an Amazon Simple Queue Service (SQS).
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'service-operator.aws/v1alpha1', kind: 'SQSQueue' }, properties))
      }
    }
  }
}
export namespace io_openshift_metering {
  export namespace v1 {
    /**
     * StorageLocation spec.
     */
    export interface StorageLocationSpec {
      /** Configures the StorageLocation to store data in Presto by creating
the table using Hive Server.
Note: databaseName and unmanagedDatabase are required fields.
 */
      hive?: { databaseName: string, unmanagedDatabase: boolean, location?: string, defaultTableProperties?: { fileFormat?: string, rowFormat?: string } }
    }
    /**
     * Represents a configurable storage location for Metering to store metering and report data.
     */
    export class StorageLocation extends KubernetesResource implements IStorageLocation {
      spec: io_openshift_metering.v1.StorageLocationSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Represents a configurable storage location for Metering to store metering and report data.
       */
      constructor (properties: IStorageLocation) {
        super({ apiVersion: 'metering.openshift.io/v1', kind: 'StorageLocation' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IStorageLocation {
      /** StorageLocation spec. */
      spec: io_openshift_metering.v1.StorageLocationSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * MeteringConfig spec.
     */
    export interface MeteringConfigSpec {
      logHelmTemplate?: boolean
      unsupportedFeatures?: { enableHDFS?: boolean }
      disableOCPFeatures?: boolean
      storage: { type: string, hive: { type: string, hdfs?: { namenode: string }, s3?: { bucket: string, region?: string, secretName: string, createBucket?: boolean }, azure?: { createSecret?: boolean, container: string, secretName?: string, storageAccountName?: string, secretAccessKey?: string, rootDirectory?: string }, gcs?: { bucket: string, secretName?: string, createSecret?: boolean, serviceAccountKeyJSON?: string }, s3Compatible?: { bucket: string, secretName?: string, createSecret?: boolean, accessKeyID?: string, secretAccessKey?: string, endpoint: string }, sharedPVC?: { createPVC?: boolean, claimName?: string, storageClass?: string, size?: string, mountPath?: string } } }
      tls?: { enabled?: boolean, certificate?: string, key?: string, secretName?: string }
      permissions?: { meteringAdmins?: { kind: string, name: string, namespace?: string, apiGroup?: string }[], meteringViewers?: { kind: string, name: string, namespace?: string, apiGroup?: string }[], reportExporters?: { kind: string, name: string, namespace?: string, apiGroup?: string }[], reportingAdmins?: { kind: string, name: string, namespace?: string, apiGroup?: string }[], reportingViewers?: { kind: string, name: string, namespace?: string }[] }
      monitoring?: { createRBAC?: boolean, enabled?: boolean, namespace?: string }
      'openshift-reporting'?: { spec?: { defaultStorageLocation?: { enabled: boolean, isDefault: boolean, name: string, type: string, hive: { databaseName: string, unmanagedDatabase: boolean, location?: string } }, awsBillingReportDataSource?: { enabled?: boolean, bucket?: string, prefix?: string, region?: string }, defaultReportDataSources?: { base?: { enabled?: boolean, items?: { name: string, spec: { reportQueryView: { queryName: string } } }[] }, postKube_1_14?: { enabled?: boolean } } } }
      'reporting-operator'?: { spec: { affinity?: { [k: string]: any }, annotations?: { [k: string]: any }, apiService?: { nodePort?: number, type?: string }, authProxy?: { enabled?: boolean, authenticatedEmails?: { enabled?: boolean, createSecret?: boolean, data?: string, secretName?: string }, cookie?: { createSecret?: boolean, secretName?: string, seed?: string }, delegateURLs?: { enabled?: boolean, policy?: string }, htpasswd?: { createSecret?: boolean, data?: string, secretName?: string }, image?: { pullPolicy?: string, pullSecrets?: any[], repository?: string, tag?: string }, rbac?: { createAuthProxyClusterRole: boolean }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }, subjectAccessReview?: { enabled: boolean, policy?: string } }, config?: { allNamespaces?: boolean, aws?: { accessKeyID?: string, createSecret?: boolean, secretAccessKey?: string, secretName?: string }, enableFinalizers?: boolean, hive?: { auth?: { certificate?: string, createSecret?: boolean, enabled?: boolean, key?: string, secretName?: string }, host?: string, tls?: { caCertificate?: string, createSecret?: boolean, enabled?: boolean, secretName?: string } }, leaderLeaseDuration?: string, logDDLQueries?: boolean, logDMLQueries?: boolean, logLevel?: string, logReports?: boolean, presto?: { auth?: { certificate?: string, createSecret?: boolean, enabled?: boolean, key?: string, secretName?: string }, host?: string, maxQueryLength?: number, tls?: { caCertificate?: string, createSecret?: boolean, enabled?: boolean, secretName?: string } }, prometheus?: { certificateAuthority?: { configMap?: { create?: boolean, enabled?: boolean, filename?: string, name?: string, value?: string }, useServiceAccountCA?: boolean }, metricsImporter?: { auth?: { tokenSecret?: { create?: boolean, enabled?: boolean, name?: string, value?: string }, useServiceAccountToken?: boolean }, config?: { chunkSize?: string, importFrom?: string, maxImportBackfillDuration?: string, maxQueryRangeDuration?: string, pollInterval?: string, stepSize?: string }, enabled?: boolean }, url?: string }, tls?: { api?: { caCertificate?: string, certificate?: string, createSecret?: boolean, enabled?: boolean, key?: string, secretName?: string } } }, image?: { pullPolicy?: string, pullSecrets?: any[], repository?: string, tag?: string }, labels?: { [k: string]: any }, nodeSelector?: { [k: string]: any }, rbac?: { createClusterMonitoringViewRBAC: boolean }, replicas?: number, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }, route?: { enabled: boolean, name?: string }, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[], updateStrategy?: { type: string } } }
      presto?: { spec: { annotations?: { [k: string]: any }, terminationGracePeriodSeconds?: number, config?: { auth?: { caCertificate?: string, certificate?: string, createSecret?: boolean, enabled?: boolean, key?: string, secretName?: string }, aws?: { accessKeyID?: string, createSecret?: boolean, secretAccessKey?: string, secretName?: string }, azure?: { createSecret?: boolean, secretAccessKey?: string, secretName?: string, storageAccountName?: string }, gcs?: { secretName?: string, createSecret?: boolean, serviceAccountKeyJSON?: string }, s3Compatible?: { secretName?: string, createSecret?: boolean, accessKeyID?: string, secretAccessKey?: string, endpoint?: string }, connectors?: { extraConnectorFiles?: any[], hive?: { hadoopConfigSecretName?: string, metastoreTimeout?: string, metastoreURI?: string, tls?: { caCertificate?: string, certificate?: string, createSecret?: boolean, enabled?: boolean, key?: string, secretName?: string }, useHadoopConfig?: boolean } }, environment?: string, maxQueryLength?: number, nodeSchedulerIncludeCoordinator?: boolean, tls?: { caCertificate?: string, certificate?: string, createSecret?: boolean, enabled?: boolean, key?: string, secretName?: string } }, coordinator?: { affinity?: { podAntiAffinity?: { requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key: string, operator: string, values?: string[] }[] }, topologyKey: string }[] } }, config?: { jvm?: { G1HeapRegionSize?: { [k: string]: any }, concGCThreads?: number, extraFlags?: any[], initialRAMPercentage?: number, initiatingHeapOccupancyPercent?: number, maxCachedBufferSize?: number, maxDirectMemorySize?: { [k: string]: any }, maxGcPauseMillis?: number, maxRAMPercentage?: number, minRAMPercentage?: number, parallelGCThreads?: number, permSize?: string, reservedCodeCacheSize?: string }, logLevel?: string, taskMaxWorkerThreads?: number, taskMinDrivers?: number }, nodeSelector?: { [k: string]: any }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }, terminationGracePeriodSeconds?: number, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[] }, image?: { pullPolicy?: string, repository?: string, tag?: string }, labels?: { [k: string]: any }, securityContext?: { fsGroup?: number, runAsGroup?: number, runAsNonRoot?: boolean, runAsUser?: number }, worker?: { affinity?: { podAntiAffinity?: { requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions: { key: string, operator: string, values?: string[] }[] }, topologyKey: string }[] } }, config?: { jvm?: { G1HeapRegionSize?: { [k: string]: any }, concGCThreads?: number, extraFlags?: any[], initialRAMPercentage?: number, initiatingHeapOccupancyPercent?: number, maxCachedBufferSize?: number, maxDirectMemorySize?: { [k: string]: any }, maxGcPauseMillis?: number, maxRAMPercentage?: number, minRAMPercentage?: number, parallelGCThreads?: number, permSize?: string, reservedCodeCacheSize?: string }, logLevel?: string, taskMaxWorkerThreads?: number, taskMinDrivers?: number }, nodeSelector?: { [k: string]: any }, replicas?: number, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }, terminationGracePeriodSeconds?: number, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[] } } }
      hive?: { spec: { annotations?: { [k: string]: any }, config?: { aws?: { accessKeyID?: string, createSecret?: boolean, secretAccessKey?: string, secretName?: string }, azure?: { createSecret?: boolean, secretAccessKey?: string, secretName?: string, storageAccountName?: string }, gcs?: { secretName?: string, createSecret?: boolean, serviceAccountKeyJSON?: string }, s3Compatible?: { secretName?: string, createSecret?: boolean, accessKeyID?: string, secretAccessKey?: string, endpoint?: string }, db?: { autoCreateMetastoreSchema?: boolean, driver?: string, enableMetastoreSchemaVerification?: boolean, password?: string, url?: string, username?: string }, defaultCompression?: string, defaultFileFormat?: string, hadoopConfigSecretName?: string, metastoreClientSocketTimeout?: string, metastoreWarehouseDir?: string, sharedVolume?: { claimName?: string, createPVC?: boolean, enabled?: boolean, mountPath?: string, size?: string, storageClass?: string }, useHadoopConfig?: boolean }, image?: { pullPolicy?: string, pullSecrets?: any[], repository?: string, tag?: string }, labels?: { [k: string]: any }, metastore?: { affinity?: { [k: string]: any }, config?: { auth?: { enabled?: boolean }, jvm?: { initialRAMPercentage?: number, maxRAMPercentage?: number, minRAMPercentage?: number }, logLevel?: string, tls?: { caCertificate?: string, certificate?: string, createSecret?: boolean, enabled?: boolean, key?: string, secretName?: string } }, livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, tcpSocket?: { port?: number }, timeoutSeconds?: number }, nodeSelector?: { [k: string]: any }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }, storage?: { class?: string, create?: boolean, size?: string }, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[] }, securityContext?: { fsGroup?: number, runAsGroup?: number, runAsNonRoot?: boolean, runAsUser?: number }, server?: { affinity?: { [k: string]: any }, config?: { auth?: { enabled?: boolean }, jvm?: { initialRAMPercentage?: number, maxRAMPercentage?: number, minRAMPercentage?: number }, logLevel?: string, metastoreTLS?: { caCertificate?: string, certificate?: string, createSecret?: boolean, enabled?: boolean, key?: string, secretName?: string }, tls?: { caCertificate?: string, certificate?: string, createSecret?: boolean, enabled?: boolean, key?: string, secretName?: string } }, livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, tcpSocket?: { port?: number }, timeoutSeconds?: number }, nodeSelector?: { [k: string]: any }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[] }, terminationGracePeriodSeconds?: number } }
      __ghostunnel?: { image?: { pullPolicy?: string, repository?: string, tag?: string } }
      hadoop?: { spec: { config?: { aws?: { accessKeyID?: string, createSecret?: boolean, secretAccessKey?: string, secretName?: string }, azure?: { createSecret?: boolean, secretAccessKey?: string, secretName?: string, storageAccountName?: string }, gcs?: { secretName?: string, createSecret?: boolean, serviceAccountKeyJSON?: string }, s3Compatible?: { secretName?: string, createSecret?: boolean, accessKeyID?: string, secretAccessKey?: string, endpoint?: string }, defaultFS?: string }, configSecretName?: string, hdfs?: { enabled?: boolean, config?: { datanodeDataDirPerms?: string, logLevel?: string, replicationFactor?: number }, datanode?: { affinity?: { podAntiAffinity?: { requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[] }, topologyKey?: string }[] } }, annotations?: { [k: string]: any }, config?: { jvm?: { initialRAMPercentage?: number, maxRAMPercentage?: number, minRAMPercentage?: number } }, labels?: { [k: string]: any }, nodeSelector?: { [k: string]: any }, replicas?: number, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }, storage?: { class?: string, size?: string }, terminationGracePeriodSeconds?: number, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[] }, namenode?: { affinity?: { podAntiAffinity?: { requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[] }, topologyKey?: string }[] } }, annotations?: { [k: string]: any }, config?: { jvm?: { initialRAMPercentage?: number, maxRAMPercentage?: number, minRAMPercentage?: number } }, labels?: { [k: string]: any }, nodeSelector?: { [k: string]: any }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }, storage?: { class?: string, size?: string }, terminationGracePeriodSeconds?: number, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[] }, securityContext?: { fsGroup?: number, runAsGroup?: number, runAsNonRoot?: boolean, runAsUser?: number } }, image?: { pullPolicy?: string, pullSecrets?: string, repository?: string, tag?: string } } }
    }
    /**
     * An instance of Metering with high-level configuration
     */
    export class MeteringConfig extends KubernetesResource implements IMeteringConfig {
      spec: io_openshift_metering.v1.MeteringConfigSpec
      metadata: meta.v1.ObjectMeta
      /**
       * An instance of Metering with high-level configuration
       */
      constructor (properties: IMeteringConfig) {
        super({ apiVersion: 'metering.openshift.io/v1', kind: 'MeteringConfig' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IMeteringConfig {
      /** MeteringConfig spec. */
      spec: io_openshift_metering.v1.MeteringConfigSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * PrestoTable spec.
     */
    export interface PrestoTableSpec {
      /** Unmanaged indicates whether a PrestoTable resource is referencing an existing table,
and if set to true, the operator should not attempt to create or manage that table within Presto.
 */
      unmanaged: boolean
      /** Catalog specifies which catalog the Presto table is to be created within.
In many cases, the catalog will be set to "hive".
More info: https://prestosql.io/docs/current/overview/concepts.html#catalog
 */
      catalog: string
      /** The schema within the Presto catalog for the table to created in,
or the schema the table should exist in if unmanaged.
If the catalog is `hive` then there will always be at least the `default` schema.
More info: https://prestosql.io/docs/current/overview/concepts.html#schema
 */
      schema: string
      /** TableName is the desired name of the table to be created in Presto,
or in the case where "unmanaged" is set to false, the name of an existing table within Presto.
More info: https://prestosql.io/docs/current/overview/concepts.html#table
 */
      tableName: string
      /** A list of columns that match the schema of the PrestoTable.
For each list item, you must specify a `name` field, which is the name of an individual column for the Presto table,
and a `type` field, which corresponds to a valid type in Presto.
More info: https://prestosql.io/docs/current/language/types.html
 */
      columns: { name: string, type: string }[]
      /** Properties is a map containing string key and value pairs. Each key-value pair is a table property for
configuring the table. The available properties depend on the "catalog" being used.
Note: this is an optional field.
 */
      properties?: any[]
      /** Sets a comment on the Presto table. Comments are just arbitrary strings that have no meaning to Presto,
but can be used to store arbitrary information about a table.
Note: this is an optional field.
 */
      comment?: string
      /** View controls whether the reporting-operator needs to create a view within Presto.
If true, the reporting-operator uses the "query" field as the SELECT statement for creating the view.
Note: this is an optional field.
 */
      view?: boolean
      /** CreateTableAs controls whether the reporting-operator needs to create a table within Presto.
If true, the reporting-operator uses the "query" field as the SELECT statemtnt for creating the table.
Note: this is an optional field.
 */
      createTableAs?: boolean
      /** Query is a string containing a SQL SELECT query used for creating a table or view.
Note: this is an optional field.
More info: https://prestosql.io/docs/current/overview/concepts.html#query
 */
      query?: string
    }
    /**
     * Used under-the-hood. A resource describing a source of data for usage by Report Queries.
     */
    export class PrestoTable extends KubernetesResource implements IPrestoTable {
      spec: io_openshift_metering.v1.PrestoTableSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Used under-the-hood. A resource describing a source of data for usage by Report Queries.
       */
      constructor (properties: IPrestoTable) {
        super({ apiVersion: 'metering.openshift.io/v1', kind: 'PrestoTable' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IPrestoTable {
      /** PrestoTable spec. */
      spec: io_openshift_metering.v1.PrestoTableSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * Report spec.
     */
    export interface ReportSpec {
      query: string
      reportingStart?: string
      reportingEnd?: string
      runImmediately?: boolean
      inputs?: { name: string, value: { [k: string]: any } }[]
      schedule?: { period: string, hourly?: { minute?: number, hour?: number }, daily?: { second?: number, minute?: number, hour?: number }, weekly?: { dayofWeek?: string, second?: number, minute?: number, hour?: number }, monthly?: { dayOfMonth?: number, second?: number, minute?: number, hour?: number }, cron?: { expression: string } }
    }
    /**
     * A scheduled or on-off Metering Report summarizes data based on the query specified.
     */
    export class Report extends KubernetesResource implements IReport {
      spec: io_openshift_metering.v1.ReportSpec
      metadata: meta.v1.ObjectMeta
      /**
       * A scheduled or on-off Metering Report summarizes data based on the query specified.
       */
      constructor (properties: IReport) {
        super({ apiVersion: 'metering.openshift.io/v1', kind: 'Report' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IReport {
      /** Report spec. */
      spec: io_openshift_metering.v1.ReportSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * HiveTable spec.
     */
    export interface HiveTableSpec {
      /** DatabaseName is the name of the Hive database to use.
Generally, this field should be set to "default", or the value of the "databaseName" in a Hive StorageLocation.
More info: https://github.com/operator-framework/operator-metering/blob/master/Documentation/storagelocations.md
 */
      databaseName: string
      /** TableName is the desired name of the table to be created in Hive.
 */
      tableName: string
      /** A list of columns that match the schema of the HiveTable.
For each list item, you must specify a `name` field, which is the name of an individual column for the Hive table,
and a `type` field, which corresponds to a valid type in Hive.
Note: the only complex types supported are map's of primitive types.
More info: https://cwiki.apache.org/confluence/display/Hive/LanguageManual+Types
 */
      columns: { name: string, type: string }[]
      /** A list of columns that are used as partition columns.
Columns in "partitionedBy" and "columns" must not overlap.
For each list item, you must specify both a `name` and `type` field.
Note: this is an optional field.
 */
      partitionedBy?: { name: string, type: string }[]
      /** A list of columns from "columns" to use for bucketed tables.
This field must be set if "numBuckets" is specified.
Note: this is an optional field.
More info: https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL+BucketedTables
 */
      clusteredBy?: string[]
      /** A list of column names from "columns" to use for bucketed tables.
This field must be set if "clusteredBy" and "numBuckets" are specified.
Note: this is an optional field.
More info: https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL+BucketedTables
 */
      sortedBy?: { name?: string, descending?: boolean }[]
      /** The number of buckets to create for a bucketed table.
If this field is set, then "clusteredBy" also needs to be set.
Note: this is an optional field.
More info: https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL+BucketedTables
 */
      numBuckets?: number
      /** Location specifies the HDFS path to store this Hive table.
This field can be set to any URI supported by Hive.
Currently, `sda://`, `hdfs://`, and `/local/path` are supported based URIs.
Note: this is an optional field.
 */
      location?: string
      /** RowFormat controls how Hive serializes and deserializes rows.
Note: this is an optional field.
More info: https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL#LanguageManualDDL-RowFormats&SerDe
 */
      rowFormat?: string
      /** FileFormat controls the file format used for storing files in the filesystem.
Note: this is an optional field.
More info: https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL#LanguageManualDDL-StorageFormatsStorageFormatsRowFormat,StorageFormat,andSerDe
 */
      fileFormat?: string
      /** TableProperties is an array and allows you to tag the table definition with your
own metadata key/value pairs. Some predefined properties exist to control
behavior of the table as well.
Note: this is an optional field.
More info: https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL#LanguageManualDDL-listTableProperties
 */
      tableProperties?: any[]
      /** External controls whether an external table is created, instead of a managed table.
If external is set to true, this causes Hive to point to an existing location,
as specified by the "location" field.
Note: this is an optional field.
 */
      external?: boolean
      /** ManagePartitions controls whether the reporting-operator needs to check
if the table partitions match the partitions listed in the "partitions" field.
Note: this is an optional field.
 */
      managePartitions?: boolean
      /** A list of partitions that this Hive table should contain.
Note: this is an optional field.
 */
      partitions?: { partitionSpec: any[], location: string }[]
    }
    /**
     * Used under-the-hood. A resource representing a database table in Hive.
     */
    export class HiveTable extends KubernetesResource implements IHiveTable {
      spec: io_openshift_metering.v1.HiveTableSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Used under-the-hood. A resource representing a database table in Hive.
       */
      constructor (properties: IHiveTable) {
        super({ apiVersion: 'metering.openshift.io/v1', kind: 'HiveTable' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IHiveTable {
      /** HiveTable spec. */
      spec: io_openshift_metering.v1.HiveTableSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * ReportDataSource spec.
     */
    export interface ReportDataSourceSpec {
      prometheusMetricsImporter?: { query: string, storage?: { storageLocationName: string }, prometheusConfig?: { url: string } }
      reportQueryView?: { queryName: string, inputs?: { name: string, value: { [k: string]: any } }[], storage?: { storageLocationName: string } }
      awsBilling?: { source: { bucket: string, prefix?: string, region: string } }
      prestoTable?: { tableRef: { name: string } }
    }
    /**
     * Used under-the-hood. A resource representing a database table in Presto. Used by ReportQueries to determine what tables exist, and by the HTTP API to determine how to query a table.
     */
    export class ReportDataSource extends KubernetesResource implements IReportDataSource {
      spec: io_openshift_metering.v1.ReportDataSourceSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Used under-the-hood. A resource representing a database table in Presto. Used by ReportQueries to determine what tables exist, and by the HTTP API to determine how to query a table.
       */
      constructor (properties: IReportDataSource) {
        super({ apiVersion: 'metering.openshift.io/v1', kind: 'ReportDataSource' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IReportDataSource {
      /** ReportDataSource spec. */
      spec: io_openshift_metering.v1.ReportDataSourceSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * ReportQuery spec.
     */
    export interface ReportQuerySpec {
      columns: { name: string, type: string, unit?: string, tableHidden?: boolean }[]
      inputs?: { name: string, type?: string, required?: boolean, default?: { [k: string]: any } }[]
      query: string
    }
    /**
     * A SQL query used by Metering to generate reports.
     */
    export class ReportQuery extends KubernetesResource implements IReportQuery {
      spec: io_openshift_metering.v1.ReportQuerySpec
      metadata: meta.v1.ObjectMeta
      /**
       * A SQL query used by Metering to generate reports.
       */
      constructor (properties: IReportQuery) {
        super({ apiVersion: 'metering.openshift.io/v1', kind: 'ReportQuery' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IReportQuery {
      /** ReportQuery spec. */
      spec: io_openshift_metering.v1.ReportQuerySpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
}
export namespace io_noobaa {
  export namespace v1alpha1 {
    /**
     * NooBaa spec.
     */
    export interface NooBaaSpec {
      /** CoreResources (optional) overrides the default resource requirements for the server container */
      coreResources?: { [k: string]: any }
      /** Image (optional) overrides the default image for the server container */
      image?: string
      /** ImagePullSecret (optional) sets a pull secret for the system image */
      imagePullSecret?: { [k: string]: any }
      /** MongoImage (optional) overrides the default image for the mongodb container */
      mongoImage?: string
      /** MongoResources (optional) overrides the default resource requirements for the mongodb container */
      mongoResources?: { [k: string]: any }
      /** StorageClassName (optional) overrides the default StorageClass for the PVC that the operator creates, this affects where the system stores its database which contains system config, buckets, objects meta-data and mapping file parts to storage locations. */
      storageClassName?: string
    }
    /**
     * A NooBaa system - Create this to start
     */
    export class NooBaa extends KubernetesResource implements INooBaa {
      metadata: meta.v1.ObjectMeta
      spec: io_noobaa.v1alpha1.NooBaaSpec
      /**
       * A NooBaa system - Create this to start
       */
      constructor (properties: INooBaa) {
        super({ apiVersion: 'noobaa.io/v1alpha1', kind: 'NooBaa' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface INooBaa {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** NooBaa spec. */
      spec: io_noobaa.v1alpha1.NooBaaSpec
    }
    /**
     * BackingStore spec.
     */
    export interface BackingStoreSpec {
      bucketName: string
      /** S3Options specifies client options for the backing store */
      s3Options?: { endpoint?: string, region?: string, s3ForcePathStyle?: boolean, signatureVersion?: string, sslDisabled?: boolean }
      /** Secret refers to a secret that provides the credentials */
      secret: { [k: string]: any }
      /** Type */
      type: string
    }
    /**
     * Storage target spec such as aws-s3, s3-compatible, PV's and more. Used in BacketClass to construct data placement policies.
     */
    export class BackingStore extends KubernetesResource implements IBackingStore {
      metadata: meta.v1.ObjectMeta
      spec: io_noobaa.v1alpha1.BackingStoreSpec
      /**
       * Storage target spec such as aws-s3, s3-compatible, PV's and more. Used in BacketClass to construct data placement policies.
       */
      constructor (properties: IBackingStore) {
        super({ apiVersion: 'noobaa.io/v1alpha1', kind: 'BackingStore' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IBackingStore {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** BackingStore spec. */
      spec: io_noobaa.v1alpha1.BackingStoreSpec
    }
    /**
     * BucketClass spec.
     */
    export type BucketClassSpec = any
    /**
     * Storage policy spec  tiering, mirroring, spreading. Combines BackingStores. Referenced by ObjectBucketClaims.
     */
    export class BucketClass extends KubernetesResource implements IBucketClass {
      metadata: meta.v1.ObjectMeta
      spec: io_noobaa.v1alpha1.BucketClassSpec
      /**
       * Storage policy spec  tiering, mirroring, spreading. Combines BackingStores. Referenced by ObjectBucketClaims.
       */
      constructor (properties: IBucketClass) {
        super({ apiVersion: 'noobaa.io/v1alpha1', kind: 'BucketClass' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IBucketClass {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** BucketClass spec. */
      spec: io_noobaa.v1alpha1.BucketClassSpec
    }
  }
}
export namespace org_infinispan {
  export namespace v1 {
    /**
     * An Infinispan cluster instance.
     */
    export class Infinispan extends KubernetesResource {
      /**
       * An Infinispan cluster instance.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'infinispan.org/v1', kind: 'Infinispan' }, properties))
      }
    }
  }
}
export namespace de_dentrassi_iot {
  export namespace v1alpha1 {
    /**
     * A new consumer for an existing simulator instance
     */
    export class SimulatorConsumer extends KubernetesResource {
      /**
       * A new consumer for an existing simulator instance
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'iot.dentrassi.de/v1alpha1', kind: 'SimulatorConsumer' }, properties))
      }
    }
    /**
     * A new producer for an existing simulator instance
     */
    export class SimulatorProducer extends KubernetesResource {
      /**
       * A new producer for an existing simulator instance
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'iot.dentrassi.de/v1alpha1', kind: 'SimulatorProducer' }, properties))
      }
    }
    /**
     * A new simulator instance
     */
    export class Simulator extends KubernetesResource {
      /**
       * A new simulator instance
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'iot.dentrassi.de/v1alpha1', kind: 'Simulator' }, properties))
      }
    }
  }
}
export namespace com_coreos_monitoring {
  export namespace v1 {
    /**
     * ServiceMonitor spec.
     */
    export interface ServiceMonitorSpec {
      /** A list of endpoints allowed as part of this ServiceMonitor */
      endpoints: { [k: string]: any }[]
      /** The label to use to retrieve the job name from */
      jobLabel?: string
      /** NamespaceSelector is a selector for selecting either all namespaces or a list of namespaces. */
      namespaceSelector?: { [k: string]: any }
      /** PodTargetLabels transfers labels on the Kubernetes Pod onto the target. */
      podTargetLabels?: string[]
      /** SampleLimit defines per-scrape limit on number of scraped samples that will be accepted. */
      sampleLimit?: number
      /** A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects. */
      selector: { [k: string]: any }
      /** TargetLabels transfers labels on the Kubernetes Service onto the target. */
      targetLabels?: string[]
    }
    /**
     * Configures prometheus to monitor a particular k8s service
     */
    export class ServiceMonitor extends KubernetesResource implements IServiceMonitor {
      spec: com_coreos_monitoring.v1.ServiceMonitorSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Configures prometheus to monitor a particular k8s service
       */
      constructor (properties: IServiceMonitor) {
        super({ apiVersion: 'monitoring.coreos.com/v1', kind: 'ServiceMonitor' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IServiceMonitor {
      /** ServiceMonitor spec. */
      spec: com_coreos_monitoring.v1.ServiceMonitorSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * PrometheusRule spec.
     */
    export interface PrometheusRuleSpec {
      /** Content of Prometheus rule file */
      groups?: { [k: string]: any }[]
    }
    /**
     * A Prometheus Rule configures groups of sequentially evaluated recording and alerting rules.
     */
    export class PrometheusRule extends KubernetesResource implements IPrometheusRule {
      metadata: meta.v1.ObjectMeta
      spec: com_coreos_monitoring.v1.PrometheusRuleSpec
      /**
       * A Prometheus Rule configures groups of sequentially evaluated recording and alerting rules.
       */
      constructor (properties: IPrometheusRule) {
        super({ apiVersion: 'monitoring.coreos.com/v1', kind: 'PrometheusRule' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IPrometheusRule {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** PrometheusRule spec. */
      spec: com_coreos_monitoring.v1.PrometheusRuleSpec
    }
    /**
     * Prometheus spec.
     */
    export interface PrometheusSpec {
      /** SecretKeySelector selects a key of a Secret. */
      additionalAlertManagerConfigs?: { [k: string]: any }
      /** SecretKeySelector selects a key of a Secret. */
      additionalAlertRelabelConfigs?: { [k: string]: any }
      /** SecretKeySelector selects a key of a Secret. */
      additionalScrapeConfigs?: { [k: string]: any }
      /** Affinity is a group of affinity scheduling rules. */
      affinity?: { [k: string]: any }
      /** AlertingSpec defines parameters for alerting configuration of Prometheus servers. */
      alerting?: { [k: string]: any }
      /** APIServerConfig defines a host and auth methods to access apiserver. More info: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#kubernetes_sd_config */
      apiserverConfig?: { [k: string]: any }
      /** Base image to use for a Prometheus deployment. */
      baseImage?: string
      /** ConfigMaps is a list of ConfigMaps in the same namespace as the Prometheus object, which shall be mounted into the Prometheus Pods. The ConfigMaps are mounted into /etc/prometheus/configmaps/<configmap-name>. */
      configMaps?: string[]
      /** Containers allows injecting additional containers. This is meant to allow adding an authentication proxy to a Prometheus pod. */
      containers?: { [k: string]: any }[]
      /** Enable access to prometheus web admin API. Defaults to the value of `false`. WARNING: Enabling the admin APIs enables mutating endpoints, to delete data, shutdown Prometheus, and more. Enabling this should be done with care and the user is advised to add additional authentication authorization via a proxy to ensure only clients authorized to perform these actions can do so. For more information see https://prometheus.io/docs/prometheus/latest/querying/api/#tsdb-admin-apis */
      enableAdminAPI?: boolean
      /** Interval between consecutive evaluations. */
      evaluationInterval?: string
      /** The labels to add to any time series or alerts when communicating with external systems (federation, remote storage, Alertmanager). */
      externalLabels?: { [k: string]: any }
      /** The external URL the Prometheus instances will be available under. This is necessary to generate correct URLs. This is necessary if Prometheus is not served from root of a DNS name. */
      externalUrl?: string
      /** Image if specified has precedence over baseImage, tag and sha combinations. Specifying the version is still necessary to ensure the Prometheus Operator knows what version of Prometheus is being configured. */
      image?: string
      /** An optional list of references to secrets in the same namespace to use for pulling prometheus and alertmanager images from registries see http://kubernetes.io/docs/user-guide/images#specifying-imagepullsecrets-on-a-pod */
      imagePullSecrets?: { [k: string]: any }[]
      /** ListenLocal makes the Prometheus server listen on loopback, so that it does not bind against the Pod IP. */
      listenLocal?: boolean
      /** Log format for Prometheus to be configured with. */
      logFormat?: string
      /** Log level for Prometheus to be configured with. */
      logLevel?: string
      /** Define which Nodes the Pods are scheduled on. */
      nodeSelector?: { [k: string]: any }
      /** When a Prometheus deployment is paused, no actions except for deletion will be performed on the underlying objects. */
      paused?: boolean
      /** ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create. */
      podMetadata?: { [k: string]: any }
      /** Priority class assigned to the Pods */
      priorityClassName?: string
      /** QuerySpec defines the query command line flags when starting Prometheus. */
      query?: { [k: string]: any }
      /** If specified, the remote_read spec. This is an experimental feature, it may change in any upcoming release in a breaking way. */
      remoteRead?: { [k: string]: any }[]
      /** If specified, the remote_write spec. This is an experimental feature, it may change in any upcoming release in a breaking way. */
      remoteWrite?: { [k: string]: any }[]
      /** Desired number of Pods for the cluster */
      replicas?: number
      /** Limits describes the minimum/maximum amount of compute resources required/allowed */
      resources?: { [k: string]: any }
      /** Time duration Prometheus shall retain data for. Default is '24h', and must match the regular expression `[0-9]+(ms|s|m|h|d|w|y)` (milliseconds seconds minutes hours days weeks years). */
      retention?: string
      /** The route prefix Prometheus registers HTTP handlers for. This is useful, if using ExternalURL and a proxy is rewriting HTTP routes of a request, and the actual ExternalURL is still true, but the server serves requests under a different route prefix. For example for use with `kubectl proxy`. */
      routePrefix?: string
      /** A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects. */
      ruleNamespaceSelector?: { [k: string]: any }
      /** A selector for the ConfigMaps from which to load rule files */
      ruleSelector?: { [k: string]: any }
      /** /--rules.*\ command-line arguments */
      rules?: { [k: string]: any }
      /** Interval between consecutive scrapes. */
      scrapeInterval?: string
      /** Secrets is a list of Secrets in the same namespace as the Prometheus object, which shall be mounted into the Prometheus Pods. The Secrets are mounted into /etc/prometheus/secrets/<secret-name>. */
      secrets?: string[]
      /** PodSecurityContext holds pod-level security attributes and common container settings. Some fields are also present in container.securityContext.  Field values of container.securityContext take precedence over field values of PodSecurityContext. */
      securityContext?: { [k: string]: any }
      /** The ServiceAccount to use to run the Prometheus pods */
      serviceAccountName?: string
      /** A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects. */
      serviceMonitorNamespaceSelector?: { [k: string]: any }
      /** ServiceMonitors to be selected for target discovery */
      serviceMonitorSelector?: { [k: string]: any }
      /** SHA of Prometheus container image to be deployed. Defaults to the value of `version`. Similar to a tag, but the SHA explicitly deploys an immutable container image. Version and Tag are ignored if SHA is set. */
      sha?: string
      /** StorageSpec defines the configured storage for a group Prometheus servers. If neither `emptyDir` nor `volumeClaimTemplate` is specified, then by default an [EmptyDir](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir) will be used. */
      storage?: { [k: string]: any }
      /** Tag of Prometheus container image to be deployed. Defaults to the value of `version`. Version is ignored if Tag is set. */
      tag?: string
      /** ThanosSpec defines parameters for a Prometheus server within a Thanos deployment. */
      thanos?: { [k: string]: any }
      /** If specified, the pod's tolerations. */
      tolerations?: { [k: string]: any }[]
      /** Version of Prometheus to be deployed. */
      version?: string
    }
    /**
     * A running Prometheus instance
     */
    export class Prometheus extends KubernetesResource implements IPrometheus {
      spec: com_coreos_monitoring.v1.PrometheusSpec
      metadata: meta.v1.ObjectMeta
      /**
       * A running Prometheus instance
       */
      constructor (properties: IPrometheus) {
        super({ apiVersion: 'monitoring.coreos.com/v1', kind: 'Prometheus' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IPrometheus {
      /** Prometheus spec. */
      spec: com_coreos_monitoring.v1.PrometheusSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * Alertmanager spec.
     */
    export interface AlertmanagerSpec {
      /** AdditionalPeers allows injecting a set of additional Alertmanagers to peer with to form a highly available cluster. */
      additionalPeers?: string[]
      /** Affinity is a group of affinity scheduling rules. */
      affinity?: { [k: string]: any }
      /** Base image that is used to deploy pods, without tag. */
      baseImage?: string
      /** ConfigMaps is a list of ConfigMaps in the same namespace as the Alertmanager object, which shall be mounted into the Alertmanager Pods. The ConfigMaps are mounted into /etc/alertmanager/configmaps/<configmap-name>. */
      configMaps?: string[]
      /** Containers allows injecting additional containers. This is meant to allow adding an authentication proxy to an Alertmanager pod. */
      containers?: { [k: string]: any }[]
      /** The external URL the Alertmanager instances will be available under. This is necessary to generate correct URLs. This is necessary if Alertmanager is not served from root of a DNS name. */
      externalUrl?: string
      /** Image if specified has precedence over baseImage, tag and sha combinations. Specifying the version is still necessary to ensure the Prometheus Operator knows what version of Alertmanager is being configured. */
      image?: string
      /** An optional list of references to secrets in the same namespace to use for pulling prometheus and alertmanager images from registries see http://kubernetes.io/docs/user-guide/images#specifying-imagepullsecrets-on-a-pod */
      imagePullSecrets?: { [k: string]: any }[]
      /** ListenLocal makes the Alertmanager server listen on loopback, so that it does not bind against the Pod IP. Note this is only for the Alertmanager UI, not the gossip communication. */
      listenLocal?: boolean
      /** Log level for Alertmanager to be configured with. */
      logLevel?: string
      /** Define which Nodes the Pods are scheduled on. */
      nodeSelector?: { [k: string]: any }
      /** If set to true all actions on the underlaying managed objects are not goint to be performed, except for delete actions. */
      paused?: boolean
      /** ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create. */
      podMetadata?: { [k: string]: any }
      /** Priority class assigned to the Pods */
      priorityClassName?: string
      /** Desired number of Pods for the cluster */
      replicas?: number
      /** Limits describes the minimum/maximum amount of compute resources required/allowed */
      resources?: { [k: string]: any }
      /** Time duration Alertmanager shall retain data for. Default is '120h', and must match the regular expression `[0-9]+(ms|s|m|h)` (milliseconds seconds minutes hours). */
      retention?: string
      /** The route prefix Alertmanager registers HTTP handlers for. This is useful, if using ExternalURL and a proxy is rewriting HTTP routes of a request, and the actual ExternalURL is still true, but the server serves requests under a different route prefix. For example for use with `kubectl proxy`. */
      routePrefix?: string
      /** Secrets is a list of Secrets in the same namespace as the Alertmanager object, which shall be mounted into the Alertmanager Pods. The Secrets are mounted into /etc/alertmanager/secrets/<secret-name>. */
      secrets?: string[]
      /** PodSecurityContext holds pod-level security attributes and common container settings. Some fields are also present in container.securityContext.  Field values of container.securityContext take precedence over field values of PodSecurityContext. */
      securityContext?: { [k: string]: any }
      /** ServiceAccountName is the name of the ServiceAccount to use to run the Prometheus Pods. */
      serviceAccountName?: string
      /** SHA of Alertmanager container image to be deployed. Defaults to the value of `version`. Similar to a tag, but the SHA explicitly deploys an immutable container image. Version and Tag are ignored if SHA is set. */
      sha?: string
      /** StorageSpec defines the configured storage for a group Prometheus servers. If neither `emptyDir` nor `volumeClaimTemplate` is specified, then by default an [EmptyDir](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir) will be used. */
      storage?: { [k: string]: any }
      /** Tag of Alertmanager container image to be deployed. Defaults to the value of `version`. Version is ignored if Tag is set. */
      tag?: string
      /** If specified, the pod's tolerations. */
      tolerations?: { [k: string]: any }[]
      /** Version the cluster should be on. */
      version?: string
    }
    /**
     * Configures an Alertmanager for the namespace
     */
    export class Alertmanager extends KubernetesResource implements IAlertmanager {
      spec: com_coreos_monitoring.v1.AlertmanagerSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Configures an Alertmanager for the namespace
       */
      constructor (properties: IAlertmanager) {
        super({ apiVersion: 'monitoring.coreos.com/v1', kind: 'Alertmanager' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IAlertmanager {
      /** Alertmanager spec. */
      spec: com_coreos_monitoring.v1.AlertmanagerSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
}
export namespace dev_appsody {
  export namespace v1beta1 {
    /**
     * AppsodyApplication spec.
     */
    export interface AppsodyApplicationSpec {
      /** application image to be installed */
      applicationImage: string
      architecture?: string[]
      /** horizontal pod autoscaling */
      autoscaling?: { maxReplicas?: number, minReplicas?: number, targetCPUUtilizationPercentage?: number }
      createKnativeService?: boolean
      env?: { [k: string]: any }[]
      envFrom?: { [k: string]: any }[]
      /** automatically create HTTP Route */
      expose?: boolean
      livenessProbe?: { [k: string]: any }
      /** image pull policy for container image */
      pullPolicy?: string
      pullSecret?: string
      readinessProbe?: { [k: string]: any }
      /** number of pods to create */
      replicas?: number
      /** resource requirements for cpu and memory */
      resourceConstraints?: { [k: string]: any }
      service?: { annotations?: { [k: string]: string }, port?: number, type?: string }
      serviceAccountName?: string
      /** application stack */
      stack: string
      storage?: { mountPath?: string, size?: string, volumeClaimTemplate?: { [k: string]: any } }
      volumeMounts?: { [k: string]: any }[]
      volumes?: { [k: string]: any }[]
    }
    /**
     * Describes application deployment
     */
    export class AppsodyApplication extends KubernetesResource implements IAppsodyApplication {
      metadata: meta.v1.ObjectMeta
      spec: dev_appsody.v1beta1.AppsodyApplicationSpec
      /**
       * Describes application deployment
       */
      constructor (properties: IAppsodyApplication) {
        super({ apiVersion: 'appsody.dev/v1beta1', kind: 'AppsodyApplication' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IAppsodyApplication {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** AppsodyApplication spec. */
      spec: dev_appsody.v1beta1.AppsodyApplicationSpec
    }
  }
}
export namespace org_apache_camel {
  export namespace v1alpha1 {
    /**
     * A Camel K integration kit
     */
    export class IntegrationKit extends KubernetesResource {
      /**
       * A Camel K integration kit
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'camel.apache.org/v1alpha1', kind: 'IntegrationKit' }, properties))
      }
    }
    /**
     * A Camel K integration
     */
    export class Integration extends KubernetesResource {
      /**
       * A Camel K integration
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'camel.apache.org/v1alpha1', kind: 'Integration' }, properties))
      }
    }
    /**
     * A Camel K integration platform
     */
    export class IntegrationPlatform extends KubernetesResource {
      /**
       * A Camel K integration platform
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'camel.apache.org/v1alpha1', kind: 'IntegrationPlatform' }, properties))
      }
    }
    /**
     * A Camel catalog
     */
    export class CamelCatalog extends KubernetesResource {
      /**
       * A Camel catalog
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'camel.apache.org/v1alpha1', kind: 'CamelCatalog' }, properties))
      }
    }
    export class IntegrationContext extends KubernetesResource {
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'camel.apache.org/v1alpha1', kind: 'IntegrationContext' }, properties))
      }
    }
    /**
     * A Camel K build
     */
    export class Build extends KubernetesResource {
      /**
       * A Camel K build
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'camel.apache.org/v1alpha1', kind: 'Build' }, properties))
      }
    }
  }
}
export namespace io_robin {
  export namespace v1alpha1 {
    /**
     * RobinCluster spec.
     */
    export interface RobinClusterSpec {
      /** Type of the host, valid values physical, ec2, azure, gcp */
      host_type?: string
      image_version?: string
      /** Robin Storage container image e.g, robinsys/robin-storage:5.1.1 */
      image_robin?: string
      /** Kubernetes provider, allowed values openshift */
      k8s_provider?: string
      /** Node selector to select nodes on which Robin is to be deployed */
      node_selector?: string
      /** Robin deployment mode, allowed values operatorhub */
      source?: string
      image_provisioner?: string
      storage_disks?: string
      /** Options, refer to the Robin documentation to get details about various options */
      options?: { [k: string]: any }
    }
    /**
     * Robin storage operator brings advanced data management capabilities for all apps including helm charts.
     */
    export class RobinCluster extends KubernetesResource implements IRobinCluster {
      metadata: meta.v1.ObjectMeta
      spec: io_robin.v1alpha1.RobinClusterSpec
      /**
       * Robin storage operator brings advanced data management capabilities for all apps including helm charts.
       */
      constructor (properties: IRobinCluster) {
        super({ apiVersion: 'robin.io/v1alpha1', kind: 'RobinCluster' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IRobinCluster {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** RobinCluster spec. */
      spec: io_robin.v1alpha1.RobinClusterSpec
    }
  }
}
export namespace io_strimzi_kafka {
  export namespace v1beta1 {
    /**
     * KafkaTopic spec.
     */
    export interface KafkaTopicSpec {
      /** The number of partitions */
      partitions: number
      /** The number of replicas */
      replicas: number
      config?: { [k: string]: any }
      topicName?: string
    }
    /**
     * Represents a topic inside a Kafka cluster
     */
    export class KafkaTopic extends KubernetesResource implements IKafkaTopic {
      spec: io_strimzi_kafka.v1beta1.KafkaTopicSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Represents a topic inside a Kafka cluster
       */
      constructor (properties: IKafkaTopic) {
        super({ apiVersion: 'kafka.strimzi.io/v1beta1', kind: 'KafkaTopic' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IKafkaTopic {
      /** KafkaTopic spec. */
      spec: io_strimzi_kafka.v1beta1.KafkaTopicSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * KafkaConnectS2I spec.
     */
    export interface KafkaConnectS2ISpec {
      /** The desired number of Kafka Connect nodes. */
      replicas?: number
      image?: string
      livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }
      readinessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }
      jvmOptions?: { '-XX'?: { [k: string]: any }, '-Xms'?: string, '-Xmx'?: string, gcLoggingEnabled?: boolean }
      affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }
      logging?: { loggers?: { [k: string]: any }, name?: string, type: string }
      metrics?: { [k: string]: any }
      template?: { deployment?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, pod?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } }, imagePullSecrets?: { name?: string }[], securityContext?: { fsGroup?: number, runAsGroup?: number, runAsNonRoot?: boolean, runAsUser?: number, seLinuxOptions?: { level?: string, role?: string, type?: string, user?: string }, supplementalGroups?: number[], sysctls?: { name?: string, value?: string }[] }, terminationGracePeriodSeconds?: number, affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }, priorityClassName?: string, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[] }, apiService?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, podDisruptionBudget?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } }, maxUnavailable?: number } }
      authentication?: { certificateAndKey?: { certificate: string, key: string, secretName: string }, passwordSecret?: { password: string, secretName: string }, type: string, username?: string }
      /** The address of the bootstrap server */
      bootstrapServers: string
      config?: { [k: string]: any }
      externalConfiguration?: { env?: { name: string, valueFrom: { configMapKeyRef?: { key?: string, name?: string, optional?: boolean }, secretKeyRef?: { key?: string, name?: string, optional?: boolean } } }[], volumes?: { configMap?: { defaultMode?: number, items?: { key?: string, mode?: number, path?: string }[], name?: string, optional?: boolean }, name: string, secret?: { defaultMode?: number, items?: { key?: string, mode?: number, path?: string }[], optional?: boolean, secretName?: string } }[] }
      insecureSourceRepository?: boolean
      /** Limits describes the minimum/maximum amount of compute resources required/allowed */
      resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }
      tls?: { trustedCertificates?: { certificate: string, secretName: string }[] }
      tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[]
      /** Kafka Connect version */
      version?: string
    }
    /**
     * Represents a Kafka Connect cluster with Source 2 Image support
     */
    export class KafkaConnectS2I extends KubernetesResource implements IKafkaConnectS2I {
      spec: io_strimzi_kafka.v1beta1.KafkaConnectS2ISpec
      metadata: meta.v1.ObjectMeta
      /**
       * Represents a Kafka Connect cluster with Source 2 Image support
       */
      constructor (properties: IKafkaConnectS2I) {
        super({ apiVersion: 'kafka.strimzi.io/v1beta1', kind: 'KafkaConnectS2I' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IKafkaConnectS2I {
      /** KafkaConnectS2I spec. */
      spec: io_strimzi_kafka.v1beta1.KafkaConnectS2ISpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * KafkaMirrorMaker spec.
     */
    export interface KafkaMirrorMakerSpec {
      /** The desired number of Kafka MirrorMaker nodes. */
      replicas: number
      image?: string
      /** Expression specifying the topics which should be mirrored */
      whitelist: string
      consumer: { numStreams?: number, offsetCommitInterval?: number, groupId: string, bootstrapServers: string, authentication?: { certificateAndKey?: { certificate: string, key: string, secretName: string }, passwordSecret?: { password: string, secretName: string }, type: string, username?: string }, config?: { [k: string]: any }, tls?: { trustedCertificates?: { certificate: string, secretName: string }[] } }
      producer: { bootstrapServers: string, abortOnSendFailure?: boolean, authentication?: { certificateAndKey?: { certificate: string, key: string, secretName: string }, passwordSecret?: { password: string, secretName: string }, type: string, username?: string }, config?: { [k: string]: any }, tls?: { trustedCertificates?: { certificate: string, secretName: string }[] } }
      /** Limits describes the minimum/maximum amount of compute resources required/allowed */
      resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }
      affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }
      tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[]
      jvmOptions?: { '-XX'?: { [k: string]: any }, '-Xms'?: string, '-Xmx'?: string, gcLoggingEnabled?: boolean }
      logging?: { loggers?: { [k: string]: any }, name?: string, type: string }
      metrics?: { [k: string]: any }
      template?: { deployment?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, pod?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } }, imagePullSecrets?: { name?: string }[], securityContext?: { fsGroup?: number, runAsGroup?: number, runAsNonRoot?: boolean, runAsUser?: number, seLinuxOptions?: { level?: string, role?: string, type?: string, user?: string }, supplementalGroups?: number[], sysctls?: { name?: string, value?: string }[] }, terminationGracePeriodSeconds?: number, affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }, priorityClassName?: string, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[] }, podDisruptionBudget?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } }, maxUnavailable?: number } }
      /** Kafka Mirror Maker version */
      version?: string
    }
    /**
     * Represents a Kafka MirrorMaker cluster
     */
    export class KafkaMirrorMaker extends KubernetesResource implements IKafkaMirrorMaker {
      spec: io_strimzi_kafka.v1beta1.KafkaMirrorMakerSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Represents a Kafka MirrorMaker cluster
       */
      constructor (properties: IKafkaMirrorMaker) {
        super({ apiVersion: 'kafka.strimzi.io/v1beta1', kind: 'KafkaMirrorMaker' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IKafkaMirrorMaker {
      /** KafkaMirrorMaker spec. */
      spec: io_strimzi_kafka.v1beta1.KafkaMirrorMakerSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * KafkaConnect spec.
     */
    export interface KafkaConnectSpec {
      /** The desired number of Kafka Connect nodes. */
      replicas?: number
      image?: string
      livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }
      readinessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }
      jvmOptions?: { '-XX'?: { [k: string]: any }, '-Xms'?: string, '-Xmx'?: string, gcLoggingEnabled?: boolean }
      affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }
      tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[]
      logging?: { loggers?: { [k: string]: any }, name?: string, type: string }
      metrics?: { [k: string]: any }
      template?: { deployment?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, pod?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } }, imagePullSecrets?: { name?: string }[], securityContext?: { fsGroup?: number, runAsGroup?: number, runAsNonRoot?: boolean, runAsUser?: number, seLinuxOptions?: { level?: string, role?: string, type?: string, user?: string }, supplementalGroups?: number[], sysctls?: { name?: string, value?: string }[] }, terminationGracePeriodSeconds?: number, affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }, priorityClassName?: string, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[] }, apiService?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, podDisruptionBudget?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } }, maxUnavailable?: number } }
      authentication?: { certificateAndKey?: { certificate: string, key: string, secretName: string }, passwordSecret?: { password: string, secretName: string }, type: string, username?: string }
      /** The address of the bootstrap server */
      bootstrapServers: string
      config?: { [k: string]: any }
      externalConfiguration?: { env?: { name: string, valueFrom: { configMapKeyRef?: { key?: string, name?: string, optional?: boolean }, secretKeyRef?: { key?: string, name?: string, optional?: boolean } } }[], volumes?: { configMap?: { defaultMode?: number, items?: { key?: string, mode?: number, path?: string }[], name?: string, optional?: boolean }, name: string, secret?: { defaultMode?: number, items?: { key?: string, mode?: number, path?: string }[], optional?: boolean, secretName?: string } }[] }
      /** Limits describes the minimum/maximum amount of compute resources required/allowed */
      resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }
      tls?: { trustedCertificates?: { certificate: string, secretName: string }[] }
      /** Kafka Connect version */
      version?: string
    }
    /**
     * Represents a Kafka Connect cluster
     */
    export class KafkaConnect extends KubernetesResource implements IKafkaConnect {
      spec: io_strimzi_kafka.v1beta1.KafkaConnectSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Represents a Kafka Connect cluster
       */
      constructor (properties: IKafkaConnect) {
        super({ apiVersion: 'kafka.strimzi.io/v1beta1', kind: 'KafkaConnect' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IKafkaConnect {
      /** KafkaConnect spec. */
      spec: io_strimzi_kafka.v1beta1.KafkaConnectSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * KafkaUser spec.
     */
    export interface KafkaUserSpec {
      authentication: { type: string }
      authorization?: { acls: { host?: string, operation: string, resource: { name?: string, patternType?: string, type: string }, type?: string }[], type: string }
    }
    /**
     * Represents a user inside a Kafka cluster
     */
    export class KafkaUser extends KubernetesResource implements IKafkaUser {
      spec: io_strimzi_kafka.v1beta1.KafkaUserSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Represents a user inside a Kafka cluster
       */
      constructor (properties: IKafkaUser) {
        super({ apiVersion: 'kafka.strimzi.io/v1beta1', kind: 'KafkaUser' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IKafkaUser {
      /** KafkaUser spec. */
      spec: io_strimzi_kafka.v1beta1.KafkaUserSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * Kafka spec.
     */
    export interface KafkaSpec {
      kafka: { replicas: number, image?: string, storage: { class?: string, deleteClaim?: boolean, id?: number, overrides?: { class?: string, broker?: number }[], selector?: { [k: string]: any }, size?: string, type: string, volumes?: { class?: string, deleteClaim?: boolean, id?: number, overrides?: { class?: string, broker?: number }[], selector?: { [k: string]: any }, size?: string, type: string }[] }, listeners: { plain?: { authentication?: { type: string }, networkPolicyPeers?: { ipBlock?: { cidr?: string, except?: string[] }, namespaceSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, podSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } } }[] }, tls?: { authentication?: { type: string }, networkPolicyPeers?: { ipBlock?: { cidr?: string, except?: string[] }, namespaceSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, podSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } } }[] }, external?: { authentication?: { type: string }, configuration?: { bootstrap?: { address?: string, dnsAnnotations?: { [k: string]: any }, host: string }, brokers?: { broker?: number, advertisedHost?: string, advertisedPort?: number, host: string, dnsAnnotations?: { [k: string]: any } }[] }, networkPolicyPeers?: { ipBlock?: { cidr?: string, except?: string[] }, namespaceSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, podSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } } }[], overrides?: { bootstrap?: { address?: string, dnsAnnotations?: { [k: string]: any }, nodePort?: number }, brokers?: { broker?: number, advertisedHost?: string, advertisedPort?: number, nodePort?: number, dnsAnnotations?: { [k: string]: any } }[] }, tls?: boolean, type: string } }, authorization?: { superUsers?: string[], type: string }, config?: { [k: string]: any }, rack?: { topologyKey: string }, brokerRackInitImage?: string, affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[], livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, readinessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, jvmOptions?: { '-XX'?: { [k: string]: any }, '-Xms'?: string, '-Xmx'?: string, gcLoggingEnabled?: boolean }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }, metrics?: { [k: string]: any }, logging?: { loggers?: { [k: string]: any }, name?: string, type: string }, tlsSidecar?: { image?: string, livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, logLevel?: string, readinessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } } }, template?: { statefulset?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, pod?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } }, imagePullSecrets?: { name?: string }[], securityContext?: { fsGroup?: number, runAsGroup?: number, runAsNonRoot?: boolean, runAsUser?: number, seLinuxOptions?: { level?: string, role?: string, type?: string, user?: string }, supplementalGroups?: number[], sysctls?: { name?: string, value?: string }[] }, terminationGracePeriodSeconds?: number, affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }, priorityClassName?: string, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[] }, bootstrapService?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, brokersService?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, externalBootstrapIngress?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, externalBootstrapRoute?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, externalBootstrapService?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, perPodIngress?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, perPodRoute?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, perPodService?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, podDisruptionBudget?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } }, maxUnavailable?: number } }, version?: string }
      zookeeper: { replicas: number, image?: string, storage: { class?: string, deleteClaim?: boolean, id?: number, overrides?: { class?: string, broker?: number }[], selector?: { [k: string]: any }, size?: string, type: string }, config?: { [k: string]: any }, affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[], livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, readinessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, jvmOptions?: { '-XX'?: { [k: string]: any }, '-Xms'?: string, '-Xmx'?: string, gcLoggingEnabled?: boolean }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }, metrics?: { [k: string]: any }, logging?: { loggers?: { [k: string]: any }, name?: string, type: string }, tlsSidecar?: { image?: string, livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, logLevel?: string, readinessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } } }, template?: { statefulset?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, pod?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } }, imagePullSecrets?: { name?: string }[], securityContext?: { fsGroup?: number, runAsGroup?: number, runAsNonRoot?: boolean, runAsUser?: number, seLinuxOptions?: { level?: string, role?: string, type?: string, user?: string }, supplementalGroups?: number[], sysctls?: { name?: string, value?: string }[] }, terminationGracePeriodSeconds?: number, affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }, priorityClassName?: string, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[] }, clientService?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, nodesService?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, podDisruptionBudget?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } }, maxUnavailable?: number } } }
      topicOperator?: { watchedNamespace?: string, image?: string, reconciliationIntervalSeconds?: number, zookeeperSessionTimeoutSeconds?: number, affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }, topicMetadataMaxAttempts?: number, tlsSidecar?: { image?: string, livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, logLevel?: string, readinessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } } }, logging?: { loggers?: { [k: string]: any }, name?: string, type: string }, jvmOptions?: { gcLoggingEnabled?: boolean }, livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, readinessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number } }
      entityOperator?: { topicOperator?: { watchedNamespace?: string, image?: string, reconciliationIntervalSeconds?: number, zookeeperSessionTimeoutSeconds?: number, livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, readinessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }, topicMetadataMaxAttempts?: number, logging?: { loggers?: { [k: string]: any }, name?: string, type: string }, jvmOptions?: { gcLoggingEnabled?: boolean } }, userOperator?: { watchedNamespace?: string, image?: string, reconciliationIntervalSeconds?: number, zookeeperSessionTimeoutSeconds?: number, livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, readinessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }, logging?: { loggers?: { [k: string]: any }, name?: string, type: string }, jvmOptions?: { gcLoggingEnabled?: boolean } }, affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[], tlsSidecar?: { image?: string, livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, logLevel?: string, readinessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }, resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } } }, template?: { deployment?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, pod?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } }, imagePullSecrets?: { name?: string }[], securityContext?: { fsGroup?: number, runAsGroup?: number, runAsNonRoot?: boolean, runAsUser?: number, seLinuxOptions?: { level?: string, role?: string, type?: string, user?: string }, supplementalGroups?: number[], sysctls?: { name?: string, value?: string }[] }, terminationGracePeriodSeconds?: number, affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }, priorityClassName?: string, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[] } } }
      clusterCa?: { generateCertificateAuthority?: boolean, validityDays?: number, renewalDays?: number, certificateExpirationPolicy?: string }
      clientsCa?: { generateCertificateAuthority?: boolean, validityDays?: number, renewalDays?: number, certificateExpirationPolicy?: string }
      maintenanceTimeWindows?: string[]
    }
    /**
     * Represents a Kafka cluster
     */
    export class Kafka extends KubernetesResource implements IKafka {
      spec: io_strimzi_kafka.v1beta1.KafkaSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Represents a Kafka cluster
       */
      constructor (properties: IKafka) {
        super({ apiVersion: 'kafka.strimzi.io/v1beta1', kind: 'Kafka' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IKafka {
      /** Kafka spec. */
      spec: io_strimzi_kafka.v1beta1.KafkaSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
  export namespace v1alpha1 {
    /**
     * KafkaBridge spec.
     */
    export interface KafkaBridgeSpec {
      /** The desired number of Kafka Bridge nodes. */
      replicas?: number
      image?: string
      /** The bootstrap address of the Kafka cluster */
      bootstrapServers: string
      tls?: { trustedCertificates?: { certificate: string, secretName: string }[] }
      authentication?: { certificateAndKey?: { certificate: string, key: string, secretName: string }, passwordSecret?: { password: string, secretName: string }, type: string, username?: string }
      /** The HTTP configuration */
      http?: { port?: number }
      consumer?: { config?: { [k: string]: any } }
      producer?: { config?: { [k: string]: any } }
      resources?: { limits?: { [k: string]: any }, requests?: { [k: string]: any } }
      jvmOptions?: { '-XX'?: { [k: string]: any }, '-Xms'?: string, '-Xmx'?: string, gcLoggingEnabled?: boolean }
      logging?: { loggers?: { [k: string]: any }, name?: string, type: string }
      metrics?: { [k: string]: any }
      livenessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }
      readinessProbe?: { failureThreshold?: number, initialDelaySeconds?: number, periodSeconds?: number, successThreshold?: number, timeoutSeconds?: number }
      template?: { deployment?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, pod?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } }, imagePullSecrets?: { name?: string }[], securityContext?: { fsGroup?: number, runAsGroup?: number, runAsNonRoot?: boolean, runAsUser?: number, seLinuxOptions?: { level?: string, role?: string, type?: string, user?: string }, supplementalGroups?: number[], sysctls?: { name?: string, value?: string }[] }, terminationGracePeriodSeconds?: number, affinity?: { nodeAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { preference?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { nodeSelectorTerms?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchFields?: { key?: string, operator?: string, values?: string[] }[] }[] } }, podAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] }, podAntiAffinity?: { preferredDuringSchedulingIgnoredDuringExecution?: { podAffinityTerm?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }, weight?: number }[], requiredDuringSchedulingIgnoredDuringExecution?: { labelSelector?: { matchExpressions?: { key?: string, operator?: string, values?: string[] }[], matchLabels?: { [k: string]: any } }, namespaces?: string[], topologyKey?: string }[] } }, priorityClassName?: string, tolerations?: { effect?: string, key?: string, operator?: string, tolerationSeconds?: number, value?: string }[] }, apiService?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } } }, podDisruptionBudget?: { metadata?: { labels?: { [k: string]: any }, annotations?: { [k: string]: any } }, maxUnavailable?: number } }
    }
    /**
     * Represents a Kafka Bridge cluster
     */
    export class KafkaBridge extends KubernetesResource implements IKafkaBridge {
      spec: io_strimzi_kafka.v1alpha1.KafkaBridgeSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Represents a Kafka Bridge cluster
       */
      constructor (properties: IKafkaBridge) {
        super({ apiVersion: 'kafka.strimzi.io/v1alpha1', kind: 'KafkaBridge' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IKafkaBridge {
      /** KafkaBridge spec. */
      spec: io_strimzi_kafka.v1alpha1.KafkaBridgeSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
}
export namespace io_rook_edgefs {
  export namespace v1beta1 {
    /**
     * Represents a EdgeFS ISGW service.
     */
    export class ISGW extends KubernetesResource {
      /**
       * Represents a EdgeFS ISGW service.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'edgefs.rook.io/v1beta1', kind: 'ISGW' }, properties))
      }
    }
    /**
     * Represents a EdgeFS ISCSI service.
     */
    export class ISCSI extends KubernetesResource {
      /**
       * Represents a EdgeFS ISCSI service.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'edgefs.rook.io/v1beta1', kind: 'ISCSI' }, properties))
      }
    }
    /**
     * Represents a EdgeFS SWIFT service.
     */
    export class SWIFT extends KubernetesResource {
      /**
       * Represents a EdgeFS SWIFT service.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'edgefs.rook.io/v1beta1', kind: 'SWIFT' }, properties))
      }
    }
    /**
     * Represents a EdgeFS NFS service.
     */
    export class NFS extends KubernetesResource {
      /**
       * Represents a EdgeFS NFS service.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'edgefs.rook.io/v1beta1', kind: 'NFS' }, properties))
      }
    }
    /**
     * Cluster spec.
     */
    export interface ClusterSpec {
      edgefsImageName?: string
      serviceAccount?: string
      dataDirHostPath?: string
      storage?: { [k: string]: any }
    }
    /**
     * Represents a EdgeFS cluster.
     */
    export class Cluster extends KubernetesResource implements ICluster {
      spec: io_rook_edgefs.v1beta1.ClusterSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Represents a EdgeFS cluster.
       */
      constructor (properties: ICluster) {
        super({ apiVersion: 'edgefs.rook.io/v1beta1', kind: 'Cluster' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface ICluster {
      /** Cluster spec. */
      spec: io_rook_edgefs.v1beta1.ClusterSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * Represents a EdgeFS S3X service.
     */
    export class S3X extends KubernetesResource {
      /**
       * Represents a EdgeFS S3X service.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'edgefs.rook.io/v1beta1', kind: 'S3X' }, properties))
      }
    }
    /**
     * Represents a EdgeFS S3 service.
     */
    export class S3 extends KubernetesResource {
      /**
       * Represents a EdgeFS S3 service.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'edgefs.rook.io/v1beta1', kind: 'S3' }, properties))
      }
    }
  }
}
export namespace io_enmasse_admin {
  export namespace v1beta1 {
    /**
     * ConsoleService spec.
     */
    export interface ConsoleServiceSpec {
      discoveryMetadataURL?: string
      certificateSecret?: { name?: string, namespace?: string }
      oauthClientSecret?: { name?: string, namespace?: string }
      ssoCookieSecret?: { name?: string, namespace?: string }
      ssoCookieDomain?: string
      /** Scope */
      scope?: string
      /** Host to use for ingress */
      host?: string
    }
    /**
     * Console Service Singleton for deploying global console.
     */
    export class ConsoleService extends KubernetesResource implements IConsoleService {
      spec: io_enmasse_admin.v1beta1.ConsoleServiceSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Console Service Singleton for deploying global console.
       */
      constructor (properties: IConsoleService) {
        super({ apiVersion: 'admin.enmasse.io/v1beta1', kind: 'ConsoleService' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IConsoleService {
      /** ConsoleService spec. */
      spec: io_enmasse_admin.v1beta1.ConsoleServiceSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * StandardInfraConfig spec.
     */
    export interface StandardInfraConfigSpec {
      version?: string
      networkPolicy?: { ingress?: any[], egress?: any[] }
      admin?: { resources?: { memory?: string }, podTemplate?: { metadata?: { labels?: { [k: string]: any } }, spec?: { affinity?: { [k: string]: any }, tolerations?: { [k: string]: any }[], priorityClassName?: string, containers?: { resources?: { [k: string]: any } }[] } } }
      broker?: { podTemplate?: { metadata?: { labels?: { [k: string]: any } }, spec?: { affinity?: { [k: string]: any }, tolerations?: any[], priorityClassName?: string, resources?: { [k: string]: any } } }, resources?: { memory?: string, storage?: string }, addressFullPolicy?: string, storageClassName?: string, updatePersistentVolumeClaim?: boolean, connectorIdleTimeout?: number, connectorWorkerThreads?: number }
      router?: { podTemplate?: { metadata?: { labels?: { [k: string]: any } }, spec?: { affinity?: { [k: string]: any }, tolerations?: any[], priorityClassName?: string, resources?: { [k: string]: any } } }, resources?: { memory?: string }, minReplicas?: number, linkCapacity?: number, idleTimeout?: number, workerThreads?: number, policy?: { maxConnections?: number, maxConnectionsPerUser?: number, maxConnectionsPerHost?: number, maxSessionsPerConnection?: number, maxSendersPerConnection?: number, maxReceiversPerConnection?: number } }
    }
    /**
     * Infrastructure configuration template for the standard address space type
     */
    export class StandardInfraConfig extends KubernetesResource implements IStandardInfraConfig {
      spec: io_enmasse_admin.v1beta1.StandardInfraConfigSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Infrastructure configuration template for the standard address space type
       */
      constructor (properties: IStandardInfraConfig) {
        super({ apiVersion: 'admin.enmasse.io/v1beta1', kind: 'StandardInfraConfig' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IStandardInfraConfig {
      /** StandardInfraConfig spec. */
      spec: io_enmasse_admin.v1beta1.StandardInfraConfigSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * AuthenticationService spec.
     */
    export interface AuthenticationServiceSpec {
      /** The type of authentication service */
      type?: string
      realm?: string
      none?: { certificateSecret?: { name?: string, namespace?: string }, image?: { name?: string, pullPolicy?: string }, resources?: { requests?: { cpu?: string, memory?: string }, limits?: { cpu?: string, memory?: string } } }
      standard?: { certificateSecret?: { name?: string, namespace?: string }, credentialsSecret?: { name?: string, namespace?: string }, initImage?: { name?: string, pullPolicy?: string }, jvmOptions?: string, image?: { name?: string, pullPolicy?: string }, deploymentName?: string, serviceName?: string, routeName?: string, storage?: { type: string, class?: string, size?: string, claimName?: string, deleteClaim?: boolean }, resources?: { requests?: { cpu?: string, memory?: string }, limits?: { cpu?: string, memory?: string } }, datasource?: { type: string, host?: string, port?: number, database?: string, credentialsSecret?: { name?: string, namespace?: string } } }
      external?: { allowOverride?: boolean, host: string, port: number, caCertSecret?: { name?: string, namespace?: string }, clientCertSecret?: { name?: string, namespace?: string } }
    }
    /**
     * Authentication service configuration available to address spaces.
     */
    export class AuthenticationService extends KubernetesResource implements IAuthenticationService {
      spec: io_enmasse_admin.v1beta1.AuthenticationServiceSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Authentication service configuration available to address spaces.
       */
      constructor (properties: IAuthenticationService) {
        super({ apiVersion: 'admin.enmasse.io/v1beta1', kind: 'AuthenticationService' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IAuthenticationService {
      /** AuthenticationService spec. */
      spec: io_enmasse_admin.v1beta1.AuthenticationServiceSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * BrokeredInfraConfig spec.
     */
    export interface BrokeredInfraConfigSpec {
      version?: string
      networkPolicy?: { ingress?: any[], egress?: any[] }
      admin?: { podTemplate?: { metadata?: { labels?: { [k: string]: any } }, spec?: { affinity?: { [k: string]: any }, tolerations?: { [k: string]: any }[], priorityClassName?: string, containers?: { resources?: { [k: string]: any } }[] } }, resources?: { memory?: string } }
      broker?: { podTemplate?: { metadata?: { labels?: { [k: string]: any } }, spec?: { affinity?: { [k: string]: any }, tolerations?: any[], priorityClassName?: string, resources?: { [k: string]: any } } }, resources?: { memory?: string, storage?: string }, addressFullPolicy?: string, storageClassName?: string, updatePersistentVolumeClaim?: boolean }
    }
    /**
     * Infrastructure configuration template for the brokered address space type
     */
    export class BrokeredInfraConfig extends KubernetesResource implements IBrokeredInfraConfig {
      spec: io_enmasse_admin.v1beta1.BrokeredInfraConfigSpec
      metadata: meta.v1.ObjectMeta
      /**
       * Infrastructure configuration template for the brokered address space type
       */
      constructor (properties: IBrokeredInfraConfig) {
        super({ apiVersion: 'admin.enmasse.io/v1beta1', kind: 'BrokeredInfraConfig' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IBrokeredInfraConfig {
      /** BrokeredInfraConfig spec. */
      spec: io_enmasse_admin.v1beta1.BrokeredInfraConfigSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
  export namespace v1beta2 {
    /**
     * AddressSpacePlan spec.
     */
    export interface AddressSpacePlanSpec {
      /** The name to be displayed in the console UI. */
      displayName?: string
      displayOrder?: number
      /** The description to be shown in the console UI. */
      shortDescription?: string
      longDescription?: string
      addressSpaceType: string
      /** The reference to the infrastructure config used by this plan. */
      infraConfigRef: string
      resourceLimits: { aggregate?: number, router?: number, broker?: number }
      addressPlans: string[]
    }
    /**
     * Plan describing the capabilities and resource limits of a given address space type
     */
    export class AddressSpacePlan extends KubernetesResource implements IAddressSpacePlan {
      spec: io_enmasse_admin.v1beta2.AddressSpacePlanSpec
      displayName?: string
      displayOrder?: number
      shortDescription?: string
      longDescription?: string
      uuid?: string
      addressSpaceType?: string
      resources?: { name: string, max: number }[]
      addressPlans?: string[]
      metadata: meta.v1.ObjectMeta
      /**
       * Plan describing the capabilities and resource limits of a given address space type
       */
      constructor (properties: IAddressSpacePlan) {
        super({ apiVersion: 'admin.enmasse.io/v1beta2', kind: 'AddressSpacePlan' })
        this.spec = properties.spec
        this.displayName = properties.displayName
        this.displayOrder = properties.displayOrder
        this.shortDescription = properties.shortDescription
        this.longDescription = properties.longDescription
        this.uuid = properties.uuid
        this.addressSpaceType = properties.addressSpaceType
        this.resources = properties.resources
        this.addressPlans = properties.addressPlans
        this.metadata = properties.metadata
      }
    }
    export interface IAddressSpacePlan {
      /** AddressSpacePlan spec. */
      spec: io_enmasse_admin.v1beta2.AddressSpacePlanSpec
      displayName?: string
      displayOrder?: number
      shortDescription?: string
      longDescription?: string
      uuid?: string
      addressSpaceType?: string
      resources?: { name: string, max: number }[]
      addressPlans?: string[]
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
    /**
     * AddressPlan spec.
     */
    export interface AddressPlanSpec {
      /** The name to be displayed in the console UI. */
      displayName?: string
      displayOrder?: number
      /** The description to be shown in the console UI. */
      shortDescription?: string
      longDescription?: string
      addressType: string
      partitions?: number
      resources: { router?: number, broker?: number }
    }
    /**
     * Plan describing the resource usage of a given address type
     */
    export class AddressPlan extends KubernetesResource implements IAddressPlan {
      spec: io_enmasse_admin.v1beta2.AddressPlanSpec
      displayName?: string
      displayOrder?: number
      shortDescription?: string
      longDescription?: string
      uuid?: string
      addressType?: string
      requiredResources?: { name: string, credit: number }[]
      metadata: meta.v1.ObjectMeta
      /**
       * Plan describing the resource usage of a given address type
       */
      constructor (properties: IAddressPlan) {
        super({ apiVersion: 'admin.enmasse.io/v1beta2', kind: 'AddressPlan' })
        this.spec = properties.spec
        this.displayName = properties.displayName
        this.displayOrder = properties.displayOrder
        this.shortDescription = properties.shortDescription
        this.longDescription = properties.longDescription
        this.uuid = properties.uuid
        this.addressType = properties.addressType
        this.requiredResources = properties.requiredResources
        this.metadata = properties.metadata
      }
    }
    export interface IAddressPlan {
      /** AddressPlan spec. */
      spec: io_enmasse_admin.v1beta2.AddressPlanSpec
      displayName?: string
      displayOrder?: number
      shortDescription?: string
      longDescription?: string
      uuid?: string
      addressType?: string
      requiredResources?: { name: string, credit: number }[]
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
}
export namespace io_enmasse_iot {
  export namespace v1alpha1 {
    /**
     * IoT Infrastructure Configuration Singleton
     */
    export class IoTConfig extends KubernetesResource {
      /**
       * IoT Infrastructure Configuration Singleton
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'iot.enmasse.io/v1alpha1', kind: 'IoTConfig' }, properties))
      }
    }
  }
}
export namespace com_redislabs_app {
  export namespace v1alpha1 {
    /**
     * Instance of a Redis Enterprise cluster
     */
    export class RedisEnterpriseCluster extends KubernetesResource {
      /**
       * Instance of a Redis Enterprise cluster
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'app.redislabs.com/v1alpha1', kind: 'RedisEnterpriseCluster' }, properties))
      }
    }
  }
}
export namespace com_dynatrace {
  export namespace v1alpha1 {
    /**
     * Dyantrace OneAgent for full-stack monitoring
     */
    export class OneAgent extends KubernetesResource {
      /**
       * Dyantrace OneAgent for full-stack monitoring
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'dynatrace.com/v1alpha1', kind: 'OneAgent' }, properties))
      }
    }
  }
}
export namespace do_zalan_acid {
  export namespace v1 {
    /**
     * Creates a PostgreSQL cluster managed by Postgres-Operator.
     */
    export class postgresql extends KubernetesResource {
      /**
       * Creates a PostgreSQL cluster managed by Postgres-Operator.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'acid.zalan.do/v1', kind: 'postgresql' }, properties))
      }
    }
    /**
     * Configuration for PostgreSQL cluster managed by Postgres-Operator.
     */
    export class OperatorConfiguration extends KubernetesResource {
      /**
       * Configuration for PostgreSQL cluster managed by Postgres-Operator.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'acid.zalan.do/v1', kind: 'OperatorConfiguration' }, properties))
      }
    }
  }
}
export namespace org_libopenstorage_core {
  export namespace v1alpha1 {
    /**
     * StorageNodeStatus spec.
     */
    export interface StorageNodeStatusSpec {
      /** Version of Portworx on the node. */
      version?: string
    }
    /**
     * Do not create Storage Node Status as it is internally created by the operator. It represents the status of a Portworx node.
     */
    export class StorageNodeStatus extends KubernetesResource implements IStorageNodeStatus {
      metadata: meta.v1.ObjectMeta
      spec: org_libopenstorage_core.v1alpha1.StorageNodeStatusSpec
      /**
       * Do not create Storage Node Status as it is internally created by the operator. It represents the status of a Portworx node.
       */
      constructor (properties: IStorageNodeStatus) {
        super({ apiVersion: 'core.libopenstorage.org/v1alpha1', kind: 'StorageNodeStatus' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IStorageNodeStatus {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** StorageNodeStatus spec. */
      spec: org_libopenstorage_core.v1alpha1.StorageNodeStatusSpec
    }
    /**
     * StorageCluster spec.
     */
    export interface StorageClusterSpec {
      /** The docker image name and version of Portworx Enterprise. */
      image?: string
      version?: string
      /** It is the pull policy for the image. Takes one of Always, Never, IfNotPresent. Defaults to Always. */
      imagePullPolicy?: string
      /** It is a reference to secret in the kube-system namespace which is used for pulling images used by this storage cluster. */
      imagePullSecret?: string
      /** CustomImageRegistry is a custom container registry server (may include repository) that will be used instead of index.docker.io to download Docker images. (Example: myregistry.net:5443 or myregistry.com/myrepository) */
      customImageRegistry?: string
      /** The secret provider that Portworx should integrate with to provider features like volume encryption, security, cloud backup and migration. */
      secretsProvider?: string
      startPort?: number
      updateStrategy?: { [k: string]: any }
      revisionHistoryLimit?: number
      placement?: { [k: string]: any }
      kvdb?: { [k: string]: any }
      storage?: { [k: string]: any }
      cloudStorage?: { [k: string]: any }
      network?: { [k: string]: any }
      stork?: { [k: string]: any }
      userInterface?: { [k: string]: any }
      env?: { [k: string]: any }
    }
    /**
     * Storage Cluster installs any Open Storage cluster like Portworx in the environment. It has all the necessary configurations to setup and update a storage cluster.
     */
    export class StorageCluster extends KubernetesResource implements IStorageCluster {
      metadata: meta.v1.ObjectMeta
      spec: org_libopenstorage_core.v1alpha1.StorageClusterSpec
      /**
       * Storage Cluster installs any Open Storage cluster like Portworx in the environment. It has all the necessary configurations to setup and update a storage cluster.
       */
      constructor (properties: IStorageCluster) {
        super({ apiVersion: 'core.libopenstorage.org/v1alpha1', kind: 'StorageCluster' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IStorageCluster {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** StorageCluster spec. */
      spec: org_libopenstorage_core.v1alpha1.StorageClusterSpec
    }
  }
}
export namespace io_radanalytics {
  export namespace v1 {
    /**
     * Server that keeps track of finished Spark jobs
     */
    export class SparkHistoryServer extends KubernetesResource {
      /**
       * Server that keeps track of finished Spark jobs
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'radanalytics.io/v1', kind: 'SparkHistoryServer' }, properties))
      }
    }
    /**
     * Apache Spark application
     */
    export class SparkApplication extends KubernetesResource {
      /**
       * Apache Spark application
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'radanalytics.io/v1', kind: 'SparkApplication' }, properties))
      }
    }
    /**
     * Apache Spark cluster
     */
    export class SparkCluster extends KubernetesResource {
      /**
       * Apache Spark cluster
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'radanalytics.io/v1', kind: 'SparkCluster' }, properties))
      }
    }
  }
}
export namespace che_eclipse_org {
  export namespace v1 {
    /**
     * Eclipse Che cluster with DB and Auth Server
     */
    export class CheCluster extends KubernetesResource {
      /**
       * Eclipse Che cluster with DB and Auth Server
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'org.eclipse.che/v1', kind: 'CheCluster' }, properties))
      }
    }
  }
}
export namespace io_banzaicloud_banzaicloud {
  export namespace v1alpha1 {
    /**
     * KafkaCluster spec.
     */
    export interface KafkaClusterSpec {
      /** RackAwarenessEnabled bool            `json:"rackAwarenessEnabled,omitempty"` */
      brokerConfigs: { config?: string, id: number, image?: string, nodeAffinity?: { [k: string]: any }, storageConfigs: { mountPath: string, pvcSpec: { [k: string]: any } }[] }[]
      listenersConfig: { externalListeners?: { containerPort: number, externalStartingPort: number, name: string, type: string }[], internalListeners: { containerPort: number, name: string, type: string, usedForInnerBrokerCommunication: boolean }[], sslSecrets?: { jksPasswordName: string, tlsSecretName: string } }
      serviceAccount: string
      zkAddresses: string[]
    }
    /**
     * Represents an Kafka cluster
     */
    export class KafkaCluster extends KubernetesResource implements IKafkaCluster {
      metadata: meta.v1.ObjectMeta
      spec: io_banzaicloud_banzaicloud.v1alpha1.KafkaClusterSpec
      /**
       * Represents an Kafka cluster
       */
      constructor (properties: IKafkaCluster) {
        super({ apiVersion: 'banzaicloud.banzaicloud.io/v1alpha1', kind: 'KafkaCluster' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IKafkaCluster {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** KafkaCluster spec. */
      spec: io_banzaicloud_banzaicloud.v1alpha1.KafkaClusterSpec
    }
  }
}
export namespace com_banzaicloud_vault {
  export namespace v1alpha1 {
    /**
     * Represents a cluster of Vault nodes.
     */
    export class Vault extends KubernetesResource {
      /**
       * Represents a cluster of Vault nodes.
       */
      constructor (properties: dynamic) {
        super(Object.assign({ apiVersion: 'vault.banzaicloud.com/v1alpha1', kind: 'Vault' }, properties))
      }
    }
  }
}
export namespace com_movetokube_db {
  export namespace v1alpha1 {
    /**
     * PostgresUser spec.
     */
    export interface PostgresUserSpec {
      database: string
      role: string
      secretName: string
    }
    /**
     * Represents a resource for managing external PostgreSQL user role
     */
    export class PostgresUser extends KubernetesResource implements IPostgresUser {
      metadata: meta.v1.ObjectMeta
      spec: com_movetokube_db.v1alpha1.PostgresUserSpec
      /**
       * Represents a resource for managing external PostgreSQL user role
       */
      constructor (properties: IPostgresUser) {
        super({ apiVersion: 'db.movetokube.com/v1alpha1', kind: 'PostgresUser' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IPostgresUser {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** PostgresUser spec. */
      spec: com_movetokube_db.v1alpha1.PostgresUserSpec
    }
    /**
     * Postgres spec.
     */
    export interface PostgresSpec {
      database: string
    }
    /**
     * Represents a resource for managing external PostgreSQL database and associated group role
     */
    export class Postgres extends KubernetesResource implements IPostgres {
      metadata: meta.v1.ObjectMeta
      spec: com_movetokube_db.v1alpha1.PostgresSpec
      /**
       * Represents a resource for managing external PostgreSQL database and associated group role
       */
      constructor (properties: IPostgres) {
        super({ apiVersion: 'db.movetokube.com/v1alpha1', kind: 'Postgres' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IPostgres {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Postgres spec. */
      spec: com_movetokube_db.v1alpha1.PostgresSpec
    }
  }
}
export namespace com_ibm_cloud_databases_couchdb {
  export namespace v1 {
    /**
     * RecipeTemplate spec.
     */
    export type RecipeTemplateSpec = any
    /**
     * Internal recipe template for CouchDB. Used internally by the Operator for Apache CouchDB.
     */
    export class RecipeTemplate extends KubernetesResource implements IRecipeTemplate {
      metadata: meta.v1.ObjectMeta
      spec: com_ibm_cloud_databases_couchdb.v1.RecipeTemplateSpec
      /**
       * Internal recipe template for CouchDB. Used internally by the Operator for Apache CouchDB.
       */
      constructor (properties: IRecipeTemplate) {
        super({ apiVersion: 'couchdb.databases.cloud.ibm.com/v1', kind: 'RecipeTemplate' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IRecipeTemplate {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** RecipeTemplate spec. */
      spec: com_ibm_cloud_databases_couchdb.v1.RecipeTemplateSpec
    }
    /**
     * Formation spec.
     */
    export type FormationSpec = any
    /**
     * Internal representation of a CouchDB Cluster. Used internally by the Operator for Apache CouchDB.
     */
    export class Formation extends KubernetesResource implements IFormation {
      metadata: meta.v1.ObjectMeta
      spec: com_ibm_cloud_databases_couchdb.v1.FormationSpec
      /**
       * Internal representation of a CouchDB Cluster. Used internally by the Operator for Apache CouchDB.
       */
      constructor (properties: IFormation) {
        super({ apiVersion: 'couchdb.databases.cloud.ibm.com/v1', kind: 'Formation' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IFormation {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Formation spec. */
      spec: com_ibm_cloud_databases_couchdb.v1.FormationSpec
    }
    /**
     * Recipe spec.
     */
    export interface RecipeSpec {
      write_lock?: { [k: string]: any }
      read_locks?: { [k: string]: any }
      lock_references?: { [k: string]: any }
    }
    /**
     * Internal recipe for CouchDB. Used internally by the Operator for Apache CouchDB.
     */
    export class Recipe extends KubernetesResource implements IRecipe {
      metadata: meta.v1.ObjectMeta
      spec: com_ibm_cloud_databases_couchdb.v1.RecipeSpec
      /**
       * Internal recipe for CouchDB. Used internally by the Operator for Apache CouchDB.
       */
      constructor (properties: IRecipe) {
        super({ apiVersion: 'couchdb.databases.cloud.ibm.com/v1', kind: 'Recipe' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IRecipe {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Recipe spec. */
      spec: com_ibm_cloud_databases_couchdb.v1.RecipeSpec
    }
    /**
     * FormationLock spec.
     */
    export type FormationLockSpec = any
    /**
     * Internal lock on a CouchDB Formation. Used internally by the Operator for Apache CouchDB.
     */
    export class FormationLock extends KubernetesResource implements IFormationLock {
      metadata: meta.v1.ObjectMeta
      spec: com_ibm_cloud_databases_couchdb.v1.FormationLockSpec
      /**
       * Internal lock on a CouchDB Formation. Used internally by the Operator for Apache CouchDB.
       */
      constructor (properties: IFormationLock) {
        super({ apiVersion: 'couchdb.databases.cloud.ibm.com/v1', kind: 'FormationLock' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IFormationLock {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** FormationLock spec. */
      spec: com_ibm_cloud_databases_couchdb.v1.FormationLockSpec
    }
    /**
     * Bucket spec.
     */
    export type BucketSpec = any
    /**
     * Internal representation of a COS Bucket. Used internally by the Operator for Apache CouchDB.
     */
    export class Bucket extends KubernetesResource implements IBucket {
      metadata: meta.v1.ObjectMeta
      spec: com_ibm_cloud_databases_couchdb.v1.BucketSpec
      /**
       * Internal representation of a COS Bucket. Used internally by the Operator for Apache CouchDB.
       */
      constructor (properties: IBucket) {
        super({ apiVersion: 'couchdb.databases.cloud.ibm.com/v1', kind: 'Bucket' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IBucket {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Bucket spec. */
      spec: com_ibm_cloud_databases_couchdb.v1.BucketSpec
    }
    /**
     * CouchDBCluster spec.
     */
    export interface CouchDBClusterSpec {
      cpu?: string
      disk?: string
      environment?: { adminPassword?: string }
      memory?: string
      /** Number of CouchDB nodes in the cluster */
      size?: number
      /** Storage class to use */
      storageClass?: string
      /** CouchDB Version to be installed */
      version: string
    }
    /**
     * Represents a deployment of an Apache CouchDB™ cluster
     */
    export class CouchDBCluster extends KubernetesResource implements ICouchDBCluster {
      metadata: meta.v1.ObjectMeta
      spec: com_ibm_cloud_databases_couchdb.v1.CouchDBClusterSpec
      /**
       * Represents a deployment of an Apache CouchDB™ cluster
       */
      constructor (properties: ICouchDBCluster) {
        super({ apiVersion: 'couchdb.databases.cloud.ibm.com/v1', kind: 'CouchDBCluster' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface ICouchDBCluster {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** CouchDBCluster spec. */
      spec: com_ibm_cloud_databases_couchdb.v1.CouchDBClusterSpec
    }
    /**
     * Backup spec.
     */
    export type BackupSpec = any
    /**
     * Internal representation of a CouchDB Backup. Used internally by the Operator for Apache CouchDB.
     */
    export class Backup extends KubernetesResource implements IBackup {
      metadata: meta.v1.ObjectMeta
      spec: com_ibm_cloud_databases_couchdb.v1.BackupSpec
      /**
       * Internal representation of a CouchDB Backup. Used internally by the Operator for Apache CouchDB.
       */
      constructor (properties: IBackup) {
        super({ apiVersion: 'couchdb.databases.cloud.ibm.com/v1', kind: 'Backup' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IBackup {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Backup spec. */
      spec: com_ibm_cloud_databases_couchdb.v1.BackupSpec
    }
  }
}
export namespace co_elastic_k8s_kibana {
  export namespace v1alpha1 {
    /**
     * Kibana spec.
     */
    export interface KibanaSpec {
      /** Config represents Kibana configuration. */
      config?: { [k: string]: any }
      /** Elasticsearch configures how Kibana connects to Elasticsearch */
      elasticsearch?: { auth?: { inline?: { password: string, username: string }, secret?: { [k: string]: any } }, certificateAuthorities?: { secretName?: string }, url: string }
      /** ElasticsearchRef references an Elasticsearch resource in the Kubernetes cluster. If the namespace is not specified, the current resource namespace will be used. */
      elasticsearchRef?: { name: string, namespace?: string }
      /** FeatureFlags are instance-specific flags that enable or disable specific experimental features */
      featureFlags?: { [k: string]: any }
      /** HTTP contains settings for HTTP. */
      http?: { service?: { metadata?: { [k: string]: any }, spec?: { [k: string]: any } }, tls?: { certificate?: { secretName?: string }, selfSignedCertificate?: { disabled?: boolean, subjectAltNames?: { dns?: string, ip?: string }[] } } }
      /** Image represents the docker image that will be used. */
      image?: string
      /** NodeCount defines how many nodes the Kibana deployment must have. */
      nodeCount?: number
      /** PodTemplate can be used to propagate configuration to Kibana pods. This allows specifying custom annotations, labels, environment variables, affinity, resources, etc. for the pods created from this NodeSpec. */
      podTemplate?: { [k: string]: any }
      /** SecureSettings reference a secret containing secure settings, to be injected into Kibana keystore on each node. Each individual key/value entry in the referenced secret is considered as an individual secure setting to be injected. The secret must exist in the same namespace as the Kibana resource. */
      secureSettings?: { secretName?: string }
      /** Version represents the version of Kibana */
      version?: string
    }
    /**
     * Kibana instance
     */
    export class Kibana extends KubernetesResource implements IKibana {
      metadata: meta.v1.ObjectMeta
      spec: co_elastic_k8s_kibana.v1alpha1.KibanaSpec
      /**
       * Kibana instance
       */
      constructor (properties: IKibana) {
        super({ apiVersion: 'kibana.k8s.elastic.co/v1alpha1', kind: 'Kibana' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IKibana {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Kibana spec. */
      spec: co_elastic_k8s_kibana.v1alpha1.KibanaSpec
    }
  }
}
export namespace co_elastic_k8s_elasticsearch {
  export namespace v1alpha1 {
    /**
     * User spec.
     */
    export interface UserSpec {
      name: string
      passwordHash: string
      userRoles: string[]
    }
    export class User extends KubernetesResource implements IUser {
      metadata: meta.v1.ObjectMeta
      spec: co_elastic_k8s_elasticsearch.v1alpha1.UserSpec
      constructor (properties: IUser) {
        super({ apiVersion: 'elasticsearch.k8s.elastic.co/v1alpha1', kind: 'User' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IUser {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** User spec. */
      spec: co_elastic_k8s_elasticsearch.v1alpha1.UserSpec
    }
    /**
     * EnterpriseLicense spec.
     */
    export interface EnterpriseLicenseSpec {
      clusterLicenses?: { expiryDateInMillis?: number, issueDateInMillis?: number, issuedTo?: string, issuer?: string, maxNodes: number, signatureRef: { [k: string]: any }, startDateInMillis?: number, type: string, uid?: string }[]
      eula: { accepted: boolean }
      expiryDateInMillis?: number
      issueDateInMillis?: number
      issuedTo?: string
      issuer?: string
      maxInstances?: number
      signatureRef?: { [k: string]: any }
      startDateInMillis?: number
      type: string
      /** UID is the license UID not the k8s API UID (!) */
      uid?: string
    }
    export class EnterpriseLicense extends KubernetesResource implements IEnterpriseLicense {
      metadata: meta.v1.ObjectMeta
      spec: co_elastic_k8s_elasticsearch.v1alpha1.EnterpriseLicenseSpec
      constructor (properties: IEnterpriseLicense) {
        super({ apiVersion: 'elasticsearch.k8s.elastic.co/v1alpha1', kind: 'EnterpriseLicense' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IEnterpriseLicense {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** EnterpriseLicense spec. */
      spec: co_elastic_k8s_elasticsearch.v1alpha1.EnterpriseLicenseSpec
    }
    /**
     * ClusterLicense spec.
     */
    export interface ClusterLicenseSpec {
      expiryDateInMillis?: number
      issueDateInMillis?: number
      issuedTo?: string
      issuer?: string
      maxNodes: number
      signatureRef: { [k: string]: any }
      startDateInMillis?: number
      type: string
      /** UID is the license UID not the k8s API UID (!) */
      uid?: string
    }
    export class ClusterLicense extends KubernetesResource implements IClusterLicense {
      metadata: meta.v1.ObjectMeta
      spec: co_elastic_k8s_elasticsearch.v1alpha1.ClusterLicenseSpec
      constructor (properties: IClusterLicense) {
        super({ apiVersion: 'elasticsearch.k8s.elastic.co/v1alpha1', kind: 'ClusterLicense' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IClusterLicense {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** ClusterLicense spec. */
      spec: co_elastic_k8s_elasticsearch.v1alpha1.ClusterLicenseSpec
    }
    /**
     * Elasticsearch spec.
     */
    export interface ElasticsearchSpec {
      /** FeatureFlags are instance-specific flags that enable or disable specific experimental features */
      featureFlags?: { [k: string]: any }
      /** HTTP contains settings for HTTP. */
      http?: { service?: { metadata?: { [k: string]: any }, spec?: { [k: string]: any } }, tls?: { certificate?: { secretName?: string }, selfSignedCertificate?: { disabled?: boolean, subjectAltNames?: { dns?: string, ip?: string }[] } } }
      /** Image represents the docker image that will be used. */
      image?: string
      /** Nodes represents a list of groups of nodes with the same configuration to be part of the cluster */
      nodes?: { config?: { [k: string]: any }, name?: string, nodeCount?: number, podTemplate?: { [k: string]: any }, volumeClaimTemplates?: { [k: string]: any }[] }[]
      /** PodDisruptionBudget allows full control of the default pod disruption budget.  The default budget selects all cluster pods and sets maxUnavailable to 1. To disable it entirely, set to the empty value (`{}` in YAML). */
      podDisruptionBudget?: { metadata?: { [k: string]: any }, spec?: { [k: string]: any } }
      /** SecureSettings reference a secret containing secure settings, to be injected into Elasticsearch keystore on each node. Each individual key/value entry in the referenced secret is considered as an individual secure setting to be injected. The secret must exist in the same namespace as the Elasticsearch resource. */
      secureSettings?: { secretName?: string }
      /** SetVMMaxMapCount indicates whether an init container should be used to ensure that the `vm.max_map_count` is set according to https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html. Setting this to true requires the kubelet to allow running privileged containers. Defaults to true if not specified. To be disabled, it must be explicitly set to false. */
      setVmMaxMapCount?: boolean
      /** UpdateStrategy specifies how updates to the cluster should be performed. */
      updateStrategy?: { changeBudget?: { maxSurge: number, maxUnavailable: number }, groups?: { selector?: { [k: string]: any } }[] }
      /** Version represents the version of the stack */
      version?: string
    }
    /**
     * Instance of an Elasticsearch cluster
     */
    export class Elasticsearch extends KubernetesResource implements IElasticsearch {
      metadata: meta.v1.ObjectMeta
      spec: co_elastic_k8s_elasticsearch.v1alpha1.ElasticsearchSpec
      /**
       * Instance of an Elasticsearch cluster
       */
      constructor (properties: IElasticsearch) {
        super({ apiVersion: 'elasticsearch.k8s.elastic.co/v1alpha1', kind: 'Elasticsearch' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IElasticsearch {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** Elasticsearch spec. */
      spec: co_elastic_k8s_elasticsearch.v1alpha1.ElasticsearchSpec
    }
    /**
     * TrustRelationship spec.
     */
    export interface TrustRelationshipSpec {
      /** CaCert contains the PEM-encoded CA certificate for the remote cluster. */
      caCert?: string
      /** TrustRestrictions contains configuration for the trust restrictions feature of Elasticsearch for this relationship */
      trustRestrictions?: { trust?: { subjectName?: string[] } }
    }
    export class TrustRelationship extends KubernetesResource implements ITrustRelationship {
      metadata: meta.v1.ObjectMeta
      spec: co_elastic_k8s_elasticsearch.v1alpha1.TrustRelationshipSpec
      constructor (properties: ITrustRelationship) {
        super({ apiVersion: 'elasticsearch.k8s.elastic.co/v1alpha1', kind: 'TrustRelationship' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface ITrustRelationship {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** TrustRelationship spec. */
      spec: co_elastic_k8s_elasticsearch.v1alpha1.TrustRelationshipSpec
    }
    /**
     * RemoteCluster spec.
     */
    export interface RemoteClusterSpec {
      remote: { [k: string]: any }
    }
    export class RemoteCluster extends KubernetesResource implements IRemoteCluster {
      metadata: meta.v1.ObjectMeta
      spec: co_elastic_k8s_elasticsearch.v1alpha1.RemoteClusterSpec
      constructor (properties: IRemoteCluster) {
        super({ apiVersion: 'elasticsearch.k8s.elastic.co/v1alpha1', kind: 'RemoteCluster' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IRemoteCluster {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** RemoteCluster spec. */
      spec: co_elastic_k8s_elasticsearch.v1alpha1.RemoteClusterSpec
    }
  }
}
export namespace co_elastic_k8s_apm {
  export namespace v1alpha1 {
    /**
     * ApmServer spec.
     */
    export interface ApmServerSpec {
      /** Config represents the APM configuration. */
      config?: { [k: string]: any }
      /** Elasticsearch configures how the APM server connects to Elasticsearch */
      elasticsearch?: { auth?: { inline?: { password: string, username: string }, secret?: { [k: string]: any } }, hosts?: string[], ssl?: { certificateAuthorities?: { secretName?: string } } }
      /** ElasticsearchRef references an Elasticsearch resource in the Kubernetes cluster. If the namespace is not specified, the current resource namespace will be used. */
      elasticsearchRef?: { name: string, namespace?: string }
      /** FeatureFlags are apm-specific flags that enable or disable specific experimental features */
      featureFlags?: { [k: string]: any }
      /** HTTP contains settings for HTTP. */
      http?: { service?: { metadata?: { [k: string]: any }, spec?: { [k: string]: any } }, tls?: { certificate?: { secretName?: string }, selfSignedCertificate?: { disabled?: boolean, subjectAltNames?: { dns?: string, ip?: string }[] } } }
      /** Image represents the docker image that will be used. */
      image?: string
      /** NodeCount defines how many nodes the Apm Server deployment must have. */
      nodeCount?: number
      /** PodTemplate can be used to propagate configuration to APM Server pods. This allows specifying custom annotations, labels, environment variables, affinity, resources, etc. for the pods created from this NodeSpec. */
      podTemplate?: { [k: string]: any }
      /** SecureSettings reference a secret containing secure settings, to be injected into the APM keystore on each node. Each individual key/value entry in the referenced secret is considered as an individual secure setting to be injected. The secret must exist in the same namespace as the APM resource. */
      secureSettings?: { secretName?: string }
      /** Version represents the version of the APM Server */
      version?: string
    }
    /**
     * APM server instance
     */
    export class ApmServer extends KubernetesResource implements IApmServer {
      metadata: meta.v1.ObjectMeta
      spec: co_elastic_k8s_apm.v1alpha1.ApmServerSpec
      /**
       * APM server instance
       */
      constructor (properties: IApmServer) {
        super({ apiVersion: 'apm.k8s.elastic.co/v1alpha1', kind: 'ApmServer' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IApmServer {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      /** ApmServer spec. */
      spec: co_elastic_k8s_apm.v1alpha1.ApmServerSpec
    }
  }
}
export namespace io_atlasmap {
  export namespace v1alpha1 {
    /**
     * AtlasMap spec.
     */
    export interface AtlasMapSpec {
      /** Desired number of AtlasMap Pods for the cluster */
      replicas?: number
      image?: string
      routeHostName?: string
      requestCPU?: string
      requestMemory?: string
      limitCPU?: string
      limitMemory?: string
    }
    /**
     * A running AtlasMap instance
     */
    export class AtlasMap extends KubernetesResource implements IAtlasMap {
      spec: io_atlasmap.v1alpha1.AtlasMapSpec
      metadata: meta.v1.ObjectMeta
      /**
       * A running AtlasMap instance
       */
      constructor (properties: IAtlasMap) {
        super({ apiVersion: 'atlasmap.io/v1alpha1', kind: 'AtlasMap' })
        this.spec = properties.spec
        this.metadata = properties.metadata
      }
    }
    export interface IAtlasMap {
      /** AtlasMap spec. */
      spec: io_atlasmap.v1alpha1.AtlasMapSpec
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
    }
  }
}
