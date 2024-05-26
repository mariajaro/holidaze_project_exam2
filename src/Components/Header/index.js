import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("accessToken") !== null;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("key");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          Holidaze
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/bookings">Bookings</Nav.Link>
            {isLoggedIn && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
            {isLoggedIn && <Nav.Link as={Link} to="/venue-manager">Venue Manager</Nav.Link>}
          </Nav>
          {isLoggedIn ? (
            <Button variant="logout-button" onClick={handleLogout} className="ms-2 custom-logout-button">
              Logout
            </Button>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/create-account">Sign Up</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
