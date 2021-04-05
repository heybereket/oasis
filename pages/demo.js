import { parseCookies } from 'nookies';
import { Component } from 'react';

import signInWithGitHub, { signOut } from '../utils/auth';
import verifyCookie from '../utils/verifyCookie';

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
        <div className="mx-4 lg:mx-0 flex flex-col items-center justify-center  h-screen text-center">
          <img src={this.props.auth.picture} className="w-24 h-24 rounded-full mb-8"></img>
          <h1 className="text-4xl mb-1">Welcome, {this.props.auth.username}!</h1>
          <h1 className="text-xl mb-3 text-gray-500">{this.props.auth.email}</h1>
          <h1 className="font-mono text-sm mb-1 text-gray-500">
            <b>User ID: </b>
            {this.props.auth.uid}
          </h1>

          <button
            onClick={async () => {
              var signOutReq = await signOut(this.props.cookie);
              signOutReq = await signOutReq.json();
              if (signOutReq.status == 'success') this.setState({ auth: false });
            }}
            className="mt-6 py-2 px-6 font-bold text-white rounded-full bg-red-600 hover:text-red-600 hover:bg-white transition duration-200 ease-in-outshadow-md hover:shadow-xl"
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="mx-4 lg:mx-0 flex flex-col items-center justify-center  h-screen text-center">
          <h1 className="text-4xl mb-1">Hmmm, why are you here?</h1>
          <h1 className="text-xl text-gray-500 mb-3">Whoops, seems like you aren't logged in!</h1>
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
