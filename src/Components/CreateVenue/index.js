import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import './CreateVenue.css';

export default function CreateVenue() {
  const [venueData, setVenueData] = useState({
    image: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    description: '',
    price: '',
    guests: '',
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setVenueData({ ...venueData, [name]: checked });
    } else {
      setVenueData({ ...venueData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(venueData);
    // Add your submit logic here
  };

  return (
    <Container>
      <h1 className="my-4">Create Venue</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            placeholder="Image URL"
            name="image"
            type="url"
            value={venueData.image}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Venue Name*</Form.Label>
          <Form.Control
            placeholder="Venue name*"
            name="name"
            value={venueData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="Address"
            name="address"
            value={venueData.address}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            placeholder="City"
            name="city"
            value={venueData.city}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            placeholder="Zip Code"
            name="zip"
            value={venueData.zip}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            placeholder="Country"
            name="country"
            value={venueData.country}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description*</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Description*"
            name="description"
            value={venueData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price per night*</Form.Label>
          <Form.Control
            placeholder="Price per night*"
            name="price"
            type="number"
            value={venueData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Max Guests*</Form.Label>
          <Form.Control
            placeholder="Max guests*"
            name="guests"
            type="number"
            value={venueData.guests}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="wifi"
            label="Wifi"
            checked={venueData.wifi}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            name="parking"
            label="Parking"
            checked={venueData.parking}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            name="breakfast"
            label="Breakfast"
            checked={venueData.breakfast}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            name="pets"
            label="Pets Allowed"
            checked={venueData.pets}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="me-2">Publish Venue</Button>
        <Link to="/venue-manager">
          <Button variant="secondary">Go back</Button>
        </Link>
      </Form>
    </Container>
  );
}
