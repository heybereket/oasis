/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import firebase, { loginGitHub } from "../data/firebase";
const githubUsername = require('github-username');

const Me = () => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const username = await githubUsername(user.email)

        window.location = `/u/${username}`
      } else {
        loginGitHub()
      }
    });
  }, []);

  return null
};

export default Me;
