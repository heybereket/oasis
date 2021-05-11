import { baseURL } from "../../lib/constants";
import { setCurrentUser } from "../user/getCurrentUser";
import { loginProvider } from './loginProvider'

export const Login = async (type: string): Promise<void> => {
 switch (type) {
  // GitHub Authentication
  case 'github':
    return loginProvider('github');

  // Twitter Authentication
  case 'twitter':
    return loginProvider('twitter');

  // Discord Authentication
  case 'discord':
    return loginProvider('discord');
 }
}

export const Logout = async (): Promise<void> => {
  const response = await (await fetch(`${baseURL}/api/auth/logout`, {
      headers: {
        'Accept': 'application/json'
      }
  })).json();

  if (response.success) {
    setCurrentUser(undefined);
  }
}
