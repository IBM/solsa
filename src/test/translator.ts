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

const solsa = require('solsa')
const bundle = new solsa.Bundle()
module.exports = bundle

bundle.translator = new solsa.LanguageTranslator({ name: 'translator', plan: 'lite' })

/*
Try:

APIKEY=$(kubectl get secret translator -o jsonpath='{.data.apikey}' | base64 -D)
URL=$(kubectl get secret translator -o jsonpath='{.data.url}' | base64 -D)
curl -X POST -u "apikey:$APIKEY" -H "Content-Type: application/json" -d '{"text": ["Hello, world! ", "How are you?"], "model_id":"en-es"}' "$URL/v3/translate?version=2018-05-01"
*/
