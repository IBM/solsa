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

import * as solsa from '..'
let bundle = new solsa.Bundle()
export = bundle

bundle.action = new solsa.openwhisk.Action({ name: 'echo', code: 'function main (obj) { return obj }' })
bundle.invocation = new bundle.action.Invocation({ parameters: {} })
