import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../context/ProfileContext';

function SavedMoney() {
  const [isLoading, setIsLoading] = useState(true);
  const [savedMoney, setSavedMoney] = useState(0);
  const [currency, setCurrency] = useState('');
  const { profile, fetchUserProfile } = useContext(ProfileContext);
  const [goals, setGoals] = useState()
  useEffect(() => {
    const calculateSavedMoney = () => {
      try {
        if (profile && profile.smokingHabit && profile.smokingHabit.quitDate) {
          const quitDate = new Date(profile.smokingHabit.quitDate);
          const currentDate = new Date();
          const timeDiff = Math.abs(currentDate.getTime() - quitDate.getTime());
          const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
          const cigarettesPerDay = profile.smokingHabit.cigarettesPerDay;
          const packageCost = profile.smokingHabit.packageCost;
          const cigarettesInPackage = profile.smokingHabit.cigarettesInPackage;
    
          const cigarettesSmoked = cigarettesPerDay * daysPassed;
          const savedMoney = (cigarettesSmoked / cigarettesInPackage) * packageCost;
    
          setSavedMoney(savedMoney);
          setCurrency(profile.smokingHabit.selectedCurrency);
          localStorage.setItem('savedMoney', savedMoney); // Cache the saved money value in localStorage
          localStorage.setItem('currency', profile.smokingHabit.selectedCurrency); // Cache the currency in localStorage
          localStorage.setItem('lastUpdate', new Date().toISOString()); // Cache the timestamp of the last update
          localStorage.setItem('daysPassed',daysPassed)
    
          // Split the saved money among the goals
          const totalGoalsCost = profile.goals.reduce((total, goal) => total + goal.goalCost, 0);
          const goalsCount = profile.goals.length;
          const moneyPerGoal = savedMoney / goalsCount;
    
          // Update the goals with the calculated money per goal
          const updatedGoals = profile.goals.map((goal) => ({
            ...goal,
            savedMoneyPerGoal: goal.goalCost / totalGoalsCost * moneyPerGoal,
          }));
    
          // Update the state with the updated goals
          setGoals(updatedGoals);
        }
      } catch (error) {
        console.error("Error calculating saved money:", error);
      }
    };
    const fetchData = async () => {
      try {
        await fetchUserProfile();
        calculateSavedMoney();
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const lastUpdate = localStorage.getItem('lastUpdate');
    if (lastUpdate) {
      const currentTime = new Date();
      const lastUpdateTime = new Date(lastUpdate);
      const hoursDiff = Math.abs(currentTime - lastUpdateTime) / 36e5;

      // If it has been less than 24 hours since the last update, use the cached saved money value
      if (hoursDiff < 24) {
        const cachedSavedMoney = localStorage.getItem('savedMoney');
        const cachedCurrency = localStorage.getItem('currency');
        setSavedMoney(parseFloat(cachedSavedMoney));
        setCurrency(cachedCurrency);
        setIsLoading(false);
        return;
      }
    }

    fetchData();
  }, [fetchUserProfile]);

  return (
    <div>
      {!isLoading ? (
        <div>
          <h2>Saved Money</h2>
          <p>You have saved {savedMoney.toFixed(2)} {currency}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
}

export default SavedMoney;
