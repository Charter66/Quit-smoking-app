import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import LogoutBtn from "../components/LogoutBtn";
import "../styles/User.css";

function Profile() {
  const { profile, fetchUserProfile } = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await profile;
        console.log(profile)
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="background">
    <div className="wrapper">
      {isLoading ? (
        <div className="form-box sign-up">
          <p>Loading profilee...</p>
        </div>
      ) : profile ? (
        <div className='extra-box'>
          <p>Email: {profile.email}</p>
          <p>Name: {profile.name}</p>
          <p>description: {profile.goals[1].description}</p>
        </div>
      ) : (
        <p>Unable to fetch profile data.</p>
      )}
  
      <div className='extra-box'>
        <p>REFRESH PROFILE</p>
        <button onClick={fetchUserProfile}>Refresh Profile</button>
      </div>
  
      <div className='extra-box'>
        <p>LOGOUT</p>
        <LogoutBtn profile={profile} />
      </div>
  
      <div className='extra-box'>
        <p>TELL A FRIEND</p>
      </div>
  
      <div className='extra-box'>
        <p>ABOUT US</p>
      </div>
  
      <div className='extra-box'>
        <p>PRIVACY POLICY</p>
      </div>
    </div>
  </div>
  );
}

export default Profile;
