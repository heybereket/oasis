import { withRouter, RouteComponentProps, useHistory  } from 'react-router-dom';
import { useState, FC } from 'react';
import { Helmet } from 'react-helmet';

import firebase from '../data/firebase';
import Navbar from './Navbar';
import '../style/Project.css';

type IProjectProps = RouteComponentProps<{name: string, owner: string}>;

const Project: FC<IProjectProps> = (props) => {
    const db = firebase.firestore();
    let history = useHistory();
    const [project, setProject] = useState<{owner: string; name: string}>();
    const [isLoading, setIsLoading] = useState(true);

    const name = props.match.params.name;
    const owner = props.match.params.owner;
    let docRef = db
        .collection("repos")
        .where("name", "==", name)
        .where("owner", "==", owner);

    docRef.get().then(querySnapshot => {
        const empty = querySnapshot.empty;

        if (empty) {
            history.push(`/new?repo=https://github.com/${props.match.params.owner}/${props.match.params.name}`);
        } else {
            querySnapshot.forEach(doc => {
                const projectData = doc.data() as any;
                setProject(projectData);
                setIsLoading(false);
            });
        }
    });

    return (
        <div>
            {isLoading ? (
                <p className="center">fetching</p>
            ) : (
                <div>
                    <Helmet>
                        <title>
                            Oasis: {project?.owner}/{project?.name}
                        </title>
                    </Helmet>

                    <Navbar />
                </div>
            )}
        </div>
    );
}

export default withRouter(Project);
