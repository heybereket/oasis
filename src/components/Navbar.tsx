import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import GithubLogo from '../static/github.svg';
import OasisLogo from '../static/oasis-logo.png';
import firebase, { loginGitHub, logout } from '../data/firebase';
import { colorStack } from '../styledHelpers/colorStack';

const Wrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${colorStack.grey};
    background-color: ${colorStack.bgBlack};
    position: fixed;
    width: 100%;
    z-index: 1;
    padding: 1rem;
    top: 0;
`;

const MenuElem = styled.div`
    cursor: pointer;
    vertical-align: middle;
    color: ${colorStack.textGrey};
    transition: color ease 0.3s;
    font-weight: 600;
    margin: 0 0 0 1rem;
    &:hover {
        color: ${colorStack.white};
    }
`;

const GitLogo = styled.img`
    width: 23px;
    height: 23px;
    transition: all ease 0.3s;
    &:hover {
        transform: translateY(-3px);
    }
`;

const Logo = styled(Link)`
    img {
        width: 100px;
    }
`;

const RightLinks = styled.div`
    display: flex;
    align-items: center;
`;

export const Navbar: FC = () => {
    const user = firebase.auth().currentUser;
    const { t } = useTranslation();

    return (
        <Wrapper>
            <Logo to="/">
                <img src={OasisLogo} alt="Oasis logo" />
            </Logo>
            <RightLinks>
                <Link to="/new">
                    <MenuElem>
                        {t('header.submit')}
                    </MenuElem>
                </Link>
                {user ? (
                    <MenuElem onClick={logout}>
                        Sign Out
                    </MenuElem>
                ) : (
                    <MenuElem onClick={loginGitHub}>
                        Sign up/in
                    </MenuElem>

                )}
                <a href="https://github.com/heybereket/oasis" target="_blank" rel="noreferrer">
                    <MenuElem>
                        <GitLogo src={GithubLogo} alt="Github Logo" />
                    </MenuElem>
                </a>
            </RightLinks>
        </Wrapper>
    );
};