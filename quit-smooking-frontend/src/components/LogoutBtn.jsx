import React, { useContext } from 'react';
import axios from 'axios';
import { ProfileContext } from '../context/ProfileContext';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
  const { hasToken,setLoggedIn } = useContext(ProfileContext);
  //console.log(hasToken)
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make a request to the logout endpoint on the server
      await axios.post('https://quit-smoking-app.onrender.com/api/users/logout',{
        headers: {
          Authorization: `${hasToken}` // Replace `token` with the actual token value
        }
      });
      localStorage.removeItem('savedMoney');
      localStorage.removeItem('token');
      localStorage.removeItem('goals');
      localStorage.removeItem('lastUpdate');
      localStorage.removeItem('currency');
      localStorage.removeItem('threeWeeksPercentage');
      localStorage.removeItem('monthPercentage');
      localStorage.removeItem('moneySpent');
      localStorage.removeItem('yearPercentage');


      // Update the logged-in status in the context
      setLoggedIn(false);

      // Redirect to the login page
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
