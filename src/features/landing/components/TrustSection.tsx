import React from 'react';
import { ShieldCheck, Edit3, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section className="paper-canvas" style={{
      borderBottom: '1px solid var(--xora-border, #e4e7e5)',
      padding: '88px 24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '56px',
          alignItems: 'center'
        }}>
          {/* Left Text */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--xora-green, #00a878)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>
              Human-in-the-Loop Architecture
            </div>
            <h2 className="font-bebas" style={{ fontSize: '42px', color: '#161817', margin: '0 0 20px 0', lineHeight: 1.1 }}>
              AI CREATES THE DRAFT. YOU MAKE THE DECISION.
            </h2>
            <p style={{ fontSize: '16.5px', color: '#5f6361', lineHeight: 1.6, marginBottom: '28px' }}>
              XORA is strictly engineered to prevent unverified AI content from going directly to render or publishing. Every marketing creative begins as an editable draft. Potentially unsupported claims (such as medical, financial, or discount guarantees) trigger automatic claim safety warnings for merchant review.
            </p>

            {/* Guardrails Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ padding: '4px', backgroundColor: 'rgba(0, 168, 120, 0.10)', color: 'var(--xora-green, #00a878)', borderRadius: '50%', marginTop: '2px' }}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14.5px', color: '#161817' }}>Mandatory Merchant Approval Checkpoint</div>
                  <div style={{ fontSize: '13.5px', color: '#5f6361' }}>Rendering cannot be triggered without explicit human sign-off.</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ padding: '4px', backgroundColor: 'rgba(0, 168, 120, 0.10)', color: 'var(--xora-green, #00a878)', borderRadius: '50%', marginTop: '2px' }}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14.5px', color: '#161817' }}>Automatic Claim Safety Inspection</div>
                  <div style={{ fontSize: '13.5px', color: '#5f6361' }}>Highlights sensitive marketing statements before approval.</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ padding: '4px', backgroundColor: 'rgba(0, 168, 120, 0.10)', color: 'var(--xora-green, #00a878)', borderRadius: '50%', marginTop: '2px' }}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14.5px', color: '#161817' }}>Transparent Cost & Credit Quote</div>
                  <div style={{ fontSize: '13.5px', color: '#5f6361' }}>Exact credit cost disclosed before rendering begins.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div style={{
            backgroundColor: '#0c0d0e',
            border: '1px solid #303030',
            borderRadius: '16px',
            padding: '32px',
            color: '#ffffff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #262626' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} style={{ color: 'var(--xora-green, #00a878)' }} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>Operational Safety Pipeline</span>
              </div>
              <span style={{ fontSize: '11px', color: '#8e9390', fontFamily: 'monospace' }}>STAGE 04 / 06</span>
            </div>

            {/* Stepper Node Visual */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', backgroundColor: '#1a1a1a', borderRadius: '8px', border: '1px solid #303030' }}>
                <div style={{ padding: '6px', backgroundColor: 'rgba(2, 132, 199, 0.15)', color: '#0284c7', borderRadius: '6px' }}>
                  <Edit3 size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#ffffff' }}>AI Generated Draft</div>
                  <div style={{ fontSize: '11.5px', color: '#8e9390' }}>Hook & Body Copy Initialized</div>
                </div>
                <span style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: 600 }}>DRAFT</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', backgroundColor: '#1a1a1a', borderRadius: '8px', border: '1px solid rgba(255, 196, 83, 0.3)' }}>
                <div style={{ padding: '6px', backgroundColor: 'rgba(255, 196, 83, 0.15)', color: '#ffc453', borderRadius: '6px' }}>
                  <AlertTriangle size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#ffffff' }}>Human Claim Review</div>
                  <div style={{ fontSize: '11.5px', color: '#ffc453' }}>Verified Discount Claim</div>
                </div>
                <span style={{ fontSize: '11.5px', color: '#ffc453', fontWeight: 600 }}>CHECK</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', backgroundColor: 'rgba(0, 168, 120, 0.12)', borderRadius: '8px', border: '1px solid var(--xora-green-border, rgba(0, 168, 120, 0.3))' }}>
                <div style={{ padding: '6px', backgroundColor: 'var(--xora-green, #00a878)', color: '#ffffff', borderRadius: '6px' }}>
                  <Lock size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#ffffff' }}>Human Approval & Credit Quote</div>
                  <div style={{ fontSize: '11.5px', color: '#00a878' }}>36 Credits Confirmed</div>
                </div>
                <span style={{ fontSize: '11.5px', color: '#00a878', fontWeight: 600 }}>APPROVED</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
