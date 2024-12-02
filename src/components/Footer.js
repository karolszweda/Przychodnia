import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer({ darkMode }) {
  return (
    <footer
      className={`py-4 mt-auto ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
    >
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5 className={darkMode ? "text-white" : "text-dark"}>ePrzychodnia</h5>
            <p className={darkMode ? "text-muted" : "text-dark"}>
              Twoja przyjazna przychodnia online. Dbamy o Twoje zdrowie 24/7.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5 className={darkMode ? "text-white" : "text-dark"}>Szybkie linki</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/"
                  className={`text-decoration-none ${darkMode ? "text-white" : "text-dark"}`}
                >
                  Strona główna
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className={`text-decoration-none ${darkMode ? "text-white" : "text-dark"}`}
                >
                  Zaloguj się
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`text-decoration-none ${darkMode ? "text-white" : "text-dark"}`}
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className={`text-decoration-none ${darkMode ? "text-white" : "text-dark"}`}
                >
                  Polityka prywatności
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5 className={darkMode ? "text-white" : "text-dark"}>Kontakt</h5>
            <ul className={`list-unstyled ${darkMode ? "text-muted" : "text-dark"}`}>
              <li>📞 123 456 789</li>
              <li>📧 kontakt@eprzychodnia.pl</li>
              <li>📍 ul. Przykładowa 123, Miasto</li>
            </ul>
          </Col>
        </Row>
        <hr className={darkMode ? "bg-light" : "bg-dark"} />
        <Row>
          <Col className="text-center">
            <small className={darkMode ? "text-light" : "text-muted"}>
              &copy; {new Date().getFullYear()} ePrzychodnia. Wszelkie prawa
              zastrzeżone.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
