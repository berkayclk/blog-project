FROM node:10-slim

RUN mkdir -p /blog-app
WORKDIR /blog-app

COPY package.json .
RUN npm install

COPY docker.env .env
COPY ./src ./src

EXPOSE 8080

CMD [ "npm", "start" ]
