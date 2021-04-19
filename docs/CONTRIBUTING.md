# ✨ Contributing to Oasis

## Setting up your dev environment

### Locally

1. [Fork this repository](https://github.com/oasis-sh/oasis.fork) and clone it to your local machine.
2. Make sure you have `yarn` installed. If you don't, run `npm install -g yarn`
3. Install all packages with the `yarn` command in the project root.

### With Gitpod

To open an new workspace using your fork, append the GitHub repo URL of your repo with `Https://gitpod.io/#` and hit Enter. Remember to replace `YOUR-USERNAME-HERE`

```txt
https://gitpod.io/#github.com/YOUR-USERNAME-HERE/oasis
```

Alernatively, [fire up an new workspace using the upstream repo](https://gitpod.io/#github.com/oasis-sh/oasis) and then fork within your workspace by doing the following when using the Theia IDE (if [using VS Code in Gitpod](https://www.gitpod.io/blog/next-chapter-for-gitpod) (by default or manually switched to), please manually fork the repo):

- Press `F1` or or `Ctrl` + `Shift` + `P` (on macOS keyboards, its `Cmd` + `Shift` + `P`)
- Type `fork`. That should show `Git: Fork` the only option. Hit Enter
- Pick either your org (with repo creation permissions) or your personal account.
- Then you're good to go push into your fork.

### What To Do Next After?

- If you are working on the web, run `cd packages/web`, then `yarn dev` to get the server running.
- If you are working on the desktop, run `cd desktop`, then `yarn start` to get it running.
- If you are working on the API, run `cd packages/api`, then `yarn build` to get it running.

### Configuring Firebase Credentials

1. Head over to [Firebase](https://firebase.google.com) and create a project, enable **Firestore Database**, and then, get your credentials. [Don't know how?](https://www.c-sharpcorner.com/article/how-to-create-firebase-web-app-get/)
2. Copy and paste the values into the `.env.example` file where you can update the boilerplate text, as well as rename `.env.example` to `.env`.

### Adding GitHub OAUth to Firebase Authenication

1. Head over to your Firebase console.
2. On the sidebar, click "Authentication" and go to the "Sign-in Method" tab.
3. Now scroll to where it says "GitHub" and click it.
4. If it's disabled click "enable", then go to [GitHub's Developer Settings](https://github.com/settings/developers) and click "New OAuth App" at the top right.
5. Next make a OAuth App and fill in the fields, and get the Client ID-Secret pair  and go back to Firebase.
6. Make sure you have the credentials copied, paste them into Firebase
7. At the bottom copy the callback URL and paste that in the GitHub Developer Settings spot for it
8. Click **Save**, and you will be good to go!

## Next Steps + Reminders

- You can start the development server using `yarn dev`
- Make your changes!
- We are using Yarn as our package manager, please do not commit your `package-lock.json` files from NPM. We use `yarn.lock` instead as our lockfile.
- Everytime you change the `packages/api/.env` file, you need to restart the server.
- Make sure you are up to date withe the upstream using `git pull upstream staging` (if doesn't work, try running `./scripts/add-upstream-repo.sh`, the official GitHub CLI should automatically point `upstream` to `oasis-sh/oasis` after cloning).
- [Submit a pull request!](https://github.com/oasis-sh/oasis/pulls)

## 👀 What's next?

Make sure to add yourself to our `CONTRIBUTORS.md` file by running `yarn contrib:add` in your terminal, we use all-contributors to manage all this, it will ask you a couple of questions about your github username + contribution and it will automatically add you to the list and display you in the `CONTRIBUTORS.md` file!
