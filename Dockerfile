FROM node:16.10.0 AS builder

WORKDIR /app

COPY .npmrc jsconfig.json package.json package-lock.json ./
ARG NPM_TOKEN
ARG REACT_APP_HIDE_ALIASES
RUN npm config set '//gitlab.com/api/v4/packages/npm/:_authToken' $NPM_TOKEN
RUN npm ci --legacy-peer-deps

COPY public/ public/
COPY src/ src/

RUN REACT_APP_HIDE_ALIASES=$REACT_APP_HIDE_ALIASES npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/build /app

COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./config/nginx/conf.d/app.conf /etc/nginx/conf.d/app.conf

RUN nginx -t
