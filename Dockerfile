FROM node:22-slim
ENV TZ=Asia/Tokyo
RUN apt-get update && apt-get install -y --no-install-recommends default-mysql-client && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json yarn.lock .flowconfig ./
RUN yarn --frozen-lockfile
COPY . .
