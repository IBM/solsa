import { Core } from './core'
import { dynamic } from './helpers'

export const admissionregistration = {
  k8s: {
    io: {
      v1: {
        MutatingWebhookConfiguration: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1","kind":"MutatingWebhookConfiguration","metadata":true}, args)
          }
        },
        MutatingWebhookConfigurationList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1","kind":"MutatingWebhookConfigurationList","metadata":true}, args)
          }
        },
        ValidatingWebhookConfiguration: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1","kind":"ValidatingWebhookConfiguration","metadata":true}, args)
          }
        },
        ValidatingWebhookConfigurationList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1","kind":"ValidatingWebhookConfigurationList","metadata":true}, args)
          }
        },
      },
      v1beta1: {
        MutatingWebhookConfiguration: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1beta1","kind":"MutatingWebhookConfiguration","metadata":true}, args)
          }
        },
        MutatingWebhookConfigurationList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1beta1","kind":"MutatingWebhookConfigurationList","metadata":true}, args)
          }
        },
        ValidatingWebhookConfiguration: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1beta1","kind":"ValidatingWebhookConfiguration","metadata":true}, args)
          }
        },
        ValidatingWebhookConfigurationList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"admissionregistration.k8s.io/v1beta1","kind":"ValidatingWebhookConfigurationList","metadata":true}, args)
          }
        },
      },
    },
  },
}

export const apps = {
  v1: {
    ControllerRevision: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"ControllerRevision","metadata":true}, args)
      }
    },
    ControllerRevisionList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"ControllerRevisionList","metadata":true}, args)
      }
    },
    DaemonSet: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"DaemonSet","metadata":true,"spec":true}, args)
      }
    },
    DaemonSetList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"DaemonSetList","metadata":true}, args)
      }
    },
    Deployment: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"Deployment","metadata":true,"spec":true}, args)
      }
    },
    DeploymentList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"DeploymentList","metadata":true}, args)
      }
    },
    ReplicaSet: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"ReplicaSet","metadata":true,"spec":true}, args)
      }
    },
    ReplicaSetList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"ReplicaSetList","metadata":true}, args)
      }
    },
    StatefulSet: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"StatefulSet","metadata":true,"spec":true}, args)
      }
    },
    StatefulSetList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1","kind":"StatefulSetList","metadata":true}, args)
      }
    },
  },
  v1beta1: {
    ControllerRevision: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"ControllerRevision","metadata":true}, args)
      }
    },
    ControllerRevisionList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"ControllerRevisionList","metadata":true}, args)
      }
    },
    Deployment: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"Deployment","metadata":true,"spec":true}, args)
      }
    },
    DeploymentList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"DeploymentList","metadata":true}, args)
      }
    },
    DeploymentRollback: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"DeploymentRollback"}, args)
      }
    },
    Scale: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"Scale","metadata":true,"spec":true}, args)
      }
    },
    StatefulSet: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"StatefulSet","metadata":true,"spec":true}, args)
      }
    },
    StatefulSetList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta1","kind":"StatefulSetList","metadata":true}, args)
      }
    },
  },
  v1beta2: {
    ControllerRevision: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"ControllerRevision","metadata":true}, args)
      }
    },
    ControllerRevisionList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"ControllerRevisionList","metadata":true}, args)
      }
    },
    DaemonSet: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"DaemonSet","metadata":true,"spec":true}, args)
      }
    },
    DaemonSetList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"DaemonSetList","metadata":true}, args)
      }
    },
    Deployment: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"Deployment","metadata":true,"spec":true}, args)
      }
    },
    DeploymentList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"DeploymentList","metadata":true}, args)
      }
    },
    ReplicaSet: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"ReplicaSet","metadata":true,"spec":true}, args)
      }
    },
    ReplicaSetList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"ReplicaSetList","metadata":true}, args)
      }
    },
    Scale: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"Scale","metadata":true,"spec":true}, args)
      }
    },
    StatefulSet: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"StatefulSet","metadata":true,"spec":true}, args)
      }
    },
    StatefulSetList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"apps/v1beta2","kind":"StatefulSetList","metadata":true}, args)
      }
    },
  },
}

export const auditregistration = {
  k8s: {
    io: {
      v1alpha1: {
        AuditSink: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"auditregistration.k8s.io/v1alpha1","kind":"AuditSink","metadata":true,"spec":true}, args)
          }
        },
        AuditSinkList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"auditregistration.k8s.io/v1alpha1","kind":"AuditSinkList","metadata":true}, args)
          }
        },
      },
    },
  },
}

