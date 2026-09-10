import React from 'react';

interface CommerceSketchBackgroundProps {
  variant?: 'hero' | 'solution' | 'vision' | 'cta';
}

export const CommerceSketchBackground: React.FC<CommerceSketchBackgroundProps> = ({ variant = 'hero' }) => {
  return (
    <div className="sketch-bg-container" aria-hidden="true">
      {variant === 'hero' && (
        <>
          {/* Top Right: Large Cropped Parcel Sketch */}
          <svg
            width="520"
            height="520"
            viewBox="0 0 400 400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            className="sketch-svg-accent"
            style={{ top: '-80px', right: '-120px', opacity: 0.035 }}
          >
            {/* Box isometric outline */}
            <path d="M200 40 L340 110 L340 270 L200 340 L60 270 L60 110 Z" />
            <path d="M200 40 L200 340" />
            <path d="M60 110 L200 180 L340 110" />
            {/* Measurement annotations */}
            <path d="M40 110 L40 270" strokeDasharray="none" strokeWidth="0.8" />
            <line x1="32" y1="110" x2="48" y2="110" strokeDasharray="none" strokeWidth="0.8" />
            <line x1="32" y1="270" x2="48" y2="270" strokeDasharray="none" strokeWidth="0.8" />
            <text x="15" y="195" fill="currentColor" fontSize="10" fontFamily="monospace" stroke="none">H: 1920px</text>
            {/* Subtle Green Dot Marking */}
            <circle cx="200" cy="180" r="3" fill="#00a878" opacity="0.3" stroke="none" />
          </svg>

          {/* Bottom Left: Price Tag & Barcode Detail */}
          <svg
            width="380"
            height="380"
            viewBox="0 0 300 300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="sketch-svg-accent"
            style={{ bottom: '-40px', left: '-80px', opacity: 0.03 }}
          >
            <rect x="50" y="50" width="180" height="120" rx="8" strokeDasharray="3 3" />
            <circle cx="80" cy="80" r="6" />
            {/* Barcode lines */}
            <line x1="80" y1="110" x2="80" y2="150" strokeWidth="2" />
            <line x1="86" y1="110" x2="86" y2="150" strokeWidth="1" />
            <line x1="92" y1="110" x2="92" y2="150" strokeWidth="3" />
            <line x1="100" y1="110" x2="100" y2="150" strokeWidth="1" />
            <line x1="106" y1="110" x2="106" y2="150" strokeWidth="2" />
            <line x1="114" y1="110" x2="114" y2="150" strokeWidth="1.5" />
            <line x1="122" y1="110" x2="122" y2="150" strokeWidth="2.5" />
            <text x="80" y="162" fill="currentColor" fontSize="8" fontFamily="monospace" stroke="none">SKU-XORA-916</text>
          </svg>
        </>
      )}

      {variant === 'solution' && (
        <>
          {/* Right Center: Shopping Bag Technical Sketch */}
          <svg
            width="440"
            height="440"
            viewBox="0 0 350 350"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="sketch-svg-accent"
            style={{ top: '20px', right: '-100px', opacity: 0.035 }}
          >
            <path d="M70 120 L280 120 L260 310 L90 310 Z" />
            <path d="M120 120 C120 70, 230 70, 230 120" strokeDasharray="none" strokeWidth="1.2" />
            <line x1="70" y1="150" x2="280" y2="150" strokeWidth="0.8" />
            <text x="140" y="220" fill="currentColor" fontSize="11" fontFamily="monospace" stroke="none">CATALOG SYNC</text>
          </svg>
        </>
      )}

      {variant === 'vision' && (
        <>
          {/* Left Center: Pipeline Dimension Marks */}
          <svg
            width="460"
            height="460"
            viewBox="0 0 350 350"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="sketch-svg-accent"
            style={{ top: '40px', left: '-100px', opacity: 0.03 }}
          >
            <circle cx="175" cy="175" r="130" strokeDasharray="6 6" />
            <circle cx="175" cy="175" r="80" strokeDasharray="2 2" />
            <line x1="45" y1="175" x2="305" y2="175" strokeDasharray="4 4" />
            <line x1="175" y1="45" x2="175" y2="305" strokeDasharray="4 4" />
            <circle cx="175" cy="45" r="4" fill="#00a878" opacity="0.3" stroke="none" />
          </svg>
        </>
      )}

      {variant === 'cta' && (
        <>
          {/* Bottom Right: Parcel Fold Annotation */}
          <svg
            width="360"
            height="360"
            viewBox="0 0 300 300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="sketch-svg-accent"
            style={{ bottom: '-60px', right: '-60px', opacity: 0.035 }}
          >
            <rect x="40" y="40" width="220" height="220" rx="12" />
            <line x1="40" y1="40" x2="260" y2="260" />
            <line x1="260" y1="40" x2="40" y2="260" />
            <circle cx="150" cy="150" r="40" strokeDasharray="none" strokeWidth="0.8" />
          </svg>
        </>
      )}
    </div>
  );
};
