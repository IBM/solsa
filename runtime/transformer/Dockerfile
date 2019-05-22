FROM node:10-alpine

WORKDIR /solsa

COPY transformer.js .
COPY package.json .

RUN npm install --prod --no-save

CMD ["node", "/solsa/transformer.js"]
