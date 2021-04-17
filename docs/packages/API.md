## Documentation on how to get started with the `api` package

**The `api` package is the Oasis GraphQL API**.<br>
The `api` package is designed to be a part of the `web` (web frontend) package. You can run the API on it's own, but in production, it is deployed together!

### Scripts

### The `build` script

The `build` script runs the typescript compiler which generates the types and the javascript output of the `api` package. **This is ideal when you just need to run `web` and want to avoid touching the `api` package**

### The `watch` script

The `watch` script uses the typescript compiler in watch mode. This means every time a change is made to a file inside `api`, a new build is generated.
**This is ideal while developing, editing or debugging `api`.**

## The `start` script

The `start` script runs the api package on its own, meaning that you don't need to run `web` to run `api`. **This is ideal when you want to test `api`.**

## The `dev` script

The `dev` script is like `start` but listens for changes. **This is ideal when developing `api`.**
