import React, { useState } from "react";
import { Link } from "react-router-dom";
import getWithExpiry from "../utils/GetWithExpiry";
import "../styles/Header.css";

const Dropdown = () => {
  const user = getWithExpiry("user");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location = 'http://localhost:3000/'
  }
  return (
    <div className="dropdown">
      <button className="flex" onClick={toggleDropdown}>
        <img src={user.picture} alt="Profile" />
        <li>
          {user.name}
        </li>
      </button>
      {isOpen && (
        <ul>
          
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
