import firebase from 'firebase';

export const login = async () => {
  const provider = new firebase.auth.GithubAuthProvider();
  let db = firebase.firestore();

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

    const userData = {
      username: githubData.login,
      location: githubData.location,
      email: githubData.email,
      twitter: githubData.twitter_username,
      name: login.user?.displayName,
      photoURL: login.user?.photoURL,
      createdAt: firebase.firestore.Timestamp.now(),
      posts: [],
    };

    await db.collection('users').doc(login.user?.uid).set(userData);
  }
};
