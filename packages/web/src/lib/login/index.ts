import { baseURL } from "../constants";
import { setCurrentUser } from "../common/getCurrentUser";

export const Login = (type: string): any => {
 switch (type) {
  // GitHub Authentication
  case 'github':
    return window.location.href = `${baseURL}/api/auth/github`;

  // Twitter Authentication
  case 'twitter':
    return window.location.href = `${baseURL}/api/auth/twitter`;
  
  // Google Authentication
  case 'google':
    return window.location.href = `${baseURL}/api/auth/google`;
     
  // Discord Authentication
  case 'discord':
    return window.location.href = `${baseURL}/api/auth/discord`;
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
