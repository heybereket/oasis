import React, { useEffect, useState } from 'react';
import { Navbar, TeamMember } from '@oasis-sh/ui';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { login, logout } from '@lib/auth/login';
import { request } from '@utils/request';

export const CoreTeamPage: React.FC = () => {
  const { user, currentUserLoading } = useGetCurrentUser();
  const [maintainers, setMaintainers] = useState<undefined | any[]>();

  useEffect(() => {
    const getMaintainers = async () => {
      const fetchMaintainers = request('https://raw.githubusercontent.com/oasis-sh/oasis/staging/data/maintainers.json').then((res: any) => res.json());
      setMaintainers(await fetchMaintainers);
    };

    getMaintainers();
  }, []);

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
        {maintainers?.map((maintainer: any, key: any) => (
          <TeamMember
            key={key}
            avatar={maintainer.avatar}
            bio={maintainer.bio}
            github={maintainer.github}
            name={maintainer.name}
            role={maintainer.role}
          />
        ))}
      </div>
    </>
  );
};

export default CoreTeamPage;
