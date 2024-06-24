import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context) return context;
  throw new Error("Can't use useAuth outside of AuthProvider.");
};

export { useAuth };
