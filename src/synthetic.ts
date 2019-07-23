import { Core } from './core'
import { dynamic } from './helpers'

export namespace admissionregistration {
  export namespace k8s {
    export namespace io {
      export namespace v1 {
        export class MutatingWebhookConfiguration extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1","kind":"MutatingWebhookConfiguration","metadata":true}, args)
          }
        }
        export class MutatingWebhookConfigurationList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1","kind":"MutatingWebhookConfigurationList","metadata":true}, args)
          }
        }
        export class ValidatingWebhookConfiguration extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1","kind":"ValidatingWebhookConfiguration","metadata":true}, args)
          }
        }
        export class ValidatingWebhookConfigurationList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1","kind":"ValidatingWebhookConfigurationList","metadata":true}, args)
          }
        }
      }
      export namespace v1beta1 {
        export class MutatingWebhookConfiguration extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1beta1","kind":"MutatingWebhookConfiguration","metadata":true}, args)
          }
        }
        export class MutatingWebhookConfigurationList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1beta1","kind":"MutatingWebhookConfigurationList","metadata":true}, args)
          }
        }
        export class ValidatingWebhookConfiguration extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1beta1","kind":"ValidatingWebhookConfiguration","metadata":true}, args)
          }
        }
        export class ValidatingWebhookConfigurationList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1beta1","kind":"ValidatingWebhookConfigurationList","metadata":true}, args)
          }
        }
      }
    }
  }
}
export namespace apps {
  export namespace v1 {
    export class ControllerRevision extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"ControllerRevision","metadata":true}, args)
      }
    }
    export class ControllerRevisionList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"ControllerRevisionList","metadata":true}, args)
      }
    }
    export class DaemonSet extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"DaemonSet","metadata":true,"spec":true}, args)
      }
    }
    export class DaemonSetList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"DaemonSetList","metadata":true}, args)
      }
    }
    export class Deployment extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"Deployment","metadata":true,"spec":true}, args)
      }
    }
    export class DeploymentList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"DeploymentList","metadata":true}, args)
      }
    }
    export class ReplicaSet extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"ReplicaSet","metadata":true,"spec":true}, args)
      }
    }
    export class ReplicaSetList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"ReplicaSetList","metadata":true}, args)
      }
    }
    export class StatefulSet extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"StatefulSet","metadata":true,"spec":true}, args)
      }
    }
    export class StatefulSetList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"StatefulSetList","metadata":true}, args)
      }
    }
  }
  export namespace v1beta1 {
    export class ControllerRevision extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"ControllerRevision","metadata":true}, args)
      }
    }
    export class ControllerRevisionList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"ControllerRevisionList","metadata":true}, args)
      }
    }
    export class Deployment extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"Deployment","metadata":true,"spec":true}, args)
      }
    }
    export class DeploymentList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"DeploymentList","metadata":true}, args)
      }
    }
    export class DeploymentRollback extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"DeploymentRollback"}, args)
      }
    }
    export class Scale extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"Scale","metadata":true,"spec":true}, args)
      }
    }
    export class StatefulSet extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"StatefulSet","metadata":true,"spec":true}, args)
      }
    }
    export class StatefulSetList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"StatefulSetList","metadata":true}, args)
      }
    }
  }
  export namespace v1beta2 {
    export class ControllerRevision extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"ControllerRevision","metadata":true}, args)
      }
    }
    export class ControllerRevisionList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"ControllerRevisionList","metadata":true}, args)
      }
    }
    export class DaemonSet extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"DaemonSet","metadata":true,"spec":true}, args)
      }
    }
    export class DaemonSetList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"DaemonSetList","metadata":true}, args)
      }
    }
    export class Deployment extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"Deployment","metadata":true,"spec":true}, args)
      }
    }
    export class DeploymentList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"DeploymentList","metadata":true}, args)
      }
    }
    export class ReplicaSet extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"ReplicaSet","metadata":true,"spec":true}, args)
      }
    }
    export class ReplicaSetList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"ReplicaSetList","metadata":true}, args)
      }
    }
    export class Scale extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"Scale","metadata":true,"spec":true}, args)
      }
    }
    export class StatefulSet extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"StatefulSet","metadata":true,"spec":true}, args)
      }
    }
    export class StatefulSetList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"StatefulSetList","metadata":true}, args)
      }
    }
  }
}
export namespace auditregistration {
  export namespace k8s {
    export namespace io {
      export namespace v1alpha1 {
        export class AuditSink extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"auditregistration.k8s.io/v1alpha1","kind":"AuditSink","metadata":true,"spec":true}, args)
          }
        }
        export class AuditSinkList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"auditregistration.k8s.io/v1alpha1","kind":"AuditSinkList","metadata":true}, args)
          }
        }
      }
    }
  }
}
export namespace authentication {
  export namespace k8s {
    export namespace io {
      export namespace v1 {
        export class TokenRequest extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authentication.k8s.io/v1","kind":"TokenRequest","metadata":true,"spec":true}, args)
          }
        }
        export class TokenReview extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authentication.k8s.io/v1","kind":"TokenReview","metadata":true,"spec":true}, args)
          }
        }
      }
      export namespace v1beta1 {
        export class TokenReview extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authentication.k8s.io/v1beta1","kind":"TokenReview","metadata":true,"spec":true}, args)
          }
        }
      }
    }
  }
}
export namespace authorization {
  export namespace k8s {
    export namespace io {
      export namespace v1 {
        export class LocalSubjectAccessReview extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1","kind":"LocalSubjectAccessReview","metadata":true,"spec":true}, args)
          }
        }
        export class SelfSubjectAccessReview extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1","kind":"SelfSubjectAccessReview","metadata":true,"spec":true}, args)
          }
        }
        export class SelfSubjectRulesReview extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1","kind":"SelfSubjectRulesReview","metadata":true,"spec":true}, args)
          }
        }
        export class SubjectAccessReview extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1","kind":"SubjectAccessReview","metadata":true,"spec":true}, args)
          }
        }
      }
      export namespace v1beta1 {
        export class LocalSubjectAccessReview extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1beta1","kind":"LocalSubjectAccessReview","metadata":true,"spec":true}, args)
          }
        }
        export class SelfSubjectAccessReview extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1beta1","kind":"SelfSubjectAccessReview","metadata":true,"spec":true}, args)
          }
        }
        export class SelfSubjectRulesReview extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1beta1","kind":"SelfSubjectRulesReview","metadata":true,"spec":true}, args)
          }
        }
        export class SubjectAccessReview extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1beta1","kind":"SubjectAccessReview","metadata":true,"spec":true}, args)
          }
        }
      }
    }
  }
}
export namespace autoscaling {
  export namespace v1 {
    export class HorizontalPodAutoscaler extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v1","kind":"HorizontalPodAutoscaler","metadata":true,"spec":true}, args)
      }
    }
    export class HorizontalPodAutoscalerList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v1","kind":"HorizontalPodAutoscalerList","metadata":true}, args)
      }
    }
    export class Scale extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v1","kind":"Scale","metadata":true,"spec":true}, args)
      }
    }
  }
  export namespace v2beta1 {
    export class HorizontalPodAutoscaler extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v2beta1","kind":"HorizontalPodAutoscaler","metadata":true,"spec":true}, args)
      }
    }
    export class HorizontalPodAutoscalerList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v2beta1","kind":"HorizontalPodAutoscalerList","metadata":true}, args)
      }
    }
  }
  export namespace v2beta2 {
    export class HorizontalPodAutoscaler extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v2beta2","kind":"HorizontalPodAutoscaler","metadata":true,"spec":true}, args)
      }
    }
    export class HorizontalPodAutoscalerList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v2beta2","kind":"HorizontalPodAutoscalerList","metadata":true}, args)
      }
    }
  }
}
export namespace batch {
  export namespace v1 {
    export class Job extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"batch/v1","kind":"Job","metadata":true,"spec":true}, args)
      }
    }
    export class JobList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"batch/v1","kind":"JobList","metadata":true}, args)
      }
    }
  }
  export namespace v1beta1 {
    export class CronJob extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"batch/v1beta1","kind":"CronJob","metadata":true,"spec":true}, args)
      }
    }
    export class CronJobList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"batch/v1beta1","kind":"CronJobList","metadata":true}, args)
      }
    }
  }
  export namespace v2alpha1 {
    export class CronJob extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"batch/v2alpha1","kind":"CronJob","metadata":true,"spec":true}, args)
      }
    }
    export class CronJobList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"batch/v2alpha1","kind":"CronJobList","metadata":true}, args)
      }
    }
  }
}
export namespace certificates {
  export namespace k8s {
    export namespace io {
      export namespace v1beta1 {
        export class CertificateSigningRequest extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"certificates.k8s.io/v1beta1","kind":"CertificateSigningRequest","metadata":true,"spec":true}, args)
          }
        }
        export class CertificateSigningRequestList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"certificates.k8s.io/v1beta1","kind":"CertificateSigningRequestList","metadata":true}, args)
          }
        }
      }
    }
  }
}
export namespace coordination {
  export namespace k8s {
    export namespace io {
      export namespace v1 {
        export class Lease extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"coordination.k8s.io/v1","kind":"Lease","metadata":true,"spec":true}, args)
          }
        }
        export class LeaseList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"coordination.k8s.io/v1","kind":"LeaseList","metadata":true}, args)
          }
        }
      }
      export namespace v1beta1 {
        export class Lease extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"coordination.k8s.io/v1beta1","kind":"Lease","metadata":true,"spec":true}, args)
          }
        }
        export class LeaseList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"coordination.k8s.io/v1beta1","kind":"LeaseList","metadata":true}, args)
          }
        }
      }
    }
  }
}
export namespace v1 {
  export class Binding extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Binding","metadata":true}, args)
    }
  }
  export class ComponentStatus extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ComponentStatus","metadata":true}, args)
    }
  }
  export class ComponentStatusList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ComponentStatusList","metadata":true}, args)
    }
  }
  export class ConfigMap extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ConfigMap","metadata":true}, args)
    }
  }
  export class ConfigMapList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ConfigMapList","metadata":true}, args)
    }
  }
  export class Endpoints extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Endpoints","metadata":true}, args)
    }
  }
  export class EndpointsList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"EndpointsList","metadata":true}, args)
    }
  }
  export class Event extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Event","metadata":true}, args)
    }
  }
  export class EventList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"EventList","metadata":true}, args)
    }
  }
  export class LimitRange extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"LimitRange","metadata":true,"spec":true}, args)
    }
  }
  export class LimitRangeList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"LimitRangeList","metadata":true}, args)
    }
  }
  export class Namespace extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Namespace","metadata":true,"spec":true}, args)
    }
  }
  export class NamespaceList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"NamespaceList","metadata":true}, args)
    }
  }
  export class Node extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Node","metadata":true,"spec":true}, args)
    }
  }
  export class NodeList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"NodeList","metadata":true}, args)
    }
  }
  export class PersistentVolume extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PersistentVolume","metadata":true,"spec":true}, args)
    }
  }
  export class PersistentVolumeClaim extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PersistentVolumeClaim","metadata":true,"spec":true}, args)
    }
  }
  export class PersistentVolumeClaimList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PersistentVolumeClaimList","metadata":true}, args)
    }
  }
  export class PersistentVolumeList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PersistentVolumeList","metadata":true}, args)
    }
  }
  export class Pod extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Pod","metadata":true,"spec":true}, args)
    }
  }
  export class PodList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PodList","metadata":true}, args)
    }
  }
  export class PodTemplate extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PodTemplate","metadata":true}, args)
    }
  }
  export class PodTemplateList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PodTemplateList","metadata":true}, args)
    }
  }
  export class ReplicationController extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ReplicationController","metadata":true,"spec":true}, args)
    }
  }
  export class ReplicationControllerList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ReplicationControllerList","metadata":true}, args)
    }
  }
  export class ResourceQuota extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ResourceQuota","metadata":true,"spec":true}, args)
    }
  }
  export class ResourceQuotaList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ResourceQuotaList","metadata":true}, args)
    }
  }
  export class Secret extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Secret","metadata":true}, args)
    }
  }
  export class SecretList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"SecretList","metadata":true}, args)
    }
  }
  export class Service extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Service","metadata":true,"spec":true}, args)
    }
  }
  export class ServiceAccount extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ServiceAccount","metadata":true}, args)
    }
  }
  export class ServiceAccountList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ServiceAccountList","metadata":true}, args)
    }
  }
  export class ServiceList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ServiceList","metadata":true}, args)
    }
  }
  export class APIGroup extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"APIGroup"}, args)
    }
  }
  export class APIGroupList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"APIGroupList"}, args)
    }
  }
  export class APIResourceList extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"APIResourceList"}, args)
    }
  }
  export class APIVersions extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"APIVersions"}, args)
    }
  }
  export class DeleteOptions extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"DeleteOptions"}, args)
    }
  }
  export class Status extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Status","metadata":true}, args)
    }
  }
  export class WatchEvent extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"WatchEvent"}, args)
    }
  }
}
export namespace events {
  export namespace k8s {
    export namespace io {
      export namespace v1beta1 {
        export class Event extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"events.k8s.io/v1beta1","kind":"Event","metadata":true}, args)
          }
        }
        export class EventList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"events.k8s.io/v1beta1","kind":"EventList","metadata":true}, args)
          }
        }
      }
    }
  }
}
export namespace extensions {
  export namespace v1beta1 {
    export class DaemonSet extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"DaemonSet","metadata":true,"spec":true}, args)
      }
    }
    export class DaemonSetList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"DaemonSetList","metadata":true}, args)
      }
    }
    export class Deployment extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"Deployment","metadata":true,"spec":true}, args)
      }
    }
    export class DeploymentList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"DeploymentList","metadata":true}, args)
      }
    }
    export class DeploymentRollback extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"DeploymentRollback"}, args)
      }
    }
    export class Ingress extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"Ingress","metadata":true,"spec":true}, args)
      }
    }
    export class IngressList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"IngressList","metadata":true}, args)
      }
    }
    export class NetworkPolicy extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"NetworkPolicy","metadata":true,"spec":true}, args)
      }
    }
    export class NetworkPolicyList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"NetworkPolicyList","metadata":true}, args)
      }
    }
    export class PodSecurityPolicy extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"PodSecurityPolicy","metadata":true,"spec":true}, args)
      }
    }
    export class PodSecurityPolicyList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"PodSecurityPolicyList","metadata":true}, args)
      }
    }
    export class ReplicaSet extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"ReplicaSet","metadata":true,"spec":true}, args)
      }
    }
    export class ReplicaSetList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"ReplicaSetList","metadata":true}, args)
      }
    }
    export class Scale extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"Scale","metadata":true,"spec":true}, args)
      }
    }
  }
}
export namespace networking {
  export namespace k8s {
    export namespace io {
      export namespace v1 {
        export class NetworkPolicy extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"networking.k8s.io/v1","kind":"NetworkPolicy","metadata":true,"spec":true}, args)
          }
        }
        export class NetworkPolicyList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"networking.k8s.io/v1","kind":"NetworkPolicyList","metadata":true}, args)
          }
        }
      }
      export namespace v1beta1 {
        export class Ingress extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"networking.k8s.io/v1beta1","kind":"Ingress","metadata":true,"spec":true}, args)
          }
        }
        export class IngressList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"networking.k8s.io/v1beta1","kind":"IngressList","metadata":true}, args)
          }
        }
      }
    }
  }
}
export namespace node {
  export namespace k8s {
    export namespace io {
      export namespace v1alpha1 {
        export class RuntimeClass extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"node.k8s.io/v1alpha1","kind":"RuntimeClass","metadata":true,"spec":true}, args)
          }
        }
        export class RuntimeClassList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"node.k8s.io/v1alpha1","kind":"RuntimeClassList","metadata":true}, args)
          }
        }
      }
      export namespace v1beta1 {
        export class RuntimeClass extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"node.k8s.io/v1beta1","kind":"RuntimeClass","metadata":true}, args)
          }
        }
        export class RuntimeClassList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"node.k8s.io/v1beta1","kind":"RuntimeClassList","metadata":true}, args)
          }
        }
      }
    }
  }
}
export namespace policy {
  export namespace v1beta1 {
    export class Eviction extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"policy/v1beta1","kind":"Eviction","metadata":true}, args)
      }
    }
    export class PodDisruptionBudget extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"policy/v1beta1","kind":"PodDisruptionBudget","metadata":true,"spec":true}, args)
      }
    }
    export class PodDisruptionBudgetList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"policy/v1beta1","kind":"PodDisruptionBudgetList","metadata":true}, args)
      }
    }
    export class PodSecurityPolicy extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"policy/v1beta1","kind":"PodSecurityPolicy","metadata":true,"spec":true}, args)
      }
    }
    export class PodSecurityPolicyList extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"policy/v1beta1","kind":"PodSecurityPolicyList","metadata":true}, args)
      }
    }
  }
}
export namespace rbac {
  export namespace authorization {
    export namespace k8s {
      export namespace io {
        export namespace v1 {
          export class ClusterRole extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"ClusterRole","metadata":true}, args)
            }
          }
          export class ClusterRoleBinding extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"ClusterRoleBinding","metadata":true}, args)
            }
          }
          export class ClusterRoleBindingList extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"ClusterRoleBindingList","metadata":true}, args)
            }
          }
          export class ClusterRoleList extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"ClusterRoleList","metadata":true}, args)
            }
          }
          export class Role extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":true}, args)
            }
          }
          export class RoleBinding extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"RoleBinding","metadata":true}, args)
            }
          }
          export class RoleBindingList extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"RoleBindingList","metadata":true}, args)
            }
          }
          export class RoleList extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"RoleList","metadata":true}, args)
            }
          }
        }
        export namespace v1alpha1 {
          export class ClusterRole extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"ClusterRole","metadata":true}, args)
            }
          }
          export class ClusterRoleBinding extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"ClusterRoleBinding","metadata":true}, args)
            }
          }
          export class ClusterRoleBindingList extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"ClusterRoleBindingList","metadata":true}, args)
            }
          }
          export class ClusterRoleList extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"ClusterRoleList","metadata":true}, args)
            }
          }
          export class Role extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"Role","metadata":true}, args)
            }
          }
          export class RoleBinding extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"RoleBinding","metadata":true}, args)
            }
          }
          export class RoleBindingList extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"RoleBindingList","metadata":true}, args)
            }
          }
          export class RoleList extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"RoleList","metadata":true}, args)
            }
          }
        }
        export namespace v1beta1 {
          export class ClusterRole extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"ClusterRole","metadata":true}, args)
            }
          }
          export class ClusterRoleBinding extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"ClusterRoleBinding","metadata":true}, args)
            }
          }
          export class ClusterRoleBindingList extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"ClusterRoleBindingList","metadata":true}, args)
            }
          }
          export class ClusterRoleList extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"ClusterRoleList","metadata":true}, args)
            }
          }
          export class Role extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"Role","metadata":true}, args)
            }
          }
          export class RoleBinding extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"RoleBinding","metadata":true}, args)
            }
          }
          export class RoleBindingList extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"RoleBindingList","metadata":true}, args)
            }
          }
          export class RoleList extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"RoleList","metadata":true}, args)
            }
          }
        }
      }
    }
  }
}
export namespace scheduling {
  export namespace k8s {
    export namespace io {
      export namespace v1 {
        export class PriorityClass extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"scheduling.k8s.io/v1","kind":"PriorityClass","metadata":true}, args)
          }
        }
        export class PriorityClassList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"scheduling.k8s.io/v1","kind":"PriorityClassList","metadata":true}, args)
          }
        }
      }
      export namespace v1alpha1 {
        export class PriorityClass extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"scheduling.k8s.io/v1alpha1","kind":"PriorityClass","metadata":true}, args)
          }
        }
        export class PriorityClassList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"scheduling.k8s.io/v1alpha1","kind":"PriorityClassList","metadata":true}, args)
          }
        }
      }
      export namespace v1beta1 {
        export class PriorityClass extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"scheduling.k8s.io/v1beta1","kind":"PriorityClass","metadata":true}, args)
          }
        }
        export class PriorityClassList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"scheduling.k8s.io/v1beta1","kind":"PriorityClassList","metadata":true}, args)
          }
        }
      }
    }
  }
}
export namespace settings {
  export namespace k8s {
    export namespace io {
      export namespace v1alpha1 {
        export class PodPreset extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"settings.k8s.io/v1alpha1","kind":"PodPreset","metadata":true,"spec":true}, args)
          }
        }
        export class PodPresetList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"settings.k8s.io/v1alpha1","kind":"PodPresetList","metadata":true}, args)
          }
        }
      }
    }
  }
}
export namespace storage {
  export namespace k8s {
    export namespace io {
      export namespace v1 {
        export class StorageClass extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1","kind":"StorageClass","metadata":true}, args)
          }
        }
        export class StorageClassList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1","kind":"StorageClassList","metadata":true}, args)
          }
        }
        export class VolumeAttachment extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1","kind":"VolumeAttachment","metadata":true,"spec":true}, args)
          }
        }
        export class VolumeAttachmentList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1","kind":"VolumeAttachmentList","metadata":true}, args)
          }
        }
      }
      export namespace v1alpha1 {
        export class VolumeAttachment extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1alpha1","kind":"VolumeAttachment","metadata":true,"spec":true}, args)
          }
        }
        export class VolumeAttachmentList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1alpha1","kind":"VolumeAttachmentList","metadata":true}, args)
          }
        }
      }
      export namespace v1beta1 {
        export class CSIDriver extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"CSIDriver","metadata":true,"spec":true}, args)
          }
        }
        export class CSIDriverList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"CSIDriverList","metadata":true}, args)
          }
        }
        export class CSINode extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"CSINode","metadata":true,"spec":true}, args)
          }
        }
        export class CSINodeList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"CSINodeList","metadata":true}, args)
          }
        }
        export class StorageClass extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"StorageClass","metadata":true}, args)
          }
        }
        export class StorageClassList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"StorageClassList","metadata":true}, args)
          }
        }
        export class VolumeAttachment extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"VolumeAttachment","metadata":true,"spec":true}, args)
          }
        }
        export class VolumeAttachmentList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"VolumeAttachmentList","metadata":true}, args)
          }
        }
      }
    }
  }
}
export namespace apiextensions {
  export namespace k8s {
    export namespace io {
      export namespace v1beta1 {
        export class CustomResourceDefinition extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"apiextensions.k8s.io/v1beta1","kind":"CustomResourceDefinition","metadata":true,"spec":true}, args)
          }
        }
        export class CustomResourceDefinitionList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"apiextensions.k8s.io/v1beta1","kind":"CustomResourceDefinitionList","metadata":true}, args)
          }
        }
      }
    }
  }
}
export namespace apiregistration {
  export namespace k8s {
    export namespace io {
      export namespace v1 {
        export class APIService extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"apiregistration.k8s.io/v1","kind":"APIService","metadata":true,"spec":true}, args)
          }
        }
        export class APIServiceList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"apiregistration.k8s.io/v1","kind":"APIServiceList","metadata":true}, args)
          }
        }
      }
      export namespace v1beta1 {
        export class APIService extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"apiregistration.k8s.io/v1beta1","kind":"APIService","metadata":true,"spec":true}, args)
          }
        }
        export class APIServiceList extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"apiregistration.k8s.io/v1beta1","kind":"APIServiceList","metadata":true}, args)
          }
        }
      }
    }
  }
}
