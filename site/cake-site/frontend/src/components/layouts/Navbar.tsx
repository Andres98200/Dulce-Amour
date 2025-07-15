import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-roseCustom text-base-gray-950 p-4  w-full fixed top-0 left-0 z-50">
      <ul className="flex space-x-6 justify-end conte">
        <li>
            <div className="content-center">
          <Link to="/Products" className="">Products</Link>
          </div>
        </li>
        <li>
          <Link to="/AboutUs" className="hover:text-white">About Us</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="hover:text-red-400">Log In</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
