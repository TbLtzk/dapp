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

RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid
RUN touch /var/log/nginx/error.log && \
        chown -R nginx:nginx /var/log/nginx/error.log
RUN chmod 766 /var/log/nginx/error.log
## switch to non-root user
USER nginx

RUN nginx -t
