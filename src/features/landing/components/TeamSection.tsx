import React from 'react';
import { Cpu, Code2, Bot, Layout } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const engineeringDisciplines = [
    {
      role: 'SaaS UX & Frontend Engineering',
      desc: 'Building responsive, Shopify-aligned UI components and high-contrast workspace interfaces.',
      Icon: Layout
    },
    {
      role: 'AI & Creative Generation Systems',
      desc: 'Architecting 3-angle marketing script generators and claim safety detection models.',
      Icon: Bot
    },
    {
      role: 'Automation & Integration Engineering',
      desc: 'Orchestrating Shopify OAuth, webhooks, catalog sync pipelines, and n8n workflows.',
      Icon: Code2
    },
    {
      role: 'GPU Render Pipeline Engineering',
      desc: 'Optimizing Zvid scene stitching, audio synthesis, and vertical 9:16 video compilation.',
      Icon: Cpu
    }
  ];

  return (
    <section className="paper-canvas-subtle" style={{
      borderBottom: '1px solid var(--xora-border, #e4e7e5)',
      padding: '88px 24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ maxWidth: '680px', marginBottom: '56px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--xora-green, #00a878)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>
            Engineering & Product Philosophy
          </div>
          <h2 className="font-bebas" style={{ fontSize: '42px', color: '#161817', margin: '0 0 18px 0', lineHeight: 1.1 }}>
            BUILT BY A TEAM THAT WORKS AT THE INTERSECTION OF AI, AUTOMATION AND SOFTWARE.
          </h2>
          <p style={{ fontSize: '16.5px', color: '#5f6361', lineHeight: 1.6, margin: 0 }}>
            XORA is engineered by a multidisciplinary team focused on scalable commerce automation, reliable distributed rendering systems, and trustworthy merchant software.
          </p>
        </div>

        {/* Disciplines Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {engineeringDisciplines.map((item) => {
            const Icon = item.Icon;
            return (
              <div 
                key={item.role}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e4e7e5',
                  borderRadius: '12px',
                  padding: '28px'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(0, 168, 120, 0.08)',
                  color: 'var(--xora-green, #00a878)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <Icon size={18} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#161817', margin: '0 0 8px 0' }}>
                  {item.role}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#5f6361', lineHeight: 1.5, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
