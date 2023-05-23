import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const withAuthProtection = (Component) => {
  const ProtectedRoute = (props) => {
    const { isAuth } = useContext(AuthContext);

    useEffect(() => {
      if (!isAuth.token) {
        // Redirect to login page if not authenticated
        // You can also perform additional actions here, such as clearing local storage or logging out the user
        return <Navigate to="/login"  />;
      }
    }, [isAuth.token]);

    // Render the protected component if authenticated
    return <Component {...props} />;
  };

  return ProtectedRoute;
};

export default withAuthProtection;
