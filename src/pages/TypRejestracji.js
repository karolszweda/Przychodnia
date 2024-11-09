import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TypRejestracji = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5">Wybierz typ wizyty</h2>
      <Row className="g-4 justify-content-center">
        <Col md={4}>
          <Card className="h-100 shadow-sm hover-card">
            <Card.Body className="d-flex flex-column text-center">
              <div className="mb-3">
                <i className="fas fa-user-md display-4 text-primary"></i>
              </div>
              <Card.Title>Wizyta stacjonarna</Card.Title>
              <Card.Text>
                Umów się na wizytę stacjonarną w przychodni z wybranym lekarzem.
              </Card.Text>
              <Button
                variant="primary"
                className="mt-auto"
                onClick={() => navigate("/doctor-selection")}
              >
                Wybierz lekarza
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm hover-card">
            <Card.Body className="d-flex flex-column text-center">
              <div className="mb-3">
                <i className="fas fa-video display-4 text-success"></i>
              </div>
              <Card.Title>Teleporada</Card.Title>
              <Card.Text>
                Skonsultuj się z lekarzem online przez wideorozmowę lub telefon.
              </Card.Text>
              <Button
                variant="primary"
                className="mt-auto"
                onClick={() => navigate("/doctor-selection")}
              >
                Umów teleporadę
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm hover-card">
            <Card.Body className="d-flex flex-column text-center">
              <div className="mb-3">
                <i className="fas fa-syringe display-4 text-info"></i>
              </div>
              <Card.Title>Szczepienia</Card.Title>
              <Card.Text>
                Zapisz się na szczepienie przeciw COVID-19, grypie lub inne.
              </Card.Text>
              <Button
                variant="primary"
                className="mt-auto"
                onClick={() => navigate("/szczepienia")}
              >
                Umów szczepienie
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TypRejestracji;
