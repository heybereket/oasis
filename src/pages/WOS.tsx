/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import firebase, { loginGitHub } from "../data/firebase";
import { Navbar } from "../components";
import { BrowserView, MobileView } from 'react-device-detect';

const WOS = () => {
    let db = firebase.firestore();
    const [list, setList] = useState([]);
    const [error, setError] = useState("");
    const [sourcerName, setSourcerName] = useState("");
    const user = firebase.auth().currentUser;

    const search = useLocation().search;
    const username = new URLSearchParams(search).get('username');


    const enter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            sendData();
        }
    };

    useEffect(() => {
        db.collection("open-sourcers")
            .onSnapshot(snapshot => {
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

        const projectRef = db.collection("open-sourcers").doc(sourcerName);
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
                                value={username as string}
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
                                    (project: any, index) =>

                                        <div className="sourcer">
                                            <a href={project?.url} target="_blank" rel="noreferrer">
                                                <img
                                                    key={index}
                                                    className="open-sourcer"
                                                    alt={project?.username}
                                                    title={`@${project?.username}`}
                                                    src={project?.avatar} />
                                            </a>
                                        </div>
                                )
                            )}
                        </div>

                    </div>
                </div>
            }
        </>
    );
};

export default WOS;
