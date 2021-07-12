FROM node:15-alpine AS BUILD_IMAGE

RUN apk update && apk add curl bash && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /opt/oasis/

COPY .yarn .yarn
COPY .yarnrc.yml .yarnrc.yml

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

COPY ./packages/api/package.json ./packages/api/package.json
COPY ./packages/react-gql/package.json ./packages/react-gql/package.json
COPY ./packages/web/package.json ./packages/web/package.json

RUN yarn install

COPY ./packages/api ./packages/api
COPY ./docker/docker-ormconfig.ts ./packages/api/src/ormconfig.ts
RUN yarn workspace @oasis-sh/api build

COPY ./packages/react-gql ./packages/react-gql
RUN yarn workspace @oasis-sh/react-gql build


COPY ./packages/web ./packages/web
RUN yarn workspace @oasis-sh/web build

# remove development dependencies
RUN yarn workspaces focus --production -A

# run node prune
RUN /usr/local/bin/node-prune

# Final Production Image
FROM node:15-alpine

WORKDIR /opt/oasis/

# Copy global node modules
COPY --from=BUILD_IMAGE /opt/oasis/package.json ./package.json
COPY --from=BUILD_IMAGE /opt/oasis/node_modules ./node_modules

# Copy dist folders and package.json
COPY --from=BUILD_IMAGE /opt/oasis/packages/api/package.json ./packages/api/package.json
COPY --from=BUILD_IMAGE /opt/oasis/packages/api/dist ./packages/api/dist

COPY --from=BUILD_IMAGE /opt/oasis/packages/react-gql/package.json ./packages/react-gql/package.json
COPY --from=BUILD_IMAGE /opt/oasis/packages/react-gql/dist ./packages/react-gql/dist
COPY --from=BUILD_IMAGE /opt/oasis/packages/react-gql/generated ./packages/react-gql/generated

COPY --from=BUILD_IMAGE /opt/oasis/packages/web/package.json ./packages/web/package.json
COPY --from=BUILD_IMAGE /opt/oasis/packages/web/.next ./packages/web/.next
COPY --from=BUILD_IMAGE /opt/oasis/packages/web/public ./packages/web/public
COPY --from=BUILD_IMAGE /opt/oasis/packages/web/next.config.js ./packages/web/next.config.js
COPY --from=BUILD_IMAGE /opt/oasis/packages/web/server/dist ./packages/web/server/dist

CMD ["yarn", "start"]
