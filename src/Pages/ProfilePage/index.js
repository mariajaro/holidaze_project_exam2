import React from 'react';
import { Link } from 'react-router-dom';
import FetchMyProfile from '../../Hooks/ProfileApi';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import './ProfilePage.css';

export default function ProfilePage() {
  const name = localStorage.getItem('name');
  const { profile, isLoading } = FetchMyProfile(`https://v2.api.noroff.dev/holidaze/profiles/${name}`);

  function Manager() {
    if (profile && profile.venueManager === true) {
      return (
        <Link to="/create-venue">
          <Button variant="primary" className="mt-3">Add Venue</Button>
        </Link>
      );
    }
    return null;
  }

  function Content() {
    if (isLoading) {
      return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
    }

    if (!profile) {
      return null;
    }

    return (
      <>
        <Row className="my-4">
          <Col md={4} className="text-center">
            {profile.avatar && (
              <img className="profile-avatar mb-3" alt={profile.avatar.alt} src={profile.avatar.url} />
            )}
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <Link to="/update-profile">
              <Button variant="primary" className="mt-3">Update Profile</Button>
            </Link>
            <Manager />
          </Col>
          <Col md={8}>
            <h3>Bio</h3>
            <p>{profile.bio}</p>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <Container>
      <Content />
    </Container>
  );
}
