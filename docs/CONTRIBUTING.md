# Contributing to Oasis
Discovered a bug on the site? Report it to the <a href="https://github.com/heybereket/oasis/issues">issues</a> tab. 

**We're always actively looking for contributors:**

1. Fork this repository and clone it to your local machine
2. Make sure you have yarn installed. If you don't, run ```npm install --g yarn```
3. Head over to [Firebase](https://firebase.google.com) and create a project, get the credidentials 
4. Go to the ```.env.example``` file where you can update the boiler text, as well as rename ```.env.example to .env```
5. Run ```yarn``` or ```yarn install``` to install all required packages 
6. Build/start the application by running ```yarn dev```
7. Make your changes
8. Submit a <a href="https://github.com/heybereket/oasis/pulls">pull request</a>!

**Uh oh, errors?**
- <a href="https://docs.github.com/en/github/getting-started-with-github/fork-a-repo">Forking a Repository</a>
- <a href="https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository">Cloning a Repository</a>
- <a href="https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork">Creating a Pull Request</a>
- <a href="https://cloud.google.com/firestore/docs/client/get-firebase">Getting Started with Firebase</a>

**Important Notes:**
- We are using Firebase Firestore for the database
- Everytime you change the .env file, you need to restart the server
- We are using Yarn as our package manager, please do not commit your ```package-lock.json``` files from NPM
- Make sure you are upto date by doing ```git pull``` here and there

**Not sure on what to contribute?** Check out our <a href="https://github.com/heybereket/oasis/projects/1">project board</a>.
