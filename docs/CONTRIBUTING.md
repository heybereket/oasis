# Contributing to Oasis

**Getting started:**
1. Fork this repository and clone it to your local machine
2. Make sure you have yarn installed. If you don't, run ```npm install --g yarn```

**Getting started with the database:**
1. Head over to [Firebase](https://firebase.google.com) and create a project, from there get your credentials. [Click here if you don't know how!](https://clemfournier.medium.com/how-to-get-my-firebase-service-account-key-file-f0ec97a21620) From there, just copy and paste the values into the ```.env``` file, see below.
3. Go to the ```.env.example``` file where you can update the boiler text, as well as rename ```.env.example to .env```
4. Run ```yarn``` or ```yarn install``` to install all required packages 
5. Build/start the application by running ```yarn dev```
6. Make your changes
7. Submit a <a href="https://github.com/heybereket/oasis/pulls">pull request</a>!

**Getting started with OAuth:**
1. Head over to your firebase console
2. On the sidebar, click "Authentication" and go to the "Sign-in Method" tab
3. Now scroll to where it says "GitHub" and click it
4. If it's disabled click "enable", then go to <a href="https://github.com/settings/developers">GitHub's Developer Settings</a> and click "New OAuth App" at the top right
5. Next make a OAuth App and fill in the fields, and get the ```Client ID + Client Secret```, go back to Firebase
6. Make sure you have the credentials copied, paste them into Firebase 
7. At the bottom copy the callback URL and paste that in the GitHub Developer Settings spot for it
8. Click "Save", and you will be good to go!

**Translations:** <br>
If you would like to add a language to oasis, feel free todo so by editing <a href="https://github.com/heybereket/oasis/tree/main/public/locales">the languages folder</a>. We are always open to making Oasis more accessible by adding languages or by any other way! More parts of the site will be translated soon as well.

**Language Colours:** <br>
There are tons and tons of languages on GitHub and when we recieve the data of submitted repos, we try to match the language names with our own colours, if you would like to submit a language colour, feel free to by going to ```lib/constants.js``` and you will see the colours all there, it's a simple step to add a new one!

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
- Make sure you are upto date by doing ```git pull``` here and there

**Not sure on what to contribute?** Check out our <a href="https://github.com/heybereket/oasis/projects/1">project board</a>.

### Code of Conduct: 
Please make sure to read our [Contributor Code of Conduct](CODE_OF_CONDUCT.md) before contributing!

