import React, { useContext, useState, useEffect } from 'react';
import ProgressBar from '../components/ProgressBar';
import { ProfileContext } from '../context/ProfileContext';

const Progress = () => {

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

    <div className="wrapper">
      {isLoading ? (
        <div className="form-box sign-up">
          <p>Loading profilee...</p>
        </div>
      ) : profile ? (
        <div className='extra-box'>
          <p>Quitting date: {profile.smokingHabit.quitDate}</p>
        </div>
      ) : (
        <p>Unable to fetch profile data.</p>
      )}

    <div className="min-h-screen py-20 px-10 ">
    <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-10">
      
      <div className="flex items-center fit-content bg-white shadow-xl rounded-2xl h-30">
        <ProgressBar percent={60} color="gray-600" />
        <p className="ml-4 font-medium text-gray-600 sm:text-xl">In between 2 weeks–3 months your lung function starts to improve.</p>
      </div>

      <div className="flex items-center fit-content bg-white shadow-xl rounded-2xl h-30">
        <ProgressBar percent={100} color="gray-600" />
        <p className="ml-4 font-medium text-gray-600 sm:text-xl">Reduced risk of respiratory infections:</p>
      </div>

      <div className="flex items-center fit-content bg-white shadow-xl rounded-2xl h-30">
        <ProgressBar percent={80} color="gray-600" />
        <p className="ml-4 font-medium text-gray-600 sm:text-xl">Enhanced cardiovacular health:</p>
      </div>

    </div>
  </div>
  </div>
  );
};

export default Progress;