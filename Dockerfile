FROM node:lts-alpine AS builder

WORKDIR /app

COPY .npmrc jsconfig.json package.json package-lock.json ./
ARG NPM_TOKEN
RUN npm config set '//gitlab.com/api/v4/packages/npm/:_authToken' $NPM_TOKEN
RUN npm ci

COPY public/ public/
COPY src/ src/

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/build /app

COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./config/nginx/conf.d/app.conf /etc/nginx/conf.d/app.conf

RUN nginx -t
