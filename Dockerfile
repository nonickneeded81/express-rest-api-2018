FROM node:22-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "dist/src/index.js"]
