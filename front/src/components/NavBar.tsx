import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">English Dictionary</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Search</Nav.Link>
            <Nav.Link href="#pricing">Recent Words</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Dark</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Light
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
