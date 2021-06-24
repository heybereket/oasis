FROM node:15-alpine

WORKDIR /opt/oasis/

COPY .yarn/plugins/ .yarn/plugins/
COPY .yarn/releases/ .yarn/releases/

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

COPY ./packages/api/package.json ./packages/api/package.json
COPY ./packages/react-gql/package.json ./packages/react-gql/package.json
COPY ./packages/shared/package.json ./packages/shared/package.json
COPY ./packages/ui/package.json ./packages/ui/package.json
COPY ./packages/parser/package.json ./packages/parser/package.json
COPY ./packages/web/package.json ./packages/web/package.json


RUN yarn install

COPY ./packages/shared ./packages/shared
RUN yarn workspace @oasis-sh/shared build

COPY ./packages/api ./packages/api
COPY ./docker/docker-ormconfig.ts ./packages/api/src/ormconfig.ts
RUN yarn workspace @oasis-sh/api build

COPY ./packages/react-gql ./packages/react-gql
RUN yarn workspace @oasis-sh/react-gql build

COPY ./packages/ui ./packages/ui
RUN yarn workspace @oasis-sh/ui build

COPY ./packages/parser ./packages/parser
RUN yarn workspace @oasis-sh/parser build

COPY ./packages/web ./packages/web
RUN yarn workspace @oasis-sh/web build

CMD ["yarn", "start"]
