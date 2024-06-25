import { AxiosInstance, logger } from '@/util';
import { AxiosError, HttpStatusCode } from 'axios';
// eslint-disable-next-line @typescript-eslint/naming-convention, n/no-extraneous-import, import/no-extraneous-dependencies
import PropTypes from 'prop-types';
// eslint-disable-next-line @typescript-eslint/naming-convention
import React, { useEffect, useState } from 'react';

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
  // eslint-disable-next-line unicorn/no-useless-undefined
  logout: () => undefined,
  isLoggedIn: () => false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line no-undef
  const [token, setToken] = useState(localStorage.getItem('token') ?? '');
  const [writePermission, setWritePermission] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    localStorage.setItem('token', token);
  }, [token]);

  const login = async ({ username, password }: LoginType) => {
    logger.debug(`login: username=${username}`);
    const requestData = `username=${encodeURIComponent(
      username,
    )}&password=${encodeURIComponent(password)}`;

    try {
      const response = await AxiosInstance.post('/auth/login', requestData);
      logger.debug(`login: response=${JSON.stringify(response)}`);
      if (response.status !== (HttpStatusCode.Ok as number)) {
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setToken(response.data.access_token);
      setWritePermission(true);
      // eslint-disable-next-line require-atomic-updates
      AxiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
      return true;
    } catch (err) {
      if (
        err instanceof AxiosError &&
        err.response &&
        err.response.status === (HttpStatusCode.Unauthorized as number)
      ) {
        return false;
      }
      logger.error('login: error=', err);
      throw new Error('Error while logging in');
    }
  };

  const logout = () => {
    setToken('');
    setWritePermission(false);
    delete AxiosInstance.defaults.headers.common.Authorization;
  };

  const isLoggedIn = () => token !== '';

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
