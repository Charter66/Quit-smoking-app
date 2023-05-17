import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Progress from './pages/Progress';
import User from './pages/User';
import Login from './pages/Login';
import SingUp from './pages/SignUp';
import { RegisterProvider } from './context/SignUpContext';
import Navbar from './components/Navbar';
import Survey from './pages/Survey'

const App = () => {
  return (
    <div className="flex flex-col  h-screen ">
      <div className="flex-grow">
        
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/user" element={<User />} />
            <Route
              path="signup"
              element={
                <RegisterProvider>
                  <SingUp />
                </RegisterProvider>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="/survey" element={<Survey />} />
          </Routes>
       
      </div>
      <Navbar />
    </div>
  );
};

export default App;
