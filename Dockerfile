FROM node:14-alpine3.10

RUN apk update && apk add bash

WORKDIR /usr/src

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "start"]
