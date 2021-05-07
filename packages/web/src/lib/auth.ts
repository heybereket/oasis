import { baseURL } from "./constants";
import { setCurrentUser } from "./getCurrentUser";

export const GitHubLogin = async (): Promise<void> => {
  window.location.href = `${baseURL}/api/auth/github`;
};

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
