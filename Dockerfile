FROM node:22-slim

ENV TZ=Asia/Tokyo
ENV LANG=ja_JP.UTF-8

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential libssl-dev make default-mysql-client default-libmysqlclient-dev \
    curl openssl git ca-certificates wget \
    imagemagick ghostscript poppler-utils && \
    rm -rf /var/lib/apt/lists/*

RUN corepack enable

WORKDIR /app
COPY package.json yarn.lock .flowconfig /app/
RUN yarn install --frozen-lockfile
