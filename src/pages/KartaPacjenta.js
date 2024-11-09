import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const KartaPacjenta = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          returnUrl: "/karta-pacjenta",
          message: "Please log in to view your medical records",
        },
      });
      return;
    }

    const fetchPatientData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:5000/api/patient/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }

        const data = await response.json();
        setPatientInfo(data);
        setLoading(false);
      } catch (err) {
        setError("Could not load patient information");
        console.error("Error:", err);
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [navigate]);

  const handleDownloadPDF = () => {
    // Files stored in backend/pdfs/id , test user ma id == 1
    const pdfUrl =
      "http://localhost:5000/api/patient/medical-record-pdf/" +
      localStorage.getItem("userId");

    fetch(pdfUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "karta-pacjenta.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => setError("Could not download PDF"));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Karta Pacjenta</h2>

      <Card className="mb-4">
        <Card.Header>
          <h3 className="h5 mb-0">Dane Pacjenta</h3>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p>
                <strong>Imię i Nazwisko:</strong> {patientInfo?.name}
              </p>
              <p>
                <strong>PESEL:</strong> {patientInfo?.pesel}
              </p>
              <p>
                <strong>Data urodzenia:</strong>{" "}
                {new Date(patientInfo?.birth_date).toLocaleDateString("pl-PL")}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Email:</strong> {patientInfo?.email}
              </p>
              <p>
                <strong>Telefon:</strong> {patientInfo?.phone}
              </p>
              <p>
                <strong>Adres:</strong> {patientInfo?.address}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h3 className="h5 mb-0">Historia Medyczna</h3>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>Alergie:</strong> {patientInfo?.allergies || "Brak"}
          </p>
          <p>
            <strong>Choroby przewlekłe:</strong>{" "}
            {patientInfo?.chronic_diseases || "Brak"}
          </p>
          <p>
            <strong>Przyjmowane leki:</strong>{" "}
            {patientInfo?.medications || "Brak"}
          </p>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>
          <h3 className="h5 mb-0">Dokumentacja Medyczna PDF</h3>
        </Card.Header>
        <Card.Body>
          <div className="text-center">
            <iframe
              src={`http://localhost:5000/api/patient/medical-record-pdf/${localStorage.getItem(
                "userId"
              )}`}
              width="100%"
              height="600px"
              title="Dokumentacja medyczna"
              className="mb-3"
            />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default KartaPacjenta;
