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
