FROM node:20.12.2-alpine3.18

WORKDIR /app

COPY package*.json /app

RUN npm install

CMD [ "npm", "run", "dev" ]