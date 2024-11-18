import React from 'react';

function DarkModeButton({ onToggleDarkMode }) {
  return (
    <button
      onClick={onToggleDarkMode} // Funkcja do zmiany trybu ciemnego
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        padding: '10px 20px',
        marginLeft: '10px',
        fontSize: '18px',
        width: '40px',
        height: '40px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      🌙 {/* Ikona księżyca symbolizująca ciemny tryb */}
    </button>
  );
}

export default DarkModeButton;




