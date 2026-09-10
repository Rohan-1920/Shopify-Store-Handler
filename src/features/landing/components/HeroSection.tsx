import React from 'react';
import { Store, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Film, Cpu, Edit3 } from 'lucide-react';
import { CommerceSketchBackground } from './CommerceSketchBackground';

interface HeroSectionProps {
  onConnectShopify: () => void;
  onSeeHowItWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onConnectShopify,
  onSeeHowItWorks
}) => {
  return (
    <section id="hero" className="paper-canvas" style={{
      padding: '88px 24px 96px',
      borderBottom: '1px solid var(--xora-border, #e4e7e5)'
    }}>
      {/* Ultra-faint Technical Commerce Sketch Overlay */}
      <CommerceSketchBackground variant="hero" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Top Product Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '5px 14px',
          backgroundColor: 'var(--xora-green-subtle, rgba(0, 168, 120, 0.08))',
          border: '1px solid var(--xora-green-border, rgba(0, 168, 120, 0.22))',
          borderRadius: '9999px',
          marginBottom: '28px'
        }}>
          <Sparkles size={14} style={{ color: 'var(--xora-green, #00a878)' }} />
          <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#007a57', letterSpacing: '0.2px' }}>
            Official Shopify Commerce Creative Automation
          </span>
        </div>

        {/* Hero Impact Headline (Bebas Neue Display) */}
        <div style={{ marginBottom: '28px' }}>
          <h1 className="text-bebas-hero" style={{ color: '#161817', margin: 0, letterSpacing: '1px' }}>
            YOUR PRODUCTS.
          </h1>
          <h1 className="text-bebas-hero" style={{ color: '#161817', margin: 0, letterSpacing: '1px' }}>
            YOUR CATALOG.
          </h1>
          <h1 className="text-bebas-hero" style={{ color: 'var(--xora-green, #00a878)', margin: 0, letterSpacing: '1px' }}>
            A CREATIVE PRODUCTION SYSTEM.
          </h1>
        </div>

        {/* Supporting Copy */}
        <p style={{
          fontSize: '18px',
          lineHeight: 1.6,
          color: '#5f6361',
          maxWidth: '640px',
          marginBottom: '40px',
          fontWeight: 400
        }}>
          XORA turns your Shopify product catalog into AI-assisted marketing creatives — built, reviewed, approved, and produced at scale.
        </p>

        {/* Action CTAs with Speed Breaker Bounce Effect */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '72px'
        }}>
          <button
            onClick={onConnectShopify}
            className="speed-breaker-btn"
            style={{
              backgroundColor: 'var(--xora-green, #00a878)',
              color: '#ffffff',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '9999px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 16px rgba(0, 168, 120, 0.3)'
            }}
          >
            <Store size={18} />
            <span>Connect Your Shopify Store</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onSeeHowItWorks}
            className="speed-breaker-btn"
            style={{
              backgroundColor: '#ffffff',
              color: '#161817',
              border: '1px solid #e4e7e5',
              padding: '14px 24px',
              borderRadius: '9999px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            See How XORA Works
          </button>
        </div>

        {/* Hero Product Ecosystem Visual (5 Connected Pipeline Stages) */}
        <div style={{
          backgroundColor: '#0c0d0e',
          borderRadius: '16px',
          border: '1px solid #303030',
          padding: '32px',
          color: '#ffffff',
          boxShadow: '0 24px 48px rgba(0,0,0,0.12)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            borderBottom: '1px solid #262626',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
              <span style={{ fontSize: '12px', color: '#8e9390', marginLeft: '8px', fontFamily: 'monospace' }}>
                XORA Production Pipeline — Connected Store: acme-apparel.myshopify.com
              </span>
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              backgroundColor: 'rgba(0, 168, 120, 0.15)',
              color: 'var(--xora-green, #00a878)',
              padding: '3px 10px',
              borderRadius: '4px',
              letterSpacing: '0.5px'
            }}>
              LIVE WORKFLOW PIPELINE
            </div>
          </div>

          {/* 5 Connected Pipeline Stage Cards with Speed Breaker Effect */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '16px'
          }}>
            {/* Step 1: Catalog */}
            <div className="speed-breaker-btn" style={{ backgroundColor: '#161817', border: '1px solid #303030', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="font-bebas" style={{ fontSize: '14px', color: '#8e9390' }}>01 — CATALOG</span>
                <Store size={14} style={{ color: '#95bf47' }} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>
                Acme Tech Hoodie
              </div>
              <div style={{ fontSize: '11px', color: '#8e9390' }}>
                14 Variants • Synced Media
              </div>
            </div>

            {/* Step 2: AI Creative Draft */}
            <div className="speed-breaker-btn" style={{ backgroundColor: '#161817', border: '1px solid #303030', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="font-bebas" style={{ fontSize: '14px', color: '#8e9390' }}>02 — AI DRAFTS</span>
                <Sparkles size={14} style={{ color: 'var(--xora-green, #00a878)' }} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>
                3 Marketing Angles
              </div>
              <div style={{ fontSize: '11px', color: '#8e9390' }}>
                Problem • Proof • Urgency
              </div>
            </div>

            {/* Step 3: Human Review Checkpoint */}
            <div className="speed-breaker-btn" style={{ backgroundColor: '#161817', border: '1px solid var(--xora-green-border, rgba(0,168,120,0.3))', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="font-bebas" style={{ fontSize: '14px', color: 'var(--xora-green, #00a878)' }}>03 — HUMAN REVIEW</span>
                <Edit3 size={14} style={{ color: 'var(--xora-green, #00a878)' }} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>
                Merchant Approved
              </div>
              <div style={{ fontSize: '11px', color: '#00a878', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} />
                <span>Claim Safety Verified</span>
              </div>
            </div>

            {/* Step 4: GPU Rendering */}
            <div className="speed-breaker-btn" style={{ backgroundColor: '#161817', border: '1px solid #303030', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="font-bebas" style={{ fontSize: '14px', color: '#8e9390' }}>04 — ZVID RENDER</span>
                <Cpu size={14} style={{ color: '#0284c7' }} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>
                Scene Compilation
              </div>
              <div style={{ fontSize: '11px', color: '#0284c7' }}>
                1080x1920 MP4 Video
              </div>
            </div>

            {/* Step 5: Video Library */}
            <div className="speed-breaker-btn" style={{ backgroundColor: '#161817', border: '1px solid #303030', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="font-bebas" style={{ fontSize: '14px', color: '#8e9390' }}>05 — VIDEO LIBRARY</span>
                <Film size={14} style={{ color: 'var(--xora-green, #00a878)' }} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>
                Pushed to Store
              </div>
              <div style={{ fontSize: '11px', color: '#8e9390', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={12} style={{ color: 'var(--xora-green, #00a878)' }} />
                <span>Ready for Shopify</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
