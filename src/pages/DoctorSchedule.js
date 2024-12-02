import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Alert, Modal } from "react-bootstrap";

const DoctorSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const MAX_WEEKS_AHEAD = 4;

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loginStatus);
    };
    checkLoginStatus();
  }, []);


  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctor/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDoctor(data);
      } catch (err) {
        console.error("Error fetching doctor details:", err);
        setError(err.message);
      }
    };

    fetchDoctorDetails();
  }, [id]);


  useEffect(() => { // Fetch schedule data of given doctor
    const fetchSchedule = async () => {
      try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + weekOffset * 7);

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        console.log("Fetching schedule for:", {
          weekOffset,
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
        });

        const response = await fetch(
          `http://localhost:5000/api/schedule/${id}?` +
            `start=${startDate.toISOString().split("T")[0]}&` +
            `end=${endDate.toISOString().split("T")[0]}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received schedule data:", data.length, "slots");

        const formattedSchedule = data.map((slot) => ({
          ...slot,
          date: new Date(slot.date).toISOString().split("T")[0],
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
  }, [id, weekOffset]); 

  const handleSlotSelection = (slot) => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          returnUrl: `/doctor-schedule/${id}`,
          message: "Please log in to book an appointment",
        },
      });
      return;
    }

    // if logged in: 
    if (selectedSlot?.id === slot.id) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
      setShowModal(true);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot) return;

    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          returnUrl: `/doctor-schedule/${id}`,
          message: "Proszę się zalogowac aby zarejestrować termin",
        },
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          scheduleId: selectedSlot.id,
          doctorId: id,
          patientName: localStorage.getItem("userName"),
          patientEmail: localStorage.getItem("userEmail"),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to book appointment");
      }

      setShowModal(false);

      navigate("/terminarz-pacjenta", {
        state: {
          showToast: true,
          message: "Wizyta została pomyślnie zarezerwowana",
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSlot(null);
  };

  // define which hours are shown in the schedule
  const workingHours = Array.from(
    { length: 9 },
    (_, i) => `${(i + 8).toString().padStart(2, "0")}:00`
  );

  const next7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + weekOffset * 7);
    return date.toISOString().split("T")[0];
  });

  const handlePreviousWeek = () => {
    if (weekOffset > 0) {
      setWeekOffset(weekOffset - 1);
    }
  };

  const handleNextWeek = () => {
    if (weekOffset < MAX_WEEKS_AHEAD - 1) {
      setWeekOffset(weekOffset + 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

return (
  <Container fluid className="py-5">
    {doctor && (
      <div className="text-center mb-5">
        <img
          src={`/doctors/doktor_${id}.jpg`}
          alt={`${doctor.name} ${doctor.surname}`}
          className="rounded-circle mb-3"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <h2>{`${doctor.name} ${doctor.surname}`}</h2>
        <p className="text-muted">{doctor.specialization}</p>
      </div>
    )}

    <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
      <Button
        variant="primary"
        onClick={handlePreviousWeek}
        disabled={weekOffset === 0}
      >
        Poprzedni tydzień
      </Button>
      <h4 className="mb-0">
        {next7Days[0]} - {next7Days[next7Days.length - 1]}
      </h4>
      <Button
        variant="primary"
        onClick={handleNextWeek}
        disabled={weekOffset >= MAX_WEEKS_AHEAD - 1}
      >
        Następny tydzień
      </Button>
    </div>

    <Row>
      {/* Hours column */}
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

      {/* Days columns */}
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
        <Modal.Title>Potwierdź rezerwację</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Czy jesteś pewny, że chcesz zarejestrować sie na ten termin?</p>
        <p>
          <strong>Doktor:</strong> {doctor?.name} {doctor?.surname}
        </p>
        <p>
          <strong>Specjalizacja:</strong> {doctor?.specialization}
        </p>
        <p>
          <strong>Data:</strong> {formatDate(selectedSlot?.date)}{" "}
          {selectedSlot?.time}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
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

export default DoctorSchedule;
