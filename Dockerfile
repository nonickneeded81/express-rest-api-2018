FROM node:22-slim

ENV TZ=Asia/Tokyo

# install tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    default-mysql-client build-essential python3 && \
    rm -rf /var/lib/apt/lists/*

# enable corepack for yarn
RUN corepack enable

WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile
