import GithubLogo from '../static/github.svg'
import firebase, { loginGitHub, logout } from '../data/firebase'
import { Link } from 'react-router-dom'
import '../style/Navbar.css'

const Navbar = () => {

const user = firebase.auth().currentUser;

  return (
    <>

<header className='navbar'>
<div className='navbar__title navbar__item'></div>
<Link to="/new"> <div className='navbar__item'>Submit</div></Link>
<div className='navbar__item'> {user ? <span onClick={logout}>Sign Out</span> : <span onClick={loginGitHub}>Sign in/up</span>}</div>  
<a href="https://github.com/heybereket/codetribute" target="_blank" rel="norefer">
<div className='navbar__item'>
<img
  height={20}
  src={GithubLogo}
  className="github-logo"
/>
</div>      
</a>
</header>

<br/><br/>

<style jsx>
        {`
          
          .oasis-logo {
              width: 50px;
          }
        `}
      </style>

    </>
  );
};

export default Navbar;


