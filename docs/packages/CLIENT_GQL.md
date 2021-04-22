## Documentation on how to get started with the `@oasis/client-gql` package

**The `@oasis/client-gql` package is Oasis's GraphQL Client-side GraphQL Hooks**.<br>
`@oasis/client-gql` is an auto-generated set of [React Hooks](https://reactjs.org/docs/hooks-intro.html) for communicating with the GraphQL backend.

### Package Scripts

- `build` - This script runs the typescript compiler, which transpiles the TS code into JS, as well as the GraphQL code generator, which auto-generates the hooks based on the GraphQL API Schema
- `watch` scripts
  - `watch:tsc` - This script runs the typescript compiler in real-time (watch) mode, which compiles the TS code into JS on every file change.
  - `watch:gen` - This script runs the GraphQL code generator, which auto-generates the hook code, based on the GraphQL API Schema.
- `dev` - This script is ran along-side `@oasis/web`, and all it does it run both watch scripts at once. This is so if changes are made to the Schema, the code for the hooks is automatically updated during development.
