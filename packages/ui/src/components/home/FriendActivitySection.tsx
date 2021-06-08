import React from 'react';
import { Sidebar } from '../home/Sidebar';
import { FriendActivity } from '../home/FriendActivity';
export const FriendActivitySection: React.FC<any> = () => {
  return (
    <Sidebar title="Friends Activity" className="mt-10">
      <div className="flex-shrink-0 mt-6 flex flex-col space-y-4">
        <FriendActivity
          name="Sam Jakob"
          activity={['Playing', 'Visual Studio Code']}
        />
        <FriendActivity
          name="Angshu31"
          activity={['Listening to', 'Spotify']}
        />
        <FriendActivity name="bereket" activity={['Browsing', 'the Feed']} />
        <FriendActivity name="Henry" activity={['Idle for', '10 minutes']} />
      </div>
    </Sidebar>
  );
};
