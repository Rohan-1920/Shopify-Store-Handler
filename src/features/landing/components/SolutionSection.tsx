import React from 'react';
import { Store, RefreshCw, Sparkles, CheckCircle2, ShieldCheck, Coins, Cpu, Film } from 'lucide-react';
import { CommerceSketchBackground } from './CommerceSketchBackground';

export const SolutionSection: React.FC = () => {
  const steps = [
    { title: 'Connect Shopify', desc: 'Secure OAuth 2.0 connection to store catalog', Icon: Store },
    { title: 'Sync Products', desc: 'Pull product titles, hi-res media & descriptions', Icon: RefreshCw },
    { title: 'Identify Eligibility', desc: 'Auto-filter products ready for video creation', Icon: CheckCircle2 },
    { title: 'Generate AI Drafts', desc: '3 marketing angles created per product', Icon: Sparkles },
    { title: 'Review & Edit', desc: 'Human merchant reviews copy & claim safety', Icon: ShieldCheck },
    { title: 'Approve Work', desc: 'Explicit human sign-off before rendering', Icon: CheckCircle2 },
    { title: 'Confirm Quote', desc: 'Transparent credit cost checkpoint', Icon: Coins },
    { title: 'Zvid Render Engine', desc: 'GPU-accelerated video scene compilation', Icon: Cpu },
    { title: 'Video Library', desc: 'Completed MP4 videos delivered & pushed to store', Icon: Film }
  ];

  return (
    <section className="paper-canvas" style={{
      borderBottom: '1px solid var(--xora-border, #e4e7e5)',
      padding: '88px 24px'
    }}>
      {/* Commerce Sketch Background Motif */}
      <CommerceSketchBackground variant="solution" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 64px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--xora-green, #00a878)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>
            The Connected Engine
          </div>
          <h2 className="font-bebas" style={{ fontSize: '42px', color: '#161817', margin: '0 0 18px 0', lineHeight: 1.1 }}>
            FROM PRODUCT CATALOG TO CREATIVE PRODUCTION.
          </h2>
          <p style={{ fontSize: '16.5px', color: '#5f6361', lineHeight: 1.6, margin: 0 }}>
            XORA connects your Shopify catalog directly into an AI-assisted creative engine. AI output is never blindly published—human merchant review remains a core operational checkpoint.
          </p>
        </div>

        {/* 9 Step Connected Pipeline Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {steps.map((step, idx) => {
            const Icon = step.Icon;
            return (
              <div 
                key={step.title}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e4e7e5',
                  borderRadius: '12px',
                  padding: '24px',
                  position: 'relative',
                  transition: 'border-color 150ms ease, box-shadow 150ms ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 168, 120, 0.08)',
                    color: 'var(--xora-green, #00a878)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={18} />
                  </div>
                  <span className="font-bebas" style={{ fontSize: '16px', color: '#7a7f7c' }}>
                    0{idx + 1}
                  </span>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#161817', margin: '0 0 6px 0' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#5f6361', margin: 0, lineHeight: 1.4 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
