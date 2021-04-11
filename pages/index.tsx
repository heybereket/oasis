import React, { useEffect } from 'react';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';

const Home: React.FC = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    if (user) {
      console.log('Logged in');
    }
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto px-8">
        <nav className="flex items-center justify-between py-8">
          <img src="/static/oasis-logo.png" alt="Oasis Logo" className="w-32" />
          <ul className="flex items-center space-x-6 md:space-x-10 text-lg">
            <li>
              <a href="#">GitHub</a>
            </li>
            <li>
              <a href="#">Discord</a>
            </li>
          </ul>
        </nav>
        <div className="mt-24">
          <h1 className="leading-tight md:leading-snug text-3xl sm:text-4xl md:text-5xl font-black">
            <span className="text-primary-light">Discuss and Discover.</span>{' '}
            <br />
            The newest home for developers.{' '}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl mt-3">
            <span>Introducing Oasis</span> — your developer corner of the internet.
          </p>
          <div className="space-x-4 mt-9">
            <button
              className="bg-primary text-white px-6 py-2.5 rounded-md font-bold focus:outline-none"
              onClick={async () => {
                const provider = new firebase.auth.GithubAuthProvider();
                await firebase.auth().signInWithPopup(provider);
              }}
            >
              Login with GitHub
            </button>
            <button className="bg-gray-600 text-white px-6 py-2.5 rounded-md font-bold focus:outline-none">
              Join Anonymously 
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex absolute bottom-0 w-full justify-center">
        <Image
          width={475}
          height={475}
          src="/static/vr-illustration.png"
          alt="Vr Illustration"
          quality={100}
          priority
        />
      </div>
    </>
  );
};

export default Home;
