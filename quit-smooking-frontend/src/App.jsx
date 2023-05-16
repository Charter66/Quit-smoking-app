// import React from 'react';
import { BrowserRouter as  Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Progress from './pages/Progress';
import User from './pages/User';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { RegisterProvider } from './context/ContextProvider';

const App = () => {
  return (
   
      <div>
       
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/user" element={<User />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
   
  );
};

export default App;
