import React from 'react';
import { Sparkles } from 'lucide-react';

interface LandingFooterProps {
  onOpenLogin?: () => void;
  onOpenSignup?: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onOpenLogin,
  onOpenSignup,
  onNavigateToSection
}) => {
  return (
    <footer style={{
      backgroundColor: '#0c0d0e',
      borderTop: '1px solid #303030',
      color: '#8e9390',
      padding: '64px 24px 32px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          {/* Brand Col */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{
                backgroundColor: 'var(--xora-green, #00a878)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                padding: '2px 8px',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Sparkles size={14} />
                <span className="font-bebas" style={{ fontSize: '16px' }}>XORA</span>
              </div>
            </div>
            <p style={{ fontSize: '13.5px', color: '#8e9390', lineHeight: 1.6, maxWidth: '320px', margin: 0 }}>
              AI-assisted creative production for modern commerce. Transforming Shopify product catalogs into video creatives at scale.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px' }}>
              Navigation
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li>
                <button 
                  onClick={() => onNavigateToSection('product')} 
                  className="speed-breaker-nav"
                  style={{ background: 'none', border: 'none', color: '#8e9390', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                >
                  Product
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('how-it-works')} 
                  className="speed-breaker-nav"
                  style={{ background: 'none', border: 'none', color: '#8e9390', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('vision')} 
                  className="speed-breaker-nav"
                  style={{ background: 'none', border: 'none', color: '#8e9390', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                >
                  Vision
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('about')} 
                  className="speed-breaker-nav"
                  style={{ background: 'none', border: 'none', color: '#8e9390', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px' }}>
              Account
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li>
                <button 
                  onClick={onOpenLogin} 
                  className="speed-breaker-nav"
                  style={{ background: 'none', border: 'none', color: '#8e9390', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                >
                  Log in
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenSignup} 
                  className="speed-breaker-nav"
                  style={{ background: 'none', border: 'none', color: '#8e9390', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                >
                  Sign up
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px' }}>
              Legal & Compliance
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><span className="speed-breaker-nav" style={{ cursor: 'pointer', display: 'inline-block' }}>Privacy Policy</span></li>
              <li><span className="speed-breaker-nav" style={{ cursor: 'pointer', display: 'inline-block' }}>Terms of Service</span></li>
              <li><span className="speed-breaker-nav" style={{ cursor: 'pointer', display: 'inline-block' }}>Shopify Partner Terms</span></li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #262626',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12px',
          color: '#5f6361'
        }}>
          <div>© {new Date().getFullYear()} XORA Platform Inc. All rights reserved.</div>
          <div>Shopify App Store Partner • Encrypted HMAC Security</div>
        </div>
      </div>
    </footer>
  );
};
