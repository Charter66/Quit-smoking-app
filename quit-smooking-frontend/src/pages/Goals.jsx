import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import SavedMoney from '../components/SavedMoney.jsx';
import axios from 'axios'
const Goals = () => {
  const {hasToken, profile, fetchUserProfile } = useContext(ProfileContext);
  const [goals, setGoals] = useState([]);
  const [description, setDescription] = useState('');
  const [goalCost, setGoalCost] = useState(0);
  const [currency, setCurrency] = useState('');
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (profile && profile.goals) {
      setGoals(profile.goals);
    }
  }, [profile]);

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
  
      const newGoalData = {
        description,
        achieved: false,
        goalCost,
        currency,
      };
  
      // Make an API request to save the new goal
      const response = await axios.put(
        'https://quit-smoking-app.onrender.com/api/users/goals',
        newGoalData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
  
      if (response.status === 200 && response.data && response.data.goals && response.data.goals.length > 0) {
        const goalsArray = response.data.goals;
        const newGoal = goalsArray[goalsArray.length - 1];
        if (newGoal) {
          // Access the properties of newGoal here
          const { description, goalCost, currency } = newGoal;
          // Do something with the properties
        }
      
        setGoals((prevGoals) => [...prevGoals, newGoal]);
  
        // Reset the form
        setDescription('');
        setGoalCost(0);
        setCurrency('');
        setShowNewGoalForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Delete a Goal
  const handleDeleteGoal = async (goalId) => {
    try {
      const token = hasToken;
  
      // Make an API request to delete the goal
      const response = await axios.delete(
        `https://quit-smoking-app.onrender.com/api/users/goals/${goalId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
  
      if (response.status === 200) {
        // If the goal is successfully deleted from the database,
        // update the goals array by removing the deleted goal
        setGoals((prevGoals) =>
          prevGoals.filter((goal) => goal._id !== goalId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const handleToggleForm = () => {
    setShowNewGoalForm(!showNewGoalForm);
  };

  return (
    <div className="container mx-auto px-4">
      <SavedMoney />
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
              <option value="USD">$</option>
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
      {goals && goals.length > 0 ? (
  goals.map((goal, index) => (
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
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => handleDeleteGoal(goal._id)}
      >
        Delete
      </button>
    </div>
  ))
) : (
  <p>No goals found.</p>
)}

      </div>
    </div>
  );
};

export default Goals;
