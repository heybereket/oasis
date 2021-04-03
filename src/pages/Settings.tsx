import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import firebase from '../data/firebase';
import { Navbar } from '../components';

const githubUsername = require('github-username');
const Settings = () => {
    let db = firebase.firestore();
    const [error, setError] = useState("");
    const { t } = useTranslation();

    const [currentDisplayName, setCurrentDisplayName] = useState("")
    const [currentUsername, setCurrentUsername] = useState("")
    const [currentEmail, setCurrentEmail] = useState("")

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                window.location.href = "/"
            }
        });
    }, []);

    const something = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            updateUsername();
            updateDisplayName();
        }
    };

    const updateUsername = async () => {
        const user = firebase.auth().currentUser;
        setError("");

        const username = await githubUsername(user?.email);
        const accountRef = db.collection('users').doc(username);

        accountRef.update({
            username: currentUsername
        });
    };

    const updateDisplayName = async () => {
        const user = firebase.auth().currentUser;
        setError("");

        const username = await githubUsername(user?.email);
        const accountRef = db.collection('users').doc(username);

        accountRef.update({
            name: currentDisplayName
        });
    };

    const updateEmail = async () => {
        const user = firebase.auth().currentUser;
        setError("");

        const username = await githubUsername(user?.email);
        const accountRef = db.collection('users').doc(username);

        accountRef.update({
            email: currentEmail
        });
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                const username = await githubUsername(user.email);
                const db = firebase.firestore();

                let docRef = db.collection("users").doc(username);

                docRef.get(username).then((doc) => {
                    if (doc.exists) {
                        setCurrentUsername(doc?.data()?.username);
                        setCurrentDisplayName(doc?.data()?.name);
                        setCurrentEmail(doc?.data()?.email);
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
                        <div>
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

                        </div>

                    </div>
                </div>
            }

        </>
    );
};

export default Settings;
