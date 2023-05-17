import React, { createContext, useState } from 'react';
import axios from 'axios';

const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      })
      .catch((error) => {
        // Handle registration error
        console.error(error); // Example: Display the error message
      });
  };

  const contextValue = {
    name,
    password,
    email,
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






