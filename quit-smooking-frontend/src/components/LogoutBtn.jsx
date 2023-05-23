import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LogoutBtn = () => {
  const { setLoggedIn } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      // Make a request to the logout endpoint on the server
      await axios.post('http://localhost:3000/api/users/logout');

      // Update the logged-in status in the context
      setLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutBtn;
