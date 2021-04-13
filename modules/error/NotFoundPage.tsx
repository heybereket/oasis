import React from 'react';

export const NotFoundPage: React.FC = () => {

  return <div className="grid justify-items-center mb-4">
      <div className="absolute top-1/3 text-center">
      <h1>404</h1>
      <p className="text-gray-300 text-lg mt-4 ">Silly you, that page doesn’t exist</p>
      </div>
  </div>;

};
