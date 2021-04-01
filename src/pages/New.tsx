/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import firebase, { loginGitHub } from '../data/firebase';
import { Navbar } from '../components';
import { deleteRepo } from '../utils/controls';

const githubUsername = require('github-username');

const New = () => {
  let db = firebase.firestore();
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const user = firebase.auth().currentUser;
  const [projectURL, setProjectURL] = useState('');
  const { t } = useTranslation();

  const [submittedBy, setSubmittedBy] = useState('')

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

  const something = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      sendData();
    }
  };

  useEffect(() => {
    db.collection('repos')
      .get()
      .then(snapshot => {
        let projects: any = [];

        snapshot.forEach(doc => {
          projects.push({
            id: doc.id,
            ...doc.data()
          });
        });

        setList(projects);
      });
  }, []);

  const sendData = async () => {
    if (projectURL === '') {
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
    setError('');

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

    const username = await githubUsername(user?.email);
    const db = firebase.firestore();

    var docRef = db.collection("users").doc(username);

    /* docRef.get(username).then(async (doc) => {
      setSubmittedBy(doc.data().username)
    }); */

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
      submitted_by: user?.email,
      date_added: new Date()
    };

    const projectRef = db.collection('repos').doc(`${data.owner.login.toLowerCase()}-${data.name.toLowerCase()}`);
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

    window.location.href = '/';
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
                value={repo as string}
                onKeyDown={something}
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
                  (project: any, index: number) =>
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
    </>
  );
};

export default New;
