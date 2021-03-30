import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
require("dotenv").config();
const { Octokit } = require("@octokit/rest");
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

    const user = firebase.auth().currentUser;
    const username = await githubUsername(user.email)
    var docRef = db.collection("users").doc(username);

    docRef.get().then(async (doc) => {
      if (!doc.exists) {
        const db = firebase.firestore();
        var credential = result.credential;
        var token = credential.accessToken;
    
        const octokit = new Octokit({
          auth: token,
        });
    
        const { data } = await octokit.request("/user");
    
        const today = new Date();
        const year = today.getFullYear(); 
        const month = today.toLocaleString('default', { month: 'long' })
    
        const prefix = 'https://';
        if (data.blog.substr(0, prefix.length) !== prefix)
        {
            data.blog = prefix + data.blog;
        }
    
        const userData = {
          username: data.login,
          name: data.name,
          avatar: data.avatar_url,
          bio: data.bio,
          url: data.html_url,
          location: data.location,
          twitter: data.twitter_username,
          link: data.blog,
          email: data.email,
          created: `${month} ${year}`
        };
        
          const projectRef = db.collection("users").doc(data.login)
          projectRef.set(userData)
      }
    });

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
