FROM node:22.20.0-alpine3.22

RUN apk add --no-cache git

RUN corepack enable yarn && corepack prepare yarn@4.9.2 --activate

CMD ["sh", "-c", "yarn install && yarn node api.js"]