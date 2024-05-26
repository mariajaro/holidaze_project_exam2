import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Venues.css";

export default function Venues({ id, image, name, description, price, location }) {
  return (
    <Link to={`/venue/${id}`} className="venue-link">
      <Card className="venue-card shadow-sm">
        <div className="venue-image-container">
          <Card.Img variant="top" src={image[0]?.url || "default-image.jpg"} alt={name} className="venue-image" />
        </div>
        <Card.Body>
          <Card.Title className="venue-title">{name}</Card.Title>
          <Card.Text className="venue-location">
            {location.city}, {location.country}
          </Card.Text>
          <Card.Text className="venue-price">${price}/night</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
