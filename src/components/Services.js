import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Services() {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Nasze Usługi</h2>
      <Row className="g-4">
        {/* Teleporada */}
        <Col md={6}>
          <Card className="h-100 shadow-sm hover-card">
            <Card.Header className="bg-primary text-white text-center py-3">
              <h3 className="h5 mb-0">Teleporada</h3>
            </Card.Header>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center mb-4">
                <span className="display-6">50 zł</span>
              </Card.Title>
              <Card.Text>
                <ul className="list-unstyled">
                  <li className="mb-2">✅ Konsultacja przez telefon lub video</li>
                  <li className="mb-2">✅ Dostępność w ciągu 24h</li>
                  <li className="mb-2">✅ E-recepta</li>
                  <li className="mb-2">✅ E-zwolnienie</li>
                  <li className="mb-2">✅ Zalecenia lekarskie online</li>
                </ul>
              </Card.Text>
              <div className="mt-auto text-center">
                <Button 
                  as={Link} 
                  to="/teleporada"
                  variant="primary" 
                  size="lg" 
                  className="px-4"
                >
                  Umów teleporadę
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Wizyta stacjonarna */}
        <Col md={6}>
          <Card className="h-100 shadow-sm hover-card">
            <Card.Header className="bg-success text-white text-center py-3">
              <h3 className="h5 mb-0">Wizyta Stacjonarna</h3>
            </Card.Header>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center mb-4">
                <span className="display-6">100 zł</span>
              </Card.Title>
              <Card.Text>
                <ul className="list-unstyled">
                  <li className="mb-2">✅ Bezpośredni kontakt z lekarzem</li>
                  <li className="mb-2">✅ Badanie fizykalne</li>
                  <li className="mb-2">✅ Recepta</li>
                  <li className="mb-2">✅ Zwolnienie lekarskie</li>
                  <li className="mb-2">✅ Skierowania na badania</li>
                </ul>
              </Card.Text>
              <div className="mt-auto text-center">
                <Button 
                  as={Link} 
                  to="/wizyta-stacjonarna"
                  variant="success" 
                  size="lg" 
                  className="px-4"
                >
                  Umów wizytę
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Services;