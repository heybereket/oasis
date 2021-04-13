# ✨ Contributing to Oasis 

### Getting Started:
1. Fork this repository and clone it to your local machine
2. Make sure you have `yarn` installed. If you don't, run ```npm install -g yarn```
3. Install all packages with the `yarn` command in the project root.

## Setting up Firebase:
Oasis uses Firebase for authentication and for it's database. Please go to the corresponding setup guide for your branch:

- [Firebase Setup for `main`](FIREBASE_SETUP_MAIN.md)
- [Firebase Setup for `next`](FIREBASE_SETUP_NEXT.md)

## Next Steps:
Once you have Firebase setup, you're ready to contribute to Oasis!

- You can start the development server using `yarn dev`
- Make your changes!
- Submit a <a href="https://github.com/heybereket/oasis/pulls">pull request</a>!

## Things you could do:

**Translations:** <br>
If you would like to add a language to oasis, feel free todo so by editing <a href="https://github.com/heybereket/oasis/tree/main/public/locales">the languages folder</a>. We are always open to making Oasis more accessible by adding languages or by any other way! More parts of the site will be translated soon as well.

**Language Colours:** <br>
There are tons and tons of languages on GitHub and when we recieve the data of submitted repos, we try to match the language names with our own colours, if you would like to submit a language colour, feel free to by going to ```lib/constants.js``` and you will see the colours all there, it's a simple step to add a new one!

**Not sure on what to contribute?** Check out our <a href="https://github.com/heybereket/oasis/projects/1">project board</a>.

### Final Notes

**Uh oh, errors?**
- <a href="https://docs.github.com/en/github/getting-started-with-github/fork-a-repo">Forking a Repository</a>
- <a href="https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository">Cloning a Repository</a>
- <a href="https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork">Creating a Pull Request</a>
- <a href="https://firebase.google.com/docs/firestore/">Firebase Firestore Docs</a>
- <a href="https://firebase.google.com/docs/auth/">Firebase Authentication Docs</a>

**Important Notes:**
- We are using Firebase Firestore for the database
- Everytime you change the .env file, you need to restart the server
- We are using Yarn as our package manager, please do not commit your ```package-lock.json``` files from NPM
- Make sure you are upto date by doing ```git pull``` here and there.
