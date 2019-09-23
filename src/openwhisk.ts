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

/* GENERATED FILE; DO NOT EDIT */

/* tslint:disable:no-unnecessary-qualifier jsdoc-format class-name */

import { KubernetesResource } from './solution'
import { core, meta, misc } from './core'
import { dynamic } from './helpers'

export namespace openwhisk {
  export namespace v1alpha1 {
    /**
     * ConfigMapKeyReference selects a ConfigMap and optionally a key from it.
     */
    export interface ConfigMapKeyReference {
      /** Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names */
      name?: string
    }
    /**
     * Function is the Schema for the functions API
     */
    export class Function extends KubernetesResource implements IFunction {
      metadata: meta.v1.ObjectMeta
      spec: openwhisk.v1alpha1.FunctionSpec
      /**
       * Function is the Schema for the functions API
       */
      constructor (properties: IFunction) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'Function' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IFunction {
      metadata: meta.v1.ObjectMeta
      spec: openwhisk.v1alpha1.FunctionSpec
    }
    /**
     * FunctionList contains a list of Function
     */
    export class FunctionList extends KubernetesResource implements IFunctionList {
      items: openwhisk.v1alpha1.Function[]
      metadata: meta.v1.ListMeta
      /**
       * FunctionList contains a list of Function
       */
      constructor (properties: IFunctionList) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'FunctionList' })
        this.items = properties.items
        this.metadata = properties.metadata
      }
    }
    export interface IFunctionList {
      items: openwhisk.v1alpha1.Function[]
      metadata: meta.v1.ListMeta
    }
    /**
     * FunctionSpec represents the specification for Function resources
     */
    export interface FunctionSpec {
      /** List of key/value annotations */
      annotations?: keyvalue.v1.KeyValue[]
      /** The inline code to deploy. */
      code?: string
      /** The location of the code to deploy. Support `http(s)` and `file` protocols. */
      codeURI?: string
      /** Reference to a secret representing where to deploy this entity Default is `seed-default-owprops` The secret must defines these fields: apihost (string) : The OpenWhisk host auth (string): the authorization key cert (string):  the client certificate (optional) insecure (bool):  Whether or not to bypass certificate checking (optional, default is false) */
      contextFrom?: core.v1.SecretEnvSource
      /** Docker image identifier (in dockerhub). More info: https://github.com/apache/incubator-openwhisk/blob/master/docs/actions-docker.md */
      docker?: string
      /** Comma separated sequence of actions. Only valid when `runtime` is `sequence` */
      functions?: string
      /** Sets the action limits. More info: https://github.com/apache/incubator-openwhisk/blob/master/docs/reference.md#system-limits */
      limits?: openwhisk.v1alpha1.Limits
      /** The name of the action entry point (function or fully-qualified method name when applicable) */
      main?: string
      /** Action name. Override metadata.name. Does not include the package name (see below) */
      name?: string
      /** Run the action as native. More info: https://github.com/apache/incubator-openwhisk/blob/master/docs/actions-docker.md#creating-native-actions */
      native?: boolean
      /** Action package name. Add it to the default package when not specified */
      package?: string
      /** List of key/value input parameters */
      parameters?: keyvalue.v1.KeyValue[]
      /** Indicates if the function is able to consume the raw contents within the body of an HTTP request. Only valid when `webExport` is `true`. More info: https://github.com/apache/incubator-openwhisk/blob/master/docs/webactions.md#raw-http-handling */
      rawHTTP?: boolean
      /** Runtime name and optional version. More info: https://github.com/apache/incubator-openwhisk/blob/master/docs/actions.md#languages-and-runtimes

Support these runtimes (not an exhaustive live):

Runtime	| image name	| Description
 -------- | --------- | ----------
 app | N/A | runs a function composition
 sequence | N/A | runs a function sequence
 nodejs | nodejsaction:latest | Latest NodeJS runtime
 nodejs:6	| nodejs6action:latest | Latest NodeJS 6 runtime
 java	| java8action:latest | Latest Java language runtime
 python:2	| python2action:latest | Latest Python 2 language runtime
 python:3	| python3action:latest | Latest Python 3 language runtime
 swift | swiftaction:latest | Latest Swift 2 language runtime
 swift:3	| swift3action:latest | Latest Swift 3 language runtime
 swift:3.1.1 | action-swift-v3.1.1:latest | Latest Swift 3.1.1 language runtime
 php:7.1 | action-php-v7.1:latest	| Latest PHP language runtime
 */
      runtime?: string
      /** Turns the function into a "web action" causing it to return HTTP content without use of an API Gateway. More info: https://github.com/apache/incubator-openwhisk/blob/master/docs/webactions.md */
      webExport?: boolean
    }
    /**
     * FunctionStatus defines the observed state of Function
     */
    export interface FunctionStatus {
      /** Last synced generation. Set by the system */
      generation: number
      message?: string
      state?: string
    }
    /**
     * Invocation is the Schema for the invocations API
     */
    export class Invocation extends KubernetesResource implements IInvocation {
      metadata: meta.v1.ObjectMeta
      spec: openwhisk.v1alpha1.InvocationSpec
      /**
       * Invocation is the Schema for the invocations API
       */
      constructor (properties: IInvocation) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'Invocation' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IInvocation {
      metadata: meta.v1.ObjectMeta
      spec: openwhisk.v1alpha1.InvocationSpec
    }
    /**
     * InvocationFinalizer defines the function to invoke when deleting the function invocation
     */
    export interface InvocationFinalizer {
      /** Function defines the name of the function to invoke (eg. `/whisk.system/utils/echo` or `myfunction`) Invokes the function in the invocation context when the name is not fully qualified */
      function: string
      /** Parameters defines the list of parameters to use for the invocation */
      parameters?: keyvalue.v1.KeyValue[]
    }
    /**
     * InvocationList contains a list of Invocation
     */
    export class InvocationList extends KubernetesResource implements IInvocationList {
      items: openwhisk.v1alpha1.Invocation[]
      metadata: meta.v1.ListMeta
      /**
       * InvocationList contains a list of Invocation
       */
      constructor (properties: IInvocationList) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'InvocationList' })
        this.items = properties.items
        this.metadata = properties.metadata
      }
    }
    export interface IInvocationList {
      items: openwhisk.v1alpha1.Invocation[]
      metadata: meta.v1.ListMeta
    }
    /**
     * InvocationSpec defines the desired state of Invocation
     */
    export interface InvocationSpec {
      /** Reference to a secret representing where to deploy this entity Default is `seed-default-owprops` The secret must defines these fields: apihost (string) : The OpenWhisk host auth (string): the authorization key cert (string):  the client certificate (optional) insecure (bool):  Whether or not to bypass certificate checking (optional, default is false) */
      contextFrom?: core.v1.SecretEnvSource
      /** Defines the function to invoke when this resource is deleted. */
      finalizer?: openwhisk.v1alpha1.InvocationFinalizer
      /** defines the name of function to invoke (eg. `/whisk.system/utils/echo` or `myfunction`) Invokes the function in the invocation context when the name is not fully qualified */
      function: string
      /** Defines the list of parameters to use for the invocation */
      parameters?: keyvalue.v1.KeyValue[]
      /** Defines where to store the invocation result. Discard the result when not specified. */
      to?: openwhisk.v1alpha1.InvocationTarget
    }
    /**
     * InvocationStatus defines the observed state of Invocation
     */
    export interface InvocationStatus {
      /** Last synced generation. Set by the system */
      generation: number
      message?: string
      state?: string
    }
    /**
     * InvocationTarget represents where to store the invocation result
     */
    export interface InvocationTarget {
      /** Selects a key of a ConfigMap. */
      configMapKeyRef?: core.v1.ConfigMapKeySelector
      /** JSONPath template selecting parts of the invocation result to store. Default is "{@.response.result}" More info: https://kubernetes.io/docs/reference/kubectl/jsonpath/ */
      projection?: string
      /** Selects a key of a secret in the invocation namespace */
      secretKeyRef?: core.v1.SecretKeySelector
    }
    /**
     * Limits is used to express function resources constraints such as memory limits or timeout
     */
    export interface Limits {
      /** The action log size. Default unit is assumed to be in megabytes (MB). */
      logSize?: number
      /** The per-Action memory. Default unit is assumed to be in megabytes (MB). */
      memory?: number
      /** The per-invocation Action timeout. Default unit is assumed to be milliseconds (ms). */
      timeout?: number
    }
    /**
     * Package is the Schema for the packages API
     */
    export class Package extends KubernetesResource implements IPackage {
      metadata: meta.v1.ObjectMeta
      spec: openwhisk.v1alpha1.PackageSpec
      /**
       * Package is the Schema for the packages API
       */
      constructor (properties: IPackage) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'Package' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IPackage {
      metadata: meta.v1.ObjectMeta
      spec: openwhisk.v1alpha1.PackageSpec
    }
    /**
     * PackageList contains a list of Package
     */
    export class PackageList extends KubernetesResource implements IPackageList {
      items: openwhisk.v1alpha1.Package[]
      metadata: meta.v1.ListMeta
      /**
       * PackageList contains a list of Package
       */
      constructor (properties: IPackageList) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'PackageList' })
        this.items = properties.items
        this.metadata = properties.metadata
      }
    }
    export interface IPackageList {
      items: openwhisk.v1alpha1.Package[]
      metadata: meta.v1.ListMeta
    }
    /**
     * PackageSpec defines the desired state of Package
     */
    export interface PackageSpec {
      /** List of key/value annotations */
      annotations?: keyvalue.v1.KeyValue[]
      /** Name of the package for which a binding should be created */
      bind?: string
      /** Reference to a secret representing where to deploy this entity Default is `seed-default-owprops` The secret must defines these fields: apihost (string) : The OpenWhisk host auth (string): the authorization key cert (string):  the client certificate (optional) insecure (bool):  Whether or not to bypass certificate checking (optional, default is false) */
      contextFrom?: core.v1.SecretEnvSource
      /** Package name. Override metadata.name. `default` is reserved. */
      name?: string
      /** List of key/value input parameters */
      parameters?: keyvalue.v1.KeyValue[]
      /** List of key/value input parameters coming from a Secret or ConfigMap When multiple sources are specified, all key/value pairs are merged into a single set of key/value pairs, from the first source to the last source Duplicates are handled by overriding the previous key/value pair. The parameters property is applied last */
      parametersFrom?: openwhisk.v1alpha1.ParametersFromSource[]
      /** Package visibility; `true` for `shared`, `false` for `private` */
      publish?: boolean
      /** indicates a cloud service resource which you want to bind to. This feature provides automatic injection of service keys into the binding parameters (for example user, password, urls) */
      service?: string
    }
    /**
     * PackageStatus defines the observed state of Package
     */
    export interface PackageStatus {
      /** Last synced generation. Set by the system */
      generation: number
      message?: string
      state?: string
    }
    /**
     * ParametersFromSource represents a source for the value of parameters
     */
    export interface ParametersFromSource {
      /** Selects a key of a ConfigMap. */
      configMapKeyRef?: openwhisk.v1alpha1.ConfigMapKeyReference
      /** Selects a key of a secret in the resource namespace */
      secretKeyRef?: openwhisk.v1alpha1.SecretKeyReference
    }
    /**
     * Rule is the Schema for the rules API
     */
    export class Rule extends KubernetesResource implements IRule {
      metadata: meta.v1.ObjectMeta
      spec: openwhisk.v1alpha1.RuleSpec
      /**
       * Rule is the Schema for the rules API
       */
      constructor (properties: IRule) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'Rule' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface IRule {
      metadata: meta.v1.ObjectMeta
      spec: openwhisk.v1alpha1.RuleSpec
    }
    /**
     * RuleList contains a list of Rule
     */
    export class RuleList extends KubernetesResource implements IRuleList {
      items: openwhisk.v1alpha1.Rule[]
      metadata: meta.v1.ListMeta
      /**
       * RuleList contains a list of Rule
       */
      constructor (properties: IRuleList) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'RuleList' })
        this.items = properties.items
        this.metadata = properties.metadata
      }
    }
    export interface IRuleList {
      items: openwhisk.v1alpha1.Rule[]
      metadata: meta.v1.ListMeta
    }
    /**
     * RuleSpec defines the desired state of Rule
     */
    export interface RuleSpec {
      /** Reference to a secret representing where to deploy this entity Default is `seed-default-owprops` The secret must defines these fields: apihost (string) : The OpenWhisk host auth (string): the authorization key cert (string):  the client certificate (optional) insecure (bool):  Whether or not to bypass certificate checking (optional, default is false) */
      contextFrom?: core.v1.SecretEnvSource
      /** Name of the action the rule applies to */
      function: string
      /** Rule name. Override metadata.name. */
      name?: string
      /** Name of the trigger the Rule applies to */
      trigger: string
    }
    /**
     * RuleStatus defines the observed state of Rule
     */
    export interface RuleStatus {
      /** Last synced generation. Set by the system */
      generation: number
      message?: string
      state?: string
    }
    /**
     * SecretKeyReference selects a secret and optionally a key from it.
     */
    export interface SecretKeyReference {
      /** Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names */
      name?: string
    }
    /**
     * Trigger is the Schema for the triggers API
     */
    export class Trigger extends KubernetesResource implements ITrigger {
      metadata: meta.v1.ObjectMeta
      spec: openwhisk.v1alpha1.TriggerSpec
      /**
       * Trigger is the Schema for the triggers API
       */
      constructor (properties: ITrigger) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'Trigger' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }
    }
    export interface ITrigger {
      metadata: meta.v1.ObjectMeta
      spec: openwhisk.v1alpha1.TriggerSpec
    }
    /**
     * TriggerList contains a list of Trigger
     */
    export class TriggerList extends KubernetesResource implements ITriggerList {
      items: openwhisk.v1alpha1.Trigger[]
      metadata: meta.v1.ListMeta
      /**
       * TriggerList contains a list of Trigger
       */
      constructor (properties: ITriggerList) {
        super({ apiVersion: 'ibmcloud.ibm.com/v1alpha1', kind: 'TriggerList' })
        this.items = properties.items
        this.metadata = properties.metadata
      }
    }
    export interface ITriggerList {
      items: openwhisk.v1alpha1.Trigger[]
      metadata: meta.v1.ListMeta
    }
    /**
     * TriggerSpec defines the desired state of Trigger
     */
    export interface TriggerSpec {
      /** List of key/value annotations */
      annotations?: keyvalue.v1.KeyValue[]
      /** Reference to a secret representing where to deploy this entity Default is `seed-default-owprops` The secret must defines these fields: apihost (string) : The OpenWhisk host auth (string): the authorization key cert (string):  the client certificate (optional) insecure (bool):  Whether or not to bypass certificate checking (optional, default is false) */
      contextFrom?: core.v1.SecretEnvSource
      /** Name of the feed associated with the trigger */
      feed?: string
      /** Trigger name. Override metadata.name. */
      name?: string
      /** List of key/value input parameters */
      parameters?: keyvalue.v1.KeyValue[]
    }
    /**
     * TriggerStatus defines the observed state of Trigger
     */
    export interface TriggerStatus {
      /** Last synced generation. Set by the system */
      generation: number
      message?: string
      state?: string
    }
  }
}
export namespace keyvalue {
  export namespace v1 {
    /**
     * KeyValue represents a key-value pair
     */
    export interface KeyValue {
      /** A parameter may have attributes (e.g. message hub topic might have partitions) */
      attributes?: { [k: string]: misc.runtime.RawExtension }
      /** Name representing the key. */
      name: string
      /** Defaults to null. */
      value?: misc.runtime.RawExtension
      /** Source for the value. Cannot be used if value is not empty. */
      valueFrom?: keyvalue.v1.KeyValueSource
    }
    /**
     * KeyValueSource represents a source for the value of a KeyValue.
     */
    export interface KeyValueSource {
      /** Selects a key of a ConfigMap. */
      configMapKeyRef?: core.v1.ConfigMapKeySelector
      /** Selects a key of a secret in the resource namespace */
      secretKeyRef?: core.v1.SecretKeySelector
    }
  }
}
