import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/goals">Goals</Link>
        </li>
        <li>
          <Link to="/progress">Progress</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
