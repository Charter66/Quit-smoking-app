import { useContext } from 'react';
import { RegisterContext } from '../context/ContextProvider';

const SignUp = () => {
  const {
    name,
    password,
    email,
    handleNameChange,
    handlePasswordChange,
    handleEmailChange,
    handleRegister,
  } = useContext(RegisterContext) ?? {};

  console.log(name)

  return (
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
      </form>
    </div>
  );
};

export default SignUp;