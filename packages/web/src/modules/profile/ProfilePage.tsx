import React, { useEffect, useState } from 'react';
import { Button } from '@components/Button';
import { Navbar } from '@components/MainNavbar';
import { ProfilePost } from '@components/ProfilePost';
import { useRouter } from 'next/dist/client/router';
import 'firebase/auth';
import firebase from 'firebase';
import {
  GetUserByNameDocument,
  GetUserByNameQuery,
  GetUserByNameQueryVariables,
  GetUserDocument,
  GetUserQuery,
  GetUserQueryVariables,
  User,
} from '@oasis/client-gql';
import { useQuery } from '@apollo/client';

export const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);

  let username = router.query.username;

  // Looking  at someone elses profile
  if (username !== undefined) {
    if (typeof username !== 'string') {
      username = username[0];
    }
    console.log(username);
    const { data } = useQuery<GetUserByNameQuery, GetUserByNameQueryVariables>(
      GetUserByNameDocument,
      { variables: { username: username } }
    );

    useEffect(() => {
      if (data?.getUserByName !== null && data?.getUserByName !== undefined)
        setUser(data?.getUserByName[0] as User);
    }, [data]);
  }
  // Looking at your own profile
  else {
    console.log('own');
    const { data } = useQuery<GetUserQuery, GetUserQueryVariables>(
      GetUserDocument,
      { variables: { id: firebase.auth().currentUser?.uid ?? '' } }
    );

    useEffect(() => {
      if (data?.getUser !== null && data?.getUser !== undefined)
        setUser(data?.getUser as User);
    }, [data]);
  }

  return (
    <>
      <Navbar />
      <div className="grid justify-items-center mt-12">
        <div className="sm:flex">
          <img
            className="w-20 h-20 rounded-full mx-auto mb-4"
            src="https://cdn.discordapp.com/avatars/688469813261238400/69b0be635133edd248750c754fb73661.png?size=128"
            alt="user-pfp"
          />
          <div>
            <div className="flex ml-8">
              <p className="text-lg font-bold mr-1.5">{user?.name}</p>
              <p className="text-gray-300">@{user?.username}</p>
            </div>
            <div className="flex mt-2.5 ml-8 space-x-4">
              <p className="text-gray-300">
                <span className="font-bold text-gray-100">12</span> followers
              </p>
              <p className="text-gray-300">
                <span className="font-bold text-gray-100">64</span> following
              </p>
              <img
                src="/static/twitter.svg"
                alt="twitter"
                width="14px"
                height="11.2px"
              />
            </div>

            <div className="flex ml-8 mt-4 mb-14">
              <Button className="mr-2" color="gray" size="xs">
                Follow
              </Button>
              <Button color="gray" size="xs">
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center sm:block sm:max-w-2xl sm:w-full mx-auto">
        <div className="ml-8 mr-8 sm:ml-0 sm:mr-0">
          <h4 className="mb-8">Posts</h4>
          <ProfilePost
            avatarUrl="https://cdn.discordapp.com/avatars/688469813261238400/69b0be635133edd248750c754fb73661.png?size=128"
            name="Kevy Devy"
            atTag="coderinblack"
            quotes="12"
            likes="1.2k"
            replies="32"
            message="What’s poppin everyone!!! @Oasis is the bomb!"
          />
          <ProfilePost
            avatarUrl="https://cdn.discordapp.com/avatars/688469813261238400/69b0be635133edd248750c754fb73661.png?size=128"
            name="Kevy Devy"
            atTag="coderinblack"
            quotes="12"
            likes="1.2k"
            replies="32"
            message="What’s poppin everyone!!! @Oasis is the bomb!"
          />
        </div>
      </div>
    </>
  );
};
