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
    return (
      <div className="relative inline-block text-left">
        <Avatar user={swrAuth} className={`ml-4`} />
        {/* <div
          className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-xl bg-dark ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-dark-text hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              My profile
            </a>

            <form method="POST" action="#" role="none">
              <button
                type="submit"
                className="block w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Sign out
              </button>
            </form>
          </div>
        </div> */}
      </div>
    ); // Logged In
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
