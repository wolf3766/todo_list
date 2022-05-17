import React, { Component } from 'react'
import "../styles/navbar.css"
import { Navbar, Container , Nav } from 'react-bootstrap'

export default class Navbarcomp extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/">TODO List</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        
        <Nav.Link href="/Task">MY DAY</Nav.Link>
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

      </div>
    )
  }
}
