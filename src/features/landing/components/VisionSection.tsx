import React from 'react';
import { ArrowRight, Sparkles, Database, Brain, Film, Layers } from 'lucide-react';
import { CommerceSketchBackground } from './CommerceSketchBackground';

export const VisionSection: React.FC = () => {
  const chainSteps = [
    { label: 'Products', sub: 'Catalog Source of Truth', Icon: Database },
    { label: 'Data', sub: 'Synced Meta & Images', Icon: Layers },
    { label: 'Intelligence', sub: '3-Angle AI Synthesizer', Icon: Brain },
    { label: 'Creative', sub: 'Human Reviewed Drafts', Icon: Sparkles },
    { label: 'Production', sub: 'GPU Video Delivery', Icon: Film }
  ];

  return (
    <section id="vision" className="paper-canvas" style={{
      borderBottom: '1px solid var(--xora-border, #e4e7e5)',
      padding: '88px 24px'
    }}>
      {/* Commerce Sketch Background Motif */}
      <CommerceSketchBackground variant="vision" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        <div style={{ maxWidth: '720px', margin: '0 auto 56px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--xora-green, #00a878)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>
            Company Vision
          </div>
          <h2 className="font-bebas" style={{ fontSize: '42px', color: '#161817', margin: '0 0 18px 0', lineHeight: 1.1 }}>
            WE'RE BUILDING THE CREATIVE PRODUCTION LAYER FOR MODERN COMMERCE.
          </h2>
          <p style={{ fontSize: '16.5px', color: '#5f6361', lineHeight: 1.6, margin: 0 }}>
            Today, XORA helps Shopify businesses turn their product catalogs into AI-assisted marketing creatives. Our larger vision is to make creative production as structured, scalable, and manageable as the product catalog itself.
          </p>
        </div>

        {/* Value Chain Visual */}
        <div style={{
          backgroundColor: '#0c0d0e',
          borderRadius: '16px',
          border: '1px solid #303030',
          padding: '36px 24px',
          color: '#ffffff'
        }}>
          <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600, color: 'var(--xora-green, #00a878)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '28px' }}>
            THE COMMERCE CREATIVE PRODUCTION STACK
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            {chainSteps.map((item, idx) => {
              const Icon = item.Icon;
              return (
                <React.Fragment key={item.label}>
                  <div style={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #303030',
                    borderRadius: '10px',
                    padding: '16px 20px',
                    textAlign: 'center',
                    minWidth: '160px'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 168, 120, 0.12)',
                      color: 'var(--xora-green, #00a878)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 10px'
                    }}>
                      <Icon size={16} />
                    </div>
                    <div className="font-bebas" style={{ fontSize: '18px', color: '#ffffff', letterSpacing: '0.5px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '11px', color: '#8e9390', marginTop: '2px' }}>
                      {item.sub}
                    </div>
                  </div>

                  {idx < chainSteps.length - 1 && (
                    <ArrowRight size={18} style={{ color: '#5f6361', flexShrink: 0 }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
