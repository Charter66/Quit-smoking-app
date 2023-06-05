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
          pathColor: `rgba(31, 147, 160, ${progress / 100})`,
          trailColor: '#fff',
          strokeLinecap: 'round',
        })}
      />
     
    </div>
  );
};

export default ProgressCircle;
