import React, { useContext } from 'react';
import { ProfileContext } from '../context/ProfileContex';
import LogoutBtn from '../components/LogoutBtn'

function Dashboard() {
  const { profile, fetchUserProfile } = useContext(ProfileContext);

  return (
    <div>
      {profile ? (
        <div>
          <h2>{profile.name}'s Profile</h2>
          <p>Email: {profile.email}</p>
          {/* Additional profile information */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <button onClick={fetchUserProfile}>Refresh Profile</button>
      <LogoutBtn profile={profile}/>
    </div>
  );
}

export default Dashboard;