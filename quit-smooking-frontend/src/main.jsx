import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContex';
import "./styles/Dashboard.css";

//logo
import logo from './images/logoBig.png';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ProfileProvider>
    <AuthProvider>
      <div className="bg-gray-500 flex flex-col h-screen overflow-hidden">
        <div className="bg-white sm:bg-white sm:rounded-lg sm:p-4 sm:mx-auto sm:max-w-[414px] h-[800px] w-[414px] overflow-y-auto scrollbar-hide">
          <div className="logo">
          <img src={logo} width="200" height="150" />
          </div>
          <div>
            <App />
          </div>
        </div>
      </div>
      </AuthProvider>
    </ProfileProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
