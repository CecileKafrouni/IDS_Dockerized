FROM node:latest

WORKDIR app

COPY package.json yarn.lock ./

RUN npm install

COPY . .

CMD node index.js