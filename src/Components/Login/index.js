import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./Login.css";

const URL = "https://v2.api.noroff.dev/auth/login";
const APIkeyUrl = "https://v2.api.noroff.dev/auth/create-api-key";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function userLogin(e) {
    e.preventDefault();

    const inputs = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    try {
      const data = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(inputs),
      };
      const response = await fetch(URL, data);
      if (response.status === 200) {
        const json = await response.json();
        localStorage.setItem("accessToken", json.data.accessToken);
        localStorage.setItem("name", json.data.name);
        const APIKeyData = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${json.data.accessToken}`,
          },
          body: JSON.stringify({ name: "The key" }),
        };

        const APIKeyResponse = await fetch(APIkeyUrl, APIKeyData);
        const APIjson = await APIKeyResponse.json();
        if (APIKeyResponse.status === 201) {
          localStorage.setItem("key", APIjson.data.key);
          navigate("/");
        }
      } else {
        setErrorMessage(`Something went wrong. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  return (
    <Container className="mt-5">
      <h1>Login</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={userLogin} className="login-details">
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Login
          </Button>
          <p className="text-center mt-3">Not registered yet?</p>
          <Link to="/create-account">
            <Button variant="secondary" type="button">
              Create account
            </Button>
          </Link>
        </div>
      </Form>
    </Container>
  );
}
