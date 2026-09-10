import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  RefreshCw, 
  Film, 
  CheckCircle2, 
  Clock, 
  Video, 
  ArrowRight,
  AlertTriangle,
  XCircle,
  Search,
  AlertCircle,
  RotateCcw,
  Ban
} from 'lucide-react';
import type { RenderJob } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';

interface RenderingViewProps {
  renderJobs: RenderJob[];
  onRetryJob: (jobId: string) => void;
  onCancelJob: (jobId: string) => void;
  onNavigateToVideos: () => void;
}

export const RenderingView: React.FC<RenderingViewProps> = ({
  renderJobs,
  onRetryJob,
  onCancelJob,
  onNavigateToVideos
}) => {
  // Filter & Search States
  const [activeFilter, setActiveFilter] = useState<'all' | 'rendering' | 'queued' | 'completed' | 'failed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Modal Confirmation States
  const [jobToCancel, setJobToCancel] = useState<RenderJob | null>(null);
  const [jobToRetry, setJobToRetry] = useState<RenderJob | null>(null);

  // Simulated Error State Toggle (to satisfy error state requirement)
  const [isSimulatedError, setIsSimulatedError] = useState(false);

  // Calculate live summary statistics
  const totalCount = renderJobs.length;
  const completedCount = renderJobs.filter((j) => j.status === 'completed').length;
  const renderingCount = renderJobs.filter((j) => j.status === 'rendering' || j.status === 'stitching').length;
  const queuedCount = renderJobs.filter((j) => j.status === 'queued').length;
  const failedCount = renderJobs.filter((j) => j.status === 'failed').length;
  const cancelledCount = renderJobs.filter((j) => j.status === 'cancelled').length;

  // Overall percentage calculation
  const overallPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isAllComplete = totalCount > 0 && completedCount === totalCount;

  // Filtered jobs list
  const filteredJobs = useMemo(() => {
    return renderJobs.filter((job) => {
      // Filter by status tab
      if (activeFilter === 'rendering' && job.status !== 'rendering' && job.status !== 'stitching') return false;
      if (activeFilter === 'queued' && job.status !== 'queued') return false;
      if (activeFilter === 'completed' && job.status !== 'completed') return false;
      if (activeFilter === 'failed' && job.status !== 'failed') return false;
      if (activeFilter === 'cancelled' && job.status !== 'cancelled') return false;

      // Filter by search query (Product or Angle)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = job.productTitle.toLowerCase().includes(query);
        const angleMatch = job.angleName.toLowerCase().includes(query);
        const idMatch = job.id.toLowerCase().includes(query);
        return titleMatch || angleMatch || idMatch;
      }

      return true;
    });
  }, [renderJobs, activeFilter, searchQuery]);

  // Handlers for Modals
  const confirmCancel = () => {
    if (jobToCancel) {
      onCancelJob(jobToCancel.id);
      setJobToCancel(null);
    }
  };

  const confirmRetry = () => {
    if (jobToRetry) {
      onRetryJob(jobToRetry.id);
      setJobToRetry(null);
    }
  };

  // If Simulated System Error is active
  if (isSimulatedError) {
    return (
      <div className="rendering-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Rendering</h1>
            <p className="page-subtitle">Monitor video generation jobs and rendering progress.</p>
          </div>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setIsSimulatedError(false)}
          >
            <RotateCcw size={14} /> Clear Error State
          </button>
        </div>

        <div className="xora-card" style={{ padding: '48px 24px', textAlign: 'center', margin: '40px auto', maxWidth: '600px' }}>
          <AlertCircle size={48} style={{ color: 'var(--xora-critical)', margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--xora-text-primary)' }}>
            Unable to load rendering jobs. Please try again.
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--xora-text-secondary)', marginBottom: '24px' }}>
            We encountered a connection issue fetching the Zvid GPU cluster state. Your render jobs remain running safely.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => setIsSimulatedError(false)}>
              <RotateCcw size={16} /> Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rendering-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Rendering</h1>
          <p className="page-subtitle">Monitor video generation jobs and rendering progress.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setIsSimulatedError(true)}
            title="Simulate load error state"
          >
            <AlertTriangle size={14} style={{ color: 'var(--xora-warning-text)' }} /> Test Error View
          </button>
          <button className="btn btn-primary" onClick={onNavigateToVideos}>
            <Video size={16} /> Open Video Library
          </button>
        </div>
      </div>

      {/* SUMMARY STATS & OVERALL PROGRESS BANNER */}
      <div className="rendering-summary-section" style={{ marginBottom: '24px' }}>
        {/* Metric KPI Grid */}
        <div className="rendering-metrics-grid">
          <div className="kpi-card">
            <div className="kpi-header">
              <span>Total Videos</span>
              <Film size={18} style={{ color: 'var(--xora-primary)' }} />
            </div>
            <div className="kpi-value">{totalCount}</div>
            <div className="kpi-footer">
              <span>Configured Zvid batch</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span>Completed</span>
              <CheckCircle2 size={18} style={{ color: 'var(--xora-success)' }} />
            </div>
            <div className="kpi-value" style={{ color: 'var(--xora-success)' }}>{completedCount}</div>
            <div className="kpi-footer">
              <span className="kpi-trend-up">{overallPercentage}% rendered</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span>Rendering</span>
              <RefreshCw size={18} className={renderingCount > 0 ? 'spin' : ''} style={{ color: 'var(--xora-info)' }} />
            </div>
            <div className="kpi-value" style={{ color: 'var(--xora-info)' }}>{renderingCount}</div>
            <div className="kpi-footer">
              <span>Active GPU Nodes</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span>Queued</span>
              <Clock size={18} style={{ color: 'var(--xora-warning-text)' }} />
            </div>
            <div className="kpi-value">{queuedCount}</div>
            <div className="kpi-footer">
              <span>Pending cluster slot</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span>Failed</span>
              <XCircle size={18} style={{ color: failedCount > 0 ? 'var(--xora-critical)' : 'var(--xora-text-muted)' }} />
            </div>
            <div className="kpi-value" style={{ color: failedCount > 0 ? 'var(--xora-critical)' : 'var(--xora-text-primary)' }}>
              {failedCount}
            </div>
            <div className="kpi-footer">
              <span style={{ color: failedCount > 0 ? 'var(--xora-critical)' : 'var(--xora-text-muted)' }}>
                {failedCount > 0 ? 'Requires attention' : 'No errors'}
              </span>
            </div>
          </div>
        </div>

        {/* Prominent Overall Progress Card */}
        <div className="xora-card overall-progress-card" style={{ marginTop: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu size={20} style={{ color: 'var(--xora-primary)' }} />
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                  Batch Progress
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--xora-text-secondary)', fontWeight: 600 }}>
                  {completedCount} of {totalCount} videos rendered.
                </p>
              </div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--xora-primary)' }}>
              {overallPercentage}%
            </div>
          </div>

          {/* Clean, Non-Exaggerated Progress Bar */}
          <div className="progress-bar-track" style={{ height: '12px', borderRadius: '6px', backgroundColor: 'var(--xora-border-subtle)', overflow: 'hidden' }}>
            <div 
              className="progress-bar-fill"
              style={{
                width: `${overallPercentage}%`,
                height: '100%',
                backgroundColor: 'var(--xora-primary)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* SUCCESS BANNER WHEN COMPLETE */}
        {isAllComplete && (
          <div className="success-completion-banner" style={{
            marginTop: '16px',
            backgroundColor: 'var(--xora-success-light)',
            border: '1px solid var(--xora-primary-border)',
            borderRadius: 'var(--radius-card)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircle2 size={24} style={{ color: 'var(--xora-success)' }} />
              <div>
                <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--xora-text-primary)' }}>
                  Rendering complete — {totalCount} videos ready.
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>
                  All high-definition MP4 vertical creatives are synced and ready in your Video Library.
                </p>
              </div>
            </div>
            <button className="btn btn-primary" onClick={onNavigateToVideos}>
              Open Video Library <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* FILTER TABS & SEARCH BAR */}
      <div className="xora-card" style={{ marginBottom: '24px' }}>
        <div className="rendering-controls-bar" style={{
          padding: '16px var(--space-5)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--xora-border-subtle)'
        }}>
          {/* Status Filter Tabs */}
          <div className="filter-tabs" style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
            <button 
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All ({totalCount})
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'rendering' ? 'active' : ''}`}
              onClick={() => setActiveFilter('rendering')}
            >
              Rendering ({renderingCount})
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'queued' ? 'active' : ''}`}
              onClick={() => setActiveFilter('queued')}
            >
              Queued ({queuedCount})
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveFilter('completed')}
            >
              Completed ({completedCount})
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'failed' ? 'active' : ''}`}
              onClick={() => setActiveFilter('failed')}
            >
              Failed ({failedCount})
            </button>
            {cancelledCount > 0 && (
              <button 
                className={`filter-tab ${activeFilter === 'cancelled' ? 'active' : ''}`}
                onClick={() => setActiveFilter('cancelled')}
              >
                Cancelled ({cancelledCount})
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="search-input-wrapper" style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--xora-text-muted)' }} />
            <input 
              type="text" 
              className="xora-input" 
              placeholder="Search product or angle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '32px', fontSize: '13px' }}
            />
          </div>
        </div>

        {/* DESKTOP JOB TABLE VIEW */}
        <div className="desktop-table-wrapper table-container" style={{ border: 'none', borderRadius: 0 }}>
          {filteredJobs.length === 0 ? (
            /* EMPTY STATE */
            <div className="rendering-empty-state" style={{ padding: '48px 20px', textAlign: 'center' }}>
              <Film size={36} style={{ color: 'var(--xora-text-muted)', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--xora-text-primary)', marginBottom: '4px' }}>
                No active rendering jobs.
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--xora-text-secondary)', maxWidth: '420px', margin: '0 auto' }}>
                Approved creatives will appear here once rendering starts.
              </p>
            </div>
          ) : (
            <table className="xora-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Angle</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Started</th>
                  <th>Completed</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => {
                  const isRendering = job.status === 'rendering' || job.status === 'stitching';
                  const isFailed = job.status === 'failed';
                  const isCompleted = job.status === 'completed';
                  const isQueued = job.status === 'queued';
                  const isCancelled = job.status === 'cancelled';

                  return (
                    <tr key={job.id} className={isFailed ? 'failed-job-row' : ''}>
                      {/* Product Column */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img 
                            src={job.productImage} 
                            alt={job.productTitle} 
                            style={{ 
                              width: '42px', 
                              height: '42px', 
                              borderRadius: '6px', 
                              objectFit: 'cover',
                              border: '1px solid var(--xora-border-subtle)',
                              flexShrink: 0
                            }} 
                          />
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--xora-text-primary)', fontSize: '13.5px' }}>
                              {job.productTitle}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--xora-text-muted)' }}>
                              ID: <code>{job.id}</code>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Angle Column */}
                      <td>
                        <span style={{ fontSize: '13px', fontWeight: 500 }}>{job.angleName}</span>
                      </td>

                      {/* Status Column */}
                      <td>
                        <StatusBadge status={job.status} />
                      </td>

                      {/* Progress Column */}
                      <td style={{ minWidth: '220px' }}>
                        {isFailed ? (
                          /* FAILED SPEC: Display "Rendering failed — [error reason]" explicitly */
                          <div className="failed-reason-box" style={{
                            backgroundColor: 'var(--xora-critical-light)',
                            border: '1px solid #F5C2C0',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            color: 'var(--xora-critical)',
                            fontSize: '12px',
                            fontWeight: 500,
                            lineHeight: 1.3
                          }}>
                            Rendering failed — {job.errorReason || 'Pipeline error encountered.'}
                          </div>
                        ) : (
                          /* RENDERING / QUEUED / COMPLETED Progress row */
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                              <span style={{ fontWeight: 600, color: isCompleted ? 'var(--xora-success)' : 'var(--xora-text-secondary)' }}>
                                {job.currentStage}
                              </span>
                              <span style={{ fontWeight: 700 }}>{job.progress}%</span>
                            </div>
                            <div style={{ height: '6px', backgroundColor: 'var(--xora-border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div 
                                style={{
                                  width: `${job.progress}%`,
                                  height: '100%',
                                  backgroundColor: isCompleted ? 'var(--xora-success)' : isCancelled ? 'var(--xora-text-muted)' : 'var(--xora-primary)',
                                  transition: 'width 0.3s ease'
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Started Column */}
                      <td style={{ whiteSpace: 'nowrap', fontSize: '12px', color: 'var(--xora-text-secondary)' }}>
                        {job.startedAt || job.createdAt || '-'}
                      </td>

                      {/* Completed Column */}
                      <td style={{ whiteSpace: 'nowrap', fontSize: '12px', color: 'var(--xora-text-secondary)' }}>
                        {job.completedAt || (isCompleted ? 'Just now' : '-')}
                      </td>

                      {/* Action Column */}
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        {isFailed && (
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => setJobToRetry(job)}
                            style={{ color: 'var(--xora-critical)', borderColor: 'var(--xora-critical)' }}
                          >
                            <RotateCcw size={13} /> Retry
                          </button>
                        )}

                        {(isRendering || isQueued) && (
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => setJobToCancel(job)}
                            style={{ color: 'var(--xora-text-secondary)' }}
                          >
                            <Ban size={13} /> Cancel
                          </button>
                        )}

                        {isCompleted && (
                          <button 
                            className="btn btn-tertiary btn-sm"
                            onClick={onNavigateToVideos}
                          >
                            View <ArrowRight size={13} />
                          </button>
                        )}

                        {isCancelled && (
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => setJobToRetry(job)}
                          >
                            <RotateCcw size={13} /> Re-queue
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* MOBILE STACKED CARDS VIEW (< 768px) */}
        <div className="mobile-jobs-stack">
          {filteredJobs.length === 0 ? (
            <div className="rendering-empty-state" style={{ padding: '36px 16px', textAlign: 'center' }}>
              <Film size={32} style={{ color: 'var(--xora-text-muted)', marginBottom: '8px' }} />
              <h3 style={{ fontSize: '15px', fontWeight: 600 }}>No active rendering jobs.</h3>
              <p style={{ fontSize: '12px', color: 'var(--xora-text-secondary)' }}>Approved creatives will appear here once rendering starts.</p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isRendering = job.status === 'rendering' || job.status === 'stitching';
              const isFailed = job.status === 'failed';
              const isCompleted = job.status === 'completed';
              const isQueued = job.status === 'queued';
              const isCancelled = job.status === 'cancelled';

              return (
                <div key={job.id} className={`mobile-job-card ${isFailed ? 'failed-card' : ''}`}>
                  <div className="mobile-job-card-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={job.productImage} alt={job.productTitle} className="mobile-job-thumb" />
                      <div>
                        <div className="mobile-job-title">{job.productTitle}</div>
                        <div className="mobile-job-angle">Angle: {job.angleName}</div>
                      </div>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>

                  <div className="mobile-job-body">
                    {isFailed ? (
                      <div className="failed-reason-box" style={{
                        backgroundColor: 'var(--xora-critical-light)',
                        border: '1px solid #F5C2C0',
                        borderRadius: '6px',
                        padding: '8px 10px',
                        color: 'var(--xora-critical)',
                        fontSize: '12px',
                        fontWeight: 500,
                        marginBottom: '10px'
                      }}>
                        Rendering failed — {job.errorReason || 'Pipeline error encountered.'}
                      </div>
                    ) : (
                      <div style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600 }}>{job.currentStage}</span>
                          <span style={{ fontWeight: 700 }}>{job.progress}%</span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: 'var(--xora-border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div 
                            style={{
                              width: `${job.progress}%`,
                              height: '100%',
                              backgroundColor: isCompleted ? 'var(--xora-success)' : isCancelled ? 'var(--xora-text-muted)' : 'var(--xora-primary)'
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="mobile-job-timestamps">
                      <span>Started: {job.startedAt || job.createdAt || '-'}</span>
                      <span>Completed: {job.completedAt || (isCompleted ? 'Just now' : '-')}</span>
                    </div>
                  </div>

                  <div className="mobile-job-footer">
                    {isFailed && (
                      <button className="btn btn-secondary btn-sm" style={{ width: '100%', color: 'var(--xora-critical)' }} onClick={() => setJobToRetry(job)}>
                        <RotateCcw size={13} /> Retry Job
                      </button>
                    )}
                    {(isRendering || isQueued) && (
                      <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={() => setJobToCancel(job)}>
                        <Ban size={13} /> Cancel Job
                      </button>
                    )}
                    {isCompleted && (
                      <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={onNavigateToVideos}>
                        Open Video Library <ArrowRight size={13} />
                      </button>
                    )}
                    {isCancelled && (
                      <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={() => setJobToRetry(job)}>
                        <RotateCcw size={13} /> Re-queue Job
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* CANCELLATION CONFIRMATION MODAL */}
      {jobToCancel && (
        <div className="modal-overlay" onClick={() => setJobToCancel(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={20} style={{ color: 'var(--xora-warning-text)' }} />
                <h3 className="modal-title">Confirm Cancellation</h3>
              </div>
              <button className="icon-btn" onClick={() => setJobToCancel(null)}>
                <XCircle size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)' }}>
              Are you sure you want to cancel rendering for <strong>{jobToCancel.productTitle}</strong> ({jobToCancel.angleName})?
              <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--xora-text-muted)' }}>
                This will halt GPU scene canvas rendering and release cluster allocation.
              </p>
            </div>
            <div className="modal-footer" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setJobToCancel(null)}>
                Keep Rendering
              </button>
              <button className="btn btn-destructive" onClick={confirmCancel}>
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RETRY CONFIRMATION MODAL (WITH COST IMPLICATIONS) */}
      {jobToRetry && (
        <div className="modal-overlay" onClick={() => setJobToRetry(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RotateCcw size={20} style={{ color: 'var(--xora-primary)' }} />
                <h3 className="modal-title">Retry Rendering Job</h3>
              </div>
              <button className="icon-btn" onClick={() => setJobToRetry(null)}>
                <XCircle size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ fontSize: '13.5px', color: 'var(--xora-text-secondary)' }}>
              Retry video rendering for <strong>{jobToRetry.productTitle}</strong>?
              <div style={{
                marginTop: '12px',
                padding: '10px 12px',
                backgroundColor: 'var(--xora-primary-light)',
                border: '1px solid var(--xora-primary-border)',
                borderRadius: '6px',
                fontSize: '12px',
                color: 'var(--xora-primary)'
              }}>
                <strong>Cost Note:</strong> Retrying re-allocates a Zvid GPU node slot. Standard credit deduction ({jobToRetry.creditsUsed || 15} credits) applies only on successful completion.
              </div>
            </div>
            <div className="modal-footer" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setJobToRetry(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={confirmRetry}>
                Confirm & Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
