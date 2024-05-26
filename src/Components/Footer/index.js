import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer bg-light py-4">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <h5>Contact Us</h5>
            <p>Phone number: +47 22 22 22 21</p>
            <p>Grønneløkka 24 B, Oslo</p>
            <p>Norway</p>
          </Col>
          <Col md={6} className="text-center text-md-end my-3 my-md-0">
            <h5>Follow Us</h5>
            <div className="social-icons mt-2">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Holidaze. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
