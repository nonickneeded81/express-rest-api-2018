FROM node:22-bookworm

ENV TZ=Asia/Tokyo
ENV LANG=ja_JP.UTF-8

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    mysql-client imagemagick ghostscript poppler-utils && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json yarn.lock /app/
RUN corepack enable && yarn install --immutable
COPY . /app/
