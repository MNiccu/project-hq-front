import React from 'react';
import { Container, NavbarBrand } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.css'

const Navigation = () => {
    return (
      
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>ProjHQ</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link>link</Nav.Link>
              <Nav.Link>link2</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      
    );
  }
  
  export default Navigation;
  