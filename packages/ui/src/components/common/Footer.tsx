import Link from 'next/link';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="hidden md:flex w-full justify-center">
      <footer className="w-full text-center border-gray-500 p-4">
        <Link href="https://github.com/oasis-sh/oasis/blob/staging/LICENSE">
          <a>MIT license 2021</a>
        </Link>
        , oasis.sh
      </footer>
    </div>
  );
};
