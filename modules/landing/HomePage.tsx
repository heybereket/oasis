import { MarkGithubIcon } from '@primer/octicons-react';
import firebase from 'firebase';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '../../components/Button';
import { Navbar } from './Navbar';
import Link from 'next/link'

export const HomePage: React.FC = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    if (user) {
      console.log('Logged in');
    }
  }, []);

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
            <Button
              className="hover:bg-[#5C91FC]"
              onClick={async () => {
                const provider = new firebase.auth.GithubAuthProvider();
                provider.setCustomParameters({
                  allow_signup: 'true',
                });

                const login = await firebase.auth().signInWithPopup(provider);
                
                let githubData;
                if (login.additionalUserInfo?.isNewUser) {
                  githubData = await fetch('https://api.github.com/user', {
                    method: 'GET',
                    headers: {
                      Authorization: 'token ' + (login.credential as any).accessToken,
                    },
                  });
                  githubData = await githubData.json();
                  await firebase.firestore().collection("users").add({
                    username: githubData.login,
                    location: githubData.location,
                    email: githubData.email,
                    twitter: githubData.twitter_username,
                    name: login.user?.displayName,
                    photoURL: login.user?.photoURL,
                    createdAt: firebase.firestore.Timestamp.now(),
                    posts: [],
                  });
                }
              }}
            >
              <MarkGithubIcon /> &nbsp; Log in with GitHub
            </Button>
            <Button className="hover:bg-gray-500" color="gray">Log in Anonymously</Button>
          </div>

          <p className="text-gray-300 text-base sm:text-xs md:small mt-3">
            By logging in, you accept our <span className="text-primary-light hover:underline"><Link href="/privacy">Privacy Policy</Link></span> and <span className="text-primary-light hover:underline"><Link href="/terms">Terms of Service</Link></span>.{' '} </p>
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
