import { MarkGithubIcon } from '@primer/octicons-react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '../../components/Button';
import { Navbar } from '../../components/Navbar';
import { login } from '../../lib/auth';
import { useRouter } from 'next/router'

export const HomePage: React.FC = () => {
  const [user] = useAuthState(firebase.auth());
  const { push } = useRouter();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        push('/post')
    }
    });
  });

  return (
    <>
      <div className="max-w-5xl mx-auto px-8">
        <Navbar />
        <div className="relative z-10 mt-24">
          <h1 className="leading-tight md:leading-snug text-3xl sm:text-4xl md:text-5xl font-black">
            <span className="text-primary-light">Discover and Discuss.</span>
            <br />
            The newest home for developers.
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl mt-3">
            <span className="text-gray-200 font-medium">Introducing Oasis</span>{' '}
            — your developer corner of the internet.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-9">
            <Button onClick={login}>
              <MarkGithubIcon /> &nbsp; Log in with GitHub
            </Button>
            <Button color="gray">Log in Anonymously</Button>
          </div>
          <p className="text-gray-300 text-base sm:text-xs md:small mt-3">
            By logging in, you accept our{' '}
            <Link href="/privacy">
              <a className="text-primary-light hover:underline">
                Privacy Policy{' '}
              </a>
            </Link>
            and{' '}
            <Link href="/terms">
              <a className="text-primary-light hover:underline">
                Terms of Service
              </a>
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:flex absolute bottom-0 z-0 w-full justify-center">
        <Image
          width={425}
          height={425}
          src="/static/vr-illustration.png"
          alt="Vr Illustration"
          quality={100}
          priority
        />
      </div>
    </>
  );
};