export const authentication = {
  k8s: {
    io: {
      v1: {
        TokenRequest: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authentication.k8s.io/v1","kind":"TokenRequest","metadata":true,"spec":true}, args)
          }
        },
        TokenReview: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authentication.k8s.io/v1","kind":"TokenReview","metadata":true,"spec":true}, args)
          }
        },
      },
      v1beta1: {
        TokenReview: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authentication.k8s.io/v1beta1","kind":"TokenReview","metadata":true,"spec":true}, args)
          }
        },
      },
    },
  },
}

export const authorization = {
  k8s: {
    io: {
      v1: {
        LocalSubjectAccessReview: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1","kind":"LocalSubjectAccessReview","metadata":true,"spec":true}, args)
          }
        },
        SelfSubjectAccessReview: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1","kind":"SelfSubjectAccessReview","metadata":true,"spec":true}, args)
          }
        },
        SelfSubjectRulesReview: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1","kind":"SelfSubjectRulesReview","metadata":true,"spec":true}, args)
          }
        },
        SubjectAccessReview: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1","kind":"SubjectAccessReview","metadata":true,"spec":true}, args)
          }
        },
      },
      v1beta1: {
        LocalSubjectAccessReview: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1beta1","kind":"LocalSubjectAccessReview","metadata":true,"spec":true}, args)
          }
        },
        SelfSubjectAccessReview: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1beta1","kind":"SelfSubjectAccessReview","metadata":true,"spec":true}, args)
          }
        },
        SelfSubjectRulesReview: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1beta1","kind":"SelfSubjectRulesReview","metadata":true,"spec":true}, args)
          }
        },
        SubjectAccessReview: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"authorization.k8s.io/v1beta1","kind":"SubjectAccessReview","metadata":true,"spec":true}, args)
          }
        },
      },
    },
  },
}

export const autoscaling = {
  v1: {
    HorizontalPodAutoscaler: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v1","kind":"HorizontalPodAutoscaler","metadata":true,"spec":true}, args)
      }
    },
    HorizontalPodAutoscalerList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v1","kind":"HorizontalPodAutoscalerList","metadata":true}, args)
      }
    },
    Scale: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v1","kind":"Scale","metadata":true,"spec":true}, args)
      }
    },
  },
  v2beta1: {
    HorizontalPodAutoscaler: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v2beta1","kind":"HorizontalPodAutoscaler","metadata":true,"spec":true}, args)
      }
    },
    HorizontalPodAutoscalerList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v2beta1","kind":"HorizontalPodAutoscalerList","metadata":true}, args)
      }
    },
  },
  v2beta2: {
    HorizontalPodAutoscaler: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v2beta2","kind":"HorizontalPodAutoscaler","metadata":true,"spec":true}, args)
      }
    },
    HorizontalPodAutoscalerList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"autoscaling/v2beta2","kind":"HorizontalPodAutoscalerList","metadata":true}, args)
      }
    },
  },
}

export const batch = {
  v1: {
    Job: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"batch/v1","kind":"Job","metadata":true,"spec":true}, args)
      }
    },
    JobList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"batch/v1","kind":"JobList","metadata":true}, args)
      }
    },
  },
  v1beta1: {
    CronJob: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"batch/v1beta1","kind":"CronJob","metadata":true,"spec":true}, args)
      }
    },
    CronJobList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"batch/v1beta1","kind":"CronJobList","metadata":true}, args)
      }
    },
  },
  v2alpha1: {
    CronJob: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"batch/v2alpha1","kind":"CronJob","metadata":true,"spec":true}, args)
      }
    },
    CronJobList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"batch/v2alpha1","kind":"CronJobList","metadata":true}, args)
      }
    },
  },
}

export const certificates = {
  k8s: {
    io: {
      v1beta1: {
        CertificateSigningRequest: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"certificates.k8s.io/v1beta1","kind":"CertificateSigningRequest","metadata":true,"spec":true}, args)
          }
        },
        CertificateSigningRequestList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"certificates.k8s.io/v1beta1","kind":"CertificateSigningRequestList","metadata":true}, args)
          }
        },
      },
    },
  },
}

export const coordination = {
  k8s: {
    io: {
      v1: {
        Lease: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"coordination.k8s.io/v1","kind":"Lease","metadata":true,"spec":true}, args)
          }
        },
        LeaseList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"coordination.k8s.io/v1","kind":"LeaseList","metadata":true}, args)
          }
        },
      },
      v1beta1: {
        Lease: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"coordination.k8s.io/v1beta1","kind":"Lease","metadata":true,"spec":true}, args)
          }
        },
        LeaseList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"coordination.k8s.io/v1beta1","kind":"LeaseList","metadata":true}, args)
          }
        },
      },
    },
  },
}

