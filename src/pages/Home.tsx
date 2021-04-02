import React, { useState, useEffect, FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import _ from 'lodash';
import styled from 'styled-components';

import { Navbar, Footer, Loading } from '../components';
import firebase from '../data/firebase';
import logo from '../static/oasis-logo.png';
import BackToTop from '../components/BackToTop';
import RepositoryList from '../components/RepositoryList';
import '../style/App.css';
import { Button } from '../components/common/Button';

import { ISingleProject } from '../entities/ProjectEntity';

const Center = styled.div`
    text-align: center;
`;

const Home: FC = () => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const { t } = useTranslation();
    const [list, setList] = useState<ISingleProject[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const allCategories = list.filter(project => project.language !== null).map(project => project.language);
    const countCategories = _.countBy(allCategories);
    const [currCategory, setCurrCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const projectsFilteredByCategoryAndSearchQuery = list.filter(project => {
        const projectFullname = project.owner + project.name;
        if (!projectFullname.includes(searchQuery)) return false;
        if (currCategory === 'All') return true;
        if (project.language === currCategory) return true;
        return false;
    });

    const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const getRepos = async () => {
            try {
                db.collection('repos')
                    .orderBy('stars')
                    .onSnapshot(snapshot => {
                        let projects:any = []

                        snapshot.forEach(doc => {
                            projects.push({
                                id: doc.id,
                                ...doc.data()
                            });
                        });

                        setList(projects);
                        setIsLoading(false);
                    });
            } catch (err) {
                console.error(err);
            }
        }
        getRepos();
    }, []);

    return (
        <div>
            <Navbar />

            <header>
                <div className="header-content">
                    <Link to="/">
                        <img
                            alt={user ? user.displayName?.toLowerCase() + "'s avatar" : 'Oasis Logo'}
                            className="logo"
                            src={logo}
                        />
                    </Link>
                    <br /> <br /> <br />
                    <div className="search-wrapper">
                        <input
                            className="search"
                            type="text"
                            autoComplete="off"
                            spellCheck="false"
                            placeholder={t('home.searchProjectsPlaceholder')}
                            value={searchQuery}
                            onChange={changeSearch}
                        />
                        <div className="filter-wrapper">
                            <Button
                                category="All"
                                onClick={setCurrCategory}
                                isActive={currCategory === 'All'}
                            />

                            {Object.keys(countCategories).map(category => (
                                <Button
                                    key={category}
                                    category={category}
                                    isActive={category === currCategory}
                                    onClick={setCurrCategory}
                                    count={countCategories[category]}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {projectsFilteredByCategoryAndSearchQuery.length === 0 && searchQuery.length > 0 && (
                <Center>
                    <span className="no-results">
                        <Trans
                            t={t}
                            i18nKey="home.visibleToolsNoContent"
                            values={{ query: searchQuery }}
                            components={{ bold: <strong /> }}
                        />
                    </span>
                </Center>
            )}

            <div>
                {isLoading ? <Loading message="repos" /> : <RepositoryList repositories={projectsFilteredByCategoryAndSearchQuery} />}
            </div>

            <BackToTop />
            <Footer />
        </div>
    );
};

export default Home;