import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../context/ProfileContex';
import LogoutBtn from '../components/LogoutBtn';
import "../styles/dashboard.css";


function Dashboard() {
  const { profile, fetchUserProfile } = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserProfile();
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <p>Loading profile...</p>
      ) : profile ? (
        <div>
          <h2>{profile.name}'s Profile</h2>
          <p>Email: {profile.email}</p>
          {/* Additional profile information */}
        </div>
      ) : (
        <p>Unable to fetch profile data.</p>
      )}

      <button onClick={fetchUserProfile}>Refresh Profile</button>
      <LogoutBtn profile={profile} />
    </div>
  );
}

export default Dashboard;
