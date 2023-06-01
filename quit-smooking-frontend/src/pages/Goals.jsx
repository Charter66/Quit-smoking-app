import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../context/ProfileContext';


import axios from 'axios';
import '../Styles/Goals.css';

// Chart
import DoughnutChart from '../components/DoughnutChart.jsx';


import SavedMoney from '../components/SavedMoney.jsx';

const Goals = () => {
  const {hasToken, profile, fetchUserProfile } = useContext(ProfileContext);
  const [goals, setGoals] = useState([]);
  const [description, setDescription] = useState('');
  const [goalCost, setGoalCost] = useState(0);
  const [currency, setCurrency] = useState('');
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [goalSaved, setGoalSaved] = useState(false);


console.log(profile)


  useEffect(() => {
    // Retrieve goals from local storage when the component mounts
    const storedGoals = localStorage.getItem('goals');
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  useEffect(() => {
    // Update local storage when goals state changes
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

console.log(profile)


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
    setGoalSaved(false); // Reset goalSaved when the "Add Goal" button is clicked
  };

  // Chart
  const chartData = {
    dataPoints: [
      { name: 'not finished', y: 100 },
      { name: 'finished', y: 200 },
    ],
  };

  const totalDataPoints = chartData.dataPoints.reduce((total, dataPoint) => total + dataPoint.y, 0);
  const collectedDataPoints = chartData.dataPoints.find((dataPoint) => dataPoint.name === 'finished').y;

  const positivePercentage = ((collectedDataPoints / totalDataPoints) * 100).toFixed(1);

  chartData.positivePercentage = positivePercentage;

  // Modify the color of the doughnut chart sections
  chartData.dataPoints = chartData.dataPoints.map((dataPoint) => {
    if (dataPoint.name === 'finished') {
      return {
        ...dataPoint,
        color: '#66bec7', // Change the color to the desired color for the 'finished' section
      };
    } else {
      return {
        ...dataPoint,
        color: '#FFF', // Change the color to the desired color for other sections
      };
    }
  });

  return (
    <div>
      {/* Add new goals as much as needed */}
      <div className="goals_createGoal">
        <SavedMoney />
        <h1 className="newGoal">Create a New Goal</h1>
        <button className="goals_addGoal_btn" onClick={handleToggleForm}>
          {showNewGoalForm ? 'Cancel' : 'Add Goal'}
        </button>
      </div>
  
      {/* Add details of new goal */}
      <div className="goals-background">
        <div className="goals-wrapper">
          {showNewGoalForm && (
            <form onSubmit={handleSubmit} className="goals-form-box">
              <div className="goals-formArea">
                <label className="goals-label">Description:</label>
                <input
                  type="text"
                  className="goals-input-box"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
  
              <div className="goals-formArea">
                <label className="goals-label">Goal Cost:</label>
                <input
                  type="number"
                  className="goals-input-box"
                  value={goalCost}
                  onChange={handleGoalCostChange}
                />
                <select
                  className="goals-survey-currency"
                  value={currency}
                  onChange={handleCurrencyChange}
                >
                  <option value="">Curr.</option>
                  <option value="USD">$</option>
                  <option value="EUR">€</option>
                  <option value="GBP">£</option>
                  {/* Add more currency options as needed */}
                </select>
              </div>
  
              <button type="submit" className="goals_saveGoal_btn">
                Save Goalll
              </button>
            </form>
          )}
        </div>


      </div>
  
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
