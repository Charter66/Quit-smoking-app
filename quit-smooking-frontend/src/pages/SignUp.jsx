import  { useContext, useEffect } from 'react';
import { RegisterContext } from '../context/SignUpContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import "../styles/SignUp.css";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
  const {
    name,
    email,
    password,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRegister,
  } = useContext(RegisterContext) || {};
  const navigate = useNavigate();
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleRegister();
      // Handle successful registration, if needed
      setLoggedIn(true)
    } catch (error) {
      // Handle registration error, if needed
      console.error(error); // Example: Display the error message
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/survey');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className='background'>
      <div className='wrapper'>
        <div className='form-box sign-up'>
          <h2>Sign Up</h2>
          
          <form className="my-form" onSubmit={handleSubmit}>
    
            <div className='input-box'>
            <span className='icon'><FontAwesomeIcon icon={faUser} name='name'></FontAwesomeIcon></span>
              <label> name:
                <input className='submit-box' type="text" name="name" value={name}
                onChange={handleNameChange}
                />
              </label>
            </div>

            <div className='input-box'>
              <span className='icon'><FontAwesomeIcon icon={faEnvelope} name='email'></FontAwesomeIcon>
              </span>
              <label> email:
                <input className='submit-box' type="email" name="email" value={email}
                onChange={handleEmailChange}
                />
              </label>
            </div>

            <div className='input-box'>
              <span className='icon'><FontAwesomeIcon icon={faLock} name='password'></FontAwesomeIcon></span>
              <label> password:
                <input className='submit-box' type="password" name="password" value={password}
                onChange={handlePasswordChange}
                />
              </label>
            </div>

            <div className='btn'>
            <button type="submit"> Register
            </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
