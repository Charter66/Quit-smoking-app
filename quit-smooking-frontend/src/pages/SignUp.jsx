import { useContext, useEffect } from "react";
import { RegisterContext } from "../context/SignUpContext";
import { useNavigate, Navigate, Link } from "react-router-dom";
import "../Styles/SignUp.css";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const {
    name,
    email,
    password,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRegister,
    nameValidation,
    passwordValidation
  } = useContext(RegisterContext) || {};
  const navigate = useNavigate();
  const { isLoggedIn, setLoggedIn, initPath } = useContext(ProfileContext);
  const { hasToken } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      handleRegister();
      // Handle successful registration, if needed
      setLoggedIn(true);
    } catch (error) {
      // Handle registration error, if needed
      console.error(error); // Example: Display the error message
    }
  };
  console.log(isLoggedIn);

  // useEffect(() => {
  //   if (hasToken) {
  //     navigate("/me/survey");
  //   }
  // }, [hasToken, navigate]);

  if (isLoggedIn)
  return (
    <Navigate to={initPath.includes("signup") ? "/me/survey" : initPath} />
  );
  return (
    <>
      <div className="signup-background">
        <div className="signup-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="signup-input-box">
              <span className="signup-icon">
                <FontAwesomeIcon icon={faUser} name="name"></FontAwesomeIcon>
              </span>
              <label>
                {" "}
                name:
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  
                />
              </label>
              {nameValidation && <p style={{ color: 'red', fontSize: '12px', marginTop: '-15px' }}>{nameValidation}</p>}
            </div>

            <div className="signup-input-box">
              <span className="signup-icon">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  name="email"
                ></FontAwesomeIcon>
              </span>
              <label>
                {" "}
                email:
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
            </div>

            <div className="signup-input-box">
              <span className="signup-icon">
                <FontAwesomeIcon
                  icon={faLock}
                  name="password"
                ></FontAwesomeIcon>
              </span>
              <label>
                password:
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  style={{ marginBottom: '0' }}
                />
              </label>
              {passwordValidation && (
                <p style={{ color: 'red', fontSize: '12px', marginTop: '-20px', marginBottom: '0' }}>
                  {passwordValidation}
                </p>)}
            </div>

            <div className="signup-btn">
              <button type="submit"> Register</button>
            </div>

            <div className="signup-to-login">
              <div>
                <p>Do you already have an account? </p>
              </div>
              <div>
                <p>
                  <Link to="/login" className="link-to-signup-to-login">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
