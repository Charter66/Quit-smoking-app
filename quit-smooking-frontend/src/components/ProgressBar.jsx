import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-4 bg-gray-200 rounded-full">
      <div
        className="h-full bg-green-500 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;