import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileContext } from '../context/ProfileContext';

const withAuthProtection = (Component) => {
  const ProtectedRoute = (props) => {
    const { hasToken, isLoggedIn } = useContext(ProfileContext);
    const navigate = useNavigate();
  console.log(isLoggedIn)
    useEffect(() => {
      console.log('Component:', Component);
      console.log('Props:', props);

      if (!hasToken && !isLoggedIn ) {
        console.log('Redirecting to login...');
        navigate('/login', { replace: true });
      }
    }, [hasToken, isLoggedIn,  props, navigate]);

    // Render the protected component if authenticated
    return hasToken ? <Component {...props} /> : <div>No component from protection</div>;
  };

  return ProtectedRoute;
};

export default withAuthProtection;
