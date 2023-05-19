import  { useContext, useEffect } from 'react';
import { RegisterContext } from '../context/SignUpContext';
import { useNavigate } from 'react-router-dom';
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
    <div>
      <h2 className="text-3xl font-bold underline bg-red-500">Register User</h2>
      <div>
        <h2 className="text-red-500">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>
            name:
            <input
              className="mb-4 px-4 py-2 border rounded"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <label>
            email:
            <input
              className="mb-4 px-4 py-2 border rounded"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <label>
            Password:
            <input
              className="mb-4 px-4 py-2 border rounded"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
