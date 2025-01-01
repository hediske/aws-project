FROM node:16-slim as build

WORKDIR /app

RUN apt-get update && apt-get install -y git

RUN git clone --branch back https://github.com/hediske/aws-project.git .

RUN apt-get remove -y git && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend

RUN npm install

FROM node:16-slim

WORKDIR /app

COPY --from=build /app/backend /app

RUN npm install -g pm2

ENV DB_NAME=test \
    DB_USER=test \
    DB_PASSWORD=test \
    DB_HOST=test

EXPOSE 4000

CMD ["pm2-runtime", "start", "index.js"]