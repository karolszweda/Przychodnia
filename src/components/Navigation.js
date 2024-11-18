import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import FontSizeButton from './FontSizeButton'; // Przyciski zmiany rozmiaru czcionki
import DarkModeButton from './DarkModeButton'; // Przyciski zmiany trybu ciemnego

function Navigation({ onFontSizeIncrease, onFontSizeReset, onToggleDarkMode, darkMode }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const name = localStorage.getItem("userName");
      setIsLoggedIn(loggedIn);
      setUserName(name);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setUserName("");

    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("logout"));

    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar
      expand="lg"
      className={`navbar-custom ${darkMode ? 'navbar-dark' : 'navbar-light'}`}
      bg={darkMode ? 'dark' : 'light'}
      variant={darkMode ? 'dark' : 'light'}
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          ePrzychodnia
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Start</Nav.Link>
            <Nav.Link as={Link} to="/about">O nas</Nav.Link>
            <Nav.Link as={Link} to="/contact">Kontakt</Nav.Link>
            <Nav.Link as={Link} to="/typ-rejestracji">Umów się</Nav.Link>

            {isLoggedIn ? (
              <NavDropdown title={userName} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/karta-pacjenta">Karta Pacjenta</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/terminarz-pacjenta">Umówione wizyty</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/szczepienia">Szczepienia</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/action3">Zamów receptę</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/action3">Profilaktyka</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Wyloguj</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">Zaloguj</Nav.Link>
            )}
          </Nav>

          {/* Przycisk do zmiany rozmiaru czcionki i trybu ciemnego */}
          <div style={{ marginLeft: 'auto', padding: '0 10px' }}>
            <FontSizeButton 
              onFontSizeChange={onFontSizeIncrease} 
              label="A+" 
              color="blue"
            />
            <FontSizeButton 
              onFontSizeChange={onFontSizeReset} 
              label="A" 
              color="red"
            />
            <DarkModeButton onToggleDarkMode={onToggleDarkMode} darkMode={darkMode} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
