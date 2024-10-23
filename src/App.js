import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

// Import stron
import Home from './pages/Home';
import Login from './pages/Login';
import Contact from './pages/Contact';
// import Action1 from './pages/Action1';
import Footer from './components/Footer';


// Import stylów
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/action1" element={<Action1 />} />
            <Route path="/action2" element={<Action2 />} />
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