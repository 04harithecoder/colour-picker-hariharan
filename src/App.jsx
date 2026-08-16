import React, { useState, useEffect } from 'react';
import ColourPreview from './components/ColourPreview';
import ColourPickerControls from './components/ColourPickerControls';
import PresetPalettes from './components/PresetPalettes';
import ColorHistory from './components/ColorHistory';
import ThemeToggle from './components/ThemeToggle';
import LoadingScreen from './components/ParticleText/LoadingScreen';
import { isValidHex } from './utils/colorUtils';
import lightLogo from './assets/Light-logo.png';
import darkLogo from './assets/Dark-logo.png';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState('#3B82F6');
  const [history, setHistory] = useState(['#3B82F6', '#10B981', '#6366F1', '#F59E0B', '#8B5CF6']);

  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('colour_picker_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch {
      // Ignore localStorage errors
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('colour_picker_theme', theme);
    } catch {
      // Ignore localStorage errors
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

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
    return <LoadingScreen onComplete={() => setIsLoading(false)} theme={theme} />;
  }

  return (
    <div className={`app-shell ${theme}-theme`}>
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo" style={{ borderColor: color, boxShadow: `0 4px 16px ${color}35` }}>
            <img
              src={theme === 'dark' ? darkLogo : lightLogo}
              alt="Hariharan Pattarai Logo"
              className="brand-logo-img"
            />
          </div>
          <div>
            <h1 className="brand-title">Colour Picker Previewer</h1>
            <p className="brand-subtitle">Minimalist color tool & live preview studio</p>
          </div>
        </div>

        <ThemeToggle theme={theme} onToggle={handleToggleTheme} />
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
