/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import _ from "lodash";
import firebase, { loginGitHub } from "../data/firebase";
import { Navbar, Loading } from "../components";
import { useLocation } from 'react-router-dom'
// import utility functions
import { deleteRepo } from "../utils/controls";
import { useTranslation } from "react-i18next";

const githubUsername = require('github-username');
const New = () => {
  var db = firebase.firestore();
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const user = firebase.auth().currentUser;
  const [projectURL, setProjectURL] = useState("");
  const { t } = useTranslation();

  const search = useLocation().search;
  const repo = new URLSearchParams(search).get('repo');
  
  // Check if user is signed in
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
          
  //     } else {
  //         loginGitHub()
  //     }
  //   });
  // }, []);
 

  const something = event => {
    if (event.keyCode === 13) {
      sendData();
    }
  };

  useEffect(() => {
    db.collection("repos")
      .get()
      .then(snapshot => {
        let projects = [];

        snapshot.forEach(doc => {
          projects.push({
            id: doc.id,
            ...doc.data()
          });
        });

        // for (const doc of snapshot.docs)
        //   projects = _.concat(projects, {
        //     id: doc.id,
        //     ...doc.data()
        //   });

        setList(projects);
      });
  }, []);

  const sendData = async () => {
    if (projectURL === "") {
      setError("Repository URL can't be blank");
      return;
    } else if (
      !/^(http[s]?:\/\/)(www\.)?github\.com\/[a-zA-Z0-9-]*\/[a-zA-Z0-9]*/.test(
        projectURL
      )
    ) {
      setError("Invalid GitHub Repository URL");
      return;
    }

    const user = firebase.auth().currentUser;
    setError("");

    // slice the url
    const url = new URL(projectURL);
    const newURL = url.pathname + url.search;

    const response = await fetch(`https://api.github.com/repos${newURL}`);

    if (response.status === 404) {
      setError(`Repository does not exist, or the URL is mistyped`);
      return;
    }

    if (response.status >= 400) {
      setError(`The server responded with a ${response.status}`);
      return;
    }

    const data = await response.json();

    const username = await githubUsername(user.email)
    const response_data = await fetch(`https://api.github.com/users/${username}`);
    const username_data = await response_data.json();

    const repoData = {
      name: data.name,
      full_name: data.full_name,
      owner: data.owner.login,
      desc: data.description,
      avatar: data.owner.avatar_url,
      url: data.html_url,
      language: data.language,
      issues: data.open_issues_count,
      stars: data.stargazers_count,
      archived: data.archived,
      fork: data.fork,
      submitted_by: username_data.login,
      date_added: new Date()
    };

    const projectRef = db
      .collection("repos")
      .doc(data.owner.login.toLowerCase() + "-" + data.name.toLowerCase());
    const project = await projectRef.get();

    if (project.exists) {
      setError("Repository already added");
      return;
    } else if (data.archived) {
      setError("Repository is archived");
      return;
    } else if (data.open_issues <= 5) {
      setError("Repository has under 5 issues");
      return;
    } else {
      await projectRef.set(repoData);
    }

    window.location = "/";
  };

  return (
    <>
      {
        <div>
          <Navbar />

          <div className="main-submit-wrapper">
            <header>
              <div className="header-content">
                <h1 className="heading">{window.location.pathname}</h1>
                <p className="header-subtitle">{t('new.addRepoHeader')}</p>
              </div>
            </header>

            <div className="wrapper-submit">
              {error && (
                <label className="paste-in-label">
                  <span style={{ color: "coral" }}>Error:</span> {error}
                </label>
              )}
              <input
                placeholder={t('new.addRepoPlaceholder')}
                value={repo}
                onKeyDown={e => something(e)}
                onChange={change => {
                  setProjectURL(change.target.value);
                }}
              />

              {user ? (
                <button className="submit-repo" onClick={sendData}>
                  {t('add Repo')}
                </button>
              ) : (
                <button className="submit-repo" onClick={loginGitHub}>
                  {t('new.signInToSubmit')}
                </button>
              )}
            </div>
            <br />

            <label className="submitted-label">
              {user ? (
                <strong>{user.displayName}'s Submitted Repositories:</strong>
              ) : (
                ""
              )}
            </label>
            <br />
            <small>{user ? `Manage repositories you've submitted.` : ""}</small>

            <div className="repos">
              {(
                list.map(
                  (project, index) =>
                    (user ? project.submitted_by === user.email : "") && (
                      <div className="repo">
                        <img
                          alt={`${project.owner.toLowerCase()}'s logo`}
                          className="display"
                          src={project.avatar}
                        />
                        <br />
                        <p key={index}>
                          <span className="owner">{project.owner}</span>/
                          <span className="name">{project.name}</span>
                        </p>

                        <div className="category-wrapper">
                          <button
                            className="popular"
                            onClick={() => deleteRepo(project.id)}
                          >
                            ❌ Remove Repo
                          </button>
                        </div>
                      </div>
                    )
                )
              )}
            </div>
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
            padding: 2rem;
            display: inline-block;
            float: none;
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
            height: 50px;
            font-family: "Inter";
            font-weight: 700;
            text-transform: uppercase;
            border: 2px solid #5f6368;
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

export default New;
