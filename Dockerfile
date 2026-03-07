FROM node:22-slim

ENV TZ Asia/Tokyo
ENV LANG=ja_JP.UTF-8

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential python3 mysql-client locales && \
    rm -rf /var/lib/apt/lists/* && \
    locale-gen ja_JP.UTF-8

WORKDIR /app
COPY package.json yarn.lock /app/
RUN npm install -g yarn && yarn --pure-lockfile
