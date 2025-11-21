import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContextType } from "../types";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        const user = await SecureStore.getItemAsync("userInfo");
        if (token && user) {
          setUserToken(token);
          setUserInfo(JSON.parse(user));
        }
      } catch (e) {
        console.error("SecureStore Load Error", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (email: string, token: string) => {
    setIsLoading(true);
    setUserToken(token);
    setUserInfo({ email });
    await SecureStore.setItemAsync("userToken", token);
    await SecureStore.setItemAsync("userInfo", JSON.stringify({ email }));
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    await SecureStore.deleteItemAsync("userToken");
    await SecureStore.deleteItemAsync("userInfo");
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
