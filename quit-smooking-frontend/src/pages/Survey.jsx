import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'
const Survey = () => {
  const navigate = useNavigate();
  const [cigarettesPerDay, setCigarettesPerDay] = useState(0);
  const [quitDate, setQuitDate] = useState('');
  const [packageCost, setPackageCost] = useState('');
  const [cigarettesInPackage, setCigarettesInPackage] = useState('');

  const { isLoggedIn } = useContext(AuthContext);

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const {status}=await axios.post('http://localhost:3000/api/users/survey', {cigarettesPerDay, quitDate,packageCost,cigarettesInPackage})
    // Perform any additional logic or data handling here
    console.log(status)
    navigate('/'); // Redirect to the home page after submitting the survey
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Please log in to access the survey.</p>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-sm" onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="cigarettesPerDay" className="block text-gray-700">
            Cigarettes per Day:
          </label>
          <input
            type="number"
            id="cigarettesPerDay"
            name="cigarettesPerDay"
            value={cigarettesPerDay}
            onChange={(e) => setCigarettesPerDay(parseInt(e.target.value))}
            className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quitDate" className="block text-gray-700">
            Quit Date:
          </label>
          <input
            type="date"
            id="quitDate"
            name="quitDate"
            value={quitDate}
            onChange={(e) => setQuitDate(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="packageCost" className="block text-gray-700">
            Package Cost:
          </label>
          <input
            type="number"
            id="packageCost"
            name="PackageCost"
            value={packageCost}
            onChange={(e) => setPackageCost(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cigarettesInPackage" className="block text-gray-700">
            Cigarettes In a Package:
          </label>
          <input
            type="number"
            id="cigarettesInPackage"
            name="cigarettesInPackage"
            value={cigarettesInPackage}
            onChange={(e) => setCigarettesInPackage(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );

};

export default Survey;
