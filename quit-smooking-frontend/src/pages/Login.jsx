import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [{email, password}, setForm] = useState({
    email:'',
    password: '',
  })

  const handleChange = (e) => {
    const {name , value} = e.target;
    setForm((prev)=>({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    try{
        const {status} = await axios.post('http://localhost:3000/api/users/login', {email, password});
        console.log(status)
    }catch(error){
        console.error(error)
    }


 navigate('/')
 
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
            value={email}
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
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="my-button">
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