export const v1 = {
  Binding: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Binding","metadata":true}, args)
    }
  },
  ComponentStatus: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ComponentStatus","metadata":true}, args)
    }
  },
  ComponentStatusList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ComponentStatusList","metadata":true}, args)
    }
  },
  ConfigMap: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ConfigMap","metadata":true}, args)
    }
  },
  ConfigMapList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ConfigMapList","metadata":true}, args)
    }
  },
  Endpoints: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Endpoints","metadata":true}, args)
    }
  },
  EndpointsList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"EndpointsList","metadata":true}, args)
    }
  },
  Event: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Event","metadata":true}, args)
    }
  },
  EventList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"EventList","metadata":true}, args)
    }
  },
  LimitRange: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"LimitRange","metadata":true,"spec":true}, args)
    }
  },
  LimitRangeList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"LimitRangeList","metadata":true}, args)
    }
  },
  Namespace: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Namespace","metadata":true,"spec":true}, args)
    }
  },
  NamespaceList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"NamespaceList","metadata":true}, args)
    }
  },
  Node: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Node","metadata":true,"spec":true}, args)
    }
  },
  NodeList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"NodeList","metadata":true}, args)
    }
  },
  PersistentVolume: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PersistentVolume","metadata":true,"spec":true}, args)
    }
  },
  PersistentVolumeClaim: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PersistentVolumeClaim","metadata":true,"spec":true}, args)
    }
  },
  PersistentVolumeClaimList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PersistentVolumeClaimList","metadata":true}, args)
    }
  },
  PersistentVolumeList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PersistentVolumeList","metadata":true}, args)
    }
  },
  Pod: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Pod","metadata":true,"spec":true}, args)
    }
  },
  PodList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PodList","metadata":true}, args)
    }
  },
  PodTemplate: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PodTemplate","metadata":true}, args)
    }
  },
  PodTemplateList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"PodTemplateList","metadata":true}, args)
    }
  },
  ReplicationController: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ReplicationController","metadata":true,"spec":true}, args)
    }
  },
  ReplicationControllerList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ReplicationControllerList","metadata":true}, args)
    }
  },
  ResourceQuota: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ResourceQuota","metadata":true,"spec":true}, args)
    }
  },
  ResourceQuotaList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ResourceQuotaList","metadata":true}, args)
    }
  },
  Secret: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Secret","metadata":true}, args)
    }
  },
  SecretList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"SecretList","metadata":true}, args)
    }
  },
  Service: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Service","metadata":true,"spec":true}, args)
    }
  },
  ServiceAccount: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ServiceAccount","metadata":true}, args)
    }
  },
  ServiceAccountList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ServiceAccountList","metadata":true}, args)
    }
  },
  ServiceList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"ServiceList","metadata":true}, args)
    }
  },
  APIGroup: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"APIGroup"}, args)
    }
  },
  APIGroupList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"APIGroupList"}, args)
    }
  },
  APIResourceList: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"APIResourceList"}, args)
    }
  },
  APIVersions: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"APIVersions"}, args)
    }
  },
  DeleteOptions: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"DeleteOptions"}, args)
    }
  },
  Status: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"Status","metadata":true}, args)
    }
  },
  WatchEvent: class extends Core {
    constructor (args: dynamic) {
      super({"apiVersion":"v1","kind":"WatchEvent"}, args)
    }
  },
}

export const events = {
  k8s: {
    io: {
      v1beta1: {
        Event: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"events.k8s.io/v1beta1","kind":"Event","metadata":true}, args)
          }
        },
        EventList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"events.k8s.io/v1beta1","kind":"EventList","metadata":true}, args)
          }
        },
      },
    },
  },
}

export const extensions = {
  v1beta1: {
    DaemonSet: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"DaemonSet","metadata":true,"spec":true}, args)
      }
    },
    DaemonSetList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"DaemonSetList","metadata":true}, args)
      }
    },
    Deployment: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"Deployment","metadata":true,"spec":true}, args)
      }
    },
    DeploymentList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"DeploymentList","metadata":true}, args)
      }
    },
    DeploymentRollback: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"DeploymentRollback"}, args)
      }
    },
    Ingress: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"Ingress","metadata":true,"spec":true}, args)
      }
    },
    IngressList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"IngressList","metadata":true}, args)
      }
    },
    NetworkPolicy: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"NetworkPolicy","metadata":true,"spec":true}, args)
      }
    },
    NetworkPolicyList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"NetworkPolicyList","metadata":true}, args)
      }
    },
    PodSecurityPolicy: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"PodSecurityPolicy","metadata":true,"spec":true}, args)
      }
    },
    PodSecurityPolicyList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"PodSecurityPolicyList","metadata":true}, args)
      }
    },
    ReplicaSet: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"ReplicaSet","metadata":true,"spec":true}, args)
      }
    },
    ReplicaSetList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"ReplicaSetList","metadata":true}, args)
      }
    },
    Scale: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"extensions/v1beta1","kind":"Scale","metadata":true,"spec":true}, args)
      }
    },
  },
}

