import React from 'react';
import { Store, ArrowRight } from 'lucide-react';
import { CommerceSketchBackground } from './CommerceSketchBackground';

interface FinalCTASectionProps {
  onConnectShopify: () => void;
  onExploreXora: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onConnectShopify,
  onExploreXora
}) => {
  return (
    <section className="paper-canvas-subtle" style={{
      borderBottom: '1px solid var(--xora-border, #e4e7e5)',
      padding: '104px 24px',
      textAlign: 'center'
    }}>
      {/* Commerce Sketch Background Motif */}
      <CommerceSketchBackground variant="cta" />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        <h2 className="text-bebas-hero" style={{ color: '#161817', margin: '0 0 18px 0' }}>
          TURN YOUR CATALOG INTO A CREATIVE ENGINE.
        </h2>

        <p style={{ fontSize: '18px', color: '#5f6361', lineHeight: 1.6, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          Connect your Shopify store and start building a more scalable creative production workflow.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={onConnectShopify}
            className="speed-breaker-btn"
            style={{
              backgroundColor: 'var(--xora-green, #00a878)',
              color: '#ffffff',
              border: 'none',
              padding: '15px 32px',
              borderRadius: '9999px',
              fontSize: '15.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 18px rgba(0, 168, 120, 0.35)'
            }}
          >
            <Store size={18} />
            <span>Connect Your Shopify Store</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onExploreXora}
            className="speed-breaker-btn"
            style={{
              backgroundColor: '#ffffff',
              color: '#161817',
              border: '1px solid #e4e7e5',
              padding: '15px 26px',
              borderRadius: '9999px',
              fontSize: '15.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Explore XORA
          </button>
        </div>

      </div>
    </section>
  );
};
