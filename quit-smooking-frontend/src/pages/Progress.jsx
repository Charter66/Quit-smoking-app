import React from 'react';
import ProgressBar from '../components/ProgressBar';

const Progress = () => {
  const progress = 50; // Example progress value

  return (
    <div>
      <h1>Smooking free progress</h1>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default Progress;