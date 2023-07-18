import { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../context/ProfileContext';
import axios from 'axios';
import '../styles/Survey.css';
import { RegisterContext } from '../context/SignUpContext';

const Survey = () => {
  const navigate = useNavigate();
  const [cigarettesPerDay, setCigarettesPerDay] = useState(0);
  const [packageCost, setPackageCost] = useState('');
  const [cigarettesInPackage, setCigarettesInPackage] = useState('');
  const [quitDate, setQuitDate] = useState('');
  const [startSmokingDate, setStartSmokingDate] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const { isAuth } = useContext(RegisterContext);
  const { isLoggedIn } = useContext(ProfileContext);
  const [daysPassed, setDaysPassed] = useState(0);
  const currentDate = new Date();

  const updateSavedMoneyInDatabase = useCallback(async () => {
    try {
      const startDate = new Date(startSmokingDate);
      const endDate = new Date(quitDate);
      const currentDate = new Date();
      
      const timeDiff = Math.abs(endDate.getTime() - currentDate.getTime());
      const days = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
      setDaysPassed(days);

      const priceForOneCigarette = (parseFloat(packageCost) / cigarettesInPackage) * cigarettesPerDay;
      const savedMoney = daysPassed * priceForOneCigarette;
      console.log("daysPassed:", daysPassed)
      console.log("priceForOneCigarette:", priceForOneCigarette)
      console.log("savedMoney:",savedMoney)
      console.log('quitDate:', quitDate)
      const token = localStorage.getItem('token');

      const updatedUserData = {
        savedMoney,
      };

      await axios.put(
        'https://quit-smoking-app.onrender.com/api/users/update-saved-money',
        // 'https://localhost:5000/api/users/update-saved-money',
        updatedUserData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }, [startSmokingDate, quitDate, packageCost, cigarettesInPackage, cigarettesPerDay, daysPassed, isAuth.token]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const { status } = await axios.put(
        'https://quit-smoking-app.onrender.com/api/users/survey',

        {
          startSmokingDate,
          cigarettesPerDay,
          quitDate,
          packageCost,
          selectedCurrency,
          cigarettesInPackage,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      updateSavedMoneyInDatabase();
      if (isLoggedIn) navigate('/me/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateSavedMoneyInDatabase();
  }, [packageCost, cigarettesInPackage, cigarettesPerDay, quitDate, startSmokingDate, updateSavedMoneyInDatabase]);

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Please log in to access the survey.</p>
      </div>
    );
  }

  return (
    <div className="survey-container">
      <form className="survey-formArea" onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="survey-label" htmlFor="startSmokingDate">
            Start Smoking Date:
          </label>
          <input
            type="date"
            id="startSmokingDate"
            name="startSmokingDate"
            value={startSmokingDate}
            onChange={(e) => setStartSmokingDate(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="survey-label" htmlFor="cigarettesPerDay">
            Cigarettes per Day:
          </label>
          <input
            type="number"
            id="cigarettesPerDay"
            name="cigarettesPerDay"
            value={cigarettesPerDay}
            placeholder="0"
            onChange={(e) => setCigarettesPerDay(parseInt(e.target.value))}
            className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="survey-label" htmlFor="quitDate">
            Quit Date:
          </label>
          <input
            type="date"
            id="quitDate"
            name="quitDate"
            value={quitDate}
            onChange={(e) => setQuitDate(e.target.value)}
            max={new Date(Date.now() - 86400000).toISOString().split('T')[0]}
            className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="survey-label" htmlFor="cigarettesInPackage">
            Cigarettes In a Package:
          </label>
          <input
            type="number"
            id="cigarettesInPackage"
            name="cigarettesInPackage"
            value={cigarettesInPackage}
            placeholder="0"
            onChange={(e) => setCigarettesInPackage(parseInt(e.target.value))}
            className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="survey-label" htmlFor="packageCost">
            Package Cost:
          </label>
          <input
            type="number"
            id="packageCost"
            name="PackageCost"
            value={packageCost}
            placeholder="0"
            onChange={(e) => setPackageCost(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />

          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="ml-2 bg-transparent focus:outline-none"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-red-300 text-white rounded-lg px-4 py-2 w-full hover:bg-red-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Survey;
