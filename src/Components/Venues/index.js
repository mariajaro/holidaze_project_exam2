import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Venues.css";

export default function Venues({ id, image, name, description, price, location }) {
  return (
    <Link to={`/venue/${id}`} className="text-decoration-none">
      <Card className="h-100">
        <Card.Img variant="top" src={image[0]?.url || "default-image.jpg"} alt={name} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </Card.Text>
          <Card.Text><strong>Location:</strong> {location.city}, {location.country}</Card.Text>
          <Card.Text><strong>Price:</strong> ${price}/night</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
