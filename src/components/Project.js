import { withRouter } from "react-router-dom";
import firebase from "../data/firebase";
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

          <div class="container">
	<div class="innerwrap">
		<section class="section1 clearfix">
			<div>
				<div class="row grid clearfix">
					<div class="col2 first">
						<img src="http://images.contactmusic.com/newsimages/david_beckham_1133321.jpg" alt=""/>
						<h1>david beckham</h1>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
						<span>Follow</span>
					</div>
					<div class="col2 last">
						<div class="grid clearfix">
							<div class="col3 first">
								<h1>694</h1>
								<span>Following</span>
							</div>
							<div class="col3"><h1>452</h1>
							<span>Likes</span></div>
							<div class="col3 last"><h1>1207</h1>
							<span>Bookmarks</span></div>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<ul class="row2tab clearfix">
						<li><i class="fa fa-list-alt"></i> My posts </li>
						<li><i class="fa fa-heart"></i> My likes </li>
						<li><i class="fa fa-check"></i> Following </li>
						<li><i class="fa fa-thumbs-o-up "></i> Suggestions </li>
					</ul>
				</div>
			</div>
			<span class="smalltri">
				
			<i class="fa fa-star"></i>
			</span>
		</section>

	</div>
</div>	
        </div>
      )}
    </div>
  );
}

export default withRouter(Project);
