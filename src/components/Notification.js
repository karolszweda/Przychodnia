import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Notification = () => {
  const [hasAppointments, setHasAppointments] = useState(false);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAppointments = async () => {
      const userId = localStorage.getItem("userId");

      // No notification in terminarz page
      if (location.pathname === "/terminarz-pacjenta") {
        setHasAppointments(false);
        setShow(false);
        setLoading(false);
        return;
      }

      try {
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

        // Show only the upcoming appointments
        const upcomingAppointments = data.filter((apt) => {
          const aptDate = new Date(apt.date);
          return aptDate >= new Date();
        });

        setHasAppointments(upcomingAppointments.length > 0);
        setShow(upcomingAppointments.length > 0);
      } catch (err) {
        console.error("Error checking appointments:", err);
        setHasAppointments(false);
        setShow(false);
      } finally {
        setLoading(false);
      }
    };

    checkAppointments();
  }, [location.pathname]);

  if (loading || !hasAppointments || !show) {
    return null;
  }

  return (
    <Alert
      variant="warning"
      dismissible
      onClose={() => setShow(false)}
      className="mb-0 py-3"
      style={{
        borderRadius: 0,
        textAlign: "center",
        fontSize: "1.1rem",
        fontWeight: "500",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <span role="img" aria-label="warning">
        ⚠️
      </span>{" "}
      Masz zaplanowane wizyty!{" "}
      <Link to="/terminarz-pacjenta" className="alert-link">
        Sprawdź szczegóły w terminarzu
      </Link>
    </Alert>
  );
};

export default Notification;
