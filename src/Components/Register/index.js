import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./CreateAccount.css";

const URL = "https://v2.api.noroff.dev/auth/register";

export default function CreateAccount() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      venueManager: true, 
    };

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        alert("Account created");
        navigate("/login");
      } else {
        const json = await response.json();
        setErrorMessage(`Status code: ${response.status}\n${json.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  return (
    <Container className="mt-5">
      <h1>Create Account</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            placeholder="Full name"
            name="name"
            type="text"
            autoComplete="name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="Email"
            name="email"
            type="email"
            autoComplete="email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="Password"
            name="password"
            type="password"
            autoComplete="current-password"
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Create account
          </Button>
          <Link to="/login">
            <Button variant="secondary" type="button">
              Back to login
            </Button>
          </Link>
        </div>
      </Form>
    </Container>
  );
}
