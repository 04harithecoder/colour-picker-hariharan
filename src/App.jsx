import React, { useState } from 'react';
import ColourPreview from './components/ColourPreview';
import ColourPickerControls from './components/ColourPickerControls';
import PresetPalettes from './components/PresetPalettes';
import ColorHistory from './components/ColorHistory';
import LoadingScreen from './components/ParticleText/LoadingScreen';
import { isValidHex } from './utils/colorUtils';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState('#3B82F6');
  const [history, setHistory] = useState(['#3B82F6', '#10B981', '#6366F1', '#F59E0B', '#8B5CF6']);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    if (isValidHex(newColor)) {
      const normalized = newColor.toUpperCase();
      setHistory((prev) => {
        const filtered = prev.filter((item) => item.toUpperCase() !== normalized);
        return [normalized, ...filtered].slice(0, 10);
      });
    }
  };

  const handleClearHistory = () => {
    setHistory([color]);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="app-shell light-theme">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo" style={{ background: color }}></div>
          <div>
            <h1 className="brand-title">Colour Picker Previewer</h1>
            <p className="brand-subtitle">Minimalist color tool & live preview studio</p>
          </div>
        </div>

        <div className="header-badge">
          <span>Light Theme</span>
        </div>
      </header>
      <main className="app-content-grid">
        <section className="column-controls">
          <ColourPickerControls
            color={color}
            onChangeColor={handleColorChange}
          />

          <PresetPalettes
            selectedColor={color}
            onSelectColor={handleColorChange}
          />

          <ColorHistory
            history={history}
            selectedColor={color}
            onSelectColor={handleColorChange}
            onClearHistory={handleClearHistory}
          />
        </section>
        <section className="column-preview">
          <ColourPreview color={color} />
        </section>
      </main>
      <footer className="app-footer">
        <p>FROM THE FACTORY of HARIHARAN-PATTARAI with ❤️</p>
      </footer>
    </div>
  );
}

export default App;
