import React from 'react';

export default function ColorHistory({ history, selectedColor, onSelectColor, onClearHistory }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="history-container">
      <div className="history-header">
        <span className="section-title">Recently Used</span>
        <button className="clear-history-btn" onClick={onClearHistory}>Clear</button>
      </div>

      <div className="history-swatches-grid">
        {history.map((hex, index) => {
          const isActive = selectedColor.toUpperCase() === hex.toUpperCase();
          return (
            <button
              key={`${hex}-${index}`}
              className={`history-swatch ${isActive ? 'active' : ''}`}
              style={{ backgroundColor: hex }}
              onClick={() => onSelectColor(hex)}
              title={hex}
            >
              {isActive && <span className="history-check">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
