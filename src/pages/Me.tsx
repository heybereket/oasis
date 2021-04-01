/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import firebase, { loginGitHub } from '../data/firebase';
// tslint:disable-next-line:no-var-requires
const githubUsername = require('github-username');

const Me = () => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const username = await githubUsername(user.email)
        const db = firebase.firestore()

        let docRef = db.collection('users').doc(username);

        docRef.get(username).then((doc) => {
            if (doc.exists) {
                window.location.href = `/u/${doc?.data()?.username}`;
            } else {
                loginGitHub();
            }
        }).catch((error) => {
            console.log('Error getting document:', error);
        });
    }
    });
  }, []);

  // tslint:disable-next-line:no-null-keyword
  return null;
};

export default Me;
