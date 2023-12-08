FROM node:21-alpine

RUN mkdir /admin_panel

WORKDIR /admin_panel

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","start"]