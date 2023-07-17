import React, { useContext } from 'react';
import axios from 'axios';
import { ProfileContext } from '../context/ProfileContext';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
  const { hasToken,setLoggedIn, profile, setProfile, setHasToken } = useContext(ProfileContext);
  //console.log(hasToken)
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      
      axios.defaults.headers.common['Authorization']
      // Make a request to the logout endpoint on the server
      await axios.post( 'http://localhost:5000/api/users/logout',{
        headers: {
          authorization: `${hasToken}` // Replace `token` with the actual token value
        }
      });


     localStorage.clear()
    setLoggedIn(false);
      setProfile(null)
      setHasToken(null)

      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>LOGOUT</button>
  );
};

export default LogoutBtn;
