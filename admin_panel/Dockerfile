FROM node:21-alpine

EXPOSE 3000

WORKDIR /app

RUN mkdir admin_panel

WORKDIR /app/admin_panel

COPY . .

ENTRYPOINT npm install && npm run start

