FROM node:22-slim
ENV TZ Asia/Tokyo
ENV LANG=ja_JP.UTF-8
RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*
RUN corepack enable
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile
COPY . .