export const networking = {
  k8s: {
    io: {
      v1: {
        NetworkPolicy: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"networking.k8s.io/v1","kind":"NetworkPolicy","metadata":true,"spec":true}, args)
          }
        },
        NetworkPolicyList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"networking.k8s.io/v1","kind":"NetworkPolicyList","metadata":true}, args)
          }
        },
      },
      v1beta1: {
        Ingress: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"networking.k8s.io/v1beta1","kind":"Ingress","metadata":true,"spec":true}, args)
          }
        },
        IngressList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"networking.k8s.io/v1beta1","kind":"IngressList","metadata":true}, args)
          }
        },
      },
    },
  },
}

export const node = {
  k8s: {
    io: {
      v1alpha1: {
        RuntimeClass: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"node.k8s.io/v1alpha1","kind":"RuntimeClass","metadata":true,"spec":true}, args)
          }
        },
        RuntimeClassList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"node.k8s.io/v1alpha1","kind":"RuntimeClassList","metadata":true}, args)
          }
        },
      },
      v1beta1: {
        RuntimeClass: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"node.k8s.io/v1beta1","kind":"RuntimeClass","metadata":true}, args)
          }
        },
        RuntimeClassList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"node.k8s.io/v1beta1","kind":"RuntimeClassList","metadata":true}, args)
          }
        },
      },
    },
  },
}

export const policy = {
  v1beta1: {
    Eviction: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"policy/v1beta1","kind":"Eviction","metadata":true}, args)
      }
    },
    PodDisruptionBudget: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"policy/v1beta1","kind":"PodDisruptionBudget","metadata":true,"spec":true}, args)
      }
    },
    PodDisruptionBudgetList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"policy/v1beta1","kind":"PodDisruptionBudgetList","metadata":true}, args)
      }
    },
    PodSecurityPolicy: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"policy/v1beta1","kind":"PodSecurityPolicy","metadata":true,"spec":true}, args)
      }
    },
    PodSecurityPolicyList: class extends Core {
      constructor (args: dynamic) {
        super({"apiVersion":"policy/v1beta1","kind":"PodSecurityPolicyList","metadata":true}, args)
      }
    },
  },
}

export const rbac = {
  authorization: {
    k8s: {
      io: {
        v1: {
          ClusterRole: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"ClusterRole","metadata":true}, args)
            }
          },
          ClusterRoleBinding: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"ClusterRoleBinding","metadata":true}, args)
            }
          },
          ClusterRoleBindingList: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"ClusterRoleBindingList","metadata":true}, args)
            }
          },
          ClusterRoleList: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"ClusterRoleList","metadata":true}, args)
            }
          },
          Role: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":true}, args)
            }
          },
          RoleBinding: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"RoleBinding","metadata":true}, args)
            }
          },
          RoleBindingList: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"RoleBindingList","metadata":true}, args)
            }
          },
          RoleList: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1","kind":"RoleList","metadata":true}, args)
            }
          },
        },
        v1alpha1: {
          ClusterRole: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"ClusterRole","metadata":true}, args)
            }
          },
          ClusterRoleBinding: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"ClusterRoleBinding","metadata":true}, args)
            }
          },
          ClusterRoleBindingList: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"ClusterRoleBindingList","metadata":true}, args)
            }
          },
          ClusterRoleList: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"ClusterRoleList","metadata":true}, args)
            }
          },
          Role: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"Role","metadata":true}, args)
            }
          },
          RoleBinding: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"RoleBinding","metadata":true}, args)
            }
          },
          RoleBindingList: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"RoleBindingList","metadata":true}, args)
            }
          },
          RoleList: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1alpha1","kind":"RoleList","metadata":true}, args)
            }
          },
        },
        v1beta1: {
          ClusterRole: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"ClusterRole","metadata":true}, args)
            }
          },
          ClusterRoleBinding: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"ClusterRoleBinding","metadata":true}, args)
            }
          },
          ClusterRoleBindingList: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"ClusterRoleBindingList","metadata":true}, args)
            }
          },
          ClusterRoleList: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"ClusterRoleList","metadata":true}, args)
            }
          },
          Role: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"Role","metadata":true}, args)
            }
          },
          RoleBinding: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"RoleBinding","metadata":true}, args)
            }
          },
          RoleBindingList: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"RoleBindingList","metadata":true}, args)
            }
          },
          RoleList: class extends Core {
            constructor (args: dynamic) {
              super({"apiVersion":"rbac.authorization.k8s.io/v1beta1","kind":"RoleList","metadata":true}, args)
            }
          },
        },
      },
    },
  },
}

