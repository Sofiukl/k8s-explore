# stage1 as builder
FROM node:10-alpine

WORKDIR /api

COPY . .

EXPOSE 3001

ENTRYPOINT ["node", "index.js"]