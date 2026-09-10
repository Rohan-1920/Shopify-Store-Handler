import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Edit3, 
  Check, 
  Cpu, 
  Film, 
  Video, 
  ExternalLink, 
  AlertCircle, 
  Sparkles, 
  Image,
  XCircle,
  HelpCircle
} from 'lucide-react';

export type StatusType = 
  | 'synced'
  | 'pending'
  | 'syncing'
  | 'draft'
  | 'approved'
  | 'rejected'
  | 'queued'
  | 'rendering'
  | 'stitching'
  | 'completed'
  | 'ready'
  | 'pushed_to_shopify'
  | 'failed'
  | 'eligible'
  | 'ineligible'
  | 'needs_images'
  | 'error'
  | 'unsupported_category'
  | 'not_generated'
  | 'needs_review'
  | 'cancelled';

interface StatusBadgeProps {
  status: StatusType;
  customText?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, customText }) => {
  // XORA Badge Configurations (High contrast for light application canvas)
  const getConfig = () => {
    switch (status) {
      // 1. Success / Done / Fulfilled (XORA Parrot Green: #00a878 / #007a57)
      case 'synced':
        return {
          label: customText || 'Synced',
          bg: 'var(--xora-success-light, #e6f6f1)',
          border: 'var(--xora-success-border, rgba(0, 168, 120, 0.25))',
          color: '#007a57',
          dotColor: '#00a878',
          dotPulse: false,
          Icon: CheckCircle2
        };
      case 'eligible':
        return {
          label: customText || 'Eligible',
          bg: 'var(--xora-success-light, #e6f6f1)',
          border: 'var(--xora-success-border, rgba(0, 168, 120, 0.25))',
          color: '#007a57',
          dotColor: '#00a878',
          dotPulse: false,
          Icon: Sparkles
        };
      case 'approved':
        return {
          label: customText || 'Approved',
          bg: 'var(--xora-success-light, #e6f6f1)',
          border: 'var(--xora-success-border, rgba(0, 168, 120, 0.25))',
          color: '#007a57',
          dotColor: '#00a878',
          dotPulse: false,
          Icon: Check
        };
      case 'completed':
      case 'ready':
        return {
          label: customText || (status === 'ready' ? 'Ready' : 'Completed'),
          bg: 'var(--xora-success-light, #e6f6f1)',
          border: 'var(--xora-success-border, rgba(0, 168, 120, 0.25))',
          color: '#007a57',
          dotColor: '#00a878',
          dotPulse: false,
          Icon: Video
        };
      case 'pushed_to_shopify':
        return {
          label: customText || 'Pushed to Shopify',
          bg: 'var(--xora-success-light, #e6f6f1)',
          border: 'var(--xora-success-border, rgba(0, 168, 120, 0.25))',
          color: '#007a57',
          dotColor: '#00a878',
          dotPulse: false,
          Icon: ExternalLink
        };

      // 2. Warning / Attention / In Review (Amber / Gold: #8a6100)
      case 'pending':
        return {
          label: customText || 'Pending',
          bg: 'var(--xora-warning-light, #fff8e6)',
          border: 'var(--xora-warning-border, #ffe082)',
          color: '#8a6100',
          dotColor: '#d97706',
          dotPulse: true,
          Icon: Clock
        };
      case 'queued':
        return {
          label: customText || 'Queued',
          bg: 'var(--xora-warning-light, #fff8e6)',
          border: 'var(--xora-warning-border, #ffe082)',
          color: '#8a6100',
          dotColor: '#d97706',
          dotPulse: true,
          Icon: Clock
        };
      case 'needs_review':
        return {
          label: customText || 'Needs Review',
          bg: 'var(--xora-warning-light, #fff8e6)',
          border: 'var(--xora-warning-border, #ffe082)',
          color: '#8a6100',
          dotColor: '#d97706',
          dotPulse: true,
          Icon: AlertCircle
        };
      case 'needs_images':
      case 'unsupported_category':
        return {
          label: customText || (status === 'unsupported_category' ? 'Unsupported Category' : 'Needs Hi-Res Images'),
          bg: 'var(--xora-warning-light, #fff8e6)',
          border: 'var(--xora-warning-border, #ffe082)',
          color: '#8a6100',
          dotColor: '#d97706',
          dotPulse: false,
          Icon: Image
        };

      // 3. Info / Draft / In Progress (Sky Blue: #0284c7)
      case 'draft':
        return {
          label: customText || 'Draft',
          bg: 'var(--xora-info-light, #ebf5fb)',
          border: 'var(--xora-info-border, #b4d4f5)',
          color: '#0284c7',
          dotColor: '#0284c7',
          dotPulse: false,
          Icon: Edit3
        };
      case 'rendering':
        return {
          label: customText || 'Rendering',
          bg: 'var(--xora-info-light, #ebf5fb)',
          border: 'var(--xora-info-border, #b4d4f5)',
          color: '#0284c7',
          dotColor: '#0284c7',
          dotSpin: true,
          Icon: Cpu
        };
      case 'stitching':
        return {
          label: customText || 'Stitching',
          bg: 'var(--xora-info-light, #ebf5fb)',
          border: 'var(--xora-info-border, #b4d4f5)',
          color: '#0284c7',
          dotColor: '#0284c7',
          dotSpin: true,
          Icon: Film
        };
      case 'syncing':
        return {
          label: customText || 'Syncing',
          bg: 'var(--xora-info-light, #ebf5fb)',
          border: 'var(--xora-info-border, #b4d4f5)',
          color: '#0284c7',
          dotColor: '#0284c7',
          dotSpin: true,
          Icon: RefreshCw
        };

      // 4. Critical / Failure / Unfulfilled (Red: #d82c0d)
      case 'failed':
      case 'error':
        return {
          label: customText || 'Failed',
          bg: 'var(--xora-critical-light, #fde8e8)',
          border: 'var(--xora-critical-border, #f5c2c0)',
          color: '#d82c0d',
          dotColor: '#d82c0d',
          dotPulse: false,
          Icon: AlertCircle
        };
      case 'rejected':
        return {
          label: customText || 'Rejected',
          bg: 'var(--xora-critical-light, #fde8e8)',
          border: 'var(--xora-critical-border, #f5c2c0)',
          color: '#d82c0d',
          dotColor: '#d82c0d',
          dotPulse: false,
          Icon: XCircle
        };

      // 5. Neutral Slate (Ineligible, Cancelled, Not Generated)
      case 'ineligible':
      case 'cancelled':
      case 'not_generated':
      default:
        return {
          label: customText || (status === 'ineligible' ? 'Ineligible' : status === 'cancelled' ? 'Cancelled' : status === 'not_generated' ? 'Not Generated' : status),
          bg: 'var(--xora-surface-subtle, #eef0ef)',
          border: 'var(--xora-border, #e4e7e5)',
          color: '#5f6361',
          dotColor: '#7a7f7c',
          dotPulse: false,
          Icon: status === 'ineligible' || status === 'cancelled' ? XCircle : HelpCircle
        };
    }
  };

  const config = getConfig();
  const IconComponent = config.Icon;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '3px 9px',
        borderRadius: '9999px',
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        color: config.color,
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '0.2px',
        whiteSpace: 'nowrap',
        transition: 'all 150ms ease-in-out'
      }}
    >
      {/* Soft status dot */}
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: config.dotColor,
          display: 'inline-block',
          boxShadow: `0 0 6px ${config.dotColor}80`
        }}
        className={`${config.dotPulse ? 'status-dot-pulse' : ''} ${'dotSpin' in config && config.dotSpin ? 'status-spin' : ''}`}
      />

      {/* Semantic Icon */}
      {IconComponent && (
        <IconComponent 
          size={12} 
          style={{ flexShrink: 0 }} 
          className={'dotSpin' in config && config.dotSpin ? 'status-spin' : ''}
        />
      )}

      {/* Text Label */}
      <span>{config.label}</span>
    </span>
  );
};
