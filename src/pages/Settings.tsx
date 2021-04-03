import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import firebase from '../data/firebase';
import { PageHeader } from '../components/common/PageHeader';
import { BigButton } from '../components/common/Buttons';
import { SubmitWrapper } from '../styledHelpers/GlobalStyle';

// tslint:disable-next-line:no-var-requires
const githubUsername = require('github-username');

const Settings = () => {
    const db = firebase.firestore();
    const history = useHistory();
    const [error, setError] = useState<string>('');

    const [currentDisplayName, setCurrentDisplayName] = useState<string>('');
    const [currentUsername, setCurrentUsername] = useState<string>('');
    const [currentEmail, setCurrentEmail] = useState<string>('');

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                history.push('');
            }
        });
    }, []);

    const updateUsername = async () => {
        const user = firebase.auth().currentUser;
        setError('');

        const username = await githubUsername(user?.email);
        const accountRef = db.collection('users').doc(username);

        accountRef.update({
            username: currentUsername
        });
    };

    const updateDisplayName = async () => {
        const user = firebase.auth().currentUser;
        setError('');

        const username = await githubUsername(user?.email);
        const accountRef = db.collection('users').doc(username);

        accountRef.update({
            name: currentDisplayName
        });
    };

    const something = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            updateUsername();
            updateDisplayName();
        }
    };

    const updateEmail = async () => {
        const user = firebase.auth().currentUser;
        setError('');

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

                let docRef = db.collection('users').doc(username);

                docRef.get(username).then((doc) => {
                    if (doc.exists) {
                        setCurrentUsername(doc?.data()?.username);
                        setCurrentDisplayName(doc?.data()?.name);
                        setCurrentEmail(doc?.data()?.email);
                    }
                }).catch((err) => {
                    console.log('Error getting document:', err);
                });
            }
        });
    }, [db]);

    return (
        <>
            <PageHeader subTitle="Update your account details here" />
            <div>
                <SubmitWrapper>
                    {error && (
                        <label className="paste-in-label">
                            <span style={{ color: 'coral' }}>Error:</span> {error}
                        </label>
                    )}
                    <input
                        value={currentDisplayName}
                        onKeyDown={e => something(e)}
                        onChange={change => {
                            setCurrentDisplayName(change.target.value);
                        }}
                        spellCheck="false"
                        placeholder="Update Name"
                    />

                    <BigButton onClick={updateDisplayName}>
                        Save
                                </BigButton>
                </SubmitWrapper>
                <br />
                <SubmitWrapper>
                    <input
                        value={currentUsername}
                        onKeyDown={e => something(e)}
                        onChange={change => {
                            setCurrentUsername(change.target.value);
                        }}
                        placeholder="Update user name"
                        spellCheck="false"
                    />

                    <BigButton onClick={updateUsername}>
                        Save
                    </BigButton>
                </SubmitWrapper>
                <br />
                <SubmitWrapper>
                    <input
                        value={currentEmail}
                        onKeyDown={e => something(e)}
                        onChange={change => {
                            setCurrentEmail(change.target.value);
                        }}
                        placeholder="Update email"
                        spellCheck="false"
                    />

                    <BigButton onClick={updateEmail}>
                        Save
                    </BigButton>
                </SubmitWrapper>

            </div>
        </>
    );
};

export default Settings;
