import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Save, 
  ThumbsUp, 
  ThumbsDown
} from 'lucide-react';
import type { ShopifyProduct } from '../../types';

export interface CreativeDetailModalProps {
  creative: {
    id: string;
    angleType: string;
    angleBadge: string;
    hook: string;
    headline: string;
    body: string;
    cta: string;
    visualDirection: string;
    sceneStructure: string;
    hasClaimWarning: boolean;
    warningText?: string;
    warningAcknowledged: boolean;
  };
  product: ShopifyProduct;
  onClose: () => void;
  onUpdateCreative: (updated: any) => void;
  onApproveCreative: (id: string) => void;
  onRejectCreative: (id: string, reason: string) => void;
}

export const CreativeDetailModal: React.FC<CreativeDetailModalProps> = ({
  creative,
  product,
  onClose,
  onUpdateCreative,
  onApproveCreative,
  onRejectCreative
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [status, setStatus] = useState<'draft' | 'needs_review' | 'approved' | 'rejected'>('needs_review');

  // Editable Form Fields State
  const [hook, setHook] = useState(creative.hook);
  const [headline, setHeadline] = useState(creative.headline);
  const [body, setBody] = useState(creative.body);
  const [cta, setCta] = useState(creative.cta);
  const [visualDirection, setVisualDirection] = useState(creative.visualDirection);
  const [sceneStructure, setSceneStructure] = useState(creative.sceneStructure);
  const [warningAcknowledged, setWarningAcknowledged] = useState(creative.warningAcknowledged);

  // Modals & Toasts
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRejectReason, setSelectedRejectReason] = useState<string>('unsupported_claim');
  const [customRejectNote, setCustomRejectNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Unsaved changes state check
  const [showUnsavedExitModal, setShowUnsavedExitModal] = useState(false);

  const isDirty = 
    hook !== creative.hook ||
    headline !== creative.headline ||
    body !== creative.body ||
    cta !== creative.cta ||
    visualDirection !== creative.visualDirection ||
    sceneStructure !== creative.sceneStructure;

  const handleRequestClose = () => {
    if (isDirty) {
      setShowUnsavedExitModal(true);
    } else {
      onClose();
    }
  };

  // Storyboard Scenes List
  const scenes = [
    {
      id: 1,
      title: 'Scene 1: Hook (0-3s)',
      timeRange: '0:00 - 0:03',
      text: hook,
      visual: visualDirection || 'Macro product zoom with high contrast hook overlay.',
      audio: `Voiceover: "${hook}"`
    },
    {
      id: 2,
      title: 'Scene 2: Product Introduction (3-7s)',
      timeRange: '0:03 - 0:07',
      text: headline,
      visual: `Clear product view of ${product.title} with dynamic feature callouts.`,
      audio: `Background beat swell + voiceover introducing ${product.title}.`
    },
    {
      id: 3,
      title: 'Scene 3: Core Value & Benefit (7-11s)',
      timeRange: '0:07 - 0:11',
      text: body,
      visual: 'Split-screen or motion graphics demonstrating key athletic performance benefit.',
      audio: `Voiceover: "${body.slice(0, 70)}..."`
    },
    {
      id: 4,
      title: 'Scene 4: Call-to-Action & End Card (11-15s)',
      timeRange: '0:11 - 0:15',
      text: cta,
      visual: `Branded end card with ${cta} button animation and Shopify store logo.`,
      audio: `Upbeat audio resolve: "${cta}"`
    }
  ];

  // Playback simulation loop
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 5;
          // Auto-advance scenes based on progress
          if (next >= 75) setActiveSceneIndex(3);
          else if (next >= 45) setActiveSceneIndex(2);
          else if (next >= 20) setActiveSceneIndex(1);
          else setActiveSceneIndex(0);
          return next;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') {
        setActiveSceneIndex((prev) => (prev === 0 ? scenes.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveSceneIndex((prev) => (prev === scenes.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, scenes.length]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const isApproveDisabled = creative.hasClaimWarning && !warningAcknowledged;

  const handleSaveDraft = () => {
    onUpdateCreative({
      ...creative,
      hook,
      headline,
      body,
      cta,
      visualDirection,
      sceneStructure,
      warningAcknowledged
    });
    triggerToast('Creative draft saved.');
  };

  const handleConfirmApproval = () => {
    setShowApproveConfirm(false);
    setStatus('approved');
    onApproveCreative(creative.id);
    triggerToast('Creative approved.');
  };

  const handleConfirmRejection = () => {
    setShowRejectModal(false);
    setStatus('rejected');
    const reasonText = selectedRejectReason === 'other' ? customRejectNote : selectedRejectReason;
    onRejectCreative(creative.id, reasonText);
    triggerToast('Creative rejected.');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Toast Feedback Popup */}
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

      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1040px', width: '94vw', padding: 0, overflow: 'hidden' }}
      >
        {/* Top Header & Breadcrumbs */}
        <div className="modal-header" style={{ padding: '16px 24px', borderBottom: '1px solid var(--xora-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px' }}>
            <span onClick={handleRequestClose} style={{ color: 'var(--xora-text-secondary)', cursor: 'pointer' }}>
              Creative Studio
            </span>
            <span style={{ color: 'var(--xora-text-muted)' }}>/</span>
            <span style={{ color: 'var(--xora-text-secondary)' }}>{product.title}</span>
            <span style={{ color: 'var(--xora-text-muted)' }}>/</span>
            <span style={{ fontWeight: 600, color: 'var(--xora-text-primary)' }}>{creative.angleBadge}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge badge-neutral" style={{ fontWeight: 600 }}>
              {creative.angleBadge}
            </span>
            
            {status === 'approved' && <span className="badge badge-success">Approved</span>}
            {status === 'rejected' && <span className="badge badge-critical">Rejected</span>}
            {status === 'needs_review' && <span className="badge badge-warning">Needs Review</span>}

            <button className="icon-btn" onClick={handleRequestClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: Two-Column Desktop / Single-Column Mobile Workspace */}
        <div className="modal-body" style={{ padding: '24px', maxHeight: '78vh', overflowY: 'auto' }}>
          <div className="creative-modal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {/* LEFT COLUMN: 9:16 Storyboard Video Preview Frame */}
            <div>
              <div style={{
                width: '100%',
                maxWidth: '280px',
                margin: '0 auto 16px auto',
                aspectRatio: '9 / 16',
                borderRadius: 'var(--radius-panel)',
                backgroundColor: 'var(--xora-header-bg)',
                border: '4px solid #333',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-modal)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'white',
                padding: '16px'
              }}>
                {/* Simulated Background Video Texture */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85)), url(${product.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.85,
                  zIndex: 0
                }} />

                {/* Video Header Controls overlay */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span className="badge" style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', border: 'none' }}>
                    9:16 Storyboard
                  </span>
                  <span style={{ fontFamily: 'monospace', opacity: 0.8 }}>
                    {scenes[activeSceneIndex].timeRange}
                  </span>
                </div>

                {/* Active Scene Overlay Content */}
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 8px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, color: 'var(--xora-warning)', display: 'block', marginBottom: '4px' }}>
                    {scenes[activeSceneIndex].title}
                  </span>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'white', lineHeight: 1.3, marginBottom: '8px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                    {scenes[activeSceneIndex].text}
                  </h4>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}>
                    {scenes[activeSceneIndex].visual}
                  </p>
                </div>

                {/* Player Controls & Scrubber */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '2px', marginBottom: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${playbackProgress}%`, height: '100%', backgroundColor: 'var(--xora-primary)', transition: 'width 0.2s linear' }} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                    <button 
                      onClick={() => setActiveSceneIndex((prev) => (prev === 0 ? scenes.length - 1 : prev - 1))}
                      style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                      title="Previous Scene"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--xora-primary)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      title={isPlaying ? 'Pause' : 'Play Preview'}
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                    </button>
                    <button 
                      onClick={() => setActiveSceneIndex((prev) => (prev === scenes.length - 1 ? 0 : prev + 1))}
                      style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                      title="Next Scene"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Storyboard Scene Stepper Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--xora-text-muted)', textTransform: 'uppercase' }}>
                  Storyboard Scene Stepper
                </span>
                {scenes.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setActiveSceneIndex(idx);
                      setPlaybackProgress(idx * 33);
                    }}
                    style={{
                      padding: '8px 10px',
                      fontSize: '12px',
                      textAlign: 'left',
                      borderRadius: 'var(--radius-input)',
                      border: '1px solid ' + (activeSceneIndex === idx ? 'var(--xora-primary)' : 'var(--xora-border)'),
                      backgroundColor: activeSceneIndex === idx ? 'var(--xora-primary-light)' : 'var(--xora-surface)',
                      color: activeSceneIndex === idx ? 'var(--xora-primary)' : 'var(--xora-text-primary)',
                      fontWeight: activeSceneIndex === idx ? 600 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    {sc.title}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Copy Panel & AI Warning Blocker */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Prominent AI Claim Safety Warning System */}
              {creative.hasClaimWarning && (
                <div role="alert" aria-live="assertive" style={{
                  padding: '14px',
                  backgroundColor: 'var(--xora-warning-light)',
                  border: '1px solid var(--xora-warning)',
                  borderRadius: 'var(--radius-panel)',
                  fontSize: '13px',
                  color: '#8A6100'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px', fontWeight: 600 }}>
                    <AlertTriangle size={18} style={{ color: '#8A6100', marginTop: '1px' }} />
                    <div>
                      <div>Review required — Unsupported Claim Detected</div>
                      <div style={{ fontSize: '12px', fontWeight: 400, marginTop: '2px', color: 'var(--xora-text-secondary)' }}>
                        {creative.warningText || 'This claim could not be verified from the Shopify product data.'}
                      </div>
                    </div>
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 600, padding: '6px 10px', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 'var(--radius-input)' }}>
                    <input 
                      type="checkbox"
                      checked={warningAcknowledged}
                      onChange={(e) => setWarningAcknowledged(e.target.checked)}
                    />
                    I acknowledge & verify this claim from Shopify store data
                  </label>
                </div>
              )}

              {/* Editable Fields Section */}
              <div className="xora-card" style={{ padding: '18px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '14px' }}>
                  Creative Copy & Video Script Editor
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--xora-text-primary)', display: 'block', marginBottom: '4px' }}>
                      Hook Line (0-3s)
                    </label>
                    <input 
                      type="text"
                      className="xora-input"
                      value={hook}
                      onChange={(e) => setHook(e.target.value)}
                      style={{ fontSize: '13.5px', width: '100%', fontWeight: 600 }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--xora-text-primary)', display: 'block', marginBottom: '4px' }}>
                      Headline Text
                    </label>
                    <input 
                      type="text"
                      className="xora-input"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      style={{ fontSize: '13px', width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--xora-text-primary)', display: 'block', marginBottom: '4px' }}>
                      Body Copy Script
                    </label>
                    <textarea 
                      className="xora-textarea"
                      rows={3}
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      style={{ fontSize: '13px', width: '100%', lineHeight: 1.5 }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--xora-text-primary)', display: 'block', marginBottom: '4px' }}>
                      Call-to-Action Text
                    </label>
                    <input 
                      type="text"
                      className="xora-input"
                      value={cta}
                      onChange={(e) => setCta(e.target.value)}
                      style={{ fontSize: '13px', width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--xora-text-primary)', display: 'block', marginBottom: '4px' }}>
                      Visual Direction
                    </label>
                    <textarea 
                      className="xora-textarea"
                      rows={2}
                      value={visualDirection}
                      onChange={(e) => setVisualDirection(e.target.value)}
                      style={{ fontSize: '12.5px', width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--xora-text-primary)', display: 'block', marginBottom: '4px' }}>
                      Scene Structure Overview
                    </label>
                    <textarea 
                      className="xora-textarea"
                      rows={2}
                      value={sceneStructure}
                      onChange={(e) => setSceneStructure(e.target.value)}
                      style={{ fontSize: '12px', width: '100%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div style={{
                padding: '16px',
                backgroundColor: 'var(--xora-surface)',
                border: '1px solid var(--xora-border)',
                borderRadius: 'var(--radius-panel)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary" onClick={handleSaveDraft}>
                    <Save size={15} /> Save Draft
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowRejectModal(true)}>
                    <ThumbsDown size={15} /> Reject
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className="btn btn-primary btn-lg"
                    disabled={isApproveDisabled}
                    onClick={() => setShowApproveConfirm(true)}
                    title={isApproveDisabled ? 'Acknowledge warning or edit copy to enable' : 'Approve creative concept'}
                  >
                    <ThumbsUp size={16} /> Approve Creative
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Confirmation Modal */}
      {showApproveConfirm && (
        <div className="modal-overlay" onClick={() => setShowApproveConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', textAlign: 'center' }}>
            <div style={{ padding: '24px 20px' }}>
              <CheckCircle2 size={40} style={{ color: 'var(--xora-primary)', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--xora-text-primary)', marginBottom: '6px' }}>
                Approve Creative Concept?
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)', marginBottom: '20px' }}>
                You are approving 1 creative concept for <strong>{product.title}</strong>. Approved creatives will move to the cost quote & rendering pipeline.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setShowApproveConfirm(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleConfirmApproval}>
                  Confirm Approval
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {showRejectModal && (
        <div className="modal-overlay" onClick={() => setShowRejectModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                Why are you rejecting this creative?
              </h3>
              <button className="icon-btn" onClick={() => setShowRejectModal(false)}><X size={18} /></button>
            </div>

            <div className="modal-body" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {[
                  { id: 'unsupported_claim', label: 'Unsupported claim or unverified discount' },
                  { id: 'incorrect_info', label: 'Incorrect product information or metadata' },
                  { id: 'weak_creative', label: 'Weak creative hook or copy quality' },
                  { id: 'other', label: 'Other custom feedback' }
                ].map(opt => (
                  <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: '1px solid var(--xora-border)', borderRadius: 'var(--radius-input)', cursor: 'pointer', fontSize: '13px' }}>
                    <input 
                      type="radio" 
                      name="rejectReason"
                      value={opt.id}
                      checked={selectedRejectReason === opt.id}
                      onChange={() => setSelectedRejectReason(opt.id)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              {selectedRejectReason === 'other' && (
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--xora-text-muted)', display: 'block', marginBottom: '4px' }}>
                    Provide specific rejection feedback:
                  </label>
                  <textarea 
                    className="xora-textarea"
                    rows={3}
                    placeholder="Describe what needs to be fixed..."
                    value={customRejectNote}
                    onChange={(e) => setCustomRejectNote(e.target.value)}
                    style={{ fontSize: '13px', width: '100%' }}
                  />
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowRejectModal(false)}>
                Cancel
              </button>
              <button className="btn btn-critical" onClick={handleConfirmRejection}>
                Reject & Request Re-draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unsaved Changes Protection Modal */}
      {showUnsavedExitModal && (
        <div className="modal-overlay" onClick={() => setShowUnsavedExitModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                Unsaved changes
              </h3>
              <button className="icon-btn" onClick={() => setShowUnsavedExitModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body" style={{ padding: '20px' }}>
              <p style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)', marginBottom: '16px' }}>
                Your edits to this creative concept haven't been saved yet. Closing will discard your custom changes.
              </p>
            </div>
            <div className="modal-footer" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowUnsavedExitModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-tertiary"
                style={{ color: 'var(--xora-critical)' }}
                onClick={() => {
                  setShowUnsavedExitModal(false);
                  onClose();
                }}
              >
                Discard Edits
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  onUpdateCreative({
                    ...creative,
                    hook,
                    headline,
                    body,
                    cta,
                    visualDirection,
                    sceneStructure
                  });
                  setShowUnsavedExitModal(false);
                  onClose();
                }}
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
