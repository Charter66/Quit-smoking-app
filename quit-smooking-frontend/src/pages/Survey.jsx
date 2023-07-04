import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../context/ProfileContext';
//import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import "../styles/Survey.css";
import { RegisterContext } from '../context/SignUpContext';

const Survey = () => {
  const navigate = useNavigate();
  const [cigarettesPerDay, setCigarettesPerDay] = useState(0);

  const [packageCost, setPackageCost] = useState('');
  const [cigarettesInPackage, setCigarettesInPackage] = useState('');

  const [quitDate, setQuitDate] = useState(new Date());

  const [startSmokingDate, setStartSmokingDate] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const { isAuth } = useContext(RegisterContext);
  const { isLoggedIn } = useContext(ProfileContext); // Access the isAuth state from AuthContext
  const [daysPassed, setDaysPassed] = useState(0);
  const currentDate = new Date();

  const updateSavedMoneyInDatabase = async () => {
    try {
      const timeDiff = Math.abs(currentDate.getTime() - new Date(quitDate).getTime());
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setDaysPassed(days);

      const priceForOneCigarette = (packageCost / cigarettesInPackage) * cigarettesPerDay;

      const savedMoney = daysPassed * priceForOneCigarette;
      console.log(priceForOneCigarette);
      const token = isAuth.token;

      console.log("savedMoney", savedMoney);

      const updatedUserData = {
        savedMoney,
      };

      await axios.put(
        'https://quit-smoking-app.onrender.com/api/users/update-saved-money',
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
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = isAuth.token; // Retrieve the token from the isAuth state

      console.log("cigarettesPerDay:", cigarettesPerDay);
      console.log("quitDate:", quitDate);
      console.log("packageCost:", packageCost);
      console.log("cigarettesInPackage:", cigarettesInPackage);

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

      console.log(status);
      updateSavedMoneyInDatabase();
      if (isLoggedIn) navigate('/me/dashboard'); // Redirect to the home page after submitting the survey
    } catch (error) {
      console.error(error);
      // Handle error state or display error message to the user
    }
  };

  useEffect(() => {
    // Call the function when the component mounts
    updateSavedMoneyInDatabase();
  }, [packageCost, cigarettesInPackage, cigarettesPerDay, quitDate]); // Empty dependency array ensures the effect runs only once

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
         <label className='survey-label' htmlFor="startSmokingDate">
            Start Smoking Date:
         </label>
            <input
              type="month"
              id="startSmokingDate"
              name="startSmokingDate"
              value={startSmokingDate}
              onChange={(e) => setStartSmokingDate(e.target.value)}
              className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            />
       </div>

        <div className="mb-4">
          <label className='survey-label' htmlFor="cigarettesPerDay">
            Cigarettes per Day:
          </label>
          <input
            type="number"
            id="cigarettesPerDay"
            name="cigarettesPerDay"
            value={cigarettesPerDay}
            placeholder='0'
            onChange={(e) => setCigarettesPerDay(parseInt(e.target.value))}
            className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className='survey-label' htmlFor="quitDate">
            Quit Date:
          </label>
              <input
          type="date"
          id="quitDate"
          name="quitDate"
          value={quitDate}
          onChange={(e) => setQuitDate(e.target.value)}
          max={(new Date(Date.now() - 86400000)).toISOString().split('T')[0]} // Set the max attribute to one day before the current day
          className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
        />
        </div>

        <div className="mb-4">
          <label className='survey-label' htmlFor="cigarettesInPackage">
            Cigarettes In a Package:
          </label>
          <input
            type="number"
            id="cigarettesInPackage"
            name="cigarettesInPackage"
            value={cigarettesInPackage}
            placeholder='0'
            onChange={(e) => setCigarettesInPackage(parseInt(e.target.value))}
            className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className='survey-label' htmlFor="packageCost">
            Package Cost:
          </label>
          <input
            type="number"
            id="packageCost"
            name="PackageCost"
            value={packageCost}
            placeholder='0'
            onChange={(e) => setPackageCost(parseInt(e.target.value))}
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
              {/* Add more currency options as needed */}
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
