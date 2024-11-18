import React from 'react';

function FontSizeButton({ onFontSizeChange, label, color }) {
  return (
    <button
      onClick={onFontSizeChange} // Funkcja przekazywana z komponentu rodzica
      style={{
        backgroundColor: color,
        color: 'white',
        border: 'none',
        borderRadius: '50%', // Okrągły kształt przycisku
        cursor: 'pointer',
        padding: '10px 20px',
        marginLeft: '10px',
        fontSize: '18px',
        width: '40px', // Szerokość okrągłego przycisku
        height: '40px', // Wysokość okrągłego przycisku
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {label} {/* Tekst przycisku */}
    </button>
  );
}

export default FontSizeButton;
