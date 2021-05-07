import { getAPIBaseURL } from "./constants";
import { setCurrentUser } from "./getCurrentUser";

export const Login = async (): Promise<void> => {
  window.location.href = `${getAPIBaseURL}/api/auth/github`;
};

export const Logout = async (): Promise<void> => {
  const response = await (await fetch(`${getAPIBaseURL}/api/auth/logout`, {
      headers: {
        'Accept': 'application/json'
      }
  })).json();

  if (response.success) {
    setCurrentUser(undefined);
  }
}
