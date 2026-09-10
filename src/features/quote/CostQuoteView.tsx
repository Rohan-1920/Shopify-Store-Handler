import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Film, 
  HelpCircle, 
  RefreshCw, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import type { ActiveTab } from '../../types';

interface CostQuoteViewProps {
  creditBalance: number;
  selectedProductsCount?: number;
  anglesPerProductCount?: number;
  onNavigate: (tab: ActiveTab) => void;
  onStartRendering: (count: number, costCredits: number) => void;
}

export const CostQuoteView: React.FC<CostQuoteViewProps> = ({
  creditBalance = 1200,
  selectedProductsCount = 48,
  anglesPerProductCount = 3,
  onNavigate,
  onStartRendering
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toastMessage] = useState<string | null>(null);

  // Calculated numbers
  const totalPlannedVideos = selectedProductsCount * anglesPerProductCount; // 144
  const creditsPerVideo = 3.3333; // 480 credits for 144 videos
  const estimatedCredits = Math.round(totalPlannedVideos * creditsPerVideo); // 480
  const estimatedCostDollars = (estimatedCredits * 0.30).toFixed(2); // $144.00
  const estimatedRemainingBalance = creditBalance - estimatedCredits; // 720
  const isLowBalance = estimatedRemainingBalance < 300 || creditBalance < estimatedCredits;

  // Simulate loading calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirmRendering = () => {
    setShowConfirmModal(false);
    onStartRendering(totalPlannedVideos, estimatedCredits);
    onNavigate('rendering');
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Toast Feedback */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '76px',
          right: '24px',
          zIndex: 250,
          backgroundColor: 'var(--xora-header-bg)',
          color: 'white',
          padding: '10px 16px',
          borderRadius: 'var(--radius-btn)',
          boxShadow: 'var(--shadow-modal)',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'slideIn 0.2s ease'
        }}>
          <CheckCircle2 size={16} style={{ color: '#34d399' }} />
          {toastMessage}
        </div>
      )}

      {/* Header & Back Action */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button 
          className="btn btn-tertiary btn-sm"
          onClick={() => onNavigate('approvals')}
          style={{ paddingLeft: 0 }}
        >
          <ArrowLeft size={16} /> Back to Approvals
        </button>

        <span className="badge badge-success" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={13} /> Financial Transparency Checkpoint
        </span>
      </div>

      <div className="page-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '24px' }}>Cost & Credit Quote</h1>
          <p className="page-subtitle">
            Review video count, credit consumption, and remaining balance before dispatching rendering.
          </p>
        </div>
      </div>

      {/* Error State */}
      {hasError ? (
        <div className="xora-card" style={{ padding: '32px', textAlign: 'center', backgroundColor: 'var(--xora-critical-light)', border: '1px solid var(--xora-critical)' }}>
          <AlertCircle size={40} style={{ color: 'var(--xora-critical)', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '8px' }}>
            Unable to calculate cost estimate. Please try again.
          </h3>
          <p style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)', marginBottom: '20px' }}>
            There was a network timeout connecting to the credit pricing engine.
          </p>
          <button className="btn btn-primary" onClick={() => { setHasError(false); setIsLoading(true); setTimeout(() => setIsLoading(false), 500); }}>
            <RefreshCw size={14} /> Retry Calculation
          </button>
        </div>
      ) : (
        <>
          {/* 1. Rendering Summary Card */}
          <div className="xora-card" style={{ marginBottom: '20px' }}>
            <div className="xora-card-header" style={{ backgroundColor: 'var(--xora-bg-app)', padding: '14px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Film size={18} style={{ color: 'var(--xora-primary)' }} />
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                  Rendering Summary
                </h2>
              </div>
            </div>

            <div className="xora-card-body" style={{ padding: '20px' }}>
              <div className="grid-3" style={{ textAlign: 'center', gap: '16px' }}>
                <div style={{ padding: '14px', backgroundColor: 'var(--xora-surface)', borderRadius: 'var(--radius-input)', border: '1px solid var(--xora-border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--xora-text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                    Products Selected
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                    {isLoading ? <div className="skeleton" style={{ width: '40px', height: '28px', margin: '0 auto' }} /> : selectedProductsCount}
                  </div>
                </div>

                <div style={{ padding: '14px', backgroundColor: 'var(--xora-surface)', borderRadius: 'var(--radius-input)', border: '1px solid var(--xora-border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--xora-text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                    Angles per Product
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                    {isLoading ? <div className="skeleton" style={{ width: '30px', height: '28px', margin: '0 auto' }} /> : anglesPerProductCount}
                  </div>
                </div>

                <div style={{ padding: '14px', backgroundColor: 'var(--xora-primary-light)', borderRadius: 'var(--radius-input)', border: '1px solid var(--xora-primary-border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--xora-primary)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                    Total Planned Videos
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--xora-primary)' }}>
                    {isLoading ? <div className="skeleton" style={{ width: '50px', height: '28px', margin: '0 auto' }} /> : totalPlannedVideos}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Large Credit & Cost Estimate Breakdown */}
          <div className="xora-card" style={{ marginBottom: '20px', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '16px' }}>
              Credit & Cost Quote
            </h3>

            {isLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ padding: '16px', backgroundColor: 'var(--xora-bg-app)', borderRadius: 'var(--radius-panel)', border: '1px solid var(--xora-border)' }}>
                    <div className="skeleton" style={{ width: '120px', height: '14px', marginBottom: '8px' }} />
                    <div className="skeleton" style={{ width: '160px', height: '36px' }} />
                  </div>
                  <div style={{ padding: '16px', backgroundColor: 'var(--xora-bg-app)', borderRadius: 'var(--radius-panel)', border: '1px solid var(--xora-border)' }}>
                    <div className="skeleton" style={{ width: '120px', height: '14px', marginBottom: '8px' }} />
                    <div className="skeleton" style={{ width: '140px', height: '36px' }} />
                  </div>
                </div>
                <div style={{ padding: '16px', backgroundColor: 'var(--xora-surface)', borderRadius: 'var(--radius-panel)', border: '1px solid var(--xora-border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <div className="skeleton" style={{ width: '130px', height: '12px', marginBottom: '6px' }} />
                    <div className="skeleton" style={{ width: '110px', height: '24px' }} />
                  </div>
                  <div>
                    <div className="skeleton" style={{ width: '150px', height: '12px', marginBottom: '6px' }} />
                    <div className="skeleton" style={{ width: '110px', height: '24px' }} />
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {/* Estimated Credits */}
                  <div style={{ padding: '16px', backgroundColor: 'var(--xora-bg-app)', borderRadius: 'var(--radius-panel)', border: '1px solid var(--xora-border)' }}>
                    <span style={{ fontSize: '12px', color: 'var(--xora-text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Estimated Credits Required
                    </span>
                    <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--xora-text-primary)', letterSpacing: '-0.5px' }}>
                      {estimatedCredits.toLocaleString()} <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--xora-text-secondary)' }}>credits</span>
                    </div>
                  </div>

                  {/* Estimated Dollar Value */}
                  <div style={{ padding: '16px', backgroundColor: 'var(--xora-bg-app)', borderRadius: 'var(--radius-panel)', border: '1px solid var(--xora-border)' }}>
                    <span style={{ fontSize: '12px', color: 'var(--xora-text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Estimated Value ($USD)
                    </span>
                    <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--xora-text-primary)', letterSpacing: '-0.5px' }}>
                      ${estimatedCostDollars}
                    </div>
                  </div>
                </div>

                {/* Balance Comparison Bar */}
                <div style={{ padding: '16px', backgroundColor: 'var(--xora-surface)', borderRadius: 'var(--radius-panel)', border: '1px solid var(--xora-border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '11.5px', color: 'var(--xora-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                      Current Credit Balance
                    </span>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                      {creditBalance.toLocaleString()} credits
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '11.5px', color: 'var(--xora-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                      Estimated Remaining Balance
                    </span>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: estimatedRemainingBalance < 0 ? 'var(--xora-critical)' : 'var(--xora-primary)' }}>
                      {estimatedRemainingBalance.toLocaleString()} credits
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Low Balance Warning Alert */}
          {isLowBalance && !isLoading && (
            <div 
              aria-live="polite"
              style={{
                marginBottom: '20px',
                padding: '16px',
                backgroundColor: 'var(--xora-warning-light)',
                border: '1px solid var(--xora-warning)',
                borderRadius: 'var(--radius-panel)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}
            >
              <AlertTriangle size={20} style={{ color: '#8A6100', marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '14px', color: '#8A6100' }}>
                  Your credit balance is running low.
                </strong>
                <p style={{ fontSize: '12.5px', color: 'var(--xora-text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                  After rendering these {totalPlannedVideos} videos, you will have {estimatedRemainingBalance.toLocaleString()} credits remaining. Consider topping up credits in Settings.
                </p>
              </div>
            </div>
          )}

          {/* 4. Calculation Assumptions (Plain Language) */}
          <div className="xora-card" style={{ marginBottom: '24px', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <HelpCircle size={16} style={{ color: 'var(--xora-text-secondary)' }} />
              <h4 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--xora-text-primary)' }}>
                How this estimate is calculated
              </h4>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--xora-text-secondary)', lineHeight: 1.5 }}>
              Estimate is based on the <strong>{selectedProductsCount} selected products</strong>, <strong>{anglesPerProductCount} creative marketing angles per product</strong> (totaling {totalPlannedVideos} video files), rendered in full 1080p HD 9:16 vertical resolution via the Zvid cloud render farm.
            </p>
          </div>

          {/* 5. Primary Action & Secondary Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => onNavigate('approvals')}
            >
              <ArrowLeft size={16} /> Back to Edit
            </button>

            <button 
              className="btn btn-primary btn-lg"
              disabled={isLoading || hasError || estimatedRemainingBalance < 0}
              onClick={() => setShowConfirmModal(true)}
              style={{ padding: '12px 28px', fontSize: '15px' }}
            >
              <Sparkles size={18} /> Approve & Continue to Rendering
            </button>
          </div>
        </>
      )}

      {/* 6. Final Render Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Film size={20} style={{ color: 'var(--xora-primary)' }} />
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                  Confirm Video Rendering Job
                </h3>
              </div>
            </div>

            <div className="modal-body" style={{ padding: '20px' }}>
              <div style={{
                padding: '14px',
                backgroundColor: 'var(--xora-primary-light)',
                borderRadius: 'var(--radius-panel)',
                border: '1px solid var(--xora-primary-border)',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--xora-primary)', marginBottom: '4px' }}>
                  You are about to render {totalPlannedVideos} videos.
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--xora-text-secondary)' }}>
                  Render jobs will be dispatched immediately to the Zvid rendering engine queue.
                </div>
              </div>

              <div style={{ padding: '12px', backgroundColor: 'var(--xora-bg-app)', borderRadius: 'var(--radius-input)', border: '1px solid var(--xora-border)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--xora-text-secondary)' }}>Estimated Credits to deduct:</span>
                  <strong style={{ color: 'var(--xora-text-primary)' }}>{estimatedCredits.toLocaleString()} credits</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--xora-text-secondary)' }}>Estimated Dollar Value:</span>
                  <strong style={{ color: 'var(--xora-text-primary)' }}>${estimatedCostDollars}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--xora-border-subtle)', paddingTop: '8px' }}>
                  <span style={{ color: 'var(--xora-text-secondary)' }}>Remaining Credit Balance:</span>
                  <strong style={{ color: 'var(--xora-primary)' }}>{estimatedRemainingBalance.toLocaleString()} credits</strong>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirmRendering}>
                Confirm & Start Rendering
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
