import React from 'react';
import { CustomLink } from '../../providers/CustomLink';

export const Footer: React.FC = () => {
  return (
    <div className="hidden md:flex w-full justify-center">
      <footer className="w-full text-center border-gray-500 p-4">
        <CustomLink href="https://github.com/oasis-sh/oasis/blob/staging/LICENSE">
          MIT license 2021
        </CustomLink>
        , oasis.sh
      </footer>
    </div>
  );
};
