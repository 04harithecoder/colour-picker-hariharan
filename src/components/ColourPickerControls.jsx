import React from 'react';
import { hexToRgb, rgbToHex, getRandomHex, isValidHex } from '../utils/colorUtils';

export default function ColourPickerControls({ color, onChangeColor }) {
  const rgb = hexToRgb(color);

  const handleHexInputChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('#')) {
      val = '#' + val;
    }
    val = val.toUpperCase();
    if (isValidHex(val)) {
      onChangeColor(val);
    } else {
      // Allow user typing in progress
      onChangeColor(val);
    }
  };

  const handleNativeColorPicker = (e) => {
    onChangeColor(e.target.value.toUpperCase());
  };

  const handleRgbChange = (channel, value) => {
    const num = Math.max(0, Math.min(255, Number(value) || 0));
    const newRgb = { ...rgb, [channel]: num };
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    onChangeColor(newHex);
  };

  const handleRandomize = () => {
    const randomColor = getRandomHex();
    onChangeColor(randomColor);
  };

  return (
    <div className="controls-container">
      <div className="controls-header">
        <span className="section-title">Color Input</span>
        <button 
          className="random-btn" 
          onClick={handleRandomize}
          title="Pick random color"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 3 21 3 21 8"></polyline>
            <line x1="4" y1="20" x2="21" y2="3"></line>
            <polyline points="21 16 21 21 16 21"></polyline>
            <line x1="15" y1="15" x2="21" y2="21"></line>
            <line x1="4" y1="4" x2="9" y2="9"></line>
          </svg>
          Randomize
        </button>
      </div>

      {/* Color Picker Swatch & HEX Input */}
      <div className="picker-input-group">
        <div className="native-picker-wrapper" style={{ backgroundColor: color }}>
          <input 
            type="color" 
            value={isValidHex(color) ? color : '#000000'} 
            onChange={handleNativeColorPicker}
            aria-label="Color picker"
            className="native-color-input"
          />
        </div>

        <div className="hex-input-wrapper">
          <label className="input-label" htmlFor="hexInput">HEX Value</label>
          <input 
            id="hexInput"
            type="text" 
            className="hex-text-input" 
            value={color} 
            onChange={handleHexInputChange}
            placeholder="#000000"
            maxLength={7}
          />
        </div>
      </div>

      {/* RGB Sliders */}
      <div className="rgb-sliders-group">
        <span className="section-subtitle">RGB Fine Tuning</span>
        
        {/* Red Slider */}
        <div className="slider-row">
          <div className="slider-label-val">
            <span className="channel-label red-label">R</span>
            <span className="slider-val">{rgb.r}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="255" 
            value={rgb.r} 
            onChange={(e) => handleRgbChange('r', e.target.value)}
            className="rgb-slider red-slider"
          />
        </div>

        {/* Green Slider */}
        <div className="slider-row">
          <div className="slider-label-val">
            <span className="channel-label green-label">G</span>
            <span className="slider-val">{rgb.g}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="255" 
            value={rgb.g} 
            onChange={(e) => handleRgbChange('g', e.target.value)}
            className="rgb-slider green-slider"
          />
        </div>

        {/* Blue Slider */}
        <div className="slider-row">
          <div className="slider-label-val">
            <span className="channel-label blue-label">B</span>
            <span className="slider-val">{rgb.b}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="255" 
            value={rgb.b} 
            onChange={(e) => handleRgbChange('b', e.target.value)}
            className="rgb-slider blue-slider"
          />
        </div>
      </div>
    </div>
  );
}
