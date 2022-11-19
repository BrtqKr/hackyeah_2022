import { setItemAsync, deleteItemAsync, getItemAsync } from 'expo-secure-store';
import React, { useState } from 'react';
export const JWT_TOKEN_KEY = 'JWT_TOKEN';

export const setAuthToken = (token: string) => {
  return setItemAsync(JWT_TOKEN_KEY, token);
};

export const getAuthToken = () => {
  return getItemAsync(JWT_TOKEN_KEY);
};

export const deleteAuthToken = () => {
  return deleteItemAsync(JWT_TOKEN_KEY);
};

export function useAuth() {
  const [isSignedIn, setSignedIn] = useState<boolean>(false);

  const initialize = async () => {
    const getTokenRes = await getAuthToken();

    if (getTokenRes) {
      setSignedIn(true);
    }
  };

  const login = async (token: string) => {
    await setAuthToken(token);
    setSignedIn(true);
  };

  const logout = async () => {
    await deleteAuthToken();
    setSignedIn(false);
  };

  return { initialize, login, logout, isSignedIn };
}

const AuthContext = React.createContext<ReturnType<typeof useAuth>>({
  isSignedIn: false,
  login: (_) => Promise.resolve(),
  logout: () => Promise.resolve(),
  initialize: () => Promise.resolve(),
});

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
