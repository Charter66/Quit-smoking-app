import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="bg-gray-500 sm:bg-gray-500 sm:rounded-lg sm:p-40 sm:mx-auto sm:max-w-sm">
        <h1 className="text-2xl font-bold text-center">Hello, World!</h1>
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
