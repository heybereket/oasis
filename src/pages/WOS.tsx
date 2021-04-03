import { useState, useEffect, FC } from 'react';
import { useLocation } from 'react-router-dom';
import { isDesktop } from 'react-device-detect';

import firebase, { loginGitHub } from '../data/firebase';
import { PageHeader } from '../components/common/PageHeader';
import { SubmitWrapper } from '../styledHelpers/GlobalStyle';
import { BigButton } from '../components/common/Buttons';

const WOS: FC = () => {
    let db = firebase.firestore();
    const [list, setList] = useState([]);
    const [error, setError] = useState<string>('');
    const [sourcerName, setSourcerName] = useState<string>('');
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
            <PageHeader subTitle="Add yourself to the wall!" title={isDesktop ? `💙 Wall of Open Sourcers` : `💙 Open Sourcers`} />
            <SubmitWrapper>
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
                    <BigButton onClick={sendData}>
                        Add {sourcerName > '' ? '@' + sourcerName : ''} to the wall
                    </BigButton>
                ) : (
                    <BigButton onClick={loginGitHub}>
                        Sign in to add {sourcerName > '' ? '@' + sourcerName : ''}
                    </BigButton>
                )}

            </SubmitWrapper>
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

        </>
    );
};

export default WOS;
