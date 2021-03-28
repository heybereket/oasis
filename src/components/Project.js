import { withRouter } from "react-router-dom";
import firebase from "../data/firebase";
import { colours } from "../lib/constants.js";
import { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import "../style/Project.css";

function Project(props) {
  const db = firebase.firestore();
  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const name = props.match.params.name;
  const owner = props.match.params.owner;
  var docRef = db
    .collection("repos")
    .where("name", "==", name)
    .where("owner", "==", owner);

  docRef.get().then(querySnapshot => {
    const empty = querySnapshot.empty;

    if (empty) {
      window.location = `/new?repo=https://github.com/${props.match.params.owner}/${props.match.params.name}`;
    } else {
      querySnapshot.forEach(doc => {
        const projectData = doc.data();
        setProject(projectData);
        setIsLoading(false);
      });
    }
  });

  return (
    <div>
      {isLoading ? (
        <p class="center">fetching</p>
      ) : (
        <div>
          <Helmet>
            <title>
              Oasis: {project.owner}/{project.name}
            </title>
          </Helmet>

          <Navbar />

          <div class="image-with-text">
            <h1 className="project-name-heading">
              {project.owner}/{project.name}
            </h1>

            <div className="data-wrappper">
              <div className="language">
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
                          &nbsp;
                    {project.language}
                  </button>
                )}

                {!(project.language in colours) &&
                  project.language != null && (
                    <button className="language">
                      <svg viewBox="0 0 80 80" width="10" height="10">
                        <circle
                          style={{ fill: "#fff" }}
                          className="circle"
                          cx="40"
                          cy="40"
                          r="38"
                        />
                      </svg>
                            &nbsp;
                      {project.language}
                    </button>
                  )}

                {project.language === null && (
                  <button className="language">
                    <svg viewBox="0 0 80 80" width="10" height="10">
                      <circle
                        style={{ fill: "#fff" }}
                        className="circle"
                        cx="40"
                        cy="40"
                        r="38"
                      />
                    </svg>
                          &nbsp; N/A
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(Project);
