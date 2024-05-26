import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
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

  const navigate = useNavigate();

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
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("key");

    const details = {
      media: [
        {
          url: venueData.image,
        },
      ],
      name: venueData.name,
      location: {
        address: venueData.address,
        city: venueData.city,
        zip: venueData.zip,
        country: venueData.country,
      },
      description: venueData.description,
      price: Number(venueData.price),
      maxGuests: Number(venueData.guests),
      meta: {
        wifi: venueData.wifi,
        parking: venueData.parking,
        breakfast: venueData.breakfast,
        pets: venueData.pets,
      },
    };

    try {
      const response = await fetch('https://v2.api.noroff.dev/holidaze/venues', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': apiKey,
        },
        body: JSON.stringify(details),
      });

      if (response.status === 201) {
        alert('Venue created successfully');
        navigate('/venue-manager'); 
      } else {
        const json = await response.json();
        alert(`Something went wrong. Status code: ${response.status}\n${json.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
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
