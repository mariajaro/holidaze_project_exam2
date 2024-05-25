import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="footer bg-light py-4">
      <Container>
        <Row>
          <Col className="text-center">
            <p>Phone number: +47 22 22 22 21</p>
            <p>Grønneløkka 24 B, Oslo</p>
            <p>Norway</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
