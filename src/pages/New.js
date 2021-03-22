import { useState, useEffect } from "react";
import firebase, { loginGitHub } from "../data/firebase";
import { Navbar, Loading } from '../components'

const New = () => {
  var db = firebase.firestore();
  const [list, setList] = useState([])
  const [error, setError] = useState("")
  const user = firebase.auth().currentUser;
  const [projectURL, setProjectURL] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    db.collection("projects")
      .get()
      .then((snapshot) => {
        let projects = [];

        snapshot.forEach((doc) => {
          projects.push({
            id: doc.id, 
            ...doc.data()
          });
        });
        setIsLoading(false)
        setList(projects);
      });
  }, []);

  const sendData = async () => {
    if (projectURL === ""){
      setError("Repository URL can't be blank")
      return
      
    } else if (!/^(http[s]?:\/\/)(www\.)?github\.com\/[a-zA-Z0-9-]*\/[a-zA-Z0-9]*/.test(projectURL) ) {
      setError("Invalid GitHub Repository URL")
      return
    }
    

     const user = firebase.auth().currentUser;
     setError("")

      // slice the url
      let url = new URL(projectURL)
      let newURL = url.pathname + url.search;

      const response = await fetch(`https://api.github.com/repos${newURL}`)
      const data = await response.json()

      if (response.status == 404){
        setError("Repository does not exist")
        return
      } 

      const repoData = {
        name: data.name,
        full_name: data.full_name,
        owner: data.owner.login,
        desc: data.description,
        avatar: data.owner.avatar_url,
        url: data.html_url,
        language: data.language,
        issues: data.open_issues_count,
        stars: data.stargazers_count,
        archived: data.archived,
        fork: data.fork,
        submitted_by: user.email,
        date_added: new Date().toLocaleDateString(),
        time_added: new Date().toLocaleTimeString()
      }

      const projectRef = db.collection("projects").doc(data.owner.login.toLowerCase() + "-" + data.name.toLowerCase())
      const project = await projectRef.get() 

      if (project.exists){
        setError("Repository already added")
        return

      } if (data.archived === true){
        setError("Repository is archived")
        return

      } else {
        await projectRef.set(repoData)
      }

      window.location.reload()

}

const DeleteRepo = async (id) => {
  await db.collection("projects").doc(id).delete()
  window.location.reload()
}


  return (
    <>

{ 

<div>

<Navbar/>

<div className="main-submit-wrapper">
<header>
        <div className="header-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          <h1 className="heading">{window.location.pathname}</h1>
          <p className="header-subtitle">Add a new repo to CodeTribute</p>
        </div>
</header>

<div className="wrapper-submit">
  {error && (<label className="paste-in-label"><span style={{color: 'coral'}}>Error:</span> {error}</label>)}
  <input 
  placeholder="full url (ex. https://github.com/heybereket/codetribute)"
  onChange={(change) => {
    setProjectURL(change.target.value);
  }}
  required
  />


  <button className="submit-repo" onClick={sendData}>Add Repo</button>

</div>
<br/>


<label className="submitted-label">{user ? <strong>{user.displayName}'s Submitted Repositories:</strong> : <span style={{fontWeight: 'normal'}}>To view submitted repos, <strong style={{cursor: 'pointer'}} onClick={loginGitHub}>sign in.</strong></span>}</label>
<br/>
<small>{user ? `Manage repositories you've submitted.` : ''}</small>

<div className="tools">
        {
          
            isLoading ? 
            <Loading message="submitted repos"/> : 
          list.map((project, index) => (
            (user ? project.submitted_by === user.email : "") && (
           
            <div className="tool">
              <img alt={`${project.owner.toLowerCase()}'s logo`} className="display" src={project.avatar}/>
              <br/>
              <p key={index}><span className="owner">{project.owner}</span>/<span className="name">{project.name}</span></p>

              <div className="category-wrapper">
              <button className="popular" onClick={() => DeleteRepo(project.id)}>❌ Remove Repo</button>
              </div>

            </div>
          )
        ))}
      </div>

    </div>
</div>

}

<style jsx>
        {`
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body {
            text-align: center;
            color: #fff;
          }

          .main-submit-wrapper {
           
          }
          
          .wrapper-submit {
            padding: 2rem;
            display: inline-block;
            float: none;
            max-width: 800px;
            width: 100%;
            margin: 0 auto;
            margin-top: -50px;
            
          }

          .wrapper-submit label {
            float: left;
            margin-bottom: 10px;
          }
          
          .wrapper-submit input, .wrapper-submit select, .notice {
            width: 100%;
            color: #fff;
            font-size: 10px;
            
          }

          .notice {
            border: 1px solid #5f6368;
            background-color: rgba(255,255,255,0.04);
            margin-bottom: 20px;
            text-align: left;
            padding: 1rem;
            border-radius: 4px;
          }

          .notice h2 {
            font-weight: 400;
          }
          
          .wrapper-submit input {
            font-weight: 400;
            font-size: .9rem;
            font-family: "Inter";
            border-radius: 4px;
          }

          .wrapper-submit input {
            float: left;
            padding: 0 1.25rem;
            margin: 0 0 1.25rem;
            line-height: 54px;
            background: transparent;
            border: 2px solid #fff;
            outline: none;
            -webkit-appearance: none;
          } 

          table, td, th {
            border: 1px solid #666;
          }

         
          .wrapper-submit textarea:focus, .wrapper-submit textarea:active {
            border-color: #fff;
          }
          .wrapper-submit input[type="submit"] {
            float: left;
            cursor: pointer;
            margin: 0;
            border: none;
            font-weight: bold;
            width: 100%;
            background: #000;
          }
          .wrapper-submit input[type="submit"]:hover,
          .wrapper-submit input[type="submit"]:focus {
            opacity: .7;
          }

          input::placeholder {
            color: lightgray;
          }

          .submit-repo {
            width: 100%;
            height: 50px;
            font-family: 'Inter';
            font-weight: 700;
            text-transform: uppercase;
            border: 2px solid #5f6368;
          }

          .submit-repo:hover {
            border: 2px solid #fff;
          }

          .submitted-label {
            text-align: left;
          }

          .tools {
            max-width: 960px;
            margin-top: 20px;
          }

          .tool {
            width: 352.5px;
            height: 175px;
          }
          
          @media (max-width: 550px){
            .tool {
                 width: 320px;
              }
          }

          button {
            cursor: pointer;
          }

          ::-webkit-scrollbar {
            background: transparent;
          }
          
          ::-webkit-scrollbar {
            width: 7px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-track {
            background: transparent;
            }
        `}
      </style>

    </>
  );
};

export default New;
