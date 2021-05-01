import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import {
  GetUserByNameDocument,
  GetUserByNameQuery,
  GetUserByNameQueryVariables,
  User,
} from '@oasis/client-gql';
import { useQuery } from '@apollo/client';

const Profile: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let username = router.query.username;

  // Looking  at someone elses profile
  if (username !== undefined) {
    if (typeof username !== 'string') {
      username = username[0];
    }
    console.log(username);
  }

  const data = useQuery<GetUserByNameQuery, GetUserByNameQueryVariables>(
    GetUserByNameDocument,
    { variables: { username: username ?? '' } }
  ).data;

  useEffect(() => {
    if (data?.getUserByName !== null && data?.getUserByName !== undefined)
      setUser(data?.getUserByName[0] as User);
    setIsLoading(false);
  }, [data]);

  // User exists
  if (user !== undefined) {
    return <div></div>;
  } else if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else {
    return <div></div>;
  }
};

export default Profile;
