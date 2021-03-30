/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import firebase from "../data/firebase";
import { Navbar, Loading } from "../components";
import { useLocation } from 'react-router-dom'
// import utility functions
import { useTranslation } from "react-i18next";

const githubUsername = require('github-username');
const Settings = () => {
  var db = firebase.firestore();
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const [currentDisplayName, setCurrentDisplayName] = useState("")
  const [currentUsername, setCurrentUsername] = useState("")
  const [currentEmail, setCurrentEmail] = useState("")

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        window.location = "/"
      }
    });
  }, []);
 

  const something = event => {
    if (event.keyCode === 13) {
      updateUsername()
      updateDisplayName()
    }
  };


  const updateUsername = async () => {
    const user = firebase.auth().currentUser;
    setError("");

    const username = await githubUsername(user.email)
    const accountRef = db.collection('users').doc(username)

    accountRef.update({
        username: currentUsername
    })
  };

  const updateDisplayName = async () => {
    const user = firebase.auth().currentUser;
    setError("");

    const username = await githubUsername(user.email)
    const accountRef = db.collection('users').doc(username)

    accountRef.update({
        name: currentDisplayName
    })
  };

  const updateEmail = async () => {
    const user = firebase.auth().currentUser;
    setError("");

    const username = await githubUsername(user.email)
    const accountRef = db.collection('users').doc(username)

    accountRef.update({
        email: currentEmail
    })
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
          const username = await githubUsername(user.email)
          const db = firebase.firestore()
  
          var docRef = db.collection("users").doc(username);
  
          docRef.get(username).then((doc) => {
              if (doc.exists) {
                  setCurrentUsername(doc.data().username)
                  setCurrentDisplayName(doc.data().name)
                  setCurrentEmail(doc.data().email)
              }
          }).catch((error) => {
              console.log("Error getting document:", error);
          });
      }
      });
  }, []);
 



  return (
    <>
      {
        <div>
          <Navbar />

          <div className="main-submit-wrapper">
            <header>
              <div className="header-content">
                <h1 className="heading">{window.location.pathname}</h1>
                <p className="header-subtitle">Update your account details here</p>
              </div>
            </header>


        <parent>
        <div className="wrapper-submit">
              {error && (
                <label className="paste-in-label">
                  <span style={{ color: "coral" }}>Error:</span> {error}
                </label>
              )}
              <input
                value={currentDisplayName}
                onKeyDown={e => something(e)}
                onChange={change => {
                    setCurrentDisplayName(change.target.value);
                }}
                spellCheck="false"
              />

                <button className="submit-repo" onClick={updateDisplayName}>
                  Save
                </button>
            </div>

            <div className="wrapper-submit">
              <input
                value={currentUsername}
                onKeyDown={e => something(e)}
                onChange={change => {
                    setCurrentUsername(change.target.value);
                }}
                spellCheck="false"
              />

                <button className="submit-repo" onClick={updateUsername}>
                  Save
                </button>
            </div>

            <div className="wrapper-submit">
              <input
                value={currentEmail}
                onKeyDown={e => something(e)}
                onChange={change => {
                    setCurrentEmail(change.target.value);
                }}
                spellCheck="false"
              />

                <button className="submit-repo" onClick={updateEmail}>
                  Save
                </button>
            </div>
            
            </parent>

          </div>
        </div>
      }

      <style jsx>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            text-align: center;
            color: #fff;
          }

          .main-submit-wrapper {
          }

          .wrapper-submit {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 2rem;
            max-width: 800px;
            width: 100%;
            margin: 0 auto;
            margin-top: -50px;
          }

          .wrapper-submit label {
            float: left;
            margin-bottom: 10px;
          }

          .wrapper-submit input,
          .wrapper-submit select,
          .notice {
            width: 100%;
            color: #fff;
            font-size: 10px;
          }

          .notice {
            border: 1px solid #5f6368;
            background-color: rgba(255, 255, 255, 0.04);
            margin-bottom: 20px;
            text-align: left;
            padding: 1rem;
            border-radius: 4px;
          }

          .notice h2 {
            font-weight: 400;
          }

          .wrapper-submit input {
            font-weight: 400;
            font-size: 0.9rem;
            font-family: "Inter";
            border-radius: 4px;
          }

          .wrapper-submit input {
            float: left;
            padding: 0 1.25rem;
            margin: 0 0 1.25rem;
            margin-right: 10px;
            line-height: 54px;
            background: transparent;
            border: 2px solid #fff;
            outline: none;
            -webkit-appearance: none;
          }

          table,
          td,
          th {
            border: 1px solid #666;
          }

          .wrapper-submit textarea:focus,
          .wrapper-submit textarea:active {
            border-color: #fff;
          }
          .wrapper-submit input[type="submit"] {
            float: left;
            cursor: pointer;
            margin: 0;
            border: none;
            font-weight: bold;
            width: 100%;
            background: #000;
          }
          .wrapper-submit input[type="submit"]:hover,
          .wrapper-submit input[type="submit"]:focus {
            opacity: 0.7;
          }

          input::placeholder {
            color: lightgray;
          }

          .submit-repo {
            width: 100%;
            margin: 0 0 1.25rem;
            line-height: 54px;
            font-family: "Inter";
            font-weight: 700;
            text-transform: uppercase;
            border: 2px solid #5f6368;
            padding: 0 1.25rem;
          }

          .submit-repo:hover {
            border: 2px solid #fff;
          }

          .submitted-label {
            text-align: left;
          }

          .repos {
            max-width: 960px;
            margin-top: 20px;
          }

          .repo {
            width: 352.5px;
            height: 200px;
          }

          @media (max-width: 550px) {
            .repo {
              width: 320px;
            }
          }

          button {
            cursor: pointer;
          }

          ::-webkit-scrollbar {
            background: transparent;
          }

          ::-webkit-scrollbar {
            width: 7px;
          }

          ::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 5px;
          }

          ::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
      </style>
    </>
  );
};

export default Settings;
