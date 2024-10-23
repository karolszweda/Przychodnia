import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-light text-dark py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>ePrzychodnia</h5>
            <p className="text-muted">
              Twoja przyjazna przychodnia online. Dbamy o Twoje zdrowie 24/7.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Szybkie linki</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-muted text-decoration-none">Strona główna</Link></li>
              <li><Link to="/login" className="text-muted text-decoration-none">Zaloguj się</Link></li>
              <li><Link to="/contact" className="text-muted text-decoration-none">Kontakt</Link></li>
              <li><Link to="/privacy" className="text-muted text-decoration-none">Polityka prywatności</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Kontakt</h5>
            <ul className="list-unstyled text-muted">
              <li>📞 123 456 789</li>
              <li>📧 kontakt@eprzychodnia.pl</li>
              <li>📍 ul. Przykładowa 123, Miasto</li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center text-muted">
            <small>&copy; {new Date().getFullYear()} ePrzychodnia. Wszelkie prawa zastrzeżone.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
