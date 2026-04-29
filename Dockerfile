FROM node:22-slim

ENV TZ=Asia/Tokyo
ENV LANG=ja_JP.UTF-8

RUN apt-get update && apt-get install -y --no-install-recommends \
    default-mysql-client default-libmysqlclient-dev build-essential python3 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .
