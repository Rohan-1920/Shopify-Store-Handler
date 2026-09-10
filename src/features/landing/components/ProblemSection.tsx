import React from 'react';
import { Clock, AlertTriangle, RefreshCw, FileText } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="product" className="paper-canvas-subtle" style={{
      borderBottom: '1px solid var(--xora-border, #e4e7e5)',
      padding: '88px 24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ maxWidth: '680px', marginBottom: '56px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--xora-green, #00a878)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>
            The Commerce Bottleneck
          </div>
          <h2 className="font-bebas" style={{ fontSize: '42px', color: '#161817', margin: '0 0 18px 0', lineHeight: 1.1 }}>
            CREATIVE PRODUCTION SHOULDN'T SLOW DOWN YOUR STORE.
          </h2>
          <p style={{ fontSize: '16.5px', color: '#5f6361', lineHeight: 1.6, margin: 0 }}>
            Shopify merchants already maintain rich product catalogs—complete with hi-res imagery, descriptions, pricing, and variant data. But turning that catalog into consistent video creatives manually creates an expensive operational bottleneck.
          </p>
        </div>

        {/* Traditional Workflow vs XORA System */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px'
        }}>
          {/* Traditional Manual Process Card */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e4e7e5',
            borderRadius: '12px',
            padding: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ padding: '6px', backgroundColor: '#fde8e8', color: '#d82c0d', borderRadius: '6px' }}>
                <Clock size={18} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#161817', margin: 0 }}>
                Traditional Manual Workflow
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#5f6361' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f8f9f8', borderRadius: '8px' }}>
                <span style={{ fontWeight: 600, color: '#161817', width: '20px' }}>1.</span>
                <span>Copying catalog specs & descriptions manually</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f8f9f8', borderRadius: '8px' }}>
                <span style={{ fontWeight: 600, color: '#161817', width: '20px' }}>2.</span>
                <span>Hiring external copywriters for ad hooks</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f8f9f8', borderRadius: '8px' }}>
                <span style={{ fontWeight: 600, color: '#161817', width: '20px' }}>3.</span>
                <span>Manual video editing across 3 separate aspect ratios</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f8f9f8', borderRadius: '8px' }}>
                <span style={{ fontWeight: 600, color: '#161817', width: '20px' }}>4.</span>
                <span>Days lost waiting for rendering & revisions</span>
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #eff1ef', fontSize: '13px', color: '#d82c0d', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={15} />
              <span>Result: Low creative volume & delayed product launches</span>
            </div>
          </div>

          {/* XORA Structured System Card */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '2px solid var(--xora-green-border, rgba(0, 168, 120, 0.3))',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0, 168, 120, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ padding: '6px', backgroundColor: 'var(--xora-green-subtle, rgba(0, 168, 120, 0.10))', color: 'var(--xora-green, #00a878)', borderRadius: '6px' }}>
                <RefreshCw size={18} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#161817', margin: 0 }}>
                The XORA Creative Production System
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#161817' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#e6f6f1', borderRadius: '8px' }}>
                <span style={{ fontWeight: 700, color: '#007a57', width: '20px' }}>✓</span>
                <span>Direct Shopify OAuth sync (Zero manual copying)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#e6f6f1', borderRadius: '8px' }}>
                <span style={{ fontWeight: 700, color: '#007a57', width: '20px' }}>✓</span>
                <span>3-Angle AI Generation (Problem, Social Proof, Urgency)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#e6f6f1', borderRadius: '8px' }}>
                <span style={{ fontWeight: 700, color: '#007a57', width: '20px' }}>✓</span>
                <span>Mandatory Human Review & Claim Safety Inspection</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#e6f6f1', borderRadius: '8px' }}>
                <span style={{ fontWeight: 700, color: '#007a57', width: '20px' }}>✓</span>
                <span>Instant Zvid GPU Render & Direct Shopify Delivery</span>
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #eff1ef', fontSize: '13px', color: '#007a57', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={15} />
              <span>Result: Structured, predictable, high-volume video production</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
