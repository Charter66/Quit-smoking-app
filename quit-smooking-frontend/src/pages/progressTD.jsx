<<<<<<< GoalsPage
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Progress.css';

// Chart
import DoughnutChart from '../components/DoughnutChart.jsx';

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmoking, faCoins, faHourglass, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

function Progress() {
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    setProgress(true);
  }, []);

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
      {isLoading ? (
        <div className="progress-container">    
          <p>Loading profilee...</p>
        </div>
      ) : profile ? (
        <div className="min-h-screen py-20 px-10 ">
            <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-10">
      
            <div className="flex items-center fit-content bg-white shadow-xl rounded-2xl h-30">
           
            <p className="ml-4 font-medium text-gray-600 sm:text-xl">In between 2 weeks – 3 months your lung function starts to improve. Your lung function begins to improve. Your lung capacity increases, making it easier to breathe and engage in physical activities.</p>

            <ProgressBar percent={threeWeeksPercentage.toFixed(2)} color="gray-600" />

            </div>





            

            <div className="flex items-center fit-content bg-white shadow-xl rounded-2xl h-30">
            <ProgressBar percent={monthPercentage.toFixed(2)} color="blue-500" />
            <p className="ml-4 font-medium text-gray-600 sm:text-xl">After one month you will reduce risks of respiratory infections:</p>
            </div>

            <div className="flex  bg-white shadow-xl rounded-2xl h-30">
            <ProgressBar percent={yearPercentage.toFixed(2)} color="grey-600" />
            <p className="ml-4 font-medium text-gray-600 sm:text-xl">After one year you will enhance your cardiovacular health:</p>
            </div>
        </div><br></br>
        
        
        <div className="flex-col justify-items-start justify-evenly bg-white shadow-xl rounded-2xl h-60">
              <h3>During your period of smoking:</h3>
              <p>You lost {years} year {months} months and {days} days off your life expectancy</p>
              <p>You smoked {cigarettes} cigarettes</p>
              <p>You spent {moneySpent} {currency}</p> 
        </div>

    </div>

        
      ) : (
        <p>Unable to fetch profile data.</p>
      )}

    
  </div>
  );
};

export default Progress;
