import React, { useState } from "react";
import { Link } from "react-router-dom";
import FetchMyVenue from "../../Hooks/SpecificVenueApi";
import { Container, Row, Col, Image, Button, Spinner, Alert, Badge } from "react-bootstrap";
import "./VenuePage.css";

const URL = "https://v2.api.noroff.dev/holidaze/bookings/";

export default function VenuePage() {
  const [chosenDates, setChosenDates] = useState(null);
  const { venue, isLoading, isError } = FetchMyVenue();

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (isError || !venue) {
    return <Alert variant="danger">No venue details available.</Alert>;
  }

  async function makeBooking(e) {
    e.preventDefault();

    if (!chosenDates) {
      alert("Choose dates first.");
      return;
    }

    const inputs = {
      dateFrom: chosenDates[0],
      dateTo: chosenDates[1],
      venueId: venue.id,
      guests: 1,
    };

    try {
      const token = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("key");
      const data = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(inputs),
      };
      const response = await fetch(URL, data);
      if (response.status === 201) {
        alert("You have booked your chosen dates");
      } else {
        alert(`Something went wrong. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error making booking:", error.message);
    }
  }

  function BookingButton() {
    if (localStorage.getItem("accessToken")) {
      return (
        <Button variant="primary" onClick={makeBooking}>
          Book chosen dates
        </Button>
      );
    } else {
      return (
        <Link to="/login">
          <Button variant="secondary">Login to book</Button>
        </Link>
      );
    }
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Image
            src={venue.media[0]?.url || "default-image.jpg"}
            alt={venue.media[0]?.alt || "Venue image"}
            fluid
          />
        </Col>
        <Col md={6}>
          <h1 className="mb-4">{venue.name}</h1>
          <p>{venue.description}</p>
          <p><strong>Address:</strong> {venue.location.address}</p>
          <p><strong>City:</strong> {venue.location.city}, {venue.location.country}</p>
          <p><strong>Price per night:</strong> ${venue.price}</p>
          <div>
            {venue.meta.breakfast && <Badge bg="secondary" className="me-2">Breakfast</Badge>}
            {venue.meta.parking && <Badge bg="secondary" className="me-2">Parking</Badge>}
            {venue.meta.pets && <Badge bg="secondary" className="me-2">Pets</Badge>}
            {venue.meta.wifi && <Badge bg="secondary" className="me-2">Wifi</Badge>}
          </div>
          <div className="mt-4">
            {BookingButton()}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
