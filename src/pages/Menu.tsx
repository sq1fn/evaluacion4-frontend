import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function Menu() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link href="/RegistroTalleres">Ver Registros talleres</Nav.Link>
            <Nav.Link href="/RegistrarTallerista">Registrar tallerista</Nav.Link>
            <Nav.Link href="/RegistrarTaller">Registrar taller</Nav.Link>
            <Nav.Link href="/Login">Salir</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
