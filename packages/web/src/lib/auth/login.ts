import { redirect } from '@utils/redirect';
import { setCurrentUser } from '@lib/common/getCurrentUser';

export const login = (type: string): any => {
  window.localStorage.setItem('redirectPath', window.location.href);
  switch (type) {
    case 'github':
      return redirect('/api/auth/github');

    case 'twitter':
      return redirect('/api/auth/twitter');

    case 'google':
      return redirect('/api/auth/google');

    case 'discord':
      return redirect('/api/auth/discord');
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
