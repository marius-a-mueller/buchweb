import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AxiosInstance } from '@/util/AxiosInstance';
import { AxiosError } from 'axios';

interface LoginType {
  username: string;
  password: string;
}

interface AuthContextType {
  token: string;
  writePermission: boolean;
  login: ({ username, password }: LoginType) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: () => boolean;
}

const AuthContext = React.createContext<AuthContextType>({
  token: '',
  writePermission: false,
  login: () => Promise.resolve(false),
  logout: () => undefined,
  isLoggedIn: () => false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState('');
  const [writePermission, setWritePermission] = useState(false);

  const login = async ({ username, password }: LoginType) => {
    const requestData = `username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`;

    try {
      const response = await AxiosInstance.post('/auth/login', requestData);
      console.log(response);
      if (response.status !== 200) return false;
      setToken(response.data.access_token);
      setWritePermission(true);
      AxiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.access_token}`;
      return true;
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 401
      ) {
        return false;
      }
      console.error('Error while logging in:', error);
      throw new Error('Error while logging in');
    }
  };

  const logout = () => {
    setToken('');
    setWritePermission(false);
    delete AxiosInstance.defaults.headers.common['Authorization'];
  };

  const isLoggedIn = () => {
    return token !== '';
  };

  return (
    <AuthContext.Provider
      value={{ token, writePermission, login, logout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
