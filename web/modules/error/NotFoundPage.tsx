import React from 'react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex h-full">
      <div className="m-auto text-center">
        <h1>404</h1>
        <p className="text-gray-300 text-lg mt-4">
          Silly you, that page doesn’t exist
        </p>
      </div>
    </div>
  );
};
