import firebase from 'firebase/app';
import 'firebase/auth';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { AuthDocument } from '@oasis/client-gql';
import BaseURL from './base-url';

export const Login = async (): Promise<void> => {
  const provider = new firebase.auth.GithubAuthProvider();

  provider.setCustomParameters({
    allow_signup: 'true',
  });

  const login = await firebase.auth().signInWithPopup(provider);
  const client = new ApolloClient({
    uri: BaseURL(),
    cache: new InMemoryCache(),
    defaultOptions: { mutate: { fetchPolicy: 'no-cache' } },
  });

  const response = await client.mutate({
    mutation: AuthDocument,
    variables: { idToken: await login.user?.getIdToken() },
  });

  if (response.errors) alert('there was a login error :(');
  if (response.data.authenticate == 'success') alert("woah you're logged in!");
};
