import React, { createContext, useContext, useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import { Container } from 'react-bootstrap'
import Home from './Home/Home'

export default function Layout() {

  return (
    <Container fluid className='p-0 position-relative'>
      <NavBar />
      <Container className='p-0 pt-2 position-relative' fluid>
        <Home></Home>
      </Container>
    </Container>
  )
}
