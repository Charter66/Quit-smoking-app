import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Progress from './pages/Progress';
import User from './pages/User';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { RegisterProvider } from './context/SignUpContext';
import Survey from './pages/Survey';
import withAuthProtection from './components/withAuthProtection';

const ProtectedDashboard = withAuthProtection(Dashboard);
const ProtectedGoals = withAuthProtection(Goals);
const ProtectedProgress = withAuthProtection(Progress);
const ProtectedUser = withAuthProtection(User);
const ProtectedSurvey = withAuthProtection(Survey);

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        <Routes>
          <Route path="/dashboard" element={<ProtectedDashboard />} />
          <Route path="/goals" element={<ProtectedGoals />} />
          <Route path="/progress" element={<ProtectedProgress />} />
          <Route path="/user" element={<ProtectedUser />} />
          <Route
            path="/signup"
            element={
              <RegisterProvider>
                <SignUp />
              </RegisterProvider>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/survey" element={<ProtectedSurvey />} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
};

export default App;
