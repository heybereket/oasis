import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="hidden md:flex absolute bottom-0 w-full justify-center">
      <footer className="w-full text-center border-t border-gray-500 p-4">
        &copy; 2021, oasis.sh
      </footer>
    </div>
  );
};
