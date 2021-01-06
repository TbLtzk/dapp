FROM node:lts-alpine AS builder

WORKDIR /app

COPY .eslintrc jsconfig.json package.json yarn.lock ./
RUN yarn install

COPY public/ public/
COPY src/ src/

RUN yarn build

FROM nginx:stable-alpine

COPY --from=builder /app/build /app

COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./config/nginx/conf.d/app.conf /etc/nginx/conf.d/app.conf

RUN nginx -t
