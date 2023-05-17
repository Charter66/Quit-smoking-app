import { Link } from 'react-router-dom';
import { BsHouse, BsBullseye, BsGraphUp, BsPerson } from 'react-icons/bs';

const Navbar = () => {
  return (
<nav className="sticky bottom-0 border-t border-gray-200" >

          <ul className="flex items-center justify-around py-4">
        <li>
          <Link to="/" className="flex flex-col items-center text-red-300 hover:text-red-500">
            <BsHouse size={30} />
            <span className="text-xs">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/goals" className="flex flex-col items-center text-red-300 hover:text-red-500">
            <BsBullseye size={30} />
            <span className="text-xs">Goals</span>
          </Link>
        </li>
        <li>
          <Link to="/progress" className="flex flex-col items-center text-red-300 hover:text-red-500">
            <BsGraphUp size={30} />
            <span className="text-xs">Progress</span>
          </Link>
        </li>
        <li>
<<<<<<< HEAD
          <Link to="/user" className="flex flex-col items-center text-gray-300 hover:text-white">
            <BsPerson size={20} />
=======
          <Link to="/user" className="flex flex-col items-center text-red-300 hover:text-red-500">
        </li>
      </ul>
  );
};

export default Navbar;
