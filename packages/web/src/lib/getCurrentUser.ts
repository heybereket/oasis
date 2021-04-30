import {
  GetUserDocument,
  GetUserQuery,
  GetUserQueryVariables,
  User,
} from '@oasis/client-gql';
import { useQuery } from '@apollo/client';
import firebase from 'firebase';
import { useEffect, useState } from 'react';

export function useGetCurrentUser(): User | undefined {
  const [user, setUser] = useState<User | undefined>();
  const data = useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, {
    variables: { id: firebase.auth().currentUser?.uid ?? '' },
  }).data;

  useEffect(() => {
    if (data?.getUser !== null && data?.getUser !== undefined)
      setUser(data?.getUser as User);
  }, [data]);

  return user;
}
