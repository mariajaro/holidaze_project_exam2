import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FetchMyVenue from "../../Hooks/SpecificVenueApi";
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import './UpdateVenue.css';

export default function UpdateVenue() {
  let { id } = useParams();
  const { venue, isLoading, isError } = FetchMyVenue(id);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const details = {
      media: [
        {
          url: formData.get('image'),
        },
      ],
      name: formData.get('name'),
      location: {
        address: formData.get('address'),
        city: formData.get('city'),
        zip: formData.get('zip'),
        country: formData.get('country'),
      },
      description: formData.get('description'),
      price: Number(formData.get('price')),
      maxGuests: Number(formData.get('guests')),
      meta: {
        wifi: formData.get('wifi') === 'on',
        parking: formData.get('parking') === 'on',
        breakfast: formData.get('breakfast') === 'on',
        pets: formData.get('pets') === 'on',
      },
    };

    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("key");

    try {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(details),
      });

      if (response.status === 200) {
        alert("Venue updated");
        navigate("/venue-manager");
      } else {
        const error = await response.json();
        alert(`Something went wrong: ${error.message || response.statusText}`);
      }
    } catch (error) {
      alert(`Failed to update venue: ${error.message}`);
    }
  }

  async function deleteVenue() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("key");

      const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      });

      if (response.status === 204) {
        alert("Venue deleted");
        navigate("/venue-manager");
      } else {
        alert(`Failed to delete venue: Status code ${response.status}`);
      }
    } catch (error) {
      alert(`Error deleting venue: ${error.message}`);
    }
  }

  if (isLoading) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  if (isError || !venue) return <div>Error loading venue details</div>;

  return (
    <Container>
      <h1 className="my-4">Update Venue</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="url" name="image" defaultValue={venue.media[0].url} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" defaultValue={venue.name} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" defaultValue={venue.location.address} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" name="city" defaultValue={venue.location.city} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ZIP</Form.Label>
          <Form.Control type="text" name="zip" defaultValue={venue.location.zip} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" name="country" defaultValue={venue.location.country} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" defaultValue={venue.description} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" defaultValue={venue.price} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Max Guests</Form.Label>
          <Form.Control type="number" name="guests" defaultValue={venue.maxGuests} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" name="wifi" label="Wifi" defaultChecked={venue.meta.wifi} />
          <Form.Check type="checkbox" name="parking" label="Parking" defaultChecked={venue.meta.parking} />
          <Form.Check type="checkbox" name="breakfast" label="Breakfast" defaultChecked={venue.meta.breakfast} />
          <Form.Check type="checkbox" name="pets" label="Pets" defaultChecked={venue.meta.pets} />
        </Form.Group>
        <Button variant="primary" type="submit" className="me-2">Update Venue</Button>
        <Button variant="danger" type="button" onClick={deleteVenue}>Delete Venue</Button>
        <Link to="/venue-manager"><Button variant="secondary">Go Back</Button></Link>
      </Form>
    </Container>
  );
}
