import '../style/App.css';
import tools from "../data/tools.json"
import { colours } from '../lib/constants.js'
import { useState, useEffect } from 'react';
import { Navbar, Footer, Loading } from '../components'
import { countBy } from 'lodash';
import firebase from '../data/firebase'
import { Link } from 'react-router-dom'

// import custom components
// import Button from "../components/homeComponents/categoryButton"
import Header from "../components/homeComponents/Header"

// importing utility functions
import { searchTools, filterToolsByCategory } from "../utils/filterTools"

// import icons
import logo from '../static/oasis-logo.png'
// import forkIcon from "../assets/icons/forkIcon.svg"

// importing utility functions
import InfiniteScroll from "react-infinite-scroll-component";
// import { render } from "@testing-library/react";

const Home = () => {
  const sampleProjects = JSON.parse(JSON.stringify(tools))
  // makes a list of just the categories of the tools
  const db = firebase.firestore();
  const allTools = tools

  const [currCategory, setCurrCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleTools, setVisibleTools] = useState(allTools)
  const [list, setList] = useState(sampleProjects);
  const [isLoading, setIsLoading] = useState(false); // set loading to true in production
  const [hasMoreRepos, setHasMoreRepos] = useState(true);

  const countCategories = countBy(list)

  const allCategories = list
    .filter(project => project.language != null)
    .map(project => project.language);
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

  const handlerFormSubmit = (event) => {
    event.preventDefault() // prevent browser reloading when form submitted
    let result = searchTools(searchQuery, list)
    if (searchQuery.toLowerCase() === "") {
      setList(allTools)
    } else if (searchQuery.toLowerCase() === "all") {
      setList(allTools)
    } else {
      setList(result)
    }
  }

  //enable live project fetching in prod

{/*
useEffect(() => {
    const getRepos = async () => {
      try {
        db.collection("repos")
          .orderBy("date_added")
          .limit(8)
          .onSnapshot(snapshot => {
            let projects = [];

            snapshot.forEach(doc => {
              projects.push({
                id: doc.id,
                ...doc.data()
              });
            });

            // for (const doc of snapshot.docs)
            //   projects = _.concat(projects, {
            //     id: doc.id,
            //     ...doc.data()
            //   });

            setList(projects);
            setIsLoading(false);
          });
      } catch (err) {
        console.error(err);
      }
    };
    getRepos();
  }, []);

  const fetchMoreData = async () => {
    const lastDoc = list[list.length - 1];

    try {
      db.collection("repos")
        .orderBy("date_added")
        .limit(8)
        .startAfter(lastDoc.date_added)
        .onSnapshot(snapshot => {
          let projects = [...list];

          if (snapshot.docs.length) {
            snapshot.forEach(doc => {
              projects.push({
                id: doc.id,
                ...doc.data()
              });
            });

            setList(projects);
          } else {
            setHasMoreRepos(false);
          }

          // for (const doc of snapshot.docs)
          //   projects = _.concat(projects, {
          //     id: doc.id,
          //     ...doc.data()
          //   });
        });
    } catch (err) {
      console.error(err);
    }
  };
*/}

  return (
    <div>
 
     <Navbar />
     <Header 
     user={user} 
     logo={logo} 
     searchQuery={searchQuery} 
     changeSearch={changeSearch} 
     searchQueryHandler={setSearchQuery}
     currCategory={currCategory} 
     countCategories={countCategories}
     categoryHandler={setCurrCategory}
     list={list}
     formSubmitHandler={handlerFormSubmit}
     allTools={allTools}
     />

    {visibleTools.length === 0 && (
        <center>
          <span className="no-results">
            😥 No results found for <strong>{searchQuery}</strong>.
          </span>
        </center>
      )}

      <div className="tools">
        {isLoading ? (
          <Loading message="repos" />
        ) : (
              <InfiniteScroll
            dataLength={list.length}
            next={list}
            //next={fetchMoreData}
            hasMore={hasMoreRepos}
            loader={<Loading message="more repos" />}
            endMessage={
              <p style={{ textAlign: "center", color: "white" }}>
                <b>No more repositories</b>
              </p>
            }
          >
          
            <div>
              <div className="tools">
              {list.map((project, index) => (
                <Link
                  key={project.url + index}
                  to={`/${project.owner}/${project.name}`}
                  rel="noreferrer"
                >
                  <div className="tool">
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
                    />
                    <p key={index}>
                      <span className="owner">{project.owner}</span>/
                      <span className="name">{project.name}</span>
                    </p>

                    {project.desc != null && <small>{project.desc}</small>}


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

                      <button className="issues">
                        🚨 {project.issues} issues
                      </button>
                      <br />
                      <button className="stars">
                        ⭐ {project.stars} stars
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            </div>
          </InfiniteScroll>
        )}
      </div>
      <Footer />
    </div>

      
  );
};

export default Home;
