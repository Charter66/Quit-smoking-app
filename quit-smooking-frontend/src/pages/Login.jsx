import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
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
        setLoggedIn(true);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoggedIn) {
    navigate('/dashboard');
  }

  return (
    <>
      <form className="my-form" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="my-name"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="my-button">
          Submit
        </button>
      </form>
      <Link to="/signup">You do not have an account. Click here to create one.</Link>
    </>
  );
};

export default Login;
