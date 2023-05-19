import  { useContext, useEffect } from 'react';
import { RegisterContext } from '../context/SignUpContext';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';


const SignUp = () => {
  const {
    name,
    email,
    password,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRegister,
  } = useContext(RegisterContext) ?? {};

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleRegister();
      // Handle successful registration, if needed
    } catch (error) {
      // Handle registration error, if needed
      console.error(error); // Example: Display the error message
    }

  };

  console.log(isLoggedIn)
  
useEffect(()=>{
  if(isLoggedIn) {
    navigate('/survey')
  }
},[isLoggedIn, navigate])
  

  return (
    <div >
      <h2 className="text-3xl font-bold underline bg-red-500">Register User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          email:
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
