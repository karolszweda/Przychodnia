import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function Contact() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Tutaj dodaj logikę wysyłania formularza
      console.log('Formularz wysłany');
    }

    setValidated(true);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 mb-5">
        <Container>
          <h1 className="display-4 mb-3">Kontakt</h1>
          <p className="lead">Jesteśmy tu, aby Ci pomóc. Skontaktuj się z nami w najwygodniejszy dla Ciebie sposób.</p>
        </Container>
      </div>

      <Container className="mb-5">
        <Row className="gy-4">
          {/* Dane kontaktowe */}
          <Col lg={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <h3 className="h4 mb-4">Dane kontaktowe</h3>
                
                <div className="mb-4">
                  <h4 className="h5 mb-3">Adres</h4>
                  <p className="mb-1">ePrzychodnia</p>
                  <p className="mb-1">ul. Przykładowa 123</p>
                  <p className="mb-1">00-000 Warszawa</p>
                </div>

                <div className="mb-4">
                  <h4 className="h5 mb-3">Telefon</h4>
                  <p className="mb-1">📞 Rejestracja: 123 456 789</p>
                  <p className="mb-1">📞 Teleporady: 987 654 321</p>
                  <p className="mb-1">📞 Pilne przypadki: 112</p>
                </div>

                <div className="mb-4">
                  <h4 className="h5 mb-3">Email</h4>
                  <p className="mb-1">📧 rejestracja@eprzychodnia.pl</p>
                  <p className="mb-1">📧 info@eprzychodnia.pl</p>
                </div>

                <div>
                  <h4 className="h5 mb-3">Godziny otwarcia</h4>
                  <p className="mb-1">Poniedziałek - Piątek: 8:00 - 20:00</p>
                  <p className="mb-1">Sobota: 9:00 - 14:00</p>
                  <p className="mb-1">Niedziela: nieczynne</p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Formularz kontaktowy */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h3 className="h4 mb-4">Formularz kontaktowy</h3>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Imię i nazwisko</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Wprowadź imię i nazwisko"
                        />
                        <Form.Control.Feedback type="invalid">
                          Proszę podać imię i nazwisko.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          required
                          type="email"
                          placeholder="Wprowadź adres email"
                        />
                        <Form.Control.Feedback type="invalid">
                          Proszę podać prawidłowy adres email.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Wprowadź numer telefonu"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Temat</Form.Label>
                    <Form.Select required>
                      <option value="">Wybierz temat</option>
                      <option value="wizyta">Umówienie wizyty</option>
                      <option value="teleporada">Teleporada</option>
                      <option value="wyniki">Wyniki badań</option>
                      <option value="inne">Inne</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Proszę wybrać temat.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Wiadomość</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={4}
                      placeholder="Wprowadź treść wiadomości"
                    />
                    <Form.Control.Feedback type="invalid">
                      Proszę wprowadzić treść wiadomości.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      required
                      label="Wyrażam zgodę na przetwarzanie moich danych osobowych"
                      feedback="Musisz wyrazić zgodę przed wysłaniem."
                      feedbackType="invalid"
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" size="lg">
                    Wyślij wiadomość
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Mapa i dojazd */}
        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h3 className="h4 mb-4">Jak do nas trafić?</h3>
                <div className="ratio ratio-16x9">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.7732838547!2d21.017229!3d52.237049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM1DCsDEyJzE4LjQiTiAyMcKwMDEnMDIuMCJF!5e0!3m2!1spl!2spl!4v1635784000000!5m2!1spl!2spl" 
                    width="600" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                    title="Mapa dojazdu"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="h5 mb-3">Dojazd:</h4>
                  <ul>
                    <li>Autobusy: 123, 124, 125</li>
                    <li>Tramwaje: 17, 33</li>
                    <li>Metro: stacja "Centrum"</li>
                    <li>Parking: dostępny dla pacjentów (wjazd od ul. Przykładowej)</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;