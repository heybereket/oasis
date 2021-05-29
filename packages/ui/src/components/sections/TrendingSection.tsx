import React from 'react';
import { Sidebar } from '../home/Sidebar';
import { TopicBadge } from '../profile/TopicBadge';

export const TrendingSection: React.FC<any> = () => {
  return (
    <>
      <Sidebar title="Trending on Oasis">
        <div className="mt-6">
          <TopicBadge content="JavaScript" />
          <TopicBadge content="Python" />
          <TopicBadge content="Node.js" />
          <TopicBadge content="Artificial Intelligence" />
          <TopicBadge content="TypeScript" />
          <TopicBadge content="Memes" />
          <TopicBadge content="Programming" />
          <TopicBadge content="Code" />
          <TopicBadge content="CatsWhoCode" />
        </div>
      </Sidebar>
    </>
  );
};
