import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Notification from "./components/Notification";

// Import stron
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import DoctorSelection from './pages/DoctorSelection';
import DoctorSchedule from './pages/DoctorSchedule';
import KartaPacjenta from './pages/KartaPacjenta';
import Register from './pages/Register';
import TerminarzPacjenta from './pages/TerminarzPacjenta';
import TypRejestracji from './pages/TypRejestracji';
import Szczepienia from './pages/Szczepienia';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
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
            <Route path="terminarz-pacjenta" element={<TerminarzPacjenta />} />
            {/* <Route path="/action2" element={<Action2 />} />
            <Route path="/action3" element={<Action3 />} />
            <Route path="/action4" element={<Action4 />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;