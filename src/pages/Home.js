import '../style/App.css';
import tools from '../data/tools.json';
import { colours } from '../lib/constants.js'
import { useState, useEffect } from 'react';
import { Navbar, Footer, Loading } from '../components'
import { countBy } from 'lodash';
import firebase from '../data/firebase'
import { Link } from 'react-router-dom'

// import custom components
import Button from "../components/homeComponents/categoryButton"
import Header from "../components/homeComponents/Header"

// importing utility functions
import { searchTools, filterToolsByCategory } from "../utils/filterTools"

// import icons
import logo from '../static/oasis-logo.png'
import forkIcon from "../assets/icons/forkIcon.svg"

// Home component
const Home = () => {
  const sampleProjects = JSON.parse(JSON.stringify(tools))
  // makes a list of just the categories of the tools
  const db = firebase.firestore();
  const [list, setList] = useState(sampleProjects) // use sample projects list in development
  const [isLoading, setIsLoading] = useState(false) // will use useEffect to load projects when in prod and set this to false once done

  const allCategories = list.filter(project => project.language != null).map(project => project.language)
  const countCategories = countBy(allCategories)
  const [currCategory, setCurrCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleTools, setVisibleTools] = useState(tools)
  const user = firebase.auth().currentUser;

  
  // if searchQuery or currCategory changes, then update visibleTools
  useEffect(() => {
    setVisibleTools(
      filterToolsByCategory(tools, currCategory)
    )
  }, [searchQuery, currCategory])
  
  const changeSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  //enable live project fetching in prod

/*   useEffect(() => {
    db.collection("projects")
      .orderBy('date_added')
      .onSnapshot((snapshot) => {
        let projects = [];

        snapshot.forEach((doc) => {
          projects.push({
            id: doc.id, 
            ...doc.data()
          });
        });
        setList(projects);
        setIsLoading(false)
      });
  }, []); */


  return (
    <div>
 
     <Navbar />
     <Header 
     user={user} 
     logo={logo} 
     searchQuery={searchQuery} 
     changeSearch={changeSearch} 
     currCategory={currCategory} 
     countCategories={countCategories}
     categoryHandler={setCurrCategory}
     list={list}
     />

      { (visibleTools.length === 0) && (
          <center>
            <span className="no-results">
              😥 No results found for 
              <strong>
                {searchQuery}
              </strong>.
            </span>
          </center>

      )}

        
      <div className="tools">
        {
          
             isLoading ? 
            <Loading message="repos"/> : 
          list.map((project, index) => (
            
            <Link to={`/${project.owner}/${project.name}`} rel="noreferrer">
            <div className="tool">

            { (project.fork === true) && (
                   <div className="fork-icon" title={`${project.full_name} is a forked repository`}>
                     {forkIcon}
                   </div>
               )}


              <img alt={`${project.owner.toLowerCase()}'s logo`} className="display" src={project.avatar}/>
              <p key={index}><span className="owner">{project.owner}</span>/<span className="name">{project.name}</span></p>
              
              { (project.desc != null) && (
                    <small>{project.desc}</small>
               )}

              { (project.desc === null) && (
                    <small>No description.</small>
               )}

              <div className="category-wrapper">

                
              {(project.language in colours) && (
                <button className="language">
                  <svg viewBox="0 0 80 80" width="10" height="10">
                      <circle style={{fill: colours[project.language]}} className="circle" cx="40" cy="40" r="38"/>
                    </svg>
                    &nbsp;
                    {project.language}</button>   
               )}

               {!(project.language in colours) && (project.language != null) && (
                <button className="language">
                  <svg viewBox="0 0 80 80" width="10" height="10">
                      <circle style={{fill: '#fff'}} className="circle" cx="40" cy="40" r="38"/>
                  </svg>
                    &nbsp;
                    {project.language}
                </button>   
               )}

              {(project.language === null) && (
                <button className="language">
                  <svg viewBox="0 0 80 80" width="10" height="10">
                      <circle style={{fill: '#fff'}} className="circle" cx="40" cy="40" r="38"/>
                    </svg>
                    &nbsp;
                    N/A</button>   
               )}
 
              <button className="issues">🚨 {project.issues} issues</button>
               <br/>
               <button className="stars">⭐ {project.stars} stars</button>

              </div>
              
            </div>
             </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
