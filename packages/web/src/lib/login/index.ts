// import { baseURL } from '@lib/constants';
import { setCurrentUser } from '@lib/common/getCurrentUser';

export const login = (type: string): any => {
  window.localStorage.setItem('redirectPath', window.location.href);
  switch (type) {
    // GitHub Authentication
    case 'github':
      return (window.location.href = `/api/auth/github`);

    // Twitter Authentication
    case 'twitter':
      return (window.location.href = `/api/auth/twitter`);

    // Google Authentication
    case 'google':
      return (window.location.href = `/api/auth/google`);

    // Discord Authentication
    case 'discord':
      return (window.location.href = `/api/auth/discord`);
  }
};

export const logout = async (): Promise<void> => {
  const response = await (
    await fetch(`/api/auth/logout`, {
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();

  if (response.success) {
    setCurrentUser(undefined);
  }
};
