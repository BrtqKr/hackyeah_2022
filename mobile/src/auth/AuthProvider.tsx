import { setItemAsync, deleteItemAsync, getItemAsync } from 'expo-secure-store';
import { UserWithId } from '../axios/types';
import React, { useContext, useEffect, useState } from 'react';
export const JWT_TOKEN_KEY = 'JWT_TOKEN';

export const setAuthToken = (token: string) => {
  return setItemAsync(JWT_TOKEN_KEY, token);
};

export const getAuthToken = async () => {
  return await getItemAsync(JWT_TOKEN_KEY);
};

export const deleteAuthToken = () => {
  return deleteItemAsync(JWT_TOKEN_KEY);
};

function useAuth() {
  const [isSignedIn, setSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserWithId>();
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const initialize = async () => {
      const getTokenRes = await getAuthToken();

      if (getTokenRes) {
        setSignedIn(true);
        setInitializing(false);
      }
    };
    initialize();
  }, []);

  const login = async (token: string, user: UserWithId) => {
    await setAuthToken(token);
    setUser(user);
    setSignedIn(true);
  };

  const logout = async () => {
    await deleteAuthToken();
    setSignedIn(false);
  };

  return { initializing, login, logout, isSignedIn, user };
}

const AuthContext = React.createContext<ReturnType<typeof useAuth>>({
  isSignedIn: false,
  login: (_) => Promise.resolve(),
  logout: () => Promise.resolve(),
  initializing: false,
  user: { username: '', email: '', Name: null, Surname: null, id: 0 },
});

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
