import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import { ProfileContext } from '../context/ProfileContex';
import "../styles/Login.css";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const { hasToken, isLoggedIn, setLoggedIn } = useContext(ProfileContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/login',
        formData
      );
      if (response.status === 200) {
        const token = response.data.token;
        // Store the token in local storage
        localStorage.setItem('token', token)
        setLoggedIn(true);
        navigate('/me/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(isLoggedIn)

  useEffect(() => {
    console.log('Redirecting to login...');

    navigate('/login', { replace: true });
  }, [navigate]);

  // if (hasToken) return <Navigate to='/dashboard' />
  return (
    <>
      <div className='background'></div>

        <form className="my-form" onSubmit={handleSubmit}>

        <div className='input-box'>
          <span className='icon'><FontAwesomeIcon icon={faEnvelope} name='email'></FontAwesomeIcon>
          </span>
            <label> email:
              <input className='submit-box' type="email" id="name" name="email" value={formData.email}
              onChange={handleChange}
              />
            </label>
        </div>

        <div className='input-box'>
          <span className='icon'><FontAwesomeIcon icon={faLock} name='password'></FontAwesomeIcon></span>
            <label> password:
              <input className='submit-box' type="password" id="password" name="password" value={formData.password} onChange={handleChange}
              />
            </label>
        </div>

        <div className='btn'>
          <button type="submit" className="my-button">
          Submit
          </button>
        </div>

        <div className='login-signUp'>
          <p>Don&apos;t have an account? <Link to="/signup" className='signUp-link'>Sign Up</Link></p>
        </div>
      </form>
    </>
  );
};

export default Login;
