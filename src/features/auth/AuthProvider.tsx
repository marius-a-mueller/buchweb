import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const instance = axios.create({
  baseURL: 'https://localhost:3000',
  timeout: 1000,
});

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
    console.log('GetResponse');
    const requestData = `username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`;

    const response = await instance.post('/auth/login', requestData);
    //console.log(response);
    if (response.status !== 200) return false;
    setToken(response.data.access_token);
    setWritePermission(true);
    return true;
  };

  const logout = () => {
    setToken('');
    setWritePermission(false);
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
