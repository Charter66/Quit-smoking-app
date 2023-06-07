import { Link } from 'react-router-dom';
import { BsHouse, BsBullseye, BsGraphUp, BsPerson } from 'react-icons/bs';
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="sticky bottom-0 left-0 bg-custom-blue w-full navbar rounded">
      <ul className="flex items-center justify-around">

        <li>
          <Link to="/me/dashboard" className="flex flex-col items-center custom-blue">
            <BsHouse size={30} />
            <span className="text-xs">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/me/goals" className="flex flex-col items-center custom-blue">
            <BsBullseye size={30} />
            <span className="text-xs">Goals</span>
          </Link>
        </li>
        <li>
          <Link to="/me/progress" className="flex flex-col items-center custom-blue">
            <BsGraphUp size={30} />
            <span className="text-xs">Progress</span>
          </Link>
        </li>
        <li>
          <Link to="/me/user" className="flex flex-col items-center custom-blue">
            <BsPerson size={30} />
            <span className="text-xs">User</span>
          </Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
