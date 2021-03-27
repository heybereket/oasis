/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import firebase, { loginGitHub } from "../data/firebase";
import { Navbar } from "../components";
import { useLocation } from 'react-router-dom'
import {BrowserView, MobileView} from 'react-device-detect';

const WOS = () => {
  var db = firebase.firestore();
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [sourcerName, setSourcerName] = useState("");
  const user = firebase.auth().currentUser;

  const search = useLocation().search;
  const username = new URLSearchParams(search).get('username');


  const enter = event => {
    if (event.keyCode === 13) {
      sendData();
    }
  };

  useEffect(() => {
    db.collection("open-sourcers")
    .onSnapshot(snapshot => {
        let projects = [];

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

    if (sourcerName === "") {
        setError("Username can't be blank");
        return;
      } 

    const response = await fetch(`https://api.github.com/users/${sourcerName}`);
    const data = await response.json();

    if (response.status === 404) {
        setError(`@${sourcerName} does not exist`);
        return;
      }
  
      if (response.status >= 400) {
        setError(`The server responded with a ${response.status}`);
        return;
      }

    const repoData = {
        username: data.login,
        avatar: data.avatar_url,
        url: data.html_url,
        type: data.type
    };

    const projectRef = db.collection("open-sourcers").doc(sourcerName)
    const project = await projectRef.get();

    if (project.exists) {
        setError("User already added");
        return;
    } else {
        await projectRef.set(repoData);
      }

  };

  return (
    <>
      {
        <div>
          <Navbar />

          <div className="main-submit-wrapper">
            <header>
              <div className="header-content">
                <BrowserView>
                    <h1 className="heading">💙 Wall of Open Sourcers</h1>
                </BrowserView>
                <MobileView>
                    <h1 className="heading">💙 Open Sourcers</h1>
                </MobileView>
               
                <p className="header-subtitle">Add yourself to the wall!</p>
              </div>
            </header>

            <div className="wrapper-submit">
              {error && (
                <label className="paste-in-label">
                  <span style={{ color: "coral" }}>Error:</span> {error}
                </label>
              )}
              <input
                placeholder="github username (ex. heybereket)"
                value={username}
                onKeyDown={e => enter(e)}
                onChange={change => {
                  setSourcerName(change.target.value);
                }}
              />


              {user ? (
                <button className="submit-repo" onClick={sendData}>
                   Add {sourcerName > '' ? '@' + sourcerName : ''} to the wall
                </button>
              ) : (
                <button className="submit-repo" onClick={loginGitHub}>
                  Sign in to add {sourcerName > '' ? '@' + sourcerName : ''}
                </button>
              )}        

            </div>
            <br />

           

            <div className="repos">
              {(
                list.map(
                  (project, index) =>
                  
                   <div className="sourcer">
                     <a href={project.url} target="_blank"  rel="noreferrer">
                    <img 
                    key={index} 
                    className="open-sourcer" 
                    alt={project.username}
                    title={`@${project.username}`}
                    src={project.avatar}/>
                   </a>
                  </div>

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
            max-width: 800px;
            margin-top: 20px;
          }

          .sourcer {
            margin: -5px;
          }

          @media (max-width: 550px) {
            .repo {
              width: 320px;
            }
          }

          .open-sourcer {
            width: 45px;
            height: 45px;
            border-radius: 50%;
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

export default WOS;
