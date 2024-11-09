import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const doctors = [ // hardcoded data
  { id: 1, name: 'Dr. Marcin Podkowa', description: 'Dermatolog', photo: '/doctors/doktor_1.jpg' },
  { id: 2, name: 'Dr. Jadwiga Śmiałek', description: 'Okulistka', photo: '/doctors/doktor_2.jpg' },
  { id: 3, name: 'Dr. Malgorzata Kwiatkowska', description: 'Pediatria', photo: '/doctors/doktor_3.jpg' },
  { id: 4, name: 'Dr. Bronisława Nowocień', description: 'Laryngolog', photo: '/doctors/doktor_4.jpg' },
  { id: 5, name: 'Dr. Anna Nowak', description: 'Neurolog', photo: '/doctors/doktor_5.jpg' },
  { id: 6, name: 'Dr. Sylwester Stanisław', description: 'Ortopeda', photo: '/doctors/doktor_6.jpg' },
  { id: 7, name: 'Dr. Bartłomiej Sadzikowski', description: 'Kardiolog', photo: '/doctors/doktor_7.jpg' },
];

const DoctorSelection = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Lekarze dostępni w placówce:</h2>
      <Row className="g-4">
        {doctors.map((doctor) => (
          <Col md={4} key={doctor.id}>
            <Card className="h-100 shadow-sm hover-card">
              <Card.Img variant="top" src={doctor.photo} alt={doctor.name} />
              <Card.Body>
                <Card.Title>{doctor.name}</Card.Title>
                <Card.Text>{doctor.description}</Card.Text>
                <Button
                  as={Link}
                  to={`/doctor-schedule/${doctor.id}`}
                  variant="primary"
                >
                  Zobacz terminy
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DoctorSelection;