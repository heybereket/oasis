import React from 'react';
import { Navbar, TeamMember } from '@oasis-sh/ui';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { login, logout } from '@lib/auth/login';

export const CoreTeamPage: React.FC = () => {
  const { user, currentUserLoading } = useGetCurrentUser();

  return (
    <>
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={login}
        logout={logout}
      />
      <div className="text-center">
        <h1>Oasis Core Team</h1>
        <p className="mt-3">
          The core team that maintains Oasis and its vision
        </p>
      </div>
      <div className="flex flex-row justify-center flex-wrap mt-7 mx-auto max-w-7xl">
        <TeamMember
          avatar="https://avatars.githubusercontent.com/u/68391329?v=4"
          bio="Building @oasis-sh — the social platform for developers 💻"
          githubUsername="heybereket"
          name="Bereket Semagn"
          role="Founder & Maintainer"
        />
        <TeamMember
          avatar="https://avatars.githubusercontent.com/u/32208783?v=4"
          bio="A passionate 14 year old software engineer"
          githubUsername="HenryLeC"
          name="Henry LeCompte"
          role="Maintainer"
        />
        <TeamMember
          avatar="https://avatars.githubusercontent.com/u/51079288?v=4"
          bio=""
          githubUsername="Angshu31"
          name="Angshu31"
          role="Maintainer"
        />
        <TeamMember
          avatar="https://avatars.githubusercontent.com/u/37072691?v=4"
          bio=""
          githubUsername="SamJakob"
          name="SamJakob"
          role="Maintainer & Designer"
        />
        <TeamMember
          avatar="https://avatars.githubusercontent.com/u/56125930?v=4"
          bio="I'm working on random, interesting open-source projects!"
          githubUsername="f1shy-dev"
          name="f1shy-dev"
          role="Maintainer"
        />
        <TeamMember
          avatar="https://cdn.discordapp.com/avatars/414459528998813736/285eb40416db5130c2a5aeb20b5f04fa.webp?size=256"
          bio=""
          githubUsername="BronzW"
          name="BronzW"
          role="Maintainer"
        />
      </div>
    </>
  );
};

export default CoreTeamPage;
