import Link from 'next/link';
import React from 'react';
import { MarkGithubIcon } from '@primer/octicons-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between py-8">
      <Link href="/">
        <img
          src="/static/oasis-logo.svg"
          alt="Oasis Logo"
          className="w-60"
          width="210"
          height="87"
        />
      </Link>
      <ul className="flex items-center space-x-6 md:space-x-10 text-lg text-gray-300">
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/oasis-sh/oasis"
            className="hover:text-gray-200"
          >
            <MarkGithubIcon className="w-10 h-10 text-white" />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://discord.com/invite/qamstHxeAW"
            className="hover:text-gray-200 flex items-center"
          >
            <img
              className="w-12 h-12"
              src="/static/discordlogo.svg"
              alt="discord-logo"
              width="42"
              height="42"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
};
