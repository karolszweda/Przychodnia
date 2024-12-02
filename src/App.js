// W App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Notification from "./components/Notification";
import Footer from './components/Footer'; // Import stopki


// Import stron
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import DoctorSelection from './pages/DoctorSelection';
import DoctorSchedule from './pages/DoctorSchedule';
import KartaPacjenta from './pages/KartaPacjenta';
import Register from './pages/Register';
import TerminarzPacjenta from './pages/TerminarzPacjenta';
import TypRejestracji from './pages/TypRejestracji';
import Szczepienia from './pages/Szczepienia';
import NowySpecjalista from "./pages/NowySpecjalista";
import SzczepieniaInfo from "./pages/SzczepieniaInfo";
import NoweGodziny from "./pages/NoweGodziny";

function App() {
  const [fontSize, setFontSize] = useState(20); // Ustawienie domyślnego rozmiaru czcionki
  const [darkMode, setDarkMode] = useState(false); // Dodajemy stan do ciemnego trybu

  const maxFontSize = 30; // Maksymalny rozmiar czcionki

  // Funkcja zmieniająca rozmiar czcionki
  const handleFontSizeChange = () => {
    setFontSize(prevFontSize => {
      if (prevFontSize < maxFontSize) {
        return prevFontSize + 4; // Zwiększa czcionkę o 4px
      }
      return prevFontSize; // Zwraca aktualny rozmiar, jeśli jest już maksymalny
    });
  };

  // Funkcja resetująca rozmiar czcionki
  const resetFontSize = () => {
    setFontSize(16); // Resetowanie czcionki do wartości domyślnej
  };

  // Funkcja przełączająca tryb ciemny
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode); // Przełącza stan ciemnego trybu
  };

  return (
    <Router>
      <div className={`d-flex flex-column min-vh-100 ${darkMode ? 'dark-mode' : ''}`} style={{ fontSize: `${fontSize}px` }}>
        <Navigation 
          onFontSizeIncrease={handleFontSizeChange} 
          onFontSizeReset={resetFontSize} 
          onToggleDarkMode={toggleDarkMode} // Przekazujemy funkcję przełączania trybu
          darkMode={darkMode} // Przekazujemy stan ciemnego trybu
        />
        <Notification />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctor-selection" element={<DoctorSelection />} />
            <Route path="/typ-rejestracji" element={<TypRejestracji />} />
            <Route path="/doctor-schedule/:id" element={<DoctorSchedule />} />
            <Route path="/szczepienia" element={<Szczepienia />} />
            <Route path="/karta-pacjenta" element={<KartaPacjenta />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terminarz-pacjenta" element={<TerminarzPacjenta />} />
            <Route path="/nowy-specjalista" element={<NowySpecjalista />} />
            <Route path="/szczepienia-info" element={<SzczepieniaInfo />} />
            <Route path="/nowe-godziny" element={<NoweGodziny />} />
          </Routes>
        </main>
        <Footer darkMode={darkMode} /> {/* Przekazujemy darkMode do Footer */}
      </div>
    </Router>
  );
}

export default App;
