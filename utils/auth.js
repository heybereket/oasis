import { getFirebase } from './firebase';
const firebase = getFirebase();
import 'firebase/auth';

export default async function signInWithGitHub() {
  var provider = new firebase.auth.GithubAuthProvider();

  provider.setCustomParameters({
    allow_signup: 'true',
  });
  return await firebase
    .auth()
    .signInWithPopup(provider)
    .then(async response => {
      if (!response && response.user) return;
      return await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + '/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: await response.user.getIdToken(),
          githubToken: response.credential.accessToken,
        }),
      });
    });
}

export async function signOut(cookie) {
  return await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + '/auth', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionCookie: cookie }),
  });
}
