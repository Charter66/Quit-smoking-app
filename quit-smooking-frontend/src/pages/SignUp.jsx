<<<<<<< HEAD
import  { useContext } from 'react';
=======
import { useContext } from 'react';
>>>>>>> TDD
import { RegisterContext } from '../context/ContextProvider';

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleRegister();
      // Handle successful registration, if needed
    } catch (error) {
      // Handle registration error, if needed
      console.error(error); // Example: Display the error message
    }
    console.log(name)
  };

  return (
<<<<<<< HEAD
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
        <button type="submit">Register</button>
=======
    <div >
      <h2 className="text-3xl font-bold underline bg-red-500">Register User</h2>
      <form >
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
>>>>>>> TDD
      </form>
    </div>
  );
};

export default SignUp;
