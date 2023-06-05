import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import axios from 'axios';
import '../Styles/Goals.css';

// Chart
import SavedMoney from '../components/SavedMoney.jsx';

const Goals = () => {
  const { hasToken, profile, fetchUserProfile } = useContext(ProfileContext);
  const [goals, setGoals] = useState([]);
  const [description, setDescription] = useState('');
  const [goalCost, setGoalCost] = useState(0);
  const [currency, setCurrency] = useState('');
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [goalSaved, setGoalSaved] = useState(false);
  const [savedMoney, setSavedMoney] = useState(0);
  console.log(savedMoney);
  // console.log(profile)


  useEffect(() => {
    // Update local storage when goals state changes
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);



  useEffect(() => {
    fetchUserProfile();
    
    const storedSavedMoney = profile.savedMoney
    if(storedSavedMoney){
      setSavedMoney(parseFloat(storedSavedMoney))
    }
    // // Retrieve savedMoney from local storage
    // const storedSavedMoney = localStorage.getItem('savedMoney');
    // if (storedSavedMoney) {
    //   setSavedMoney(parseFloat(storedSavedMoney));
    // }
  
    // Retrieve goals from local storage when the component mounts
    const storedGoals = localStorage.getItem('goals');
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
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
        'http://localhost:5000/api/users/goals',
        newGoalData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (
        response.status === 200 &&
        response.data &&
        response.data.goals &&
        response.data.goals.length > 0
      ) {
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

  // Delete a Goal
  const handleDeleteGoal = async (goalId) => {
    try {
      const token = hasToken;

      // Make an API request to delete the goal
      const response = await axios.delete(
        `http://localhost:5000/api/users/goals/${goalId}`,
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
    setGoalSaved(false);
  };

 

  useEffect(() => {
    localStorage.setItem('savedMoney', savedMoney.toString());
  }, [savedMoney]);

  const handleGoalComplete = async (goal) => {
    // Deduct the goal cost from saved money
    const updatedSavedMoney = savedMoney - goal.goalCost;

  console.log(savedMoney)
    setSavedMoney(updatedSavedMoney);
    // Update the goals array to mark the goal as achieved
    const updatedGoals = goals.map((g) => {
      if (g._id === goal._id) {
        return { ...g, achieved: true };
      }
      return g;
    });
    setGoals(updatedGoals);

    setGoalSaved(true);

    // Update the saved money in the database
    await updateSavedMoneyInDatabase(updatedSavedMoney);
  };

  const updateSavedMoneyInDatabase = async (newSavedMoney) => {
    try {
      const token = hasToken;

      const updatedUserData = {
        savedMoney: newSavedMoney,
      };

      // Make an API request to update the saved money in the database
      await axios.put(
        'http://localhost:5000/api/users/update-saved-money',
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

  // useEffect(() => {
  //   // Calculate the total cost of all achieved goals
  //   const achievedGoalsCost = goals
  //     .filter((goal) => goal.achieved)
  //     .reduce((total, goal) => total + goal.goalCost, 0);

  //   // Calculate the remaining saved money after deducting the achieved goals cost
  //   const updatedSavedMoney = savedMoney - achievedGoalsCost;
  //   setSavedMoney(updatedSavedMoney);

  //   // Update the saved money in the database
  //   updateSavedMoneyInDatabase(updatedSavedMoney);

  //   // Update the saved money in local storage
  //   localStorage.setItem('savedMoney', updatedSavedMoney.toString());
  // }, [goals]);

  return (
    <div>
      {/* Add new goals as much as needed */}
      <SavedMoney className="saved-money" />
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
                Save Goal
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
              className={`bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center justify-between ${
                goal.achieved ? 'goal-card-achieved' : ''
              }`}
            >
              <div>
                <p>Description: {goal.description}</p>
                <p>
                  Goal Cost: {goal.goalCost}
                  {goal.currency}
                </p>
              </div>
              {goal.goalCost <= savedMoney && !goal.achieved && (
                <button
                  className="text-green-600 hover:text-green-700"
                  onClick={() => handleGoalComplete(goal)}
                >
                  Select this Goal as Done
                </button>
              )}
              {goal.achieved && <span>Achieved</span>}
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
