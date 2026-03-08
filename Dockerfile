FROM node:22-bookworm

ENV TZ Asia/Tokyo
ENV LANG=ja_JP.UTF-8

# install tools
RUN apt-get update && \
    apt-get clean && \
    apt-get install -y --no-install-recommends build-essential \
    libssl-dev make default-mysql-client vim-tiny \
    curl openssl git ca-certificates wget python3 \
    imagemagick ghostscript poppler-utils && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
ADD package.json /app/
RUN npm install
