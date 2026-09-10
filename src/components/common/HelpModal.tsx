import React from 'react';
import { 
  X, 
  HelpCircle, 
  Sparkles, 
  ShoppingBag,
  Wand2,
  Cpu,
  Video
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: 'var(--radius-btn)', 
              backgroundColor: 'var(--xora-primary-light)', 
              color: 'var(--xora-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HelpCircle size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--xora-text-primary)' }}>
                XORA Help & Support Center
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>
                Guides, workflow documentation, and keyboard shortcuts
              </p>
            </div>
          </div>
          <button 
            className="icon-btn" 
            onClick={onClose}
            style={{ color: 'var(--xora-text-secondary)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {/* Workflow Quick Guides */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--xora-text-primary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Merchant Workflow Guides
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="xora-card" style={{ marginBottom: 0, padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '13px', color: 'var(--xora-text-primary)', marginBottom: '4px' }}>
                  <ShoppingBag size={15} style={{ color: 'var(--xora-primary)' }} />
                  1. Sync Catalog
                </div>
                <p style={{ fontSize: '12px', color: 'var(--xora-text-secondary)', lineHeight: 1.4 }}>
                  Connect Shopify store & sync product metadata and high-res imagery into XORA matrix.
                </p>
              </div>

              <div className="xora-card" style={{ marginBottom: 0, padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '13px', color: 'var(--xora-text-primary)', marginBottom: '4px' }}>
                  <Wand2 size={15} style={{ color: 'var(--xora-primary)' }} />
                  2. 3-Angle AI Drafts
                </div>
                <p style={{ fontSize: '12px', color: 'var(--xora-text-secondary)', lineHeight: 1.4 }}>
                  Generate benefit, social proof, and urgency scripts with claim safety checks.
                </p>
              </div>

              <div className="xora-card" style={{ marginBottom: 0, padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '13px', color: 'var(--xora-text-primary)', marginBottom: '4px' }}>
                  <Cpu size={15} style={{ color: 'var(--xora-primary)' }} />
                  3. Approve & Render
                </div>
                <p style={{ fontSize: '12px', color: 'var(--xora-text-secondary)', lineHeight: 1.4 }}>
                  Review credit quote ($0.15/sec), approve scripts, and dispatch to Zvid GPU engine.
                </p>
              </div>

              <div className="xora-card" style={{ marginBottom: 0, padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '13px', color: 'var(--xora-text-primary)', marginBottom: '4px' }}>
                  <Video size={15} style={{ color: 'var(--xora-primary)' }} />
                  4. Push to Shopify
                </div>
                <p style={{ fontSize: '12px', color: 'var(--xora-text-secondary)', lineHeight: 1.4 }}>
                  Preview rendered 1080x1920 MP4 videos and push directly to store product media.
                </p>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--xora-text-primary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Keyboard Shortcuts
            </h4>
            <div style={{ backgroundColor: 'var(--xora-bg-app)', borderRadius: 'var(--radius-md)', padding: '12px', border: '1px solid var(--xora-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--xora-border-subtle)' }}>
                <span style={{ fontSize: '13px', color: 'var(--xora-text-primary)' }}>Open Global Search Overlay</span>
                <kbd className="shortcut-kbd" style={{ backgroundColor: 'var(--xora-surface)', color: 'var(--xora-text-primary)', border: '1px solid var(--xora-border)' }}>Cmd + K</kbd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--xora-border-subtle)' }}>
                <span style={{ fontSize: '13px', color: 'var(--xora-text-primary)' }}>Close Active Modal / Drawer</span>
                <kbd className="shortcut-kbd" style={{ backgroundColor: 'var(--xora-surface)', color: 'var(--xora-text-primary)', border: '1px solid var(--xora-border)' }}>Esc</kbd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
                <span style={{ fontSize: '13px', color: 'var(--xora-text-primary)' }}>Trigger Catalog Re-Sync</span>
                <kbd className="shortcut-kbd" style={{ backgroundColor: 'var(--xora-surface)', color: 'var(--xora-text-primary)', border: '1px solid var(--xora-border)' }}>Shift + S</kbd>
              </div>
            </div>
          </div>

          {/* External Support Link */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '12px 16px', 
            backgroundColor: 'var(--xora-primary-light)', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--xora-primary-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={18} style={{ color: 'var(--xora-primary)' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--xora-text-primary)' }}>Need custom Zvid templates?</div>
                <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>Our creative engineering team assists with enterprise brand guidelines.</div>
              </div>
            </div>
            <a 
              href="mailto:support@xora.ai" 
              className="btn btn-primary btn-sm"
              style={{ textDecoration: 'none' }}
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
