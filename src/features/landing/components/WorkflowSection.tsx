import React from 'react';
import { Store, RefreshCw, Wand2, Edit3, CheckSquare, TrendingUp, ArrowRight } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const stages = [
    {
      num: '01',
      label: 'Connect',
      tag: 'OAuth 2.0 API',
      desc: 'Connect your Shopify store securely via official OAuth 2.0 API.',
      Icon: Store
    },
    {
      num: '02',
      label: 'Sync',
      tag: 'Real-Time Catalog',
      desc: 'Bring your product catalog and hi-res image assets into XORA.',
      Icon: RefreshCw
    },
    {
      num: '03',
      label: 'Create',
      tag: '3 Marketing Angles',
      desc: 'Generate AI-assisted creative drafts across 3 marketing angles.',
      Icon: Wand2
    },
    {
      num: '04',
      label: 'Review',
      tag: 'Claim Safety Flags',
      desc: 'Edit hooks, copy, and inspect claim safety warnings before approval.',
      Icon: Edit3
    },
    {
      num: '05',
      label: 'Approve & Produce',
      tag: 'Zvid GPU Engine',
      desc: 'Approve final creatives, review credit quote, then trigger rendering.',
      Icon: CheckSquare
    },
    {
      num: '06',
      label: 'Scale',
      tag: 'Automated Delivery',
      desc: 'Manage finished videos in Video Library and push directly to Shopify.',
      Icon: TrendingUp
    }
  ];

  return (
    <section id="how-it-works" className="paper-canvas-subtle" style={{
      borderBottom: '1px solid var(--xora-border, #e4e7e5)',
      padding: '96px 24px',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `
        radial-gradient(circle at 85% 15%, rgba(0, 168, 120, 0.06) 0%, transparent 45%),
        radial-gradient(circle at 15% 85%, rgba(0, 168, 120, 0.04) 0%, transparent 40%)
      `
    }}>
      {/* Ultra-Elegant SVG Dot Matrix Ambient Pattern */}
      <div 
        aria-hidden="true" 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.035,
          backgroundImage: `radial-gradient(#161817 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} 
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ maxWidth: '680px', marginBottom: '56px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--xora-green, #00a878)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>
            Structured Sequence
          </div>
          <h2 className="font-bebas" style={{ fontSize: '42px', color: '#161817', margin: '0 0 18px 0', lineHeight: 1.1 }}>
            HOW IT WORKS — 6 PRODUCTION STAGES.
          </h2>
          <p style={{ fontSize: '16.5px', color: '#5f6361', lineHeight: 1.6, margin: 0 }}>
            A transparent, predictable six-stage production workflow designed for Shopify merchants to maintain complete control from catalog sync to video delivery.
          </p>
        </div>

        {/* 6 Stage Cards Grid with Speed Breaker Physics & Elegant Backdrops */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {stages.map((stg) => {
            const Icon = stg.Icon;
            return (
              <div 
                key={stg.num}
                className="speed-breaker-btn"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(228, 231, 229, 0.9)',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
                }}
              >
                {/* Top Ambient Parrot Accent Line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: 'var(--xora-green, #00a878)',
                  opacity: 0.85
                }} />

                <div>
                  {/* Stage Number & Icon */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <span className="font-bebas" style={{ fontSize: '34px', color: 'var(--xora-green, #00a878)', lineHeight: 1, letterSpacing: '0.5px' }}>
                      {stg.num}
                    </span>
                    <div style={{
                      padding: '10px',
                      backgroundColor: 'rgba(0, 168, 120, 0.08)',
                      color: 'var(--xora-green, #00a878)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Title & Tag Pill */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#161817', margin: 0 }}>
                      {stg.label}
                    </h3>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: 'rgba(0, 168, 120, 0.08)',
                      color: '#007a57',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      letterSpacing: '0.2px'
                    }}>
                      {stg.tag}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '14px', color: '#5f6361', lineHeight: 1.5, margin: 0 }}>
                    {stg.desc}
                  </p>
                </div>

                {/* Card Footer Step Action Indicator */}
                <div style={{
                  marginTop: '20px',
                  paddingTop: '14px',
                  borderTop: '1px solid #eff1ef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#5f6361'
                }}>
                  <span>Stage {stg.num} Pipeline</span>
                  <ArrowRight size={14} style={{ color: 'var(--xora-green, #00a878)' }} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
