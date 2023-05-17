import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="bg-gray-500 flex flex-col h-screen overflow-hidden">
        <div className="bg-white sm:bg-white sm:rounded-lg sm:p-4 sm:mx-auto sm:max-w-[414px] h-[800px] w-[414px] overflow-y-auto scrollbar-hide">
          <h1 className="text-2xl font-bold text-center">Quit Smoking</h1>
          <div className="h-full w-full">
            <App />
          </div>
        </div>
      </div>
     
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
