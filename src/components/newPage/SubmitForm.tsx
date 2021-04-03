import { FC, useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import firebase, { loginGitHub } from '../../data/firebase';
import { colorStack } from '../../styledHelpers/colorStack';
import { BigButton } from '../common/Buttons';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        padding: 1rem 1.25rem;
        margin: 0px 0px 1.25rem;
        background: transparent;
        border: 2px solid ${colorStack.white};
        outline: none;
        appearance: none;
        font-size: 1rem;
        font-family: Inter;
        border-radius: 4px;
        width: 90%;
        max-width: 800px;
        color: ${colorStack.white};
    }
`;

export const SubmitForm: FC = () => {
    const { t } = useTranslation();
    let db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const [projectURL, setProjectURL] = useState<string>('');
    const history = useHistory();
    const [error, setError] = useState<string>('');
    const search = useLocation().search;
    const repo = new URLSearchParams(search).get('repo');

    const sendData = useCallback(async () => {
        // TODO: Refactor this method
        if (projectURL === '') {
            setError("Repository URL can't be blank");
            return;
        } else if (!/^(http[s]?:\/\/)(www\.)?github\.com\/[a-zA-Z0-9-]*\/[a-zA-Z0-9]*/.test(projectURL)) {
            setError('Invalid GitHub Repository URL');
            return;
        }
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
            setError('Repository already added');
            return;
        } else if (data.archived) {
            setError('Repository is archived');
            return;
        } else if (data.open_issues <= 5) {
            setError('Repository should have at least 5 issues so it is ready for contributions.');
            return;
        } else {
            await projectRef.set(repoData);
        }

        history.push('/');
    }, [db, projectURL, user?.email, history]);

    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            sendData();
        }
    };

    const changeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setProjectURL(text);
    }, []);

    return (
        <Wrapper>
            {error && (
                <label className="paste-in-label">
                    <span style={{ color: 'coral' }}>Error:</span> {error}
                </label>
            )}
            <input placeholder={t('new.addRepoPlaceholder')}
                value={repo as string}
                onKeyDown={keyDownHandler}
                onChange={changeHandler}
            />

            {user ? (
                <BigButton onClick={sendData}>
                    {t('add Repo')}
                </BigButton>
            ) : (
                <BigButton onClick={loginGitHub}>
                    {t('new.signInToSubmit')}
                </BigButton>
            )}
        </Wrapper>
    );
};