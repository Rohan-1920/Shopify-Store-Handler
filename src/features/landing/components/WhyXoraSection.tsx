import React from 'react';
import { Store, Cpu, ShieldCheck, Layers } from 'lucide-react';

export const WhyXoraSection: React.FC = () => {
  const pillars = [
    {
      title: 'Built Around Your Catalog',
      desc: 'Shopify remains the single source of truth. XORA reads product titles, descriptions, pricing, and hi-res image assets directly via API.',
      Icon: Store
    },
    {
      title: 'Designed for Production',
      desc: 'XORA is not just an isolated AI copy generator. It organizes the complete end-to-end creative production and rendering workflow.',
      Icon: Cpu
    },
    {
      title: 'Human Controlled',
      desc: 'AI assists creation while humans remain in total control of draft edits, claim safety inspection, credit confirmation, and final approval.',
      Icon: ShieldCheck
    },
    {
      title: 'Built to Scale',
      desc: 'Effortlessly produce marketing video creatives across hundreds of catalog SKUs and 3 distinct marketing angles simultaneously.',
      Icon: Layers
    }
  ];

  return (
    <section id="about" className="paper-canvas-subtle" style={{
      borderBottom: '1px solid var(--xora-border, #e4e7e5)',
      padding: '88px 24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ maxWidth: '680px', marginBottom: '56px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--xora-green, #00a878)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>
            Product Philosophy
          </div>
          <h2 className="font-bebas" style={{ fontSize: '42px', color: '#161817', margin: '0 0 18px 0', lineHeight: 1.1 }}>
            WHY XORA WAS BUILT FOR COMMERCE.
          </h2>
          <p style={{ fontSize: '16.5px', color: '#5f6361', lineHeight: 1.6, margin: 0 }}>
            Designed specifically for e-commerce operators who require production consistency, brand safety, and catalog integration.
          </p>
        </div>

        {/* 4 Pillar Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {pillars.map((p) => {
            const Icon = p.Icon;
            return (
              <div 
                key={p.title}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e4e7e5',
                  borderRadius: '12px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0, 168, 120, 0.08)',
                  color: 'var(--xora-green, #00a878)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#161817', margin: '0 0 8px 0' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#5f6361', lineHeight: 1.5, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
