# Documentation on `client-gql`

I will not go over the `gen:build`, `gen:watch`, `tsc:build` or `tsc:watch` scripts.
Please check the `package.json` file for `client-gql` and learn TypeScript and GraphQL Codegen.
You may find that these scripts are self-explanatory.

## The `build` script

The build script runs the typescript compiler which generates the types and the javascript output of the api package.
**This is ideal when you just need to run `web` and want to avoid touching `client-gql`'s source code**

## The `watch` script

The `watch` script uses the typescript compiler in watch mode. This means every time a change is made to a file inside `api`, a new build is generated.
**This is ideal while developing, editing or debugging `client-gql`**. A common use case would be when developing `web` and you might need to edit or create graphql queries.

## How it works

The `build` script works as follows:
  1. GraphQL Codegen generates a typescript file with all the utilities.
  2. The TypeScript compiler takes that typescript file and generates JS code and TS definitions

The `watch` script follows the same procedure as `build` but redoes it when a file is changed.
