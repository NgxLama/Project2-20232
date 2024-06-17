import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Image, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProfileByUserId } from '../services/API';
import UpdateProfile from '../components/UpdateProfile';
import SidebarComponent from '../components/SideBar';
import NavbarComponent from '../components/NavBar';

export default function Profile() {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    // Fetch user profile from API
    getProfileByUserId(userId)
      .then(res => {
        setProfile(res.data.user);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (

    profile && (
      <div className="d-flex flex-column h-100">
        <SidebarComponent />
        <NavbarComponent />
        <div style={{ marginTop: '70px', marginLeft: '280px' }}>

          <Container className="p-0" fluid>
            <Container>
            </Container>
            <Container className="p-0" style={{ width: 1000, textAlign: 'center', position: 'relative' }} fluid>
              <Image
                className="rounded-bottom"
                src={profile.cover}
                style={{ width: 1000, height: 350, objectFit: 'cover' }}
                fluid
              />
              <UpdateProfile />
            </Container>
            <Container className="d-flex mt-3" style={{ width: 1000, position: 'relative' }} fluid>
              <Image
                className="border border-5 border-white rounded-circle"
                src={profile.avatar}
                style={{ width: 200, height: 200, position: 'relative', top: -100, left: 30, objectFit: 'cover' }}
              />
              <Container className="row">
                <p className="ps-5" style={{ fontSize: 33, fontWeight: 'bold' }}>{profile.firstName + ' ' + profile.lastName}</p>
              </Container>
            </Container>
            <Container style={{ width: 1000 }}>
              <Row className="mt-3">
                <Col md={4}>
                  <h5>Phone:</h5>
                  <p>{profile.phone}</p>
                </Col>
                <Col md={4}>
                  <h5>Address:</h5>
                  <p>{profile.address}</p>
                </Col>
                <Col md={4}>
                  <h5>Work:</h5>
                  <p>{profile.work}</p>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={4}>
                  <h5>Description:</h5>
                  <p>{profile.description}</p>
                </Col>
                <Col md={4}>
                  <h5>Date of Birth:</h5>
                  <p>{profile.DOB}</p>
                </Col>
                <Col md={4}>
                  <h5>Gender:</h5>
                  <p>{profile.gender}</p>
                </Col>
              </Row>
              <Container style={{ height: '100px' }}></Container>
            </Container>
          </Container>
        </div>
      </div>
    )
  );
}