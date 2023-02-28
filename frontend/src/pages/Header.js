import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link,useNavigate } from "react-router-dom";
import getWithExpiry from "../utils/GetWithExpiry";
import "../styles/Header.css";

const Header = () => {
  const user = getWithExpiry("user");
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (getWithExpiry("user")) {
      navigate("/app");
    }
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
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
              <>
                <Nav.Link as={Link} to="/login">
                  <Button variant="outline-light">Login</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <Button variant="outline-light">Get Started</Button>
                </Nav.Link>
              </>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
