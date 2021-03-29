import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
require("dotenv").config();
const githubUsername = require('github-username');

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

export function login(provider) {
    firebase.auth().signInWithPopup(provider).then(async (result) => {
    
    const db = firebase.firestore();
    const user = result.user
    console.log(user)
    const username = await githubUsername(user.email)
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    const userData = {
      username: data.login,
      name: data.name,
      avatar: data.avatar_url,
      bio: data.bio,
      url: data.html_url,
      location: data.location,
      };
    
      const projectRef = db.collection("users").doc(data.login)
      projectRef.set(userData)

      window.location.reload()
  })
}

export function loginGitHub() {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.setCustomParameters({
    allow_signup: "true"
  });
  return login(provider);
}

export function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.reload();
    })
}

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
