import {
  GetCurrentUserDocument,
  GetCurrentUserQuery,
  User,
} from '@oasis-sh/react-gql';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

interface LoadableCurrentUser {
  user: User | undefined;
  currentUserLoading: boolean;
}

let user: any;
let setUser: any;

export function setCurrentUser(currentUser: User | undefined): any {
  return setUser(currentUser);
}

export function useGetCurrentUser(): LoadableCurrentUser {
  const query = useQuery<GetCurrentUserQuery>(GetCurrentUserDocument);
  const { data, loading } = query;
  [user, setUser] = useState<User | undefined>(
    (data?.currentUser as User) ?? undefined
  );

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
