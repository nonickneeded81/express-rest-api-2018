FROM node:22-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

EXPOSE 3000
