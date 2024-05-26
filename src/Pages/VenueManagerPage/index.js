import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FetchMyVenues from "../../Hooks/MyVenuesApi";
import FetchMyProfile from "../../Hooks/ProfileApi";
import { Container, Row, Col, Button, Spinner, Card, Alert } from "react-bootstrap";
import "./VenueManagerPage.css";

export default function VenueManager() {
  const navigate = useNavigate();
  const isLoggedOut = localStorage.getItem("accessToken") === null;

  const name = localStorage.getItem("name");
  const venuesUrl = `https://v2.api.noroff.dev/holidaze/profiles/${name}/venues`;
  const profileUrl = `https://v2.api.noroff.dev/holidaze/profiles/${name}`;

  const { venues, isLoading: venuesLoading, isError: venuesError } = FetchMyVenues(venuesUrl);
  const { profile, isLoading: profileLoading, isError: profileError } = FetchMyProfile(profileUrl);

  if (isLoggedOut) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="warning">
          <p>You have to log in to access the Venue Manager</p>
          <Link to="/login">
            <Button variant="primary">Go to login</Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  if (profileLoading || venuesLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">Error loading profile data. Please try again later.</Alert>
      </Container>
    );
  }

  if (!profile.venueManager) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="warning">You are not a venue manager. Access denied. Return to your profile and update your settings to "Venue Manager"</Alert>
        <Link to="/">
          <Button variant="primary">Go to Home</Button>
        </Link>
      </Container>
    );
  }

  if (venuesError) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">Failed to load venues. Please try again later.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Venue Manager</h1>
        <Link to="/create-venue">
          <Button className="btn-custom-create">Create New Venue</Button>
        </Link>
      </div>
      {venues.length === 0 ? (
        <Alert variant="info">You have no venues.</Alert>
      ) : (
        <Row>
          {venues.map((venue) => (
            <Col key={venue.id} xs={12} sm={6} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={venue.media[0]?.url || "default-image.jpg"} />
                <Card.Body>
                  <Card.Title>{venue.name}</Card.Title>
                  <Card.Text>{venue.location.city}, {venue.location.country}</Card.Text>
                  <Card.Text>{venue.description}</Card.Text>
                  <Card.Text>${venue.price}/night</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Link to={`/update-venue/${venue.id}`}>
                      <Button className="btn-custom-create">Update Venue</Button>
                    </Link>
                    <Button className="btn-custom-delete" onClick={() => deleteVenue(venue.id)}>Delete Venue</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );

  async function deleteVenue(venueId) {
    const accessToken = localStorage.getItem("accessToken");
    const key = localStorage.getItem("key");

    try {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": key,
        },
      });

      if (!response.ok) {
        alert(`Failed to delete venue. Status code: ${response.status}`);
      } else {
        alert("Venue deleted");
        navigate("/venue-manager");
      }
    } catch (error) {
      console.error("Error deleting venue:", error.message);
      alert("Error deleting venue. Please try again later.");
    }
  }
}
