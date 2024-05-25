import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FetchMyProfile from "../../Hooks/ProfileApi";
import { Form, Button, Spinner, Container, Row, Col } from "react-bootstrap";

export default function UpdateProfile() {
  const name = localStorage.getItem("name");
  const ProfileUrl = `https://v2.api.noroff.dev/holidaze/profiles/${name}`;
  const { profile, isLoading, isError } = FetchMyProfile(ProfileUrl);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    avatar: '',
    bio: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        avatar: profile.avatar?.url || '',
        bio: profile.bio || '',
      });
    }
  }, [profile]);

  async function handleSubmit(e) {
    e.preventDefault();

    const details = {
      avatar: formData.avatar,
      bio: formData.bio,
    };

    const accessToken = localStorage.getItem("accessToken");
    const key = localStorage.getItem("key");

    try {
      const response = await fetch(ProfileUrl, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": key,
        },
        body: JSON.stringify(details),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error Response:", errorResponse);
        alert(`Something went wrong. Status code: ${response.status}`);
      } else {
        const json = await response.json();
        console.log("Response:", json);
        alert("Profile updated");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert(error.message);
    }
  }

  if (isLoading) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  if (isError) return <div>Error loading profile data.</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Row className="justify-content-center my-4">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <h1>Update Profile</h1>
            <Form.Group controlId="formAvatar">
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control
                type="url"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="Enter avatar URL"
              />
            </Form.Group>
            <Form.Group controlId="formBio" className="mt-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Enter your bio"
                rows={3}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Update Profile
            </Button>
            <Link to="/profile">
              <Button variant="secondary" className="mt-3 ms-2">Go Back</Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
