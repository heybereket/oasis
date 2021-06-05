import { redirect } from '@utils/redirect';
import { setCurrentUser } from '@lib/common/getCurrentUser';
import { baseURL } from '@lib/constants';
import { request } from '@utils/request';

export const login = (type: string): any => {
  window.localStorage.setItem('redirectPath', window.location.href);
  switch (type) {
    case 'github':
      return redirect(`${baseURL}/api/auth/github`);

    case 'twitter':
      return redirect(`${baseURL}/api/auth/twitter`);

    case 'google':
      return redirect(`${baseURL}/api/auth/google`);

    case 'discord':
      return redirect(`${baseURL}/api/auth/discord`);
  }
};

export const logout = async (): Promise<void> => {
  const response = await (
    await request(`${baseURL}/api/auth/logout`, {
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();

  if (response.success) {
    setCurrentUser(undefined);
  }
};
