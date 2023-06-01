import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../context/ProfileContext';

import axios from 'axios';
import '../Styles/Goals.css';

// Chart
import DoughnutChart from '../components/DoughnutChart.jsx';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [description, setDescription] = useState('');
  const [goalCost, setGoalCost] = useState(0);
  const [currency, setCurrency] = useState('');
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [goalSaved, setGoalSaved] = useState(false);

  const { hasToken , profile} = useContext(ProfileContext);

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

    // Set goalSaved to true after submitting the form
    setGoalSaved(true);

    try {
      const token = hasToken;

      console.log('description:', description);
      console.log('goalCost:', goalCost);
      console.log('currency:', currency);

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

      <div className="mt-4">
        {goals ? (
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
