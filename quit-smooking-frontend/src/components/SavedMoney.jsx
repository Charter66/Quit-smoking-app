import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../context/ProfileContext';

function SavedMoney() {
  const [isLoading, setIsLoading] = useState(true);
  const [savedMoney, setSavedMoney] = useState(0);
  const { profile } = useContext(ProfileContext);

  useEffect(() => {
    const calculateSavedMoney = () => {
      try {
        if (profile && profile.smokingHabit && profile.smokingHabit.quitDate) {
          const quitDate = new Date(profile.smokingHabit.quitDate);
          const currentDate = new Date();
          const timeDiff = Math.abs(currentDate.getTime() - quitDate.getTime());
          const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24));
          const savedMoney = profile.smokingHabit.cigarettesPerDay * profile.smokingHabit.packageCost * daysPassed;
          setSavedMoney(savedMoney);
          localStorage.setItem('savedMoney', savedMoney);
          localStorage.setItem('lastUpdate', new Date().toISOString());
        }
      } catch (error) {
        console.error("Error calculating saved money:", error);
      }
    };

    const lastUpdate = localStorage.getItem('lastUpdate');
    if (lastUpdate) {
      const currentTime = new Date();
      const lastUpdateTime = new Date(lastUpdate);
      const hoursDiff = Math.abs(currentTime - lastUpdateTime) / 36e5;

      if (hoursDiff < 24) {
        const cachedSavedMoney = localStorage.getItem('savedMoney');
        setSavedMoney(parseFloat(cachedSavedMoney));
        setIsLoading(false);
        return;
      }
    }

    calculateSavedMoney();
    setIsLoading(false);
  }, [profile]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="flex items-center">
          <p className="text-4xl font-bold mr-2">{savedMoney}</p>
          {profile && profile.goals && profile.goals.length > 0 && (
            <p className="text-sm text-gray-400">{profile.goals[0].currency}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SavedMoney;
