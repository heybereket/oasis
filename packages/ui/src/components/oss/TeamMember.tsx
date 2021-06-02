import React from 'react';

type TeamMemberProps = {
  name: string;
  role: string;
  github: string;
  avatar: string;
  bio: string;
};

export const TeamMember: React.FC<TeamMemberProps> = (props) => {
  return (
    <>
      <a href={`https://github.com/${props.github}`}>
        <div className="flex flex-col items-center w-[33%]">
          <img src={props.avatar} className="rounded-full w-40" alt={props.name} />
          <h5 className="font-bold mt-4 mb-3">{props.name}</h5>
          <p className="uppercase text-blue-500">{props.role}</p>
          <p className="text-gray-100 text-center">{props.bio}</p>
          <ul className="list-none mb-0">
            <a href="#!" className="p-2 fa-lg"></a>
          </ul>
        </div>
      </a>
    </>
  );
};
