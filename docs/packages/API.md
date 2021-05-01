## Documentation on how to get started with the `@oasis/api` package

**The `@oasis/api` package is Oasis's GraphQL Backend (API)**.<br>
The `@oasis/api` package is designed to be a part of the `@oasis/web` (web frontend) package. You can run the API on it's own, but in production, it is deployed together!

### Package Scripts

- `build` - This script runs the typescript compiler, which transpiles the TS code into JS.
- `watch` scripts
  - `watch:tsc` - This script runs the typescript compiler in real-time (watch) mode, which compiles the TS code into JS on every file change.
  - `watch:dev` - This script runs the standalone API server, this is for when you want to run the API without running `@oasis/web`
- `dev` scripts
  - `dev:server` - This script runs both the `watch:tsc` and `watch:dev` scripts at once, making a standalone development server for the API.
  - `dev` - This script is ran when running the API along-side `@oasis/web` _(hence there being no standalone API server, only the compiler)._
