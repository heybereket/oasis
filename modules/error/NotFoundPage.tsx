import React from 'react';

export const NotFoundPage: React.FC = () => {

  return (
    <div className="flex flex-col items-center text-center mt-80 h-screen">
      <h1>404</h1>
      <p className="text-gray-300 text-lg mt-4">
        Silly you, that page doesn’t exist
      </p>
    </div>
  );

};
