import {
  GetCurrentUserDocument,
  GetCurrentUserQuery,
  User,
} from '@oasis-sh/client-gql';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

interface LoadableCurrentUser {
  user: User | undefined;
  currentUserLoading: boolean;
}

export function setCurrentUser(currentUser: User | undefined): any {
  let setUser: any;
  return setUser(currentUser);
}

export function useGetCurrentUser(): LoadableCurrentUser {
  const [user, setUser] = useState<User | undefined>();
  const query = useQuery<GetCurrentUserQuery>(GetCurrentUserDocument);
  const { data, loading } = query;

  useEffect(() => {
    if (data?.currentUser !== null && data?.currentUser !== undefined) {
      setUser(data?.currentUser as User);
    } else {
      setUser(undefined);
    }
  }, [data]);

  return {
    user,
    currentUserLoading: loading,
  };
}
