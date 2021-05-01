import React, { useEffect, useState } from 'react';
import { Button } from '@components/Button';
import { Navbar } from '@components/MainNavbar';
import { ProfilePost } from '@components/ProfilePost';
import { useRouter } from 'next/dist/client/router';
import {
  GetUserByNameDocument,
  GetUserByNameQuery,
  GetUserByNameQueryVariables,
  User,
} from '@oasis/client-gql';
import { useQuery } from '@apollo/client';
import { Footer } from '@components/Footer';
import Link from 'next/link';

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

  return (
    <>
      <Navbar />
    </>
  );
};

export default Profile;
