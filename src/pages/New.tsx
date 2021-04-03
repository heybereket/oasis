import { useState, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import firebase from '../data/firebase';
import { deleteRepo } from '../utils/controls';

import { ISingleProject } from '../entities/ProjectEntity';
import { SubmitForm } from '../components/newPage/SubmitForm';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Buttons';

const SubText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
    span {
        margin: 0 0 .5rem 0;
    }
    small {
        font-size: .8rem;
    }
`;

const New: FC = () => {
    let db = firebase.firestore();
    const { t } = useTranslation();
    const user = firebase.auth().currentUser;
    const [list, setList] = useState<ISingleProject[]>([]);

    useEffect(() => {
        db.collection('repos').get().then(snapshot => {
            let projects: any = [];

            snapshot.forEach(doc => {
                projects.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setList(projects);
        });
    }, [db]);

    return (
        <>
            <PageHeader subTitle={t('new.addRepoHeader')} />
            <SubmitForm />

            <SubText>
                <span>
                    {user && <strong>{user.displayName}'s Submitted Repositories:</strong>}
                </span>
                <small>{user ? `Manage repositories you've submitted.` : ''}</small>
            </SubText>

            <div className="repos">
                {(
                    list.map((project: any, index: number) =>
                        (user ? project.submitted_by === user.email : '') && (
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
                                    <Button onClick={() => deleteRepo(project.id)}
                                    >
                                        ❌ Remove Repo
                                    </Button>
                                </div>
                            </div>
                        )
                    )
                )}
            </div>
        </>
    );
};

export default New;
