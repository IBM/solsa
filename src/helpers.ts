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

export type dynamic = { [k: string]: any }
export type dictionary = { [k: string]: string }

function valueWrapForEnv (val: any) {
  if (val == null) return { value: null }
  if (val.valueFrom !== undefined) return { valueFrom: val.valueFrom }
  if (val.value != null) return { value: val.value.toString() }
  return { value: val.toString() }
}

export function enumerate (env: dynamic) {
  const keys = Object.keys(env)
  return keys.length === 0 ? undefined : keys.map(key => Object.assign({ name: key }, valueWrapForEnv(env[key])))
}

export function either<T> (x: T | undefined, y: T) {
  return x !== undefined ? x : y
}
