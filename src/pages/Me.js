/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import firebase, { loginGitHub } from "../data/firebase";
const githubUsername = require('github-username');

const Me = () => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const username = await githubUsername(user.email)
        const db = firebase.firestore()

        var docRef = db.collection("users").doc(username);

        docRef.get(username).then((doc) => {
            if (doc.exists) {
                window.location = `/u/${doc.data().username}`
            } else {
                loginGitHub()
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
    });
  }, []);

  return null
};

export default Me;
