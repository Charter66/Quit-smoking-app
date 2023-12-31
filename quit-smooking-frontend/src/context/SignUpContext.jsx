import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {

  const [name, setName] = useState('');
  const [nameValidation, setNameValidation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const [email, setEmail] = useState('');
  //const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAuth, setIsAuth] = useState({ token: localStorage.getItem('token') }); 

  const navigate = useNavigate();

  // const login = (token) => {
  //   setIsAuth({ token });
  //   setLoggedIn(true);
   
  // };
  
  // const logout = () => {
  //   setIsAuth({ token: '' });
  //   setLoggedIn(false);
  // };

  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    const regex =/^[a-zA-Z\s]*$/ ;
    const regex2 = /^[a-zA-Z0-9\s.!#&]{2,16}$/g ;

    console.log(inputValue)
    console.log(inputValue.match(regex2))
    if (inputValue.match(regex2)) {
      // Input value contains only letters
      setName(inputValue);
      setNameValidation('')
    } else {
      setName(inputValue);
      setNameValidation('Name must be between 2 and 16 characters long.')
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{4,100}$/;
  
    if (inputValue.match(regex)) {
      setPassword(inputValue);
      setPasswordValidation('');
    } else {
      setPassword(inputValue);
      setPasswordValidation('It must contain at least one letter and one number, and min 4 characters.');
    }
  };
  
  const handleRegister = () => {
    axios
      .post('https://quit-smoking-app-m1ex.onrender.com/api/users/register', {
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
        
        localStorage.setItem('token', token); // Store the token in local storage
  
        // Redirect the user to the survey page after successful registration
        navigate('/me/survey');
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
    nameValidation, 
    setNameValidation,
    passwordValidation,
    setPasswordValidation,
    isAuth
  };

  return (
    <RegisterContext.Provider value={contextValue}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterContext, RegisterProvider };
