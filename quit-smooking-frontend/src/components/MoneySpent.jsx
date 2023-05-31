import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../context/ProfileContext';

function MoneySpent() {
  const [isLoading, setIsLoading] = useState(true);
  const [spendedMoney, setSpendedMoney]  = useState(0);
  const [currency, setCurrency] = useState('');
  const { profile, fetchUserProfile } = useContext(ProfileContext);
  useEffect(() => {
    const calculateSpendedMoney = () => {
      try {
        if (profile && profile.smokingHabit && profile.smokingHabit.quitDate) {
          const startDate = new Date(profile.smokingHabit.startSmokingDate);
          const quitDate = new Date(profile.smokingHabit.quitDate);
          console.log(startDate, quitDate); // Check the values of startDate and quitDate
  
          const timeDiff = Math.abs(quitDate.getTime() - startDate.getTime());
          console.log(timeDiff); // Check the value of timeDiff
  
          const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24));
          console.log(daysPassed); // Check the value of daysPassed
  
          const cigarettesPerDay = profile.smokingHabit.cigarettesPerDay;
          const packageCost = profile.smokingHabit.packageCost;
          const cigarettesInPackage = profile.smokingHabit.cigarettesInPackage;
  
          const cigarettesSmoked = cigarettesPerDay * daysPassed;
          console.log(cigarettesSmoked); // Check the value of cigarettesSmoked
  
          const moneySpent = (cigarettesSmoked / cigarettesInPackage) * packageCost;
          console.log(moneySpent); // Check the value of money spended
  
          setSpendedMoney(moneySpent);
          setCurrency(profile.smokingHabit.selectedCurrency);
          localStorage.setItem('moneySpent', spendedMoney.toFixed(2));
          localStorage.setItem('currency', profile.smokingHabit.selectedCurrency);
          localStorage.setItem('lastUpdate', new Date().toISOString());
        }
      } catch (error) {
        console.error("Error calculating saved money:", error);
      }
    };
  
    const fetchData = async () => {
      try {
        await fetchUserProfile();
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
    calculateSpendedMoney();
  }, []);
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Spended Money</h2>
          <p>{spendedMoney.toFixed(2)} {currency}</p>
        </div>
      )}
    </div>
  );
}

export default MoneySpent;
