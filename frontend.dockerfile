FROM node:18 as build

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y git \
    && git clone --branch front https://github.com/hediske/aws-project.git . \
    && cd frontend

WORKDIR /usr/src/app/frontend
RUN npm install && npm run build

FROM nginx:alpine

COPY --from=build /usr/src/app/frontend/build /usr/share/nginx/html

COPY nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
