import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
require("dotenv").config();

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectID: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

export function login(provider) {
    return firebase
      .auth()
      .signInWithRedirect(provider)
  }
  
  export function loginGitHub() {
    const provider = new firebase.auth.GithubAuthProvider()
    provider.setCustomParameters({
      allow_signup: 'true',
    })
    return login(provider)
  }
  
export function logout(){
    firebase.auth().signOut().then(() => {
        window.location.reload()
      }).catch((error) => {

      });
}

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 