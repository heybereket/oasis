# ✨ Contributing to Oasis 

### Initial Steps:
1. Fork this repository and clone it to your local machine
2. Make sure you have `yarn` installed. If you don't, run ```npm install -g yarn```
3. Install all packages with the `yarn` command in the project root.
- If you are working on the web, run `cd packages/web`, then `yarn dev` to get the server running. 
- If you are working on the web, run `cd desktop`, then `yarn start` to get the server running.

### Firebase: Getting Started

1. Head over to [Firebase](https://firebase.google.com) and create a project, enable **firestore database**, and then, get your credentials. [Don't know how?](https://www.c-sharpcorner.com/article/how-to-create-firebase-web-app-get/) 
2. Copy and paste the values into the `.env.example` file where you can update the boilerplate text, as well as rename `.env.example` to `.env`.

### Firebase: OAuth

1. Head over to your firebase console
2. On the sidebar, click "Authentication" and go to the "Sign-in Method" tab
3. Now scroll to where it says "GitHub" and click it
4. If it's disabled click "enable", then go to <a href="https://github.com/settings/developers">GitHub's Developer Settings</a> and click "New OAuth App" at the top right
5. Next make a OAuth App and fill in the fields, and get the `Client ID + Client Secret`, go back to Firebase
6. Make sure you have the credentials copied, paste them into Firebase
7. At the bottom copy the callback URL and paste that in the GitHub Developer Settings spot for it
8. Click "Save", and you will be good to go!

## Next Steps + Reminders:

- You can start the development server using `yarn dev`
- Make your changes!
- We are using Yarn as our package manager, please do not commit your ```package-lock.json``` files from NPM
- Everytime you change the .env file, you need to restart the server
- Make sure you are upto date by doing ```git pull``` here and there
- Submit a <a href="https://github.com/heybereket/oasis/pulls">pull request</a>!

### 👀 What's next?
Make sure to add yourself to our `CONTRIBUTORS.md` file by running `yarn contrib:add` in your terminal, we use all-contributors to manage all this, it will ask you a couple of questions about your github username + contribution and it will automatically add you to the list and display you in the `CONTRIBUTORS.md` file!
