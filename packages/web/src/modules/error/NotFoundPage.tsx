import React from 'react';
import { Button } from 'src/components/Button';
import Link from 'next/link';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex h-full">
      <div className="m-auto text-center">
        <h1>404</h1>
        <p className="text-gray-300 text-lg mt-4">
          Oh no! That page doesn’t exist... <br />
          <Button className="mt-4">
            <Link href="/">
              <a>Home</a>
            </Link>
          </Button>
        </p>
      </div>
    </div>
  );
};
