_Follow these steps to get started with running the `api` package!_

**Prerequisites**<br>
This guide assumes you have already:

- Installed Redis
- (Optional - Installed PostgreSQL)
- Cloned the repository to an appropriate location.
- Setup `yarn` and installed packages.

**Installation**<br>
1. Install Redis Server
2. Populate `.env` files in `packages/web` and `packages/api`
   - If you used a custom port for Redis, make sure to modify `OASIS_API_REDIS_URL`, otherwise leave it as the default.
   - If you're running behind an NGINX reverse proxy, you'll want to [read our NGINX setup guide](NGINX-Setup-Guide) and make sure that you set `OASIS_API_TRUST_PROXY` to `true`.
   - `OASIS_API_GITHUB_CLIENT_*` are obtainable from making a [Github OAuth developer application](https://docs.github.com/en/developers/apps/creating-an-oauth-app).
   - If running locally, `OASIS_API_GITHUB_CALLBACK_URL` is most likely `http://localhost:3000/api/auth/github/callback`, but this can depend on your setup.
3. Copy `packages/api/src/ormconfig.example.ts` to `packages/api/src/ormconfig.ts`
   - In this file you will need to replace `<path-to-sqlite-file>` with a `.sqlite` file, such as `db.sqlite` (this file will be created, it doesn't have to be an existing DB, it just needs a name).
4. You're set! You can now run the Oasis API locally!

**Running**<br>
1. To run the API you will first need to build it by running `yarn build`
2. To sync the schema run `yarn workspace @oasis/api typeorm:cli schema:sync` (This may result in data loss).
3. If you want to run the api by itself you can run `yarn dev:api`, if you would like to run the api with the website follow the instructions in [the web quickstart guide](Web-Quick-Start)
