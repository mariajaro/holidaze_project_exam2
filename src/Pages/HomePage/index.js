import React from 'react';
import Searchbar from "../../Components/Searchbar";
import VenueList from "../../Components/Venuelist";
import { Container, Row, Col } from 'react-bootstrap';

export default function HomePage() {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <Searchbar />
        </Col>
      </Row>
      <Row>
        <Col>
          <VenueList />
        </Col>
      </Row>
    </Container>
  );
}
