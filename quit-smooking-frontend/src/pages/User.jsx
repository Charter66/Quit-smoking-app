import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import LogoutBtn from "../components/LogoutBtn";

import "../Styles/User.css";

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
    <div className="user-background">
      <div className="user-wrapper">
        {isLoading ? (
          <div className="user-form-box sign-up">
            <p>Loading profile...</p>
          </div>
        ) : profile ? (
          <div className='user-extra-box'>
            <p>Email: {profile.email}</p>
            <p>Name: {profile.name}</p>
            {profile.goals && <p>Description: {profile.goals.description}</p>}
          </div>
        ) : (
          <p>Unable to fetch profile data.</p>
        )}

        <div className="user-container">
          <div className='user-extra-box'>
            <button onClick={fetchUserProfile}>REFRESH PROFILE</button>
          </div>

          <div className='user-extra-box'>
            <p>TELL A FRIEND</p>
          </div>

          <div className='user-extra-box'>
            <p>ABOUT US</p>
          </div>

          <div className='user-extra-box'>
            <p>PRIVACY POLICY</p>
          </div>

          <div className='user-extra-box'>
            <LogoutBtn profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;