## Setting up Firebase for the **next** branch

### Setting up the project and the database

1. Head over to [Firebase](https://firebase.google.com) and create a project, enable **firestore database**, and then, get your credentials. [Click here if you don't know how!](https://clemfournier.medium.com/how-to-get-my-firebase-service-account-key-file-f0ec97a21620) From there, just copy and paste the values into the `.env` file, see below.
2. Go to the `.env.example` file where you can update the boilerplate text with your firebase credentials, as well as rename `.env.example` to `.env`
   - In your `.env` file, set `SECURE_COOKIE` to `true` if running your server on `https`, and `false` if running locally (on `http`).
   - Also in the `.env`, set `NEXT_PUBLIC_BASE_URL` to the URL your server is running at. If you're running locally, it's probably `http://localhost:3000`

### Setting up OAuth

1. Head over to your firebase console
2. On the sidebar, click "Authentication" and go to the "Sign-in Method" tab
3. Now scroll to where it says "GitHub" and click it
4. If it's disabled click "enable", then go to <a href="https://github.com/settings/developers">GitHub's Developer Settings</a> and click "New OAuth App" at the top right
5. Next make a OAuth App and fill in the fields, and get the `Client ID + Client Secret`, go back to Firebase
6. Make sure you have the credentials copied, paste them into Firebase
7. At the bottom copy the callback URL and paste that in the GitHub Developer Settings spot for it
8. Click "Save", and you will be good to go!

### Setting up Firebase Admin

1. Head over to your firebase console
2. On the sidebar, click the settings button and go to "Project Settings"
3. In Project Settings, go to the "Service accounts" tab.
4. Under the "Firebase Admin SDK" tab, click "Generate new private key"
5. Generate your private key, which downloads as a `.json` file.
6. Move this `.json` file to `utils/serviceaccount.json` (in the project folder)!
7. You're good to go!

- Firebase Admin is used to validate user cookies and more on the backend. **Never expose this file to the frontend, they can access your whole database/anything with it.**
