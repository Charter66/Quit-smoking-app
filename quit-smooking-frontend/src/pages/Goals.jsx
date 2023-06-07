import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import axios from 'axios';
import '../styles/Goals.css'

// Chart
import SavedMoney from '../components/SavedMoney.jsx';
import { FaCheck, FaTrash , FaHourglassHalf} from 'react-icons/fa'; // Example icons from FontAwesome

const Goals = () => {
  const { hasToken, profile, fetchUserProfile } = useContext(ProfileContext);
  const [goals, setGoals] = useState([]);
  const [description, setDescription] = useState('');
  const [goalCost, setGoalCost] = useState('');
  const [currency, setCurrency] = useState('');
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [goalSaved, setGoalSaved] = useState(false);
  const [savedMoney, setSavedMoney] = useState();
  const [showModal, setShowModal] = useState(false);
  const quitDate = new Date(profile && profile.smokingHabit && profile.smokingHabit.quitDate);
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - quitDate.getTime());
  const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24));



  // Saved money 
  const cigarettesInPackage = profile && profile.smokingHabit && profile.smokingHabit.cigarettesInPackage;
  const packageCost =profile && profile.smokingHabit &&  profile.smokingHabit.packageCost;
  const cigarettesPerDay =profile && profile.smokingHabit &&  profile.smokingHabit.cigarettesPerDay;
  const priceForOneCigarret =  (packageCost / cigarettesInPackage) * cigarettesPerDay;
 const savedMoneyy = profile.savedMoney


  
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    fetchUserProfile();
    const storedSavedMoney = profile.savedMoney;
    if (storedSavedMoney) {
      setSavedMoney(parseFloat(storedSavedMoney));
    }
    setSavedMoney(savedMoneyy)
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

      const response = await axios.put(
        'https://quit-smoking-app.onrender.com/api/users/goals',
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
          const { description, goalCost, currency } = newGoal;
          // Do something with the properties
        }

        setGoals((prevGoals) => [...prevGoals, newGoal]);

        setDescription('');
        setGoalCost(0);
        setCurrency('');
        setShowNewGoalForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      const token = hasToken;

      const response = await axios.delete(
        `https://quit-smoking-app.onrender.com/api/users/goals/${goalId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
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

  //  useEffect(() => {
  //    localStorage.setItem('savedMoney', savedMoney.toString());
  //  }, [savedMoney]);

  const handleGoalComplete = async (goal) => {
    const updatedSavedMoney = savedMoney - goal.goalCost;
    setSavedMoney(updatedSavedMoney);

    const updatedGoals = goals.map((g) => {
      if (g._id === goal._id) {
        return { ...g, achieved: true };
      }
      return g;
    });
    setGoals(updatedGoals);

    setGoalSaved(true);

    await updateSavedMoneyInDatabase(updatedSavedMoney);
  };

  const updateSavedMoneyInDatabase = async (newSavedMoney) => {
    try {
      const token = hasToken;
      const updatedUserData = {
        savedMoney: newSavedMoney,
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

  const updateAchievedStatusInDatabase = async (goalId) => {
    try {
      const token = hasToken;
      const updatedGoalData = {
        achieved: true,
      };

      await axios.put(
        `https://quit-smoking-app.onrender.com/api/users/goals/achieve/${goalId}`,
        updatedGoalData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const updatedGoalIndex = profile.goals.findIndex(
        (goal) => goal._id === goalId
      );

      if (updatedGoalIndex !== -1) {
        const updatedGoal = profile.goals.splice(updatedGoalIndex, 1)[0];
        profile.goals.push(updatedGoal);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(currency)

   return (
    <div>
    <div className="bg-gray-100 rounded-lg shadow-lg p-4 savedmoney">
    <p className="font-bold">
  <span className="text-yellow-500">Total saved:</span>
  <span className="text-green-500"> {profile &&  profile.savedMoney &&  profile.savedMoney.toFixed(2)}{profile.smokingHabit.selectedCurrency}</span>
</p></div>
      {showModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
          <div className="modal">
            <p className="modal-message">Action completed successfully!</p>
            <button className="modal-close-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </>
      )}

      <div className="goals-background">
        <div className="goals-wrapper">
          {showNewGoalForm && (
            <form onSubmit={handleSubmit} className="goals-form-box">
              <div className="goals-formArea ">
                <label className="goals-label">Goal Title:</label>
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
                  placeholder='0'
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
                </select>
              </div>
              <button
  type="submit"
  className="text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
  style={{ backgroundColor: "#f6b801" }}
>
  Save Goal
</button>
            </form>
          )}

          <div className="goals_createGoal">
        <button className="goals_addGoal_btn" onClick={handleToggleForm}>
          {showNewGoalForm ? 'Cancel' : 'Add Goal'}
        </button>
      </div>
        </div>
      </div>

      <div className="goals-list">
        {goals && goals.length > 0 ? (
          goals
            .sort((a, b) => (a.achieved && !b.achieved ? 1 : -1))
            .map((goal, index) => (
              <div
                key={index}
                className={`goal-card ${goal.achieved ? 'goal-card-achieved' : ''}`}
              >
                <div className="goal-card-content">
                  <p className="goal-card-title">Goal: {goal.description}</p>
                  <p className="goal-card-cost">
                    Goal Cost: {goal.goalCost}
                    {goal.currency}
                  </p>
                </div>
                {goal.goalCost <= savedMoney && !goal.achieved ? (
                  <button
                    className="check-button"
                    onClick={() => {
                      handleGoalComplete(goal);
                      updateAchievedStatusInDatabase(goal._id);
                      setShowModal(true);
                    }}
                  >
                    <FaCheck />
                  </button>
                ) : (
                  <span >
                    {goal.achieved ? <FaCheck className="achieved-icon-check"/> : <FaHourglassHalf className="achieved-icon"/>}
                  </span>
                )}
                <button
                  className="delete-button"
                  onClick={() => {
                    handleDeleteGoal(goal._id);
                    setShowModal(true);
                  }}
                >
                  <FaTrash />
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