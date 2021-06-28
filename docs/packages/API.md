# 🎉 Oasis GraphQL API

## Prerequisites
- [x] Install Redis
- [x] Install PostgreSQL (Optional)

## Installation
1. Install Redis Server
2. Populate `.env` files in `packages/web` and `packages/api`
   - If you used a custom port for Redis, make sure to modify `REDIS_URL`, otherwise leave it as the default.
   - If you're running behind an NGINX reverse proxy, you'll want to make sure that you set `TRUST_PROXY` to `true`.
   - `GITHUB_CLIENT_*` are obtainable from making a [Github OAuth developer application](https://docs.github.com/en/developers/apps/creating-an-oauth-app).
   - If running locally, `GITHUB_CALLBACK_URL` is most likely `http://localhost:3000/api/auth/github/callback`, but this can depend on your setup.
3. Copy the `ormconfig.ts` example below to fill in yours.
4. You're set! You can now run the Oasis API locally!

## Setting up ormconfig.ts
```js
import { ConnectionOptions } from 'typeorm';
import { joinRoot } from '@utils/common/rootPath';

// SQLite Example
const ormconfig: ConnectionOptions = {
  type: 'sqlite',
  database: './db.sqlite',
  entities: [joinRoot('./entities/*.*')],
  synchronize: true,
};

// PostgreSQL Example
const ormconfig: ConnectionOptions = {
  type: "postgres",
  username: "oasis",
  password: "oasis",
  uuidExtension: 'uuid-ossp',
  migrations: [joinRoot('./migrations/*.*')],
  entities: [joinRoot('./entities/*.*')],
  synchronize: true,
};

export default ormconfig;
```
## Running
1. To run the API you will first need to build it by running `yarn build`
2. To sync the schema run `yarn workspace @oasis/api typeorm:cli schema:sync` (This may result in data loss).
3. If you want to run the api by itself you can run `yarn dev:api`, if you would like to run the api with the website follow the instructions in [the web quickstart guide](WEB.md)

## Testing
**Any new code without tests will be denied**
1. To test the api you will need to have the api running as defined in the next step
2. Start the api by running `yarn test:api:setup` in root
3. Open a new terminal and run `yarn test:api:run` to run the tests
4. To write new tests make a new file with the extension `.test.ts` in the same directory as the code you want to test
**Tips**
1. If you want to rerun tests but you didn't make any changes in your code you will need to rerun `yarn test:api:setup`
2. It's recommended to use the `--watch` flag when running `yarn test:api:setup` as it will auto-detect changes and restart the testing server for you

## TypeORM Migrations
```bash
# Generate a Migration command via the TypeORM Cli
$ yarn typeorm:generate_migration <name>

# Run the Migration
$ yarn typeorm:run_migrations
```
