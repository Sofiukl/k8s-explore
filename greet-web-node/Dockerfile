# stage1 as builder
FROM node:10-alpine

WORKDIR /web

COPY . .

EXPOSE 80

ENTRYPOINT ["node", "index.js"]