import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const withAuthProtection = (Component) => {
  const ProtectedRoute = (props) => {
    const {  isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      console.log('Component:', Component);
      console.log('Props:', props);

      if (!isLoggedIn ) {
        console.log('Redirecting to login...');
        navigate('/login', { replace: true });
      }
    }, [isLoggedIn,  props, navigate]);

    // Render the protected component if authenticated
    return isLoggedIn ? <Component {...props} /> : null;
  };

  return ProtectedRoute;
};

export default withAuthProtection;
