import React from 'react';
import { Sparkles, UserCheck, Zap } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section className="paper-canvas" style={{
      borderBottom: '1px solid var(--xora-border, #e4e7e5)',
      padding: '88px 24px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        
        <div style={{
          backgroundColor: '#0c0d0e',
          borderRadius: '16px',
          border: '1px solid #303030',
          padding: '56px 36px',
          color: '#ffffff',
          boxShadow: '0 12px 32px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--xora-green, #00a878)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Product Philosophy
          </div>

          <h2 className="font-bebas" style={{ fontSize: '44px', color: '#ffffff', margin: '0 0 18px 0', lineHeight: 1.15 }}>
            AI SHOULDN'T REPLACE THE CREATIVE WORKFLOW.
            <br />
            IT SHOULD MAKE THE WORKFLOW BETTER.
          </h2>

          <p style={{ fontSize: '16.5px', color: '#8e9390', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.6 }}>
            XORA is built around the synergy of three core operational components — ensuring speed without sacrificing merchant control or brand safety.
          </p>

          {/* 3 Pillars Badge Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #303030',
              padding: '10px 18px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffffff'
            }}>
              <Zap size={16} style={{ color: 'var(--xora-green, #00a878)' }} />
              <span>1. Automation</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #303030',
              padding: '10px 18px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffffff'
            }}>
              <Sparkles size={16} style={{ color: '#0284c7' }} />
              <span>2. Generative AI</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #303030',
              padding: '10px 18px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffffff'
            }}>
              <UserCheck size={16} style={{ color: '#d97706' }} />
              <span>3. Human Judgment</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
