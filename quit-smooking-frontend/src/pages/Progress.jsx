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

      <div className='progress-container'>
        <div className='progress-wrapper'>
          <div className='progress-text'>
            <h2 className='progress-headline'>Improved lung function:</h2>
            <p>Your lung function begins to improve. Your lung capacity increases, making it easier to breathe and engage in physical activities.</p>
          </div>

          <div className="progress-chart">
            <DoughnutChart chartData={chartData} hidePercentage={true} />
          </div>
        </div>
      </div>

      <div className='progress-container'>
        <div className='progress-wrapper'>
          <div className='progress-text'>
            <h2 className='progress-headline'>Reduced risk of respiratory infections:</h2>
            <p>Quitting smoking lowers your susceptibility to respiratory infections. Your respiratory system becomes healthier and better equipped to fight off infections.</p>
          </div>

          <div className="progress-chart">
            <DoughnutChart chartData={chartData} hidePercentage={true} />
          </div>
        </div>
      </div>

      <div className='progress-container'>
        <div className='progress-wrapper'>
          <div className='progress-text'>
            <h2 className='progress-headline'>Enhanced cardiovascular health:</h2>
            <p>Your blood pressure and heart rate normalise, improving blood circulation and reducing the strain on your cardiovascular system.</p>
          </div>

          <div className="progress-chart">
            <DoughnutChart chartData={chartData} hidePercentage={true} />
          </div>
        </div>
      </div>

      {/* Bottom container */}
      <div className="progress-container">
        <div className='progress-extra-box'>
        </div>
    
        <div className='progress-extra-box'>
         <span className='icon-progress'><FontAwesomeIcon icon={faHourglass} name='password'></FontAwesomeIcon></span>
          <p>You lost 3 years and 2 months off your life expactancy</p>
        </div>
    
        <div className='progress-extra-box'>
          <span className='icon-progress'><FontAwesomeIcon icon={faSmoking} name='password'></FontAwesomeIcon></span>
          <p>You smoked 1257 cigarettes</p>
        </div>
    
        <div className='progress-extra-box'>
          <span className='icon-progress'><FontAwesomeIcon icon={faCoins} name='password'></FontAwesomeIcon></span>
          <p>You spent $5438.00</p>
        </div>

      </div>


      {/* Unlocked achievements */}
      <div className="progress-container">
          <span className='icon-progress'><FontAwesomeIcon icon={faUnlock}></FontAwesomeIcon></span>
          <p>1 day smoke free!</p>
      </div>

      <div className="progress-container">
          <span><FontAwesomeIcon icon={faUnlock}></FontAwesomeIcon></span>
          <p>10 days' smoke free!</p>
      </div>

      <div className="progress-container">
          <span><FontAwesomeIcon icon={faUnlock}></FontAwesomeIcon></span>
          <p>100 days' smoke free!</p>
      </div>

      <div className="progress-container-uncompleted">
          <span><FontAwesomeIcon icon={faLock}></FontAwesomeIcon></span>
          <p>6 months' smoke free!</p>
      </div>



    </div>
  );
}

export default Progress;
