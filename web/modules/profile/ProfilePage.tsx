//React import
import React from 'react';
import { Button } from '../../test-components/Button';
import { Navbar } from '../../test-components/MainNavbar';
import { ProfilePost } from '../../test-components/ProfilePost';

export const ProfilePage: React.FC = () => {
  return (
    <>
      <Navbar />
      {/*user stats, not posts*/}
      <div className="grid justify-items-center">
        <div className="flex">
          {/*Change to user retrieved from database later*/}
          <img
            className="w-20 h-20 rounded-full"
            src="https://cdn.discordapp.com/avatars/688469813261238400/69b0be635133edd248750c754fb73661.png?size=128"
            alt="user-pfp"
          />
          <div>
            <div className="flex ml-8">
              <p className="font-bold mr-1.5">Kevy Devy</p>
              <p className="text-gray-300">@coderinblack</p>
            </div>
            <div className="flex mt-2.5 ml-8">
              <p className="mr-4 text-gray-300">
                {' '}
                <span className="font-bold text-gray-100">12</span> followers
              </p>
              <p className="mr-4 text-gray-300">
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
              <Button className="mr-2" color="gray" size="sm">
                Follow
              </Button>
              <Button color="gray" size="sm">
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl w-full mx-auto">
        <h4 className="mb-8">Posts</h4>
        <ProfilePost
          avatar_url="https://cdn.discordapp.com/avatars/688469813261238400/69b0be635133edd248750c754fb73661.png?size=128"
          name="Kevy Devy"
          atTag="coderinblack"
          quotes="12"
          likes="1.2k"
          replies="32"
          message="What’s poppin everyone!!! @Oasis is the bomb!"
        />
        <ProfilePost
          avatar_url="https://cdn.discordapp.com/avatars/688469813261238400/69b0be635133edd248750c754fb73661.png?size=128"
          name="Kevy Devy"
          atTag="coderinblack"
          quotes="12"
          likes="1.2k"
          replies="32"
          message="What’s poppin everyone!!! @Oasis is the bomb!"
        />
      </div>
    </>
  );
};
