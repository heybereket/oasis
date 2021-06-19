import React from 'react';

interface Props {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ title, children, className }) => {
  return (
    <div
      className={`w-full flex flex-col bg-gray-800 rounded-2xl py-6 px-8 ${className}`}
    >
      <h4 className="font-bold">{title}</h4>
      {children}
    </div>
  );
};
