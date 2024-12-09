import React, { useState, useEffect } from "react";
import { Container, Table, Alert, Button, Modal, Toast } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
const AppointmentTable = ({ appointments, onCancelClick, type }) => (
  <Table responsive>
    <thead>
      <tr>
        <th>Data</th>
        <th>Godzina</th>
        <th>{type === "vaccination" ? "Rodzaj szczepienia" : "Lekarz"}</th>
        <th>{type === "vaccination" ? "Typ" : "Specjalizacja"}</th>
        <th>Akcje</th>
      </tr>
    </thead>
    <tbody>
      {appointments.map((appointment) => (
        <tr key={appointment.id}>
          <td>{new Date(appointment.date).toLocaleDateString("pl-PL")}</td>
          <td>{appointment.time}</td>
          <td>
            {type === "vaccination"
              ? appointment.doctor_surname
              : `${appointment.doctor_name} ${appointment.doctor_surname}`}
          </td>
          <td>
            {type === "vaccination"
              ? "Szczepienie"
              : appointment.specialization}
          </td>
          <td>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onCancelClick(appointment)}
            >
              Odwołaj
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const CompletedAppointmentsTable = ({ appointments }) => (
  <Table responsive>
    <thead>
      <tr>
        <th>Data</th>
        <th>Godzina</th>
        <th>Rodzaj wizyty</th>
        <th>Lekarz/Szczepienie</th>
        <th>Specjalizacja/Typ</th>
      </tr>
    </thead>
    <tbody>
      {appointments.map((appointment) => (
        <tr key={appointment.id}>
          <td>{new Date(appointment.date).toLocaleDateString("pl-PL")}</td>
          <td>{appointment.time}</td>
          <td>
            {appointment.type === "vaccination"
              ? "Szczepienie"
              : "Wizyta lekarska"}
          </td>
          <td>
            {appointment.type === "vaccination"
              ? appointment.doctor_surname // Vaccination type :P
              : `${appointment.doctor_name} ${appointment.doctor_surname}`}
          </td>
          <td>
            {appointment.type === "vaccination"
              ? "Szczepienie"
              : appointment.specialization}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);



const TerminarzPacjenta = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  const activeAppointments = appointments.filter(
    (app) => app.status !== "completed"
  );
  const completedAppointments = appointments.filter(
    (app) => app.status === "completed"
  );

  const activeDoctor = activeAppointments.filter(
    (app) => app.type !== "vaccination"
  );
  const activeVaccination = activeAppointments.filter(
    (app) => app.type === "vaccination"
  );

  useEffect(() => {
    if (location.state?.showToast) {
      setToastMessage(location.state.message);
      setShowToast(true);

      navigate(location.pathname, { replace: true });

      setTimeout(() => setShowToast(false), 3000);
    }
  }, [location, navigate]);


  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          returnUrl: "/terminarz-pacjenta",
          message: "Zaloguj się aby zobaczyć swoje wizyty",
        },
      });
      return;
    }

    const fetchAppointments = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:5000/api/appointments/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError("Could not load appointments");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedAppointment) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/${selectedAppointment.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }

      setAppointments(
        appointments.filter((app) => app.id !== selectedAppointment.id)
      );
      setShowModal(false);
      setSelectedAppointment(null);

      setToastMessage("Wizyta została pomyślnie odwołana");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError("Could not cancel appointment");
      console.error("Error:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Terminarz Pacjenta</h2>

      <h3 className="mt-4 mb-3">Wizyty lekarskie</h3>
      {activeDoctor.length > 0 ? (
        <AppointmentTable
          appointments={activeDoctor}
          onCancelClick={handleCancelClick}
          type="doctor"
        />
      ) : (
        <p className="text-center text-muted">
          Brak zaplanowanych wizyt lekarskich
        </p>
      )}

      <h3 className="mt-5 mb-3">Szczepienia</h3>
      {activeVaccination.length > 0 ? (
        <AppointmentTable
          appointments={activeVaccination}
          onCancelClick={handleCancelClick}
          type="vaccination"
        />
      ) : (
        <p className="text-center text-muted">Brak zaplanowanych szczepień</p>
      )}

      <div className="mt-5">
        <div className="d-flex align-items-center mb-3">
          <h3 className="mb-0">Odbyte spotkania</h3>
          <Button
            variant="link"
            onClick={() => setShowCompleted(!showCompleted)}
            className="ms-2"
          >
            {showCompleted ? "▼" : "▶"}
          </Button>
        </div>

        {completedAppointments.length > 0 ? (
          <div className={`collapse ${showCompleted ? "show" : ""}`}>
            <CompletedAppointmentsTable appointments={completedAppointments} />
          </div>
        ) : (
          <p className="text-center text-muted">Brak odbytych wizyt</p>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Potwierdź anulowanie wizyty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p>Czy na pewno chcesz anulować wizytę?</p>
              <p>
                <strong>Lekarz:</strong> {selectedAppointment.doctor_name}{" "}
                {selectedAppointment.doctor_surname}
              </p>
              <p>
                <strong>Data:</strong>{" "}
                {new Date(selectedAppointment.date).toLocaleDateString("pl-PL")}
              </p>
              <p>
                <strong>Godzina:</strong> {selectedAppointment.time}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Anuluj
          </Button>
          <Button variant="danger" onClick={handleConfirmCancel}>
            Potwierdź
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        bg="success"
        text="white"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
          minWidth: "300px",
          fontSize: "1.2rem",
          padding: "15px",
        }}
      >
        <Toast.Body style={{ padding: "20px", textAlign: "center" }}>
          {toastMessage}
        </Toast.Body>
      </Toast>
    </Container>
  );
};

export default TerminarzPacjenta;
