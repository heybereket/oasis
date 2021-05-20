import React from 'react';

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const Sidebar: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="mt-10 w-full flex flex-col bg-gray-800 rounded-2xl py-6 px-8">
      <h4 className="font-extrabold">{title}</h4>
      {children}
    </div>
  );
};
