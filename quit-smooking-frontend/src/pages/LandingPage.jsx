import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
const navigate = useNavigate()
  const handleGetStarted = () => {
    const isLoggedIn = true; // Replace this with your actual login check logic
    if (isLoggedIn) {
      navigate('/me/dashboard');
    } else {
      history.push('/login');
    }
  };

  return (
    <div >
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
