import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FetchMyVenues from "../../Hooks/MyVenuesApi";
import FetchMyProfile from "../../Hooks/ProfileApi";
import { Container, Row, Col, Button, Spinner, Card } from "react-bootstrap";
import "./VenueManagerPage.css";

export default function VenueManager() {
  const navigate = useNavigate();
  const isLoggedOut = localStorage.getItem("accessToken") === null;

  if (isLoggedOut) {
    return (
      <Container className="text-center mt-5">
        <p>You have to log in to access the Venue Manager</p>
        <Link to="/login">
          <Button>Go to login</Button>
        </Link>
      </Container>
    );
  }

  const name = localStorage.getItem("name");
  const venuesUrl = `https://v2.api.noroff.dev/holidaze/profiles/${name}/venues`;
  const profileUrl = `https://v2.api.noroff.dev/holidaze/profiles/${name}`;

  const { venues, isLoading, isError } = FetchMyVenues(venuesUrl);
  const { profile } = FetchMyProfile(profileUrl);

  if (!profile) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading profile...</span></Spinner>;

  if (isError) {
    return (
      <Container className="text-center mt-5">
        <p>Failed to load venues. Please try again later.</p>
      </Container>
    );
  }

  if (isLoading || !venues) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading venues...</span></Spinner>;
  }

  return (
    <Container>
      <h1 className="my-4">Venue Manager</h1>
      {venues.length === 0 ? (
        <p>You have no venues.</p>
      ) : (
        <Row>
          {venues.map((venue) => (
            <Col key={venue.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={venue.media[0]?.url || "default-image.jpg"} />
                <Card.Body>
                  <Card.Title>{venue.name}</Card.Title>
                  <Card.Text>{venue.location.city}, {venue.location.country}</Card.Text>
                  <Card.Text>{venue.description}</Card.Text>
                  <Card.Text>${venue.price}/night</Card.Text>
                  <Link to={`/update-venue/${venue.id}`}>
                    <Button variant="primary" className="me-2">Update Venue</Button>
                  </Link>
                  <Button variant="danger" onClick={() => deleteVenue(venue.id)}>Delete Venue</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Link to="/create-venue">
        <Button variant="success" className="mt-3">Create New Venue</Button>
      </Link>
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
        navigate("/venue-manager");  // Refresh the venue manager page
      }
    } catch (error) {
      console.error("Error deleting venue:", error.message);
      alert("Error deleting venue. Please try again later.");
    }
  }
}
