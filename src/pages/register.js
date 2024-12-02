// src/pages/Register.js
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pesel: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    address: "",
    city: "",
    postalCode: "",
    acceptTerms: false,
    acceptPrivacy: false,
    acceptMarketing: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    // Imię
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Pole wymagane";
    }

    // Nazwisko
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Pole wymagane";
    }

    // PESEL
    if (!/^\d{11}$/.test(formData.pesel)) {
      newErrors.pesel = "PESEL musi składać się z 11 cyfr";
    }

    // Email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Nieprawidłowy format email";
    }

    // Telefon
    if (!/^\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Nieprawidłowy numer telefonu";
    }

    // Hasło
    if (formData.password.length < 8) {
      newErrors.password = "Hasło musi mieć minimum 8 znaków";
    }

    // Potwierdzenie hasła
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Hasła nie są identyczne";
    }

    // Data urodzenia
    if (!formData.birthDate) {
      newErrors.birthDate = "Pole wymagane";
    }

    // Kod pocztowy
    if (!/^\d{2}-\d{3}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Nieprawidłowy format kodu pocztowego";
    }

    // Akceptacja regulaminu
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Wymagana akceptacja regulaminu";
    }

    // Akceptacja polityki prywatności
    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = "Wymagana akceptacja polityki prywatności";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Tutaj będzie logika rejestracji
      // await registerUser(formData);
      console.log("Próba rejestracji z danymi:", formData);

      // Symulacja opóźnienia
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Po udanej rejestracji przekierowanie do potwierdzenia
      // history.push('/register-success');
    } catch (err) {
      setSubmitError(
        "Wystąpił błąd podczas rejestracji. Spróbuj ponownie później."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="text-center mb-4">
              <h1 className="h2 text-primary">ePrzychodnia</h1>
              <p className="text-muted">Rejestracja nowego pacjenta</p>
            </div>

            <Card className="shadow-sm">
              <Card.Body className="p-4">
                {submitError && (
                  <Alert variant="danger" className="mb-4">
                    {submitError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    {/* Dane osobowe */}
                    <Col md={12}>
                      <h4 className="mb-3">Dane osobowe</h4>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Imię*</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nazwisko*</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>PESEL*</Form.Label>
                        <Form.Control
                          type="text"
                          name="pesel"
                          value={formData.pesel}
                          onChange={handleChange}
                          maxLength="11"
                          isInvalid={!!errors.pesel}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.pesel}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Data urodzenia*</Form.Label>
                        <Form.Control
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleChange}
                          isInvalid={!!errors.birthDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.birthDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Dane kontaktowe */}
                    <Col md={12}>
                      <h4 className="mb-3 mt-3">Dane kontaktowe</h4>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email*</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Telefon*</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Adres */}
                    <Col md={12}>
                      <h4 className="mb-3 mt-3">Adres zamieszkania</h4>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Ulica i numer*</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          isInvalid={!!errors.address}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.address}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={8}>
                      <Form.Group className="mb-3">
                        <Form.Label>Miejscowość*</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          isInvalid={!!errors.city}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.city}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Kod pocztowy*</Form.Label>
                        <Form.Control
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder="00-000"
                          isInvalid={!!errors.postalCode}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.postalCode}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Hasło */}
                    <Col md={12}>
                      <h4 className="mb-3 mt-3">Hasło</h4>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Hasło*</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Powtórz hasło*</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          isInvalid={!!errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Zgody */}
                    <Col md={12}>
                      <h4 className="mb-3 mt-3">Zgody</h4>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          label={
                            <span>
                              Akceptuję{" "}
                              <Link to="/terms" target="_blank">
                                regulamin
                              </Link>
                              *
                            </span>
                          }
                          isInvalid={!!errors.acceptTerms}
                          feedback={errors.acceptTerms}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          name="acceptPrivacy"
                          checked={formData.acceptPrivacy}
                          onChange={handleChange}
                          label={
                            <span>
                              Akceptuję{" "}
                              <Link to="/privacy" target="_blank">
                                politykę prywatności
                              </Link>
                              *
                            </span>
                          }
                          isInvalid={!!errors.acceptPrivacy}
                          feedback={errors.acceptPrivacy}
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Check
                          type="checkbox"
                          name="acceptMarketing"
                          checked={formData.acceptMarketing}
                          onChange={handleChange}
                          label="Wyrażam zgodę na otrzymywanie informacji marketingowych"
                        />
                      </Form.Group>
                    </Col>

                    {/* Przyciski */}
                    <Col md={12}>
                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mb-3"
                        disabled={loading}
                      >
                        {loading ? "Przetwarzanie..." : "Zarejestruj się"}
                      </Button>
                      <p className="text-muted text-center small">
                        * Pola wymagane
                      </p>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            <Card className="mt-4 shadow-sm">
              <Card.Body className="text-center p-4">
                <p className="mb-0">
                  Masz już konto?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Zaloguj się
                  </Link>
                </p>
              </Card.Body>
            </Card>

            {/* Pomoc */}
            <div className="text-center mt-4">
              <p className="text-muted small mb-0">
                Potrzebujesz pomocy?{" "}
                <Link to="/contact" className="text-decoration-none">
                  Skontaktuj się z nami
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
