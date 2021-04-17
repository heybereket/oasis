import Link from 'next/link';
import React from 'react';
import { MarkGithubIcon } from '@primer/octicons-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between py-8">
      <Link href="/">
        <a>
          <img src="/static/oasis-logo.png" alt="Oasis Logo" className="w-32" />
        </a>
      </Link>
      <ul className="flex items-center space-x-6 md:space-x-10 text-lg text-gray-300">
        <li>
          <a href="#" className="hover:text-gray-200">
            <MarkGithubIcon className="w-8 h-8 text-white"/>
            
          </a>
        </li>
        <li>
        
        
          <a href="#" className="hover:text-gray-200 flex items-center">
            <img className="w-10 h-10" src="/static/discordlogo.svg" alt="discord-logo"/>    
            
          </a>
          
        </li>
      </ul>
    </nav>
  );
};
