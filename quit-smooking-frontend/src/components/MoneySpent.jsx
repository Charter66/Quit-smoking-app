import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../context/ProfileContext';

function MoneySpent() {
  const [isLoading, setIsLoading] = useState(true);
  const [moneySpent, setMoneySpent] = useState(0);
  const [currency, setCurrency] = useState('');
  const { profile, fetchUserProfile } = useContext(ProfileContext);

  useEffect(() => {
    const calculateMoneySpent = () => {
      try {
        if (profile && profile.startDate && profile.quitDate) {
          const startDate = new Date(profile.startDate);
          const quitDate = new Date(profile.quitDate);
          const timeDiff = Math.abs(quitDate.getTime() - startDate.getTime());
          const daysSmoked = Math.ceil(timeDiff / (1000 * 3600 * 24));

          const cigarettesPerDay = profile.cigarettesPerDay;
          const packageCost = profile.packageCost;
          const cigarettesInPackage = profile.cigarettesInPackage;

          const cigarettesSmoked = cigarettesPerDay * daysSmoked;
          const moneySpent = (cigarettesSmoked / cigarettesInPackage) * packageCost;

          setMoneySpent(moneySpent);
          setCurrency(profile.selectedCurrency);
          localStorage.setItem('moneySpent', moneySpent.toFixed(2));
          localStorage.setItem('currency', profile.selectedCurrency);
        }
      } catch (error) {
        console.error('Error calculating money spent:', error);
      }
    };

    const fetchData = async () => {
      try {
        await fetchUserProfile();
        calculateMoneySpent();
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchUserProfile, profile]);

  return (
    <div className="text-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-2">Money Spent</h2>
          <p>{moneySpent.toFixed(2)} {currency}</p>
        </div>
      )}
    </div>
  );
}

export default MoneySpent;
