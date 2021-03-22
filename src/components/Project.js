import { withRouter } from 'react-router-dom'
import firebase from '../data/firebase'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import Navbar from './Navbar'
import '../style/Project.css'

function Project(props){
    const db = firebase.firestore();
    const [project, setProject] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const name = props.match.params.name
    const owner = props.match.params.owner
    var docRef = db.collection("projects").where('name', '==', name).where('owner', '==', owner);

docRef.get()
    .then((querySnapshot) => {
      const empty = querySnapshot.empty

      if(empty){
        window.location = "/new"
      } else {
            querySnapshot.forEach((doc) => {
                const projectData = doc.data()
                setProject(projectData)
                setIsLoading(false)
            });}
        })


    return(
    <div>
    
    {
    
    isLoading ? 
    <p class="center">fetching</p> : 
    
    <div>
        <Helmet>
          <title>codetribute: {project.owner}/{project.name}</title>
        </Helmet>

    <Navbar />

    <div class="image-with-text">
  <h1 className="project-name-heading">{project.owner}/{project.name}</h1>
</div>


    </div>

    }
    
    </div>

    )
}

export default withRouter(Project);