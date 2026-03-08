FROM node:22-bookworm-slim

ENV TZ=Asia/Tokyo
ENV LANG=ja_JP.UTF-8

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000
