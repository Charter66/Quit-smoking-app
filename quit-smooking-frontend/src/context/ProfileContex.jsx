import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';



const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  // Simulated API call to fetch user profile
  const fetchUserProfile = async () => {
    try {
      // Make API call to fetch user profile data
     const { data } = await axios.get(
      `http://localhost:3000/api/users/profile`,
          {
            withCredentials: true,
          }
        );
        setProfile(data);
        console.log(data)
     
    } catch (error) {
      if (error.response.status !== 400) throw(error);
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