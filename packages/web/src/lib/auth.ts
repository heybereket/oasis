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
  const token = await login.user?.getIdToken();
  const response = await apolloClient.mutate({
    mutation: AuthDocument,
    variables: { idToken: token },
  });

  if (response.errors){
    console.log("Error while trying to login.")
  }

  if (response.data.authenticate == 'success'){
    console.log("Successfully logged in!")
  }
};
