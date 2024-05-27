import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AxiosInstance } from '@/util/AxiosInstance';

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

    const response = await AxiosInstance.post('/auth/login', requestData);
    console.log(response);
    if (response.status !== 200) return false;
    setToken(response.data.access_token);
    setWritePermission(true);
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    return true;
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
