# Contributing to Oasis

**Getting started:**
1. Fork this repository and clone it to your local machine
2. Make sure you have yarn installed. If you don't, run ```npm install --g yarn```

**Getting started with the database:**
1. Head over to [Firebase](https://firebase.google.com) and create a project, get the credidentials 
2. Go to the ```.env.example``` file where you can update the boiler text, as well as rename ```.env.example to .env```
3. Run ```yarn``` or ```yarn install``` to install all required packages 
4. Build/start the application by running ```yarn dev```
5. Make your changes
6. Submit a <a href="https://github.com/heybereket/oasis/pulls">pull request</a>!

**Getting started with OAuth:**
1. Head over to your firebase console
2. On the sidebar, click "Authentication" and go to the "Sign-in Method" tab
3. Now scroll to where it says "GitHub and click it"
4. If it's disabled click "enable", then go to <a href="https://github.com/settings/developers">GitHub's Developer Settings</a> and click "New OAuth App" at the top right
5. Next make a OAuth App and fill in the fields, and get the ```Client ID + Client Secret```, go back to Firebase
6. Make sure you have the credidentials copied, paste them into Firebase 
7. At the bottom copy the callback URL and paste that in the GitHub Developer Settings spot for it
8. Click "Save", and you will be good to go!

**Translations:** <br>
If you would like to add a language to oasis, feel free todo so by editing <a href="https://github.com/heybereket/oasis/tree/main/public/locales">the languages folder</a>. We are always open to making Oasis more accessible by adding languages or by any other way! More parts of the site will be translated soon as well.

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
