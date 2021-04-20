import firebase from 'firebase/app';
import 'firebase/firestore';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Button } from '@components/Button';
import { Navbar } from '@components/MainNavbar';
import { ProfilePost } from '@components/ProfilePost';

export const ProfilePage: React.FC = () => {
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
              <p className="text-lg font-bold mr-1.5">Kevy Devy</p>
              <p className="text-gray-300">@coderinblack</p>
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let user;
  if (typeof query.username === 'string') {
    const db = firebase.firestore();
    user = db.collection('users').where('username', '==', query.username).get();
  }
  return { props: { user } };
};
