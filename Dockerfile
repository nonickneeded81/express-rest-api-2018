FROM node:22-alpine

ENV TZ=Asia/Tokyo

WORKDIR /app
COPY package.json yarn.lock .flowconfig ./
RUN yarn --pure-lockfile --frozen-lockfile

COPY . .
