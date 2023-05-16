import { Link } from 'react-router-dom';
import { BsHouse, BsBullseye, BsGraphUp, BsPerson } from 'react-icons/bs';

const Navbar = () => {
  return (
<nav className="bg-gray-800  " >

          <ul className="flex items-center justify-around py-4 ">
        <li>
          <Link to="/" className="flex flex-col items-center text-gray-300 hover:text-white">
            <BsHouse size={20} />
            <span className="text-xs">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/goals" className="flex flex-col items-center text-gray-300 hover:text-white">
            <BsBullseye size={20} />
            <span className="text-xs">Goals</span>
          </Link>
        </li>
        <li>
          <Link to="/progress" className="flex flex-col items-center text-gray-300 hover:text-white">
            <BsGraphUp size={20} />
            <span className="text-xs">Progress</span>
          </Link>
        </li>
        <li>
          <Link to="/user" className="flex flex-col items-center text-gray-300 hover:text-white">
            <BsPerson size={20} />
            <span className="text-xs">User</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
