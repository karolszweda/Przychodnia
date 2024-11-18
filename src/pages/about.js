// src/pages/About.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function About() {
  return (
<div className="about-page">
  {/* Hero Section */}
  <div className="bg-primary text-white py-5 mb-5" style={{
    backgroundImage: `url('https://images.pexels.com/photos/8460372/pexels-photo-8460372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`, // Ścieżka do Twojego zdjęcia
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '550px'  // Zwiększona wysokość sekcji
  }}>
    <Container>
      <h1 className="display-4 mb-3" style={{ color: '#333' }}>ePrzychodnia - Twoje Zdrowie, Nasza Misja</h1>  {/* Ciemny kolor nagłówka */}
      <p className="lead" style={{ color: '#333' }}>Nowoczesna opieka medyczna dostosowana do potrzeb współczesnego pacjenta</p>  {/* Ciemny kolor tekstu */}
    </Container>
  </div>



      {/* Main Content */}
      <Container>
        {/* O nas sekcja */}
        <section className="mb-5">
          <h2 className="mb-4">Kim jesteśmy?</h2>
          <Row>
            <Col lg={8}>
              <p>ePrzychodnia to nowoczesna placówka medyczna, która łączy tradycyjną opiekę zdrowotną z najnowszymi rozwiązaniami technologicznymi. Od 2020 roku zapewniamy naszym pacjentom kompleksową opiekę medyczną, wykorzystując zarówno tradycyjne wizyty stacjonarne, jak i nowoczesne rozwiązania telemedyczne.</p>
              <p>Naszym celem jest zapewnienie pacjentom najwyższej jakości usług medycznych w sposób wygodny i dostosowany do ich potrzeb. Dzięki połączeniu tradycyjnej medycyny z nowoczesnymi technologiami, jesteśmy w stanie oferować elastyczne formy konsultacji i opieki medycznej.</p>
            </Col>
            <Col lg={4}>
              <Card className="bg-light">
                <Card.Body>
                  <h5>Kluczowe liczby:</h5>
                  <ul>
                    <li>Ponad 20 000 zadowolonych pacjentów</li>
                    <li>30 doświadczonych specjalistów</li>
                    <li>15 specjalizacji medycznych</li>
                    <li>98% pozytywnych opinii</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Nasza Misja */}
        <section className="mb-5">
          <h2 className="mb-4">Nasza Misja</h2>
          <Row className="gy-4">
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <h4 className="h5 mb-3">Dostępność</h4>
                  <p>Zapewniamy łatwy dostęp do opieki medycznej poprzez innowacyjne rozwiązania telemedyczne i tradycyjne wizyty stacjonarne.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <h4 className="h5 mb-3">Profesjonalizm</h4>
                  <p>Nasz zespół tworzą doświadczeni specjaliści, którzy stale podnoszą swoje kwalifikacje i stosują najnowsze standardy leczenia.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <h4 className="h5 mb-3">Innowacyjność</h4>
                  <p>Wykorzystujemy nowoczesne technologie, aby zapewnić najwyższą jakość usług medycznych i komfort naszych pacjentów.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Nasz Zespół */}
        <section className="mb-5">
          <h2 className="mb-4">Nasz Zespół</h2>
          <p className="mb-4">W ePrzychodni pracują wyłącznie doświadczeni specjaliści z różnych dziedzin medycyny. Nasz zespół to:</p>
          <Row className="gy-4">
            <Col md={6} lg={3}>
              <Card className="h-100">
                <Card.Body>
                  <h5>Lekarze Rodzinni</h5>
                  <ul className="list-unstyled">
                    <li>✓ Kompleksowa opieka</li>
                    <li>✓ Profilaktyka</li>
                    <li>✓ Szczepienia</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100">
                <Card.Body>
                  <h5>Pediatrzy</h5>
                  <ul className="list-unstyled">
                    <li>✓ Opieka nad dziećmi</li>
                    <li>✓ Bilanse zdrowia</li>
                    <li>✓ Szczepienia dzieci</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100">
                <Card.Body>
                  <h5>Specjaliści</h5>
                  <ul className="list-unstyled">
                    <li>✓ Kardiologia</li>
                    <li>✓ Dermatologia</li>
                    <li>✓ Endokrynologia</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100">
                <Card.Body>
                  <h5>Personel Pomocniczy</h5>
                  <ul className="list-unstyled">
                    <li>✓ Pielęgniarki</li>
                    <li>✓ Rejestratorki</li>
                    <li>✓ Obsługa techniczna</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Nasze Wartości */}
        <section className="mb-5">
          <h2 className="mb-4">Nasze Wartości</h2>
          <Row>
            <Col md={6}>
              <div className="mb-4">
                <h5>🎯 Jakość</h5>
                <p>Stawiamy na najwyższą jakość usług medycznych i stale podnosimy nasze standardy.</p>
              </div>
              <div className="mb-4">
                <h5>🤝 Zaufanie</h5>
                <p>Budujemy trwałe relacje z pacjentami oparte na wzajemnym zaufaniu i szacunku.</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-4">
                <h5>💡 Rozwój</h5>
                <p>Stale się rozwijamy i wprowadzamy innowacyjne rozwiązania w opiece medycznej.</p>
              </div>
              <div className="mb-4">
                <h5>❤️ Empatia</h5>
                <p>Traktujemy każdego pacjenta z empatią i zrozumieniem jego indywidualnych potrzeb.</p>
              </div>
            </Col>
          </Row>
        </section>

        {/* Certyfikaty i Akredytacje */}
        <section className="mb-5">
          <h2 className="mb-4">Certyfikaty i Akredytacje</h2>
          <Row>
            <Col lg={8}>
              <p>ePrzychodnia posiada wszystkie niezbędne certyfikaty i akredytacje potwierdzające najwyższą jakość świadczonych usług medycznych:</p>
              <ul>
                <li>Certyfikat ISO 9001:2015 w zakresie zarządzania jakością</li>
                <li>Akredytacja Centrum Monitorowania Jakości w Ochronie Zdrowia</li>
                <li>Certyfikat Bezpieczeństwa Danych Osobowych RODO</li>
                <li>Członkostwo w Polskim Towarzystwie Telemedycyny</li>
              </ul>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
}

export default About;

