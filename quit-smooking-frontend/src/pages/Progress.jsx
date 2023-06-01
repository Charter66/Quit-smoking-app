
import React, { useContext, useState, useEffect } from 'react';
import ProgressBar from '../components/ProgressBar';
import { ProfileContext } from '../context/ProfileContext';

const Progress = () => {
  const [days, setDays] = useState(0);
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [cigarettes, setCigarettes] = useState(0);
  const [moneySpent, setMoneySpent] = useState(0);
  const [currency, setCurrency] = useState('');
  

  const [threeWeeksPercentage, setThreeWeeksPercentage] = useState(0);
  const [monthPercentage, setMonthPercentage] = useState(0);
  const [yearPercentage, setYearPercentage] = useState(0);

  const { profile, fetchUserProfile } = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {

    const accumulatedTime = () => {
      try {
        if ( profile && profile.smokingHabit && profile.smokingHabit.quitDate && profile.smokingHabit.startSmokingDate){
          const quitDate = new Date(profile.smokingHabit.quitDate);
          const startDate = new Date(profile.smokingHabit.startSmokingDate)
          const currentDate = new Date();

           // finding how many days has passed...
           const timeDiff = Math.abs(startDate.getTime() - quitDate.getTime());
           const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24));
           console.log(daysPassed);

          // finding how many was cigarettes smoked
          const cigarettesSmoked = (profile.smokingHabit.cigarettesPerDay) * daysPassed;

          // finding how much money was spent
          const cigaretesInPackage = profile.smokingHabit.cigarettesInPackage;
          const packageCost = profile.smokingHabit.packageCost;

          const totalMoneySpent = (cigarettesSmoked / cigaretesInPackage ) * packageCost;
          

          // finding the hours passed without smooking
          const millisecondsPassed = currentDate - quitDate;
          const hoursPassed = Math.ceil(millisecondsPassed / (1000 * 60 * 60));
          console.log(hoursPassed);

          // finding how many years has been lost 
          const timeDiffYear = quitDate.getTime() - startDate.getTime();
          const yearsPassed = Math.floor(timeDiffYear / (1000 * 60 * 60 * 24 * 365));

          // finding how many months has been lost
          const monthsPassed = (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
          (currentDate.getMonth() - startDate.getMonth());

          // finding how life expectancy lost
             // Every cigarette a man smokes reduces his life by 11 minutes.
          
             const minutesPassed = Math.floor(daysPassed * 24 * 60);
             const minLost = cigarettesSmoked * 11;

             // Calculate the number of days, hours, and minutes
            const daysLost = Math.floor(minLost / (60 * 24));
            const hoursLost = Math.floor((minLost % (60 * 24)) / 60);
            const minutesLost = minLost % 60;

            // Calculate the number of years and months from the daysLost
            const yearsLost = Math.floor(daysLost / 365);
            const monthsLost = Math.floor((daysLost % 365) / 30);
            const remainingDaysLost = (daysLost % 365) % 30;
          
          // percentage for 3 weeks
          const timeDiffCurrent = Math.abs(currentDate.getTime() - quitDate.getTime());
           const daysPassedCurrent = Math.ceil(timeDiffCurrent / (1000 * 3600 * 24));
          
          const numeratorDays = daysPassedCurrent;
          const denominator = 21;
          const percentage = ( numeratorDays / denominator) * 100;

          // percentage for one month
          const denominatorMonth = 30;
          const percentageMonth = ( numeratorDays / denominatorMonth ) * 100;

          // percentage for one year
          const denominatorYear = 365;
          const percentageYear = ( numeratorDays / denominatorYear ) * 100;

          // currency
          const profileCurrency = profile.smokingHabit.selectedCurrency;

          
          // setting the states
          
          setThreeWeeksPercentage(percentage)
          setMonthPercentage(percentageMonth);
          setYearPercentage(percentageYear);
          setYears(yearsLost);
          setMonths(monthsLost);
          setDays(remainingDaysLost);
          setCigarettes(cigarettesSmoked);
          setMoneySpent(totalMoneySpent);
          setCurrency(profileCurrency);

          localStorage.setItem('monthPercentage', percentageMonth);
          localStorage.setItem('threeWeeksPercentage', percentage);
          localStorage.setItem('yearPercentage', percentageYear);
        }
        
      } catch (error) {
        console.error("Error cauculating the progress:", error);
        
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


    <div>
      {isLoading ? (
        <div className="form-box sign-up">
          <p>Loading profilee...</p>
        </div>
      ) : profile ? (
        <div className="min-h-screen py-20 px-10 ">
            <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-10">
      
            <div className="flex items-center fit-content bg-white shadow-xl rounded-2xl h-30">
            <ProgressBar percent={threeWeeksPercentage.toFixed(2)} color="gray-600" />
            <p className="ml-4 font-medium text-gray-600 sm:text-xl">In between 2 weeks – 3 months your lung function starts to improve.</p>
            </div>

            <div className="flex items-center fit-content bg-white shadow-xl rounded-2xl h-30">
            <ProgressBar percent={monthPercentage.toFixed(2)} color="blue-500" />
            <p className="ml-4 font-medium text-gray-600 sm:text-xl">After one month you will reduce risks of respiratory infections:</p>
            </div>

            <div className="flex  bg-white shadow-xl rounded-2xl h-30">
            <ProgressBar percent={yearPercentage.toFixed(2)} color="grey-600" />
            <p className="ml-4 font-medium text-gray-600 sm:text-xl">After one year you will enhance your cardiovacular health:</p>
            </div>
        </div><br></br>
        
        <div className="flex-col justify-items-start justify-evenly bg-white shadow-xl rounded-2xl h-60">
              <h3>During your period of smoking:</h3>
              <p>You lost {years} year {months} months and {days} days off your life expectancy</p>
              <p>You smoked {cigarettes} cigarettes</p>
              <p>You spent {moneySpent} {currency}</p>
        </div>

    </div>

        
      ) : (
        <p>Unable to fetch profile data.</p>
      )}

    
  </div>
  );
};

export default Progress;

