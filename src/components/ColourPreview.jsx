import React, { useState } from 'react';
import { 
  hexToRgb, 
  rgbToHsl, 
  getTextColorForBackground, 
  getContrastRatio 
} from '../utils/colorUtils';

/**
 * ColourPreview Component
 * Receives the selected colour via props and displays it in a minimalist preview box.
 */
export default function ColourPreview({ color }) {
  const [copiedFormat, setCopiedFormat] = useState(null);

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const textColor = getTextColorForBackground(color);
  
  const whiteContrast = getContrastRatio(color, '#FFFFFF').toFixed(2);
  const darkContrast = getContrastRatio(color, '#0F172A').toFixed(2);
  
  const bestContrast = textColor === '#FFFFFF' ? whiteContrast : darkContrast;
  const contrastTag = bestContrast >= 7 ? 'AAA' : bestContrast >= 4.5 ? 'AA' : 'Low Contrast';

  const copyToClipboard = (text, format) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="section-title">Color Preview</span>
        <span className="contrast-badge" style={{ 
          background: bestContrast >= 4.5 ? '#e0f2fe' : '#fef3c7',
          color: bestContrast >= 4.5 ? '#0369a1' : '#92400e'
        }}>
          {contrastTag} ({bestContrast}:1)
        </span>
      </div>

      {/* Main Preview Box */}
      <div 
        className="main-preview-box" 
        style={{ 
          backgroundColor: color,
          color: textColor 
        }}
      >
        <div className="preview-overlay-content">
          <span className="sample-typography">Aa</span>
          <h2 className="preview-hex-display" style={{ color: textColor }}>{color}</h2>
          <p className="preview-subtext" style={{ opacity: 0.85 }}>
            {rgb.string} • {hsl.string}
          </p>
        </div>

        <button 
          className="preview-copy-btn"
          onClick={() => copyToClipboard(color, 'main')}
          style={{
            backgroundColor: textColor === '#FFFFFF' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)',
            color: textColor,
            borderColor: textColor === '#FFFFFF' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.15)'
          }}
          title="Copy HEX Code"
        >
          {copiedFormat === 'main' ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy HEX
            </>
          )}
        </button>
      </div>

      {/* Color Code Cards */}
      <div className="color-specs-grid">
        <div className="spec-card">
          <div className="spec-header">
            <span className="spec-label">HEX</span>
            <button 
              className="spec-copy-icon" 
              onClick={() => copyToClipboard(color, 'HEX')}
              title="Copy HEX"
            >
              {copiedFormat === 'HEX' ? '✓' : '📋'}
            </button>
          </div>
          <span className="spec-value">{color}</span>
        </div>

        <div className="spec-card">
          <div className="spec-header">
            <span className="spec-label">RGB</span>
            <button 
              className="spec-copy-icon" 
              onClick={() => copyToClipboard(rgb.string, 'RGB')}
              title="Copy RGB"
            >
              {copiedFormat === 'RGB' ? '✓' : '📋'}
            </button>
          </div>
          <span className="spec-value">{rgb.string}</span>
        </div>

        <div className="spec-card">
          <div className="spec-header">
            <span className="spec-label">HSL</span>
            <button 
              className="spec-copy-icon" 
              onClick={() => copyToClipboard(hsl.string, 'HSL')}
              title="Copy HSL"
            >
              {copiedFormat === 'HSL' ? '✓' : '📋'}
            </button>
          </div>
          <span className="spec-value">{hsl.string}</span>
        </div>
      </div>

      {/* Minimalist UI Components Live Context Preview */}
      <div className="ui-context-box">
        <span className="section-subtitle">Live UI Component Mockup</span>
        <div className="mockup-row">
          <button className="mockup-btn-primary" style={{ backgroundColor: color, color: textColor }}>
            Primary Action
          </button>
          <button className="mockup-btn-secondary" style={{ borderColor: color, color: color }}>
            Outline Button
          </button>
          <span className="mockup-tag" style={{ backgroundColor: `${color}1A`, color: color, borderColor: `${color}33` }}>
            Active Tag
          </span>
        </div>
        
        <div className="mockup-card" style={{ borderLeft: `4px solid ${color}` }}>
          <div className="mockup-card-dot" style={{ backgroundColor: color }}></div>
          <div className="mockup-card-text">
            <div className="mockup-card-title">Card Header Highlight</div>
            <div className="mockup-card-desc">Visual demonstration of accent placement.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
