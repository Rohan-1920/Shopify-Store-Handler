import React, { useState } from 'react';
import { 
  X, 
  Coins, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle 
} from 'lucide-react';
import type { CreativeDraft, CreditBalance } from '../../types';

interface CreditQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  draftsToRender: CreativeDraft[];
  creditBalance: CreditBalance;
  onConfirmRender: (drafts: CreativeDraft[]) => void;
}

export const CreditQuoteModal: React.FC<CreditQuoteModalProps> = ({
  isOpen,
  onClose,
  draftsToRender,
  creditBalance,
  onConfirmRender
}) => {
  const [resolution, setResolution] = useState('1080x1920');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalDuration = draftsToRender.reduce((acc, d) => acc + d.estimatedDuration, 0);
  const totalCreditsNeeded = totalDuration * creditBalance.costPerSecond;
  const hasDiscountWarnings = draftsToRender.some(d => d.hasDiscountClaim);
  const remainingCredits = creditBalance.available - totalCreditsNeeded;
  const canAfford = remainingCredits >= 0;

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmRender(draftsToRender);
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '16px' }}>
            <Coins size={20} style={{ color: 'var(--xora-primary)' }} />
            Rendering Cost & Credit Quote Approval
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <p style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)', marginBottom: '16px' }}>
            Review credit expenditure quote before dispatching creative drafts to the <strong>Zvid Rendering Pipeline</strong>.
          </p>

          {/* Draft Items List */}
          <div style={{ 
            border: '1px solid var(--xora-border)', 
            borderRadius: 'var(--radius-md)', 
            maxHeight: '180px', 
            overflowY: 'auto',
            marginBottom: '16px' 
          }}>
            {draftsToRender.map((draft) => (
              <div 
                key={draft.id} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderBottom: '1px solid var(--xora-border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src={draft.productImage} 
                    alt={draft.productTitle} 
                    style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }} 
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>{draft.productTitle}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--xora-text-secondary)' }}>
                      Angle: <strong>{draft.angleName}</strong> ({draft.estimatedDuration}s)
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--xora-primary)' }}>
                    {draft.estimatedDuration * creditBalance.costPerSecond} Credits
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--xora-text-muted)' }}>
                    ${(draft.estimatedDuration * 0.01).toFixed(2)} est.
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Warnings Banner */}
          {hasDiscountWarnings && (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              backgroundColor: 'var(--xora-warning-light)',
              border: '1px solid #FFE082',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              marginBottom: '16px',
              fontSize: '12.5px',
              color: '#8A6100'
            }}>
              <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Shopify Offer Verification Notice:</strong> One or more selected drafts contain discount claims. Ensure the corresponding promo code is active in your Shopify Admin before rendering.
              </div>
            </div>
          )}

          {/* Render Config */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Render Quality & Format</label>
              <select 
                className="xora-select"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
              >
                <option value="1080x1920">1080x1920 (9:16 Vertical / Reels)</option>
                <option value="1080x1080">1080x1080 (1:1 Square Feed)</option>
                <option value="1920x1080">1920x1080 (16:9 Landscape)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Zvid Audio Synthesis</label>
              <select className="xora-select" defaultValue="neural_voice">
                <option value="neural_voice">Neural AI Voiceover (High Clarity)</option>
                <option value="upbeat_music">Background Music Only</option>
              </select>
            </div>
          </div>

          {/* Cost Quote Summary Box */}
          <div style={{
            backgroundColor: 'var(--xora-bg-app)',
            border: '1px solid var(--xora-border)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
              <span style={{ color: 'var(--xora-text-secondary)' }}>Total Videos to Render:</span>
              <span style={{ fontWeight: 600 }}>{draftsToRender.length} video(s)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
              <span style={{ color: 'var(--xora-text-secondary)' }}>Total Rendering Duration:</span>
              <span style={{ fontWeight: 600 }}>{totalDuration} seconds</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
              <span style={{ color: 'var(--xora-text-secondary)' }}>Current Available Balance:</span>
              <span style={{ fontWeight: 600 }}>{creditBalance.available.toLocaleString()} credits</span>
            </div>
            <div style={{ 
              height: '1px', 
              backgroundColor: 'var(--xora-border)', 
              margin: '8px 0' 
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700 }}>
              <span style={{ color: 'var(--xora-text-primary)' }}>Total Quote Cost:</span>
              <span style={{ color: 'var(--xora-primary)' }}>{totalCreditsNeeded} Credits (${(totalCreditsNeeded * 0.01).toFixed(2)})</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '4px' }}>
              <span style={{ color: 'var(--xora-text-muted)' }}>Balance Remaining After Render:</span>
              <span style={{ fontWeight: 600, color: canAfford ? 'var(--xora-text-secondary)' : 'var(--xora-critical)' }}>
                {remainingCredits.toLocaleString()} credits
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleConfirm}
            disabled={!canAfford || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Sparkles size={16} className="spin" />
                Dispatching to Zvid...
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                Confirm Quote & Dispatch Rendering ({totalCreditsNeeded} Credits)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
