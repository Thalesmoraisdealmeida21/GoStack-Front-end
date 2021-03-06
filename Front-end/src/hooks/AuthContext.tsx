import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';


interface User {
  id: string;
  avatar_url: string;
  name: string;

}
interface Credentials {
  email: string;
  password: string;
}

interface AuthContextState {
  user: User;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (user && token) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    const { user, token } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthPovider');
  }

  return context;
}

export { AuthProvider, useAuth };
