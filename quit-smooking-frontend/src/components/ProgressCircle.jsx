import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCircle = ({ progress }) => {
  return (
    <div style={{ width: '180px' }}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        strokeWidth={15}
        styles={buildStyles({
          textColor: '#3f3f3f',
          textSize: 20,
          pathColor: `rgba(0, 123, 255, 0.5)`,
          trailColor: '#e4e4e4',
          strokeLinecap: 'round',
        })}
      />
     
    </div>
  );
};

export default ProgressCircle;
