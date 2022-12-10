import { User } from "@/pages/login/login.type";
import { apiUrl, LoginUrl } from "@/global";
export const localStorageKey = "__auth_provider_token__";
export const getToken = () => window.localStorage.getItem(localStorageKey);
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};
export const login = async (data: { username: string; password: string }) => {
  const res = await fetch(`${LoginUrl}/login`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return handleUserResponse(await res.json());
  } else {
    return Promise.reject(await res.json());
  }
};
export const register = async (data: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`${LoginUrl}/register`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return handleUserResponse(await res.json());
  } else {
    return Promise.reject(await res.json());
  }
};
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
