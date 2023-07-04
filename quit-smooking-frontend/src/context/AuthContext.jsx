import { createContext, useState , useContext} from 'react';
import { ProfileContext } from './ProfileContext';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAuth, setIsAuth] = useState({ token: localStorage.getItem('token') }); 
  const {fetchUserProfile} = useContext(ProfileContext)

  const login = (token) => {
    setIsAuth({ token });
    setLoggedIn(true);
    if(isLoggedIn) {

      fetchUserProfile()
    }
    
   
  };
  
  const logout = () => {
    setIsAuth({ token: '' });
    setLoggedIn(false);
    Navigate('/login')
  };

  return (
    <AuthContext.Provider value={{setLoggedIn, isLoggedIn,setIsAuth, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
