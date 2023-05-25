import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAuth, setIsAuth] = useState({ token: localStorage.getItem('token') }); // Initialize isAuth with an empty token

  const login = (token) => {
    setIsAuth({ token });
    setLoggedIn(true);
   
  };
  
  const logout = () => {
    setIsAuth({ token: '' });
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{setLoggedIn, isLoggedIn,setIsAuth, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
