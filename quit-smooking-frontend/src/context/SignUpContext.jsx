import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Update the path to your AuthContext file
import { useNavigate } from 'react-router-dom';

const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuth } = useContext(AuthContext); // Access setIsAuth from AuthContext
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = () => {
    axios
      .post('http://localhost:3000/api/users/register', {
        name,
        email,
        password,
      })
      .then((response) => {
        // Handle successful registration
        console.log(response.data); // Example: Display the response data
  
        // Get the token from the response data
        const token = response.data.token;
        // You can then store the token in local storage or use it as needed
        // For example, you can set it in the AuthProvider's state
        setIsAuth({ token });
        localStorage.setItem()
  
        // Redirect the user to the survey page after successful registration
        navigate('/survey');
      })
      .catch((error) => {
        // Handle registration error
        console.error(error); // Example: Display the error message
      });
  };
  const contextValue = {
    name,
    email,
    password,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRegister,
  };

  return (
    <RegisterContext.Provider value={contextValue}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterContext, RegisterProvider };
