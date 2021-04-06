import { parseCookies } from 'nookies';
import { Component } from 'react';

import signInWithGitHub, { signOut } from '../../utils/auth';
import verifyCookie from '../../utils/verifyCookie';

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  if (!cookies.user) return { props: { auth: { hasAuth: false } } };
  var cookieAuth = await verifyCookie(cookies.user);
  return { props: { auth: cookieAuth, cookie: cookies.user } };
}

class Dashboard extends Component {
  state = {
    auth: this.props.auth.hasAuth,
  };
  render() {
    if (this.state.auth) {
      return (
        <div className={`w-screen h-screen flex flex-col items-center justify-center`}>
          <div className={`m-4 rounded-md shadow-md py-6 flex px-4 items-center`}>
            <img className={`w-20 rounded-full`} src={this.props.auth.avatar}></img>
            <div className={`ml-4 flex flex-col`}>
              <a
                href={this.props.auth.url}
                className={`text-xl font-semibold hover:text-blue-500 hover:underline`}
              >
                Welcome, {this.props.auth.username}
              </a>
              <h1 className={`text-gray-700 mb-2`}>{this.props.auth.bio}</h1>
              <h1 className={`text-xs text-gray-500 font-mono`}>User ID: {this.props.auth.uid}</h1>
              <h1 className={`text-xs text-gray-500 font-mono`}>
                Date Created:{' '}
                {new Date(this.props.auth.created._seconds * 1000).toLocaleDateString()}
              </h1>
              <button
                onClick={async () => {
                  var signOutReq = await signOut(this.props.cookie);
                  signOutReq = await signOutReq.json();
                  if (signOutReq.status == 'success') this.setState({ auth: false });
                }}
                className={`font-semibold mt-2 rounded-full bg-red-500 hover:bg-red-700 transition duration-200 text-white shadow-md px-4 py-2 `}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mx-4 lg:mx-0 flex flex-col items-center justify-center  h-screen text-center">
          <h1 className="text-xl text-gray-500 mb-3">Current status: Not logged in!</h1>
          <button
            onClick={async () => {
              var login = await signInWithGitHub();
              login = await login.json();
              if (login.status === 'success') window.location.reload();
            }}
            className="mt-2 py-2 px-6 font-bold text-white rounded-full bg-black hover:text-black hover:bg-white transition duration-200 ease-in-outshadow-md hover:shadow-xl"
          >
            Login
          </button>
        </div>
      );
    }
  }
}

export default Dashboard;
