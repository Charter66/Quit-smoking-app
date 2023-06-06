import  { useContext, useEffect } from 'react';
import { RegisterContext } from '../context/SignUpContext';
import { useNavigate, Link } from 'react-router-dom';
import "../Styles/SignUp.css";
import { AuthContext } from '../context/AuthContext';
import { ProfileContext } from '../context/ProfileContext';

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
    nameValidation
  } = useContext(RegisterContext) || {};
  const navigate = useNavigate();
  const { isLoggedIn, setLoggedIn } = useContext(ProfileContext);
  const{hasToken} = useContext(AuthContext);

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
  console.log(isLoggedIn)

  useEffect(() => {
    if (hasToken) {
      navigate('/me/survey');
    }
  }, [hasToken, navigate]);

  return (
    <div className='signup-background'>
      <div className='signup-wrapper'>
        <div className='signup-form-box sign-up'>
          <h2>Sign Up</h2>
          
          <form onSubmit={handleSubmit}>
    
            <div className='signup-input-box'>
            <span className='signup-icon'><FontAwesomeIcon icon={faUser} name='name'></FontAwesomeIcon></span>
              <label> name:
                <input 
                className='signup-submit-box' 
                type="text" name="name"
                 value={name}
                onChange={handleNameChange}
                />
              </label>
              {nameValidation && <p>{nameValidation}</p>}
            </div>

            <div className='signup-input-box'>
              <span className='signup-icon'><FontAwesomeIcon icon={faEnvelope} name='email'></FontAwesomeIcon>
              </span>
              <label> email:
                <input className='signup-submit-box' type="email" name="email" value={email}
                onChange={handleEmailChange}
                />
              </label>
            </div>

            <div className='signup-input-box'>
              <span className='signup-icon'><FontAwesomeIcon icon={faLock} name='password'></FontAwesomeIcon></span>
              <label> password:
                <input className='signup-submit-box' type="password" name="password" value={password}
                onChange={handlePasswordChange}
                />
              </label>
            </div>

            <div className='signup-btn'>
            <button type="submit"> Register
            </button>
            </div>

            <div className='signup-to-login'>
              <div><p>Do you already have an account? </p></div>
              <div><p><Link to="/login" className='link-to-signup-to-login'>Login</Link></p></div>
            </div>

          </form>



        </div>
        
      </div>
    </div>
  );
};

export default SignUp;
