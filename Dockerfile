FROM node:alpine AS builder
ENV WORKING_DIR=/usr/src/app

WORKDIR ${WORKING_DIR}
RUN chown node:node ${WORKING_DIR}

COPY --chown=node:node .npmrc .
COPY --chown=node:node yarn.lock .
COPY --chown=node:node *turbo.json .
COPY --chown=node:node package* ./

USER node

RUN yarn --frozen-lockfile install

RUN yarn build

FROM node:alpine AS executer

ENV WORKING_DIR=/usr/src/app

WORKDIR ${WORKING_DIR}
COPY --from=builder ${WORKING_DIR} ${WORKING_DIR}

COPY --chown=node:node . .

USER node

CMD cd ./apps/api && yarn start