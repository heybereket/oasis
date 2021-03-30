import GithubLogo from "../static/github.svg";
import firebase, { loginGitHub, logout } from "../data/firebase";
import { Link } from "react-router-dom";
import "../style/Navbar.css";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const user = firebase.auth().currentUser;
  const { t } = useTranslation();

  return (
    <>
      <header className="navbar">
        <div className="navbar__title navbar__item"></div>
        <Link to="/new">
          {" "}
          <div className="navbar__item">
            {t('header.submit')}
          </div>
        </Link>
        <div className="navbar__item">
          
          {user ? (
            <span onClick={logout}>
              Sign Out
            </span>
          ) : (
            <span onClick={loginGitHub}>
              Sign up/in
            </span>
          )}
        </div>
        <a
          href="https://github.com/heybereket/oasis"
          target="_blank"
          rel="norefer"
        >
          <div className="navbar__item">
            <img height={20} src={GithubLogo} className="github-logo" />
          </div>
        </a>
      </header>

      <br />
      <br />

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
