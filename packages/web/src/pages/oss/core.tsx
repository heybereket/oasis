import React, { useEffect, useState } from 'react';
import { Navbar, TeamMember } from '@oasis-sh/ui';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { login, logout } from '@lib/auth/login';
import Link from 'next/link';
export const CoreTeamPage: React.FC = () => {
  const { user, currentUserLoading } = useGetCurrentUser();
  const [maintainers, setMaintainers] = useState<undefined | any[]>();

  useEffect(() => {
    async function getMaintainers() {
      const response = await fetch(
        'https://raw.githubusercontent.com/oasis-sh/oasis/staging/data/maintainers.json'
      );
      const resJson = await response.json();
      setMaintainers(resJson);
    }

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
          <Link href={`https://github.com/${maintainer.github}`} key={key}>
            <a>
              <TeamMember
                avatar={maintainer.avatar}
                bio={maintainer.bio}
                github={maintainer.github}
                name={maintainer.name}
                role={maintainer.role}
              />
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CoreTeamPage;
