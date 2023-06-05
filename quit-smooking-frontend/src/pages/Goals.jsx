import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import axios from 'axios';

// Chart
import SavedMoney from '../components/SavedMoney.jsx';
import { FaCheck, FaTrash } from 'react-icons/fa'; // Example icons from FontAwesome

const Goals = () => {
  const { hasToken, profile, fetchUserProfile } = useContext(ProfileContext);
  const [goals, setGoals] = useState([]);
  const [description, setDescription] = useState('');
  const [goalCost, setGoalCost] = useState(0);
  const [currency, setCurrency] = useState('');
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [goalSaved, setGoalSaved] = useState(false);
  const [savedMoney, setSavedMoney] = useState(0);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    fetchUserProfile();

    const storedSavedMoney = profile.savedMoney;
    if (storedSavedMoney) {
      setSavedMoney(parseFloat(storedSavedMoney));
    }

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
        `http://localhost:5000/api/users/goals/${goalId}`,
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

  useEffect(() => {
    localStorage.setItem('savedMoney', savedMoney.toString());
  }, [savedMoney]);

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

  const updateAchievedStatusInDatabase = async (goalId) => {
    try {
      const token = hasToken;
      const updatedGoalData = {
        achieved: true,
      };

      await axios.put(
        `http://localhost:5000/api/users/goals/achieve/${goalId}`,
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

  return (
    <div>


      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
         
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Action completed successfully!                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <SavedMoney />

      <div className="goals_createGoal">
        <button className="goals_addGoal_btn" onClick={handleToggleForm}>
          {showNewGoalForm ? 'Cancel' : 'Add Goal'}
        </button>
      </div>

      <div className="goals-background">
        <div className="goals-wrapper">
          {showNewGoalForm && (
            <form onSubmit={handleSubmit} className="goals-form-box">
              <div className="goals-formArea">
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

              <button type="submit" className="goals_saveGoal_btn" >
                Save Goal
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-4">
        {goals && goals.length > 0 ? (
          goals
            .sort((a, b) => (a.achieved && !b.achieved ? 1 : -1))
            .map((goal, index) => (
              <div
                key={index}
                className={`bg-blue rounded-lg shadow-lg p-4 mb-4 flex items-center justify-between ${
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
                    onClick={() => {
                      handleGoalComplete(goal);
                       updateAchievedStatusInDatabase(goal._id);
                      setShowModal(true)
                    }}
                  >
                    <FaCheck />
                  </button>
                )}
                {goal.achieved && (
                  <span>
                    <FaCheck />
                  </span>
                )}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {handleDeleteGoal(goal._id);
                    setShowModal(true)}}
                    

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