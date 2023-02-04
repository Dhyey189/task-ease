import React from "react";
import { Navbar, Nav, Container,Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 

const Header = () => {
    return (
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand as={Link} to="/">TaskEase</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" >Home</Nav.Link>
                    <Nav.Link as={Link} to="/about">Features</Nav.Link>
                    
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/signup">
                        <Button  variant="outline-light">Sign up</Button>
                    </Nav.Link>
                </Nav>
                </Container>
            </Navbar>
    );
}

export default Header;