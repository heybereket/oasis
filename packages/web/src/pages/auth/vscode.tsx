import { baseURL } from '@lib/constants';
import Link from 'next/link';

const authTypes = ['github', 'discord', 'google', 'twitter'];

export default function VSCodeAuth(): any {
  return (
    <div>
      <h1 className="text-3xl">VSCode Oasis Auth</h1>

      {authTypes.map((provider) => {
        return (
          <Link href={`${baseURL}/api/auth/${provider}`} key={provider}>
            <a>Login with {provider}</a>
          </Link>
        );
      })}
    </div>
  );
}
