import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from "../context/ProfileContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(ProfileContext);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      if (isLoggedIn) {
        navigate('/me/dashboard');
      } else {
        navigate('/login');
      }
    } else {
      localStorage.setItem('hasVisited', true);
    }
  }, [isLoggedIn, navigate]);

  const handleGetStarted = () => {
    navigate('/me/dashboard');
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to QuitSmoker</h1>
        <p className="text-lg text-gray-600 mb-8">Start your journey towards a smoke-free life</p>
        <button
          className="bg-yellow-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg animate-bounce"
          onClick={handleGetStarted}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
