// src/components/Navigation.js
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar expand="lg" className="navbar-custom" bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">ePrzychodnia</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Start</Nav.Link>
            <Nav.Link as={Link} to="/about">O nas</Nav.Link>
            <Nav.Link as={Link} to="/contact">Kontakt</Nav.Link>
            <Nav.Link as={Link} to="/login">Zaloguj</Nav.Link>
            <Nav.Link as={Link} to="/login">Umów się</Nav.Link>
            <Nav.Link as={Link} to="/login">Zaloguj</Nav.Link>
            
            <NavDropdown title="Pacjent" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/action3">Karta Pacjenta</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action1">Rejestracja online</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action2">Odwołaj wizytę</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action3">Zamów receptę</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action3">Profilaktyka</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/action4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;