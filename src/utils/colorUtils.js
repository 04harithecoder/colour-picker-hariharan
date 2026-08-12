// Helper utility functions for color manipulation and conversion

export function normalizeHex(hex) {
  if (!hex) return '#000000';
  let cleanHex = hex.trim().replace(/^#/, '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  if (cleanHex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    return null;
  }
  return '#' + cleanHex.toUpperCase();
}

export function isValidHex(hex) {
  if (!hex) return false;
  const cleanHex = hex.trim().replace(/^#/, '');
  return (cleanHex.length === 3 || cleanHex.length === 6) && /^[0-9A-Fa-f]+$/.test(cleanHex);
}

export function hexToRgb(hex) {
  const normalized = normalizeHex(hex) || '#000000';
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  return { r, g, b, string: `rgb(${r}, ${g}, ${b})` };
}

export function rgbToHex(r, g, b) {
  const toHex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);

  return {
    h: hDeg,
    s: sPct,
    l: lPct,
    string: `hsl(${hDeg}, ${sPct}%, ${lPct}%)`
  };
}

export function getLuminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function getTextColorForBackground(hex) {
  const whiteRatio = getContrastRatio(hex, '#FFFFFF');
  const blackRatio = getContrastRatio(hex, '#0F172A');
  return whiteRatio >= blackRatio ? '#FFFFFF' : '#0F172A';
}

export function getRandomHex() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  return `#${randomColor}`.toUpperCase();
}
