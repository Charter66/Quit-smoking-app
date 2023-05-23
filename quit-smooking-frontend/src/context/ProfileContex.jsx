import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token not found');
      }

      const response = await axios.get('http://localhost:3000/api/users/profile', {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        setProfile(response.data.user);
        console.log(response.data.user);
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error retrieving user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, fetchUserProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
