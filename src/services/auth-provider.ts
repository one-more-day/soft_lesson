import { User } from "@/pages/login/login.type";
import { apiUrl, LoginUrl } from "@/global";
import qs from "qs";
export const localStorageKey = "__auth_provider_token__";
export const getToken = () => window.localStorage.getItem(localStorageKey);
export const handleUserResponse = (data: any) => {
  let user;
  if (data.data.login.tno) {
    user = { ...data.data.login, auth: 1 };
  } else if (data.data.login.sno) {
    user = { ...data.data.login, auth: 2 };
  } else {
    user = { ...data.data.login, auth: 3 };
  }
  window.localStorage.setItem(localStorageKey, JSON.stringify(user) || "");
  return user;
};
export const login = async (data: { username: string; password: string }) => {
  const res = await fetch(`${apiUrl}/demo/login/login?${qs.stringify(data)}`, {
    headers: {
      "Content-Type": "application/json",
    },
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
