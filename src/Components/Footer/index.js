import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6} className="text-md-start">
            <h5>Contact Us</h5>
            <p>Phone number: +47 22 22 22 21</p>
            <p>Grønneløkka 24 B, Oslo</p>
            <p>Norway</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
