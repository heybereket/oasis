import React from 'react';

export const NotFoundPage: React.FC = () => {
  return <div className="flex justify-center">
      <h1 className="absolute top-1/3">404</h1>
      <p className="absolute bottom-[52.4%] text-gray-300 text-lg">Silly you, that page doesn’t exist</p>
  </div>;
};
