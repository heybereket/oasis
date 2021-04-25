import { getFirebase } from './firebase';
import 'firebase/auth';
import { AuthDocument } from '@oasis/client-gql';
import { apolloClient } from './apolloClient';

export const Login = async (): Promise<void> => {
  const firebase = getFirebase();
  const provider = new firebase.auth.GithubAuthProvider();

  provider.setCustomParameters({
    allow_signup: 'true',
  });

  const login = await firebase.auth().signInWithPopup(provider);

  const response = await apolloClient.mutate({
    mutation: AuthDocument,
    variables: { idToken: await login.user?.getIdToken() },
  });

  if (response.errors) alert('there was a login error :(');
  if (response.data.authenticate == 'success') alert("woah you're logged in!");
};
