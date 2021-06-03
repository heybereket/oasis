import { Button } from '@oasis-sh/ui';
import { apiBaseURL } from '@lib/constants';
import { login } from '@lib/auth/login';
import { useGetCurrentUserQuery } from '@oasis-sh/react-gql';
import { useEffect, useState } from 'react';

const authTypes = ['github', 'discord', 'google', 'twitter'];

export default function VSCodeAuth(): any {
  const { data, loading } = useGetCurrentUserQuery();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (data) {
      fetch(`${apiBaseURL}/auth/vscode/grant-access`, {
        method: 'POST',
        headers: {
          authorization: window.location.search.replace('?authId=', ''),
        },
      }).then(() => setDone(true));
    }
  }, [data]);

  if (loading) return <h1 className="text-3xl">Loading...</h1>;

  if (data && !done) {
    return <h1 className="text-3xl">Hooking you up with VSCode...</h1>;
  }

  return done ? (
    <h1 className="text-3xl">Done! You can close this browser tab now</h1>
  ) : (
    <div>
      <h1 className="text-3xl">VSCode Oasis Auth</h1>

      {authTypes.map((provider) => {
        return (
          <Button key={provider} onClick={() => login(provider)}>
            Login with {provider}
          </Button>
        );
      })}
    </div>
  );
}