export const scheduling = {
  k8s: {
    io: {
      v1: {
        PriorityClass: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"scheduling.k8s.io/v1","kind":"PriorityClass","metadata":true}, args)
          }
        },
        PriorityClassList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"scheduling.k8s.io/v1","kind":"PriorityClassList","metadata":true}, args)
          }
        },
      },
      v1alpha1: {
        PriorityClass: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"scheduling.k8s.io/v1alpha1","kind":"PriorityClass","metadata":true}, args)
          }
        },
        PriorityClassList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"scheduling.k8s.io/v1alpha1","kind":"PriorityClassList","metadata":true}, args)
          }
        },
      },
      v1beta1: {
        PriorityClass: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"scheduling.k8s.io/v1beta1","kind":"PriorityClass","metadata":true}, args)
          }
        },
        PriorityClassList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"scheduling.k8s.io/v1beta1","kind":"PriorityClassList","metadata":true}, args)
          }
        },
      },
    },
  },
}

export const settings = {
  k8s: {
    io: {
      v1alpha1: {
        PodPreset: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"settings.k8s.io/v1alpha1","kind":"PodPreset","metadata":true,"spec":true}, args)
          }
        },
        PodPresetList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"settings.k8s.io/v1alpha1","kind":"PodPresetList","metadata":true}, args)
          }
        },
      },
    },
  },
}

export const storage = {
  k8s: {
    io: {
      v1: {
        StorageClass: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1","kind":"StorageClass","metadata":true}, args)
          }
        },
        StorageClassList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1","kind":"StorageClassList","metadata":true}, args)
          }
        },
        VolumeAttachment: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1","kind":"VolumeAttachment","metadata":true,"spec":true}, args)
          }
        },
        VolumeAttachmentList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1","kind":"VolumeAttachmentList","metadata":true}, args)
          }
        },
      },
      v1alpha1: {
        VolumeAttachment: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1alpha1","kind":"VolumeAttachment","metadata":true,"spec":true}, args)
          }
        },
        VolumeAttachmentList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1alpha1","kind":"VolumeAttachmentList","metadata":true}, args)
          }
        },
      },
      v1beta1: {
        CSIDriver: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"CSIDriver","metadata":true,"spec":true}, args)
          }
        },
        CSIDriverList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"CSIDriverList","metadata":true}, args)
          }
        },
        CSINode: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"CSINode","metadata":true,"spec":true}, args)
          }
        },
        CSINodeList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"CSINodeList","metadata":true}, args)
          }
        },
        StorageClass: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"StorageClass","metadata":true}, args)
          }
        },
        StorageClassList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"StorageClassList","metadata":true}, args)
          }
        },
        VolumeAttachment: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"VolumeAttachment","metadata":true,"spec":true}, args)
          }
        },
        VolumeAttachmentList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"storage.k8s.io/v1beta1","kind":"VolumeAttachmentList","metadata":true}, args)
          }
        },
      },
    },
  },
}

export const apiextensions = {
  k8s: {
    io: {
      v1beta1: {
        CustomResourceDefinition: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"apiextensions.k8s.io/v1beta1","kind":"CustomResourceDefinition","metadata":true,"spec":true}, args)
          }
        },
        CustomResourceDefinitionList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"apiextensions.k8s.io/v1beta1","kind":"CustomResourceDefinitionList","metadata":true}, args)
          }
        },
      },
    },
  },
}

export const apiregistration = {
  k8s: {
    io: {
      v1: {
        APIService: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"apiregistration.k8s.io/v1","kind":"APIService","metadata":true,"spec":true}, args)
          }
        },
        APIServiceList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"apiregistration.k8s.io/v1","kind":"APIServiceList","metadata":true}, args)
          }
        },
      },
      v1beta1: {
        APIService: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"apiregistration.k8s.io/v1beta1","kind":"APIService","metadata":true,"spec":true}, args)
          }
        },
        APIServiceList: class extends Core {
          constructor (args: dynamic) {
            super({"apiVersion":"apiregistration.k8s.io/v1beta1","kind":"APIServiceList","metadata":true}, args)
          }
        },
      },
    },
  },
}

