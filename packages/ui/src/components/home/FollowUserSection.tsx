import React from 'react';
import { Sidebar } from './Sidebar';
import { FollowUser } from './FollowUser';

export const FollowUserSection: React.FC<any> = () => {
  return (
    <Sidebar title="Find New People" className="mt-10">
      <div className="mt-6 space-y-3">
        <FollowUser name="Bereket" username="heybereket" />
        <FollowUser name="Alex" username="alexover1" />
        <FollowUser name="Sam" username="samjakob" />
      </div>
    </Sidebar>
  );
};
