FROM node:14.8.0-alpine

WORKDIR /backend

COPY package* ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]