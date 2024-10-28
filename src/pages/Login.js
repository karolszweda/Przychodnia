// src/pages/Login.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'remember' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Tutaj będzie logika logowania
      // await loginUser(formData);
      console.log('Próba logowania z danymi:', formData);
      
      // Symulacja opóźnienia
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Po udanym logowaniu przekierowanie do panelu
      // history.push('/panel');
    } catch (err) {
      setError('Nieprawidłowy email lub hasło. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <div className="text-center mb-4">
              <h1 className="h2 text-primary">ePrzychodnia</h1>
              <p className="text-muted">Panel Pacjenta</p>
            </div>
            
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4">Logowanie</h2>
                
                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Wprowadź adres email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Wprowadź hasło"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                      label="Zapamiętaj mnie"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? 'Logowanie...' : 'Zaloguj się'}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <Link to="/forgot-password" className="text-decoration-none">
                    Zapomniałeś hasła?
                  </Link>
                </div>
              </Card.Body>
            </Card>

            <Card className="mt-4 shadow-sm">
              <Card.Body className="text-center p-4">
                <p className="mb-0">
                  Nie masz jeszcze konta?{' '}
                  <Link to="/Register" className="text-decoration-none">
                    Zarejestruj się
                  </Link>
                </p>
              </Card.Body>
            </Card>

            {/* Dodatkowe informacje */}
            <div className="text-center mt-4">
              <p className="text-muted small mb-0">
                Potrzebujesz pomocy?{' '}
                <Link to="/contact" className="text-decoration-none">
                  Skontaktuj się z nami
                </Link>
              </p>
              <p className="text-muted small mt-2">
                Korzystając z serwisu akceptujesz{' '}
                <Link to="/terms" className="text-decoration-none">
                  regulamin
                </Link>{' '}
                i{' '}
                <Link to="/privacy" className="text-decoration-none">
                  politykę prywatności
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;