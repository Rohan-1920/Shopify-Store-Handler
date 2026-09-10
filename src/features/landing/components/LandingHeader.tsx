import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LandingHeaderProps {
  onConnectShopify: () => void;
  onOpenLogin?: () => void;
  onOpenSignup?: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({
  onConnectShopify,
  onNavigateToSection
}) => {
  const handleNavClick = (sectionId: string) => {
    onNavigateToSection(sectionId);
  };

  return (
    <header style={{
      position: 'sticky',
      top: '16px',
      zIndex: 100,
      maxWidth: '1240px',
      margin: '0 auto',
      padding: '0 16px'
    }}>
      {/* Amazing Header Glass Halo Container */}
      <div 
        className="header-glass-halo"
        style={{
          height: '60px',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Left: Brand Badge with Speed Breaker Effect */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <div 
            onClick={() => handleNavClick('hero')}
            className="speed-breaker-btn"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer',
              textDecoration: 'none',
              borderRadius: '9999px',
              padding: '2px 4px'
            }}
          >
            <div style={{
              backgroundColor: 'var(--xora-green, #00a878)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '14px',
              padding: '4px 12px',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 10px rgba(0, 168, 120, 0.3)'
            }}>
              <Sparkles size={14} />
              <span className="font-bebas" style={{ fontSize: '18px', lineHeight: 1 }}>XORA</span>
            </div>
          </div>

          {/* Center Navigation Links with Speed Breaker Physics */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button 
              onClick={() => handleNavClick('product')}
              className="speed-breaker-nav"
              style={{ background: 'none', border: 'none', color: '#4a4e4b', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
            >
              Product
            </button>
            <button 
              onClick={() => handleNavClick('how-it-works')}
              className="speed-breaker-nav"
              style={{ background: 'none', border: 'none', color: '#4a4e4b', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
            >
              How It Works
            </button>
            <button 
              onClick={() => handleNavClick('vision')}
              className="speed-breaker-nav"
              style={{ background: 'none', border: 'none', color: '#4a4e4b', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
            >
              Vision
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="speed-breaker-nav"
              style={{ background: 'none', border: 'none', color: '#4a4e4b', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
            >
              About
            </button>
          </nav>
        </div>

        {/* Right Action: Beautiful Speed Breaker Action Button (No 3 lines icon) */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={onConnectShopify}
            className="speed-breaker-btn"
            style={{
              backgroundColor: 'var(--xora-green, #00a878)',
              color: '#ffffff',
              border: 'none',
              padding: '9px 20px',
              borderRadius: '9999px',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '0.3px',
              boxShadow: '0 4px 14px rgba(0, 168, 120, 0.35)'
            }}
          >
            <span>Get Started</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};
