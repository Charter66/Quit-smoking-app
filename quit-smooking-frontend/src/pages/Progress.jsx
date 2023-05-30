import React from 'react';
import ProgressBar from '../components/ProgressBar';

const Progress = () => {

  return (
    <div className="min-h-screen py-20 px-10 bg-gray-100">
    <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-10">
      
      <div className="flex items-center flex-wrap max-w-md px-10 bg-white shadow-xl rounded-2xl h-20">
        <ProgressBar percent={60} color="gray-600" />
        <p className="ml-4 font-medium text-gray-600 sm:text-xl">Impruve lung function:</p>
      </div>

      <div className="flex items-center flex-wrap max-w-md px-10 bg-white shadow-xl rounded-2xl h-20">
        <ProgressBar percent={100} color="gray-600" />
        <p className="ml-4 font-medium text-gray-600 sm:text-xl">Reduced risk of respiratory infections:</p>
      </div>

      <div className="flex items-center flex-wrap max-w-md px-10 bg-white shadow-xl rounded-2xl h-20">
        <ProgressBar percent={80} color="gray-600" />
        <p className="ml-4 font-medium text-gray-600 sm:text-xl">Enhanced cardiovacular health:</p>
      </div>

    </div>
  </div>
  );
};

export default Progress;