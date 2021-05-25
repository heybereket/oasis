import React, { useEffect, useState } from 'react';

export const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<Array<any>>([]);

  useEffect(() => {
    fetch('https://api.github.com/repos/oasis-sh/oasis/contributors?per_page=100')
      .then(response => response.json())
      .then(allContributors =>
        setContributors(allContributors.filter((contributor: any) => !contributor.login.endsWith('[bot]')))
      );
  }, []);

  return (
    <div>
      <div className="flex flex-row flex-wrap">
        {contributors.map(contributor => (
          <div key={contributor.id}>
            <a href={contributor.html_url} target="_blank" rel="noreferrer">
              <img className="inline-block h-10 w-10 mr-4 rounded-full ring-2 ring-white" src={contributor.avatar_url} alt={`@${contributor.login}`} />
            </a>
          </div>
              ))}
        </div>
    </div>
  );
};
