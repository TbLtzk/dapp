FROM node:16.10.0 AS builder

RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app
USER node


COPY --chown=node:node .npmrc tsconfig.json vite.config.js package.json yarn.lock .eslintrc ./
ARG NPM_TOKEN
RUN yarn config set '//gitlab.com/api/v4/packages/npm/:_authToken' $NPM_TOKEN
RUN yarn --frozen-lockfile

COPY --chown=node:node public/ public/
COPY --chown=node:node src/ src/
COPY --chown=node:node index.html ./

RUN yarn build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /app

COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./config/nginx/conf.d/app.conf /etc/nginx/conf.d/app.conf

# Fix: https://github.com/GoogleContainerTools/kaniko/issues/1278#issuecomment-693459315
RUN test -e /var/run || ln -s /run /var/run
RUN nginx -t
