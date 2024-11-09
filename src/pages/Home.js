import React from 'react';
import { Link as link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <Carousel className="mb-5">
        <Carousel.Item>
          <div
            className="bg-primary text-white py-5"
            style={{ height: "500px" }}
          >
            <Container className="h-100 d-flex align-items-center">
              <div>
                <h1 className="display-4">Witaj w ePrzychodni</h1>
                <p className="lead">
                  Twoje zdrowie w zasięgu jednego kliknięcia
                </p>
                <Button
                  as={link}
                  to="/typ-rejestracji"
                  variant="light"
                  size="lg"
                  className="mt-3"
                >
                  Umów wizytę
                </Button>
              </div>
            </Container>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="bg-success text-white py-5"
            style={{ height: "500px" }}
          >
            <Container className="h-100 d-flex align-items-center">
              <div>
                <h1 className="display-4">Teleporady 24/7</h1>
                <p className="lead">
                  Konsultacje online z naszymi specjalistami
                </p>
                <Button variant="light" size="lg" className="mt-3">
                  Sprawdź terminy
                </Button>
              </div>
            </Container>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* Szybki dostęp */}
      <Container className="mb-5">
        <Row className="g-4">
          <Col md={3}>
            <Card className="text-center h-100">
              <Card.Body>
                <i className="fas fa-calendar-plus mb-3 h2 text-primary"></i>
                <h4 className="h5">Umów wizytę</h4>
                <p className="small">
                  Zarezerwuj termin wizyty stacjonarnej lub online
                </p>
                <Button
                  as={link}
                  to="/typ-rejestracji"
                  variant="outline-primary"
                >
                  Rezerwuj
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center h-100">
              <Card.Body>
                <i className="fas fa-file-medical mb-3 h2 text-primary"></i>
                <h4 className="h5">e-Recepta</h4>
                <p className="small">Zamów powtórkę recepty online</p>
                <Button variant="outline-primary">Zamów</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center h-100">
              <Card.Body>
                <i className="fas fa-notes-medical mb-3 h2 text-primary"></i>
                <h4 className="h5">Wyniki badań</h4>
                <p className="small">Sprawdź swoje wyniki badań online</p>
                <Button variant="outline-primary">Sprawdź</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center h-100">
              <Card.Body>
                <i className="fas fa-phone mb-3 h2 text-primary"></i>
                <h4 className="h5">Kontakt 24/7</h4>
                <p className="small">Całodobowa infolinia medyczna</p>
                <Button variant="outline-primary">Zadzwoń</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Aktualności */}
      <section className="bg-light py-5 mb-5">
        <Container>
          <h2 className="mb-4">Aktualności</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <h5>Nowy specjalista</h5>
                  <p className="text-muted small">15.10.2024</p>
                  <p>
                    Z przyjemnością witamy w naszym zespole dr Annę Kowalską,
                    specjalistę endokrynologii.
                  </p>
                  <Button variant="link" className="p-0">
                    Czytaj więcej
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <h5>Szczepienia przeciw grypie</h5>
                  <p className="text-muted small">10.10.2024</p>
                  <p>
                    Rozpoczynamy sezon szczepień przeciw grypie. Zapraszamy do
                    rejestracji.
                  </p>
                  <Button variant="link" className="p-0">
                    Czytaj więcej
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <h5>Nowe godziny otwarcia</h5>
                  <p className="text-muted small">05.10.2024</p>
                  <p>
                    Od października wydłużamy godziny przyjęć w dni powszednie
                    do 20:00.
                  </p>
                  <Button variant="link" className="p-0">
                    Czytaj więcej
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Specjalizacje */}
      <Container className="mb-5">
        <h2 className="mb-4">Nasze specjalizacje</h2>
        <Row className="g-4">
          <Col md={3}>
            <Card className="h-100">
              <Card.Body className="text-center">
                <i className="fas fa-heart mb-3 h2 text-danger"></i>
                <h5>Kardiologia</h5>
                <p className="small">
                  Kompleksowa diagnostyka i leczenie chorób serca
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100">
              <Card.Body className="text-center">
                <i className="fas fa-child mb-3 h2 text-primary"></i>
                <h5>Pediatria</h5>
                <p className="small">
                  Opieka nad dziećmi od pierwszych dni życia
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100">
              <Card.Body className="text-center">
                <i className="fas fa-brain mb-3 h2 text-info"></i>
                <h5>Neurologia</h5>
                <p className="small">
                  Diagnostyka i leczenie chorób układu nerwowego
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100">
              <Card.Body className="text-center">
                <i className="fas fa-bone mb-3 h2 text-warning"></i>
                <h5>Ortopedia</h5>
                <p className="small">Leczenie schorzeń układu ruchu</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Dlaczego my */}
      <section className="bg-primary text-white py-5 mb-5">
        <Container>
          <h2 className="mb-4">Dlaczego warto wybrać ePrzychodnię?</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="mb-4">
                <h4 className="h5">✓ Nowoczesne rozwiązania</h4>
                <p>e-Recepty, e-Zwolnienia, teleporady i wideokonsultacje</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-4">
                <h4 className="h5">✓ Doświadczony zespół</h4>
                <p>30 specjalistów z wieloletnim doświadczeniem</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-4">
                <h4 className="h5">✓ Kompleksowa opieka</h4>
                <p>Wszystkie potrzebne specjalizacje w jednym miejscu</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <Container className="text-center mb-5">
        <h2 className="mb-4">Zadbaj o swoje zdrowie już dziś</h2>
        <p className="lead mb-4">
          Nie zwlekaj - umów się na wizytę i zacznij dbać o swoje zdrowie
        </p>
        <Button as={link} to="/typ-rejestracji" variant="primary" size="lg">
          Umów wizytę online
        </Button>
      </Container>
    </div>
  );
}

export default Home;