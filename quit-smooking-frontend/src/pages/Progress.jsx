import React, { useContext, useState, useEffect } from 'react';
import ProgressBar from '../components/ProgressBar';
import { ProfileContext } from '../context/ProfileContext';

const Progress = () => {
  const [threeWeeksPercentage, setThreeWeeksPercentage] = useState(0);
  const [monthPercentage, setMonthPercentage] = useState(0);
  const [yearPercentage, setYearPercentage] = useState(0);

  const { profile, fetchUserProfile } = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {

    const accumulatedTime = () => {
      try {
        if ( profile && profile.smokingHabit && profile.smokingHabit.quitDate){
          const quitDate = new Date(profile.smokingHabit.quitDate);
          const currentDate = new Date();
          // finding the hours passed without smooking
          const millisecondsPassed = currentDate - quitDate;
          const hoursPassed = Math.ceil(millisecondsPassed / (1000 * 60 * 60));
          console.log(hoursPassed);

          // finding how many days has passed...
          const timeDiff = Math.abs(currentDate.getTime() - quitDate.getTime());
          const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24));
          console.log(daysPassed);

          // percentage for 3 weeks
          const numeratorDays = daysPassed;
          const denominator = 21;
          const percentage = ( numeratorDays / denominator) * 100;

          // percentage for one month
          const denominatorMonth = 30;
          const percentageMonth = ( numeratorDays / denominatorMonth ) * 100;

          // percentage for one year
          const denominatorYear = 365;
          const percentageYear = ( numeratorDays / denominatorYear ) * 100;

          
          setThreeWeeksPercentage(percentage)
          setMonthPercentage(percentageMonth);
          setYearPercentage(percentageYear);
          localStorage.setItem('monthPercentage', percentageMonth);
          localStorage.setItem('threeWeeksPercentage', percentage);
          localStorage.setItem('yearPercentage', percentageYear);
        }
        
      } catch (error) {
        console.error("Error cauculating save money:", error);
        
      }
    }
    const fetchData = async () => {
      try {
        await fetchUserProfile();
        accumulatedTime();
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ ]);

  return (

    <div className="wrapper">
      {isLoading ? (
        <div className="form-box sign-up">
          <p>Loading profilee...</p>
        </div>
      ) : profile ? (
        <div className="min-h-screen py-20 px-10 ">
            <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-10">
      
            <div className="flex items-center fit-content bg-white shadow-xl rounded-2xl h-30">
            <ProgressBar percent={threeWeeksPercentage.toFixed(2)} color="gray-600" />
            <p className="ml-4 font-medium text-gray-600 sm:text-xl">In between 2 weeks–3 months your lung function starts to improve.</p>
            </div>

            <div className="flex items-center fit-content bg-white shadow-xl rounded-2xl h-30">
            <ProgressBar percent={monthPercentage.toFixed(2)} color="gray-600" />
            <p className="ml-4 font-medium text-gray-600 sm:text-xl">After one month you will reduce risks of respiratory infections:</p>
            </div>

            <div className="flex items-center fit-content bg-white shadow-xl rounded-2xl h-30">
            <ProgressBar percent={yearPercentage.toFixed(2)} color="gray-600" />
            <p className="ml-4 font-medium text-gray-600 sm:text-xl">After one year you will enhance your cardiovacular health:</p>
            </div>

            <div className="flex items-center fit-content bg-white shadow-xl rounded-2xl h-30">
              <h3>During your period of smoking:</h3>
              <p>You lost {years} year {months} months off your life expectancy</p>
              <p>You smoked {cigarrettes} cigarettes</p>
              <p>You spent {money}</p>
            </div>
        </div>
    </div>

        
      ) : (
        <p>Unable to fetch profile data.</p>
      )}

    
  </div>
  );
};

export default Progress;