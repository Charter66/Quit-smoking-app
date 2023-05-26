import React, { useState, useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import axios from 'axios';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [description, setDescription] = useState('');
  const [goalCost, setGoalCost] = useState(0);
  const [currency, setCurrency] = useState('');
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  const { hasToken } = useContext(ProfileContext);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleGoalCostChange = (e) => {
    setGoalCost(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = hasToken;

      console.log("description:", description);
      console.log("goalCost:", goalCost);
      console.log("currency:", currency);

      const { status } = await axios.put(
        'http://localhost:3000/api/users/goals',
          {
            description,
            targetDate: new Date().toISOString(), // Modify this line based on your target date input
            achieved: false,
            goalCost,
            currency,
          },
        
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(status);
    } catch (error) {
      console.error(error);
    }

    // Create a new goal object
    const newGoal = {
      description: description,
      targetDate: new Date().toISOString(), // Modify this line based on your target date input
      achieved: false,
      goalCost: goalCost,
      currency: currency,
    };

    // Update the goals array with the new goal
    setGoals([newGoal, ...goals]);

    // Reset the form
    setDescription('');
    setGoalCost(0);
    setCurrency('');
    setShowNewGoalForm(false);
  };

  const handleToggleForm = () => {
    setShowNewGoalForm(!showNewGoalForm);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Goal</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleToggleForm}
      >
        {showNewGoalForm ? 'Cancel' : 'Add Goal'}
      </button>

      {showNewGoalForm && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 font-bold mr-2">
              Description:
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 font-bold mr-2">
              Goal Cost:
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={goalCost}
              onChange={handleGoalCostChange}
            />
            <select
              className="ml-2 text-sm"
              value={currency}
              onChange={handleCurrencyChange}
            >
              <option value="">Currency</option>
              <option value={"USD"}>$</option>
              <option value="EUR">€</option>
              <option value="GBP">£</option>
              {/* Add more currency options as needed */}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Goal
          </button>
        </form>
      )}

      <div className="mt-4">
        {goals ? goals.map((goal, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center justify-between"
          >
            <div>
              <p>Description: {goal.description}</p>
              <p>
                Goal Cost: {goal.goalCost}
                {goal.currency}
              </p>
            </div>
          </div>
        )) : null}
      </div>
    </div>
  );
};

export default Goals;
