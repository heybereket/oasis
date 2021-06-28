# Oasis Web Application

**Prerequisites**<br>
1. Setup the [API](API.md)
2. Run `yarn` in root to install all dependencies.

**Installation**<br>
1. Populate `.env` file in `packages/web`
   - Add the URL for oasis to `NEXT_PUBLIC_BASE_URL`, if are using the default config this can stay as default
4. You're set! You can now run Oasis Web locally!

**Running**<br>
1. To run the Web you will first need to build it by running `yarn build`
2. To run the web server you will need to run `yarn dev` this will also run the api and react-gql library which are required.
