FROM node:20-slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock* ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]