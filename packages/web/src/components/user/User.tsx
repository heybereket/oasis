import React from 'react';
import { User as TUser } from '@oasis-sh/react-gql';

type Props = {
  user: TUser;
  markdown: (text: string) => JSX.Element;
  bgColorOveride?: string;
};

export const User: React.FC<Props> = ({ user, bgColorOveride }) => {
  return (
    <div
      className={`shadow-lg w-full ${
        bgColorOveride ?? 'bg-gray-800'
      } px-5 pt-2 pb-4 rounded-2xl flex flex-col justify-between`}
    >
      {JSON.stringify(user)}
    </div>
  );
};
