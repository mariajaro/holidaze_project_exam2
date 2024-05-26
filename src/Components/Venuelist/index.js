import React, { useState, useEffect } from "react";
import Venues from "../Venues";
import FetchVenues from "../../Hooks/VenueApi";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import "./VenueList.css";

const sortBy = "created";
const limit = 18;

export default function VenueList() {
  const [page, setPage] = useState(1);
  const [allVenues, setAllVenues] = useState([]);
  const { venues, isLoading } = FetchVenues(
    `https://v2.api.noroff.dev/holidaze/venues/?sort=${sortBy}&limit=${limit}&page=${page}`
  );

  useEffect(() => {
    if (venues?.length > 0) {
      setAllVenues((prevVenues) => {
        const newVenues = venues.filter(
          (venue) => !prevVenues.some((v) => v.id === venue.id)
        );
        return [...prevVenues, ...newVenues];
      });
    }
  }, [venues]);

  function LoadMore() {
    setPage(page + 1);
  }

  return (
    <Container className="venue-list-container">
      {isLoading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <Row className="venue-list-row">
        {allVenues.map((venue) => (
          <Col key={venue.id} xs={12} sm={6} md={4} className="venue-list-col">
            <Venues
              id={venue.id}
              image={venue.media}
              name={venue.name}
              description={venue.description}
              price={venue.price}
              location={venue.location}
              className="venue-card"
            />
          </Col>
        ))}
      </Row>
      <div className="text-center my-4">
        <Button className="btn-custom-primary" onClick={LoadMore}>
          See more venues
        </Button>
      </div>
    </Container>
  );
}
