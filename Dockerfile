FROM node:latest

RUN yarn global add gulp-cli

WORKDIR acc-tournament

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["gulp"]