import firebase from "firebase";

export const login = async () => {
  const provider = new firebase.auth.GithubAuthProvider();
  
  provider.setCustomParameters({
    allow_signup: 'true',
  });

  const login = await firebase.auth().signInWithPopup(provider);
  
  let githubData;
  if (login.additionalUserInfo?.isNewUser) {
    githubData = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: 'token ' + (login.credential as any).accessToken,
      },
    });
    githubData = await githubData.json();
    await firebase.firestore().collection("users").add({
      username: githubData.login,
      location: githubData.location,
      email: githubData.email,
      twitter: githubData.twitter_username,
      name: login.user?.displayName,
      photoURL: login.user?.photoURL,
      createdAt: firebase.firestore.Timestamp.now(),
      posts: [],
    });
  }
}