import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCqQCTPv2kjV7g9mNiQo_9tRjfXNkmr5KM",
    authDomain: "codetribute-database-15c0c.firebaseapp.com",
    projectId: "codetribute-database-15c0c",
    storageBucket: "codetribute-database-15c0c.appspot.com",
    messagingSenderId: "874980120452",
    appId: "1:874980120452:web:ca9d0863d53f9313a7efd1"
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