import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Alert, Modal } from "react-bootstrap";

const Szczepienia = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [schedule, setSchedule] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedVaccine] = useState(location.state?.selectedVaccine || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const MAX_WEEKS_AHEAD = 4;

  const VACCINATION_TYPES = {
    COVID: "COVID-19",
    FLU: "Grypa sezonowa",
    PNEUMO: "Pneumokoki",
    TETANUS: "Tężec",
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loginStatus);
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0); // Reset time to start of day
        startDate.setDate(startDate.getDate() + weekOffset * 7);

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        const response = await fetch(
          `http://localhost:5000/api/vaccinations/schedule?` +
            `start=${startDate.toISOString().split("T")[0]}&` +
            `end=${endDate.toISOString().split("T")[0]}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const formattedSchedule = data.map((slot) => ({
          ...slot,
          date: slot.date.split("T")[0], // Use date string directly without creating new Date
          time: slot.time.slice(0, 5),
        }));

        setSchedule(formattedSchedule);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching schedule:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [weekOffset]);

  const handleSlotSelection = (slot) => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          returnUrl: "/szczepienia",
          message: "Zaloguj się aby zarezerwować szczepienie",
        },
      });
      return;
    }

    setSelectedSlot(slot);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSlot(null);
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot || !selectedVaccine) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/vaccinations/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            scheduleId: selectedSlot.id,
            patientName: localStorage.getItem("userName"),
            patientEmail: localStorage.getItem("userEmail"),
            vaccinationType: selectedVaccine,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to book vaccination");
      }

      setShowModal(false);
      navigate("/terminarz-pacjenta", {
        state: {
          showToast: true,
          message: "Szczepienie zostało pomyślnie zarezerwowane",
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };



  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("pl-PL", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const workingHours = Array.from(
    { length: 8 },
    (_, i) => `${(i + 8).toString().padStart(2, "0")}:00`
  );

  const next7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + weekOffset * 7);
    return date.toISOString().split("T")[0];
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid className="py-5">
      <h2 className="text-center mb-4">Terminarz szczepień</h2>

      <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
        <Button
          variant="primary"
          onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
          disabled={weekOffset === 0}
        >
          Poprzedni tydzień
        </Button>
        <h4 className="mb-0">
          {formatDate(next7Days[0])} - {formatDate(next7Days[6])}
        </h4>
        <Button
          variant="primary"
          onClick={() =>
            setWeekOffset(Math.min(MAX_WEEKS_AHEAD - 1, weekOffset + 1))
          }
          disabled={weekOffset >= MAX_WEEKS_AHEAD - 1}
        >
          Następny tydzień
        </Button>
      </div>

      <Row>
        <Col xs={1} className="border-end">
          <div className="text-end pe-2" style={{ height: "50px" }}></div>
          {workingHours.map((hour) => (
            <div
              key={hour}
              className="text-end pe-2"
              style={{ height: "60px", lineHeight: "60px" }}
            >
              {hour}
            </div>
          ))}
        </Col>

        {next7Days.map((date) => (
          <Col key={date}>
            <div
              className="text-center border-bottom fw-bold bg-light"
              style={{ height: "50px", lineHeight: "50px" }}
            >
              {formatDate(date)}
            </div>
            {workingHours.map((hour) => {
              const slot = schedule.find(
                (s) => s.date === date && s.time.startsWith(hour)
              );

              return (
                <div
                  key={`${date}-${hour}`}
                  className="border-bottom"
                  style={{ height: "60px", padding: "5px" }}
                >
                  {slot ? (
                    <Button
                      variant={
                        selectedSlot?.id === slot.id
                          ? "primary"
                          : slot.is_available
                          ? "outline-primary"
                          : "outline-secondary"
                      }
                      size="sm"
                      className="w-100 h-100"
                      disabled={!slot.is_available}
                      onClick={() => handleSlotSelection(slot)}
                    >
                      {slot.is_available
                        ? selectedSlot?.id === slot.id
                          ? "Wybrany"
                          : "Wolny"
                        : "Zajęty"}
                    </Button>
                  ) : (
                    <Button
                      variant="outline-light"
                      size="sm"
                      className="w-100 h-100 text-muted"
                      disabled
                    >
                      Brak terminu
                    </Button>
                  )}
                </div>
              );
            })}
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Potwierdź szczepienie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Czy na pewno chcesz zarezerwować szczepienie?</p>
          <p>
            <strong>Rodzaj szczepienia:</strong>{" "}
            {VACCINATION_TYPES[selectedVaccine]}
          </p>
          <p>
            <strong>Data:</strong> {formatDate(selectedSlot?.date)}{" "}
            {selectedSlot?.time}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={handleBookAppointment}>
            Potwierdź
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Szczepienia;
