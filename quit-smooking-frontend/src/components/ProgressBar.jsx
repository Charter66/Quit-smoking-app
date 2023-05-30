import React from 'react';

const ProgressBar = ({ percent, color }) => {
  const circleStyle = {
    strokeDashoffset: 100 - percent,
  };

  return (
    <div className="flex items-center justify-center">
      <svg className="w-24 h-24">
        <circle
          className={`stroke-current text-${color}`}
          strokeWidth="8"
          strokeDasharray="100"
          style={circleStyle}
          r="20"
          cx="50"
          cy="50"
          fill="transparent"
        />
      </svg>
      <span className={`ml-2 text-${color}`}>{percent}%</span>
    </div>
  );
};


export default ProgressBar;
