import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FetchMyVenue from "../../Hooks/SpecificVenueApi";
import { Container, Row, Col, Image, Button, Spinner, Alert, Badge, Form } from "react-bootstrap";
import "./VenuePage.css";

const URL = "https://v2.api.noroff.dev/holidaze/bookings/";

export default function VenuePage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { venue, isLoading, isError } = FetchMyVenue();
  const navigate = useNavigate();

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

    if (!startDate || !endDate) {
      alert("Choose dates first.");
      return;
    }

    const inputs = {
      dateFrom: startDate,
      dateTo: endDate,
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
        navigate("/bookings"); 
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
        <Button className="btn-primary-custom" onClick={makeBooking}>
          Book chosen dates
        </Button>
      );
    } else {
      return (
        <Link to="/login">
          <Button className="btn-secondary-custom">Login to book</Button>
        </Link>
      );
    }
  }

  return (
    <Container className="venue-page-container my-4">
      <Row>
        <Col md={6}>
          <Image
            src={venue.media[0]?.url || "default-image.jpg"}
            alt={venue.media[0]?.alt || "Venue image"}
            fluid
            className="venue-image"
          />
        </Col>
        <Col md={6}>
          <h1 className="venue-title mb-4">{venue.name}</h1>
          <p className="venue-description">{venue.description}</p>
          <p><strong>Address:</strong> {venue.location.address}</p>
          <p><strong>City:</strong> {venue.location.city}, {venue.location.country}</p>
          <p><strong>Price per night:</strong> ${venue.price}</p>
          <div className="venue-badges mb-3">
            {venue.meta.breakfast && <Badge bg="secondary" className="me-2">Breakfast</Badge>}
            {venue.meta.parking && <Badge bg="secondary" className="me-2">Parking</Badge>}
            {venue.meta.pets && <Badge bg="secondary" className="me-2">Pets</Badge>}
            {venue.meta.wifi && <Badge bg="secondary" className="me-2">Wifi</Badge>}
          </div>
          <Form className="booking-form mt-4" onSubmit={makeBooking}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="endDate" className="mt-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="btn-primary-custom mt-3" type="submit">
              Book chosen dates
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
