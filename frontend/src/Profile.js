import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Form, Button, Image, Text, Stack, Tab, Tabs, NavLink, Overlay , Modal } from 'react-bootstrap'
import camera from './assets/icons/camera.png'
import UpdateProfile from './UpdateProfile'
import { getProfileByUserId } from './services/API'
import ProfileSideBar from './components/ProfileSideBar'
import Home from './Home/Home'
import NavBar from './components/NavBar'

export default function Profile() {

  const [profile, setProfile] = useState();

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    // Fetch user profile from API
    getProfileByUserId(userId)
      .then(res => {
        setProfile(res.data.user)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  return (
    profile && <Container className='p-0 row' fluid>
      <Container>
        <NavBar />
      </Container>
      <Container className='p-0' style={{ width: 1000, textAlign: 'center', position: 'relative' }} fluid>
        <Image
          className='rounded-bottom'
          src={profile.cover}
          style={{ width: 1000, height: 350, objectFit: 'cover' }}
          fluid
        />
        {/* <Button onClick={openPopup} variant='light' style={{ position: 'absolute', bottom: 10, right: 20 }}>
          <Image src={camera} style={{ width: 20, marginRight: 10 }}></Image>
          Edit cover photo
        </Button> */}
        <UpdateProfile/>
      </Container>
      <Container className='d-flex mt-3' style={{ width: 1000, position: 'relative' }} fluid>
        <Image
          className='border border-5 border-white rounded-circle'
          src={profile.avatar}
          style={{ width: 200, height: 200, position: 'relative', top: -100, left: 30, objectFit: 'cover' }}
        />
        <Container className='row'>
          <p className='ps-5' style={{ fontSize: 33, fontWeight: 'bold' }}>{profile.firstName + " " + profile.lastName}</p>
        </Container>
      </Container>
      <Container style={{ width: 1000 }}>
        <ProfileSideBar />
      </Container>
    </Container>
  )
}