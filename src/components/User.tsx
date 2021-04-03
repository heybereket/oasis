import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { useState, useEffect, FC } from 'react';

import firebase from '../data/firebase';
import { colours } from '../lib/constants';
import Loading from './Loading';
import { FaGithub, FaTwitter, FaLink } from 'react-icons/fa';

type IUserProps = RouteComponentProps<{ username: string }>;

const User: FC<IUserProps> = (props) => {
    const db = firebase.firestore();
    const history = useHistory();
    const [user, setUser] = useState<any>();
    const [list, setList] = useState<any>([]);
    const [empty, setEmpty] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const username = props.match.params.username;
    let docRef = db
        .collection("users")
        .where("username", "==", username);

    docRef.get().then(querySnapshot => {
        const empty = querySnapshot.empty;

        if (empty) {
            history.push('/');
        } else {
            querySnapshot.forEach(doc => {
                const userData = doc.data();
                setUser(userData as any);
                setIsLoading(false);
            });
        }
    });

    useEffect(() => {
        db.collection('repos').where("submitted_by", "==", username)
            .onSnapshot(snapshot => {

                setEmpty(snapshot.empty);
                let projects: any = [];

                snapshot.forEach(doc => {
                    projects.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setList(projects);
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            {isLoading ? (
                <p className="center">fetching</p>
            ) : (
                <div>

                    <div className="main-profile-wrapper">
                        <header>
                            <div className="header-content">
                                <img
                                    className="avatar"
                                    alt={`@${user?.username}'s avatar`}
                                    title={`@${user?.username}'s avatar`}
                                    draggable="false"
                                    src={user.avatar}
                                />
                                <h1 className="display-name"><strong>{user.name}</strong> {user.verified === true &&
                                    <svg height="23" width="23" fill="#dee3ea" viewBox="0 0 512 512">
                                        <g>
                                            <path className="st0" d="M512,268c0,17.9-4.3,34.5-12.9,49.7c-8.6,15.2-20.1,27.1-34.6,35.4c0.4,2.7,0.6,6.9,0.6,12.6   c0,27.1-9.1,50.1-27.1,69.1c-18.1,19.1-39.9,28.6-65.4,28.6c-11.4,0-22.3-2.1-32.6-6.3c-8,16.4-19.5,29.6-34.6,39.7   C290.4,507,273.9,512,256,512c-18.3,0-34.9-4.9-49.7-14.9c-14.9-9.9-26.3-23.2-34.3-40c-10.3,4.2-21.1,6.3-32.6,6.3   c-25.5,0-47.4-9.5-65.7-28.6c-18.3-19-27.4-42.1-27.4-69.1c0-3,0.4-7.2,1.1-12.6c-14.5-8.4-26-20.2-34.6-35.4   C4.3,302.5,0,285.9,0,268c0-19,4.8-36.5,14.3-52.3c9.5-15.8,22.3-27.5,38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3   c0-27,9.1-50.1,27.4-69.1c18.3-19,40.2-28.6,65.7-28.6c11.4,0,22.3,2.1,32.6,6.3c8-16.4,19.5-29.6,34.6-39.7   C221.6,5.1,238.1,0,256,0c17.9,0,34.4,5.1,49.4,15.1c15,10.1,26.6,23.3,34.6,39.7c10.3-4.2,21.1-6.3,32.6-6.3   c25.5,0,47.3,9.5,65.4,28.6c18.1,19.1,27.1,42.1,27.1,69.1c0,12.6-1.9,24-5.7,34.3c16,7.6,28.8,19.3,38.3,35.1   C507.2,231.5,512,249,512,268z M245.1,345.1l105.7-158.3c2.7-4.2,3.5-8.8,2.6-13.7c-1-4.9-3.5-8.8-7.7-11.4   c-4.2-2.7-8.8-3.6-13.7-2.9c-5,0.8-9,3.2-12,7.4l-93.1,140L184,263.4c-3.8-3.8-8.2-5.6-13.1-5.4c-5,0.2-9.3,2-13.1,5.4   c-3.4,3.4-5.1,7.7-5.1,12.9c0,5.1,1.7,9.4,5.1,12.9l58.9,58.9l2.9,2.3c3.4,2.3,6.9,3.4,10.3,3.4   C236.6,353.7,241.7,350.9,245.1,345.1z" />
                                        </g>
                                    </svg>} </h1>

                                {user.bio !== null && <p className="bio">{user.bio}</p>}
                                {user.bio === null && <p className="bio">No bio created.</p>}


                                <small className="joined">🏆 Joined {user.created}</small> <br />

                                <div className="category-wrapper">
                                    <a className="social" href={`https://github.com/${user.username}`} target="_blank" rel="noreferrer">
                                        <FaGithub size={25} />
                                    </a>

                                    {user.twitter !== null &&
                                        <a className="social" href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noreferrer">
                                            <FaTwitter size={25} />
                                        </a>
                                    }

                                    {user.link !== null &&
                                        <a className="social" href={`${user.link}`} target="_blank" rel="noreferrer">
                                            <FaLink size={25} />
                                        </a>
                                    }

                                </div>

                            </div>

                        </header>

                        <p className="recently-submitted"><strong>Recently submitted repos:</strong></p>


                        {empty ? (
                            <div>

                                <small className="not-submitted"><strong className="handle-ns">@{user.username}</strong> has not submitted any repos yet.</small>
                            </div>
                        ) : (
                            <div className="repos">
                                {isLoading ? (
                                    <Loading message="repos" />
                                ) : (
                                    <div className="repos">

                                        {list.map((project: any, index: number) => (
                                            <div className="repo">
                                                {project.fork === true && (
                                                    <div
                                                        className="fork-icon"
                                                        title={`${project.full_name} is a forked repository`}
                                                    >
                                                        <svg
                                                            viewBox="0 0 16 16"
                                                            version="1.1"
                                                            width="20"
                                                            height="20"
                                                            aria-hidden="true"
                                                            fill="white"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                )}

                                                <img
                                                    alt={`${project.owner.toLowerCase()}'s logo`}
                                                    className="display"
                                                    src={project.avatar}
                                                    title={project.owner}
                                                />

                                                <p key={index}>
                                                    <span className="owner">{project.owner}</span>
                                                    <span className="name">{project.name}</span>
                                                </p>

                                                {project.desc !== null && <small>{project.desc}</small>}

                                                {project.desc === null && <small>No description.</small>}

                                                <div className="category-wrapper">
                                                    {project.language in colours && (
                                                        <button className="language">
                                                            <svg viewBox="0 0 80 80" width="10" height="10">
                                                                <circle
                                                                    style={{ fill: colours[project.language] }}
                                                                    className="circle"
                                                                    cx="40"
                                                                    cy="40"
                                                                    r="38"
                                                                />
                                                            </svg>
                                                            {project.language}
                                                        </button>
                                                    )}

                                                    {!(project.language in colours) && project.language !== null && (
                                                        <button className="language">
                                                            <svg viewBox="0 0 80 80" width="10" height="10">
                                                                <circle
                                                                    style={{ fill: '#fff' }}
                                                                    className="circle"
                                                                    cx="40"
                                                                    cy="40"
                                                                    r="38"
                                                                />
                                                            </svg>
                                                            {project.language}
                                                        </button>
                                                    )}

                                                    {project.language === null && (
                                                        <button className="language">
                                                            <svg viewBox="0 0 80 80" width="10" height="10">
                                                                <circle
                                                                    style={{ fill: '#fff' }}
                                                                    className="circle"
                                                                    cx="40"
                                                                    cy="40"
                                                                    r="38"
                                                                />
                                                            </svg>
										                    N/A
                                                        </button>
                                                    )}

                                                    {project.issues > 1000 ? (
                                                        <button className="issues">🚨 1k+ issues</button>
                                                    ) : (
                                                        <button className="issues">🚨 {project.issues} issues</button>
                                                    )}

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}


                            </div>
                        )}



                    </div>

                    {/* <style jsx>
                        {`
		body {
			text-align: center; 
			align-items: center;
			justify-content: center;
			overflow: hidden;
		}

		.avatar {
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-o-user-select: none;
			user-select: none;
		}
		
		.display-name {
			color: #dee3ea;
		}

        .bio {
			margin-top: 3px;
			color: #cfd6e6;
			padding: 0 15px;
			margin-bottom: 5px;
		}

		.joined {
			color: rgba(168,179,207,0.64);
		}

		.social {
			margin: 8px;
		}

		.not-submitted {
			color: #dee3ea;
		}

		.handle-ns {
			color: #8b8f98;
		}

		.recently-submitted {
			margin-bottom: -3px;
		}

		 
        `}
                    </style> */}

                </div>
            )}
        </div>
    );
}

export default withRouter(User);
