import { baseURL } from "../constants";

export const loginProvider = (type: string): any => {
 switch (type) {
  // GitHub Authentication
  case 'github':
    return window.location.href = `${baseURL}/api/auth/github`;

  // Twitter Authentication
  case 'twitter':
    return window.location.href = `${baseURL}/api/auth/twitter`;

  // Discord Authentication
  case 'discord':
    return window.location.href = `${baseURL}/api/auth/discord`;
 }
}
