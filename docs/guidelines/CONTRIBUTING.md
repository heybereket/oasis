# ✨ Contributing to Oasis

### Initial Steps:

1. Fork this repository and clone it to your local machine
2. Make sure you have `yarn` installed. If you don't, run `npm install -g yarn`
3. Install all packages with the `yarn` command in the project root.

Once you are setup, you can head to the indivdual docs for the section of Oasis that you're working on!

- [`WEB.md`](/docs/packages/WEB.md) - How to get started with running/building the Next.JS frontend.
- [`API.md`](/docs/packages/API.md) - How to get started with running/building the GraphQL backend.
- [`CLIENT_GQL.md`](/docs/packages/CLIENT_GQL.md) - How to get started with running/building the client-side GraphQL hooks.

## Next Steps + Useful Info:

- You can start the development server **for all the workspaces** using `yarn run dev` in the project root!
- Each section (_package_) in Oasis has a start script in the project root, as well as in the individual project folders!
  - `yarn run dev:web` will only run the Next.JS frontend!
  - `yarn run dev:gql` will only run the dev compiler for the client-side GQL Hooks!
  - Run `yarn run` in the root of the project to see the rest of the development scripts!
  - Build scripts are currently only in the individual project folders.
- We are using Yarn as our package manager, please do not commit your `package-lock.json` files from NPM
- Everytime you change the .env file in `packages/web`, you will need to restart the Next.JS server.
- Make sure you are upto date by doing `git pull` here and there.
- Submit a <a href="https://github.com/heybereket/oasis/pulls">pull request</a>!

### 👀 What's next?

Make sure to add yourself to our `CONTRIBUTORS.md` file by running `yarn contrib:add` in your terminal, we use all-contributors to manage all this, it will ask you a couple of questions about your github username + contribution and it will automatically add you to the list and display you in the `CONTRIBUTORS.md` file!
