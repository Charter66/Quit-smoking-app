import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
  const { isAuth,setLoggedIn } = useContext(AuthContext);
  console.log(isAuth)
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make a request to the logout endpoint on the server
      await axios.post('http://localhost:3000/api/users/logout',{
        headers: {
          Authorization: `${isAuth.token}` // Replace `token` with the actual token value
        }
      });
      localStorage.removeItem('token');


      // Update the logged-in status in the context
      setLoggedIn(false);

      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutBtn;
