import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { setToken as setApiToken } from '../api/apiClient';

interface StateContextProps {
  token: string;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const Context = createContext<StateContextProps | undefined>(undefined);

export const StateContext: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || '';
    setToken(storedToken);
  }, []);

  const setToken = (token: string) => {
    setTokenState(token);
    localStorage.setItem('token', token);
    setApiToken(token); // Set the token in the apiClient
  };

  const removeToken = () => {
    setTokenState('');
    localStorage.removeItem('token');
    setApiToken('');
  };
  return (
    <Context.Provider value={{ token, setToken, removeToken }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useStateContext must be used within a StateContext');
  }
  return context;
};
