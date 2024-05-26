import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import FetchMyBookings from "../../Hooks/BookingsApi";
import FetchMyVenues from "../../Hooks/MyVenuesApi";
import FetchMyProfile from "../../Hooks/ProfileApi";
import "./Bookings.css";  

export default function Bookings() {
  const navigate = useNavigate();
  const isLoggedOut = localStorage.getItem("accessToken") === null;
  
  if (isLoggedOut) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="warning">
          <p>You have to log in to see your bookings</p>
          <Link to="/login">
            <Button className="btn-custom-primary">Go to login</Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  const name = localStorage.getItem("name");
  const bookingsUrl = `https://v2.api.noroff.dev/holidaze/profiles/${name}?_bookings=true`;
  const bookings = FetchMyBookings(bookingsUrl);
  const venuesUrl = `https://v2.api.noroff.dev/holidaze/profiles/${name}/venues`;
  const venues = FetchMyVenues(venuesUrl);
  const profileUrl = `https://v2.api.noroff.dev/holidaze/profiles/${name}`;
  const profile = FetchMyProfile(profileUrl);

  if (!profile.profile) return null;

  if (bookings.isError || venues.isError) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="warning">
          <p>You have to log in to see your bookings and venues</p>
          <Link to="/login">
            <Button className="btn-custom-primary">Go to login</Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">My Bookings</h1>
      <Row>
        {bookings.bookings.map((booking) => (
          <Col md={6} lg={4} key={booking.id} className="mb-4">
            <Card className="h-100">
              <Link to={`/venue/${booking.venue.id}`}>
                <Card.Img
                  variant="top"
                  src={booking.venue.media?.[0]?.url || "default-image.jpg"}
                  alt={booking.venue.name}
                  className="card-img-top"
                />
              </Link>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{booking.venue.name}</Card.Title>
                <Card.Text>{booking.venue.location.city}, {booking.venue.location.country}</Card.Text>
                <Card.Text>{booking.venue.description}</Card.Text>
                <Card.Text>
                  Booked dates: {formatDate(booking.dateFrom)} to {formatDate(booking.dateTo)}
                </Card.Text>
                <Card.Text>${booking.venue.price}/night</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
