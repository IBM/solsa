export type dynamic = { [k: string]: any }
export type dictionary = { [ k: string ]: string }

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

export function validate<T> (x: T | undefined) {
  if (x !== undefined) return x
  throw new Error()
}
