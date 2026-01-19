FROM node:23 as base

WORKDIR /usr/src/app

RUN groupadd -r appgroup && useradd -r -g appgroup appuser
COPY package*.json ./
RUN npm ci
RUN chown -R appuser:appgroup /usr/src/app
USER appuser

FROM base as builder
COPY --chown=appuser:appuser . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=$PORT

ENV HOSTNAME="0.0.0.0"
EXPOSE $PORT
CMD ["node", "dist/server.js"]