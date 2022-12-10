import { User } from "@/pages/login/login.type";
import React, { ReactNode, useContext, useState } from "react";
import { useAsync } from "@/utils/useAsync";
import { useMount } from "@/utils";
import * as auth from "@/services/auth-provider";
import { http } from "@/utils/http";
import { LoginUrl } from "@/global";
interface AuthForm {
  username: string;
  password: string;
}
interface AuthContextType {
  user: User | null;
  register: (from: AuthForm) => Promise<void>;
  login: (from: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await (await fetch(`${LoginUrl}/users?token=${token}`)).json();
    console.log("mydata", token, data[0]);
    user = data[0];
  }
  return user;
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    data: user,
    isLoading,
    isIdle,
    setData: setUser,
    isError,
    error,
  } = useAsync<User | null>();
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  useMount(() => {
    run(bootstrapUser());
  });
  //   if (isIdle || isLoading) {
  //     return <Loading />;
  //   }
  //   if (isError) {
  //     message.error(error?.message);
  //   }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    ></AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
