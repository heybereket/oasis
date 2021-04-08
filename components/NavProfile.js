import LoadingCircle from './icons/LoadingCircle';
import { AlertIcon } from '@primer/octicons-react';
import Avatar from './Avatar';
import signInWithGitHub from '../utils/auth';

export default function NavProfile({ swrError, swrAuth }) {
  if (!swrAuth && !swrError)
    return (
      <NavProfileContainer>
        <LoadingCircle />
      </NavProfileContainer>
    ); // Loading

  if (!swrError && swrAuth.authState == 'authenticated')
    return <Avatar user={swrAuth} className={`mx-4`} />; // Logged In
  if (!swrError && swrAuth.authState == 'unauthenticated')
    return (
      <button
        className={`bg-gray-600 text-dark-text font-semibold hover:bg-gray-500 transition duration-100 px-3 py-1 rounded-lg mx-4`}
        onClick={async () => {
          var login = await signInWithGitHub();
          login = await login.json();
          if (login.status === 'success') window.location.reload();
        }}
      >
        Login
      </button>
    ); // Not logged in
  return (
    <NavProfileContainer
      onClick={() => {
        window.location.reload();
      }}
    >
      <AlertIcon />
    </NavProfileContainer>
  ); // something else or an error
}

function NavProfileContainer({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`mx-4 p-1.5 w-8 h-8 bg-gray-600 shadow-md rounded-lg overflow-hidden flex items-center justify-center`}
    >
      {children}
    </div>
  );
}
