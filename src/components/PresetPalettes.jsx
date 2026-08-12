import React from 'react';

const PRESET_CATEGORIES = [
  {
    name: 'Minimalist & Pastel',
    colors: [
      { name: 'Soft Slate', hex: '#64748B' },
      { name: 'Sage Green', hex: '#86EFAC' },
      { name: 'Dusty Rose', hex: '#FDA4AF' },
      { name: 'Sky Blue', hex: '#7DD3FC' },
      { name: 'Warm Amber', hex: '#FDE047' },
      { name: 'Lavender', hex: '#C084FC' },
    ]
  },
  {
    name: 'Vibrant Accent',
    colors: [
      { name: 'Indigo', hex: '#6366F1' },
      { name: 'Emerald', hex: '#10B981' },
      { name: 'Sunset Orange', hex: '#F97316' },
      { name: 'Electric Violet', hex: '#8B5CF6' },
      { name: 'Teal', hex: '#14B8A6' },
      { name: 'Crimson', hex: '#EF4444' },
    ]
  },
  {
    name: 'Neutral & Monochrome',
    colors: [
      { name: 'Pure Dark', hex: '#0F172A' },
      { name: 'Charcoal', hex: '#334155' },
      { name: 'Cool Gray', hex: '#94A3B8' },
      { name: 'Ice White', hex: '#F8FAFC' },
      { name: 'Muted Beige', hex: '#E2E8F0' },
      { name: 'Deep Midnight', hex: '#020617' },
    ]
  }
];

export default function PresetPalettes({ selectedColor, onSelectColor }) {
  return (
    <div className="presets-container">
      <span className="section-title">Curated Palettes</span>
      
      <div className="preset-categories">
        {PRESET_CATEGORIES.map((category, idx) => (
          <div key={idx} className="preset-category">
            <span className="preset-cat-name">{category.name}</span>
            <div className="preset-swatches-grid">
              {category.colors.map((item) => {
                const isActive = selectedColor.toUpperCase() === item.hex.toUpperCase();
                return (
                  <button
                    key={item.hex}
                    className={`preset-swatch ${isActive ? 'active' : ''}`}
                    style={{ backgroundColor: item.hex }}
                    onClick={() => onSelectColor(item.hex)}
                    title={`${item.name} (${item.hex})`}
                    aria-label={`Select ${item.name}`}
                  >
                    {isActive && (
                      <span 
                        className="swatch-check"
                        style={{ color: ['#F8FAFC', '#E2E8F0', '#86EFAC', '#FDA4AF', '#7DD3FC', '#FDE047'].includes(item.hex) ? '#0F172A' : '#FFFFFF' }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
