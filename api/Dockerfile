FROM node:lts-alpine

# later, may add a setup of doiung prod build instead of run dev server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD [ "node", "./main.ts" ]