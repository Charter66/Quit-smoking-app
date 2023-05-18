import  { useContext } from 'react';
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
  } = useContext(RegisterContext);
  const navigate = useNavigate();
  const { isLoggedIn , setLoggedIn} = useContext(AuthContext);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleRegister();
      // Handle successful registration, if needed
     setLoggedIn(true);
      } catch (error) {
      // Handle registration error, if needed
      console.error(error); // Example: Display the error message
    }
    console.log(name)
    console.log(isLoggedIn)

  };

  if(isLoggedIn) {
    navigate('/survey')
  }

  return (
    <div>
      <h2 className="text-red-500">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Registerr</button>
      </form>
    </div>
  );
};

export default SignUp;
