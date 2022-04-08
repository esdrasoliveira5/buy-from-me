FROM node:14.8.0-alpine

WORKDIR /backend

COPY package* ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]