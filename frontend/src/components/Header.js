import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import getWithExpiry from "../utils/GetWithExpiry";
import "../styles/Header.css";
import ProfileDropDown from "./ProfileDropDown";
import { FaBars } from "react-icons/fa";
import SideNavbar from "./Sidebar";

const Header = () => {
  const user = getWithExpiry("user");
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <button onClick={toggleSidebar}>
            <FaBars />
          </button>
          <Navbar.Brand as={Link} to="/">
            TaskEase
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              Features
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <ProfileDropDown />
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <Button variant="outline-light">Login</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <Button variant="outline-light">Get Started</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      {sidebar ? <SideNavbar /> : null}
    </>
  );
};

export default Header;
