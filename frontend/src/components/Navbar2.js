import React, { useState } from "react";
import "../styles/Navbar2.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#">Your Logo Here</a>
      </div>
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>
      <div className="burger" onClick={handleOpen}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <div className={open ? "sidebar open" : "sidebar"}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
