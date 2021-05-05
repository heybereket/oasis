import {
  GetCurrentUserDocument,
  GetCurrentUserQuery,
  User,
} from '@oasis/client-gql';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

interface LoadableCurrentUser {
  user: User | undefined;
  currentUserLoading: boolean;
}

let user, setUser: any;

export function setCurrentUser(currentUser: User | undefined): any {
  return setUser(currentUser);
}

export function useGetCurrentUser(): LoadableCurrentUser {
  [user, setUser] = useState<User | undefined>();
  const query = useQuery<GetCurrentUserQuery>(GetCurrentUserDocument);
  const { data, loading } = query;

  useEffect(() => {
    if (data?.currentUser !== null && data?.currentUser !== undefined)
      setUser(data?.currentUser as User);
    else
      setUser(undefined);
  }, [data]);

  return {
    user,
    currentUserLoading: loading
  };
}
