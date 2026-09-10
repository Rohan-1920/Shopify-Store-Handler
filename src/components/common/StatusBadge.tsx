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
  // Shopify Polaris Badge Configurations
  const getConfig = () => {
    switch (status) {
      // 1. Success / Done / Fulfilled (Shopify Polaris Green: #008060 / #00a47c)
      case 'synced':
        return {
          label: customText || 'Synced',
          bg: 'rgba(0, 128, 96, 0.12)',
          border: 'rgba(0, 128, 96, 0.3)',
          color: '#00a47c',
          dotColor: '#00a47c',
          dotPulse: false,
          Icon: CheckCircle2
        };
      case 'eligible':
        return {
          label: customText || 'Eligible',
          bg: 'rgba(0, 128, 96, 0.12)',
          border: 'rgba(0, 128, 96, 0.3)',
          color: '#00a47c',
          dotColor: '#00a47c',
          dotPulse: false,
          Icon: Sparkles
        };
      case 'approved':
        return {
          label: customText || 'Approved',
          bg: 'rgba(0, 128, 96, 0.12)',
          border: 'rgba(0, 128, 96, 0.3)',
          color: '#00a47c',
          dotColor: '#00a47c',
          dotPulse: false,
          Icon: Check
        };
      case 'completed':
      case 'ready':
        return {
          label: customText || (status === 'ready' ? 'Ready' : 'Completed'),
          bg: 'rgba(0, 128, 96, 0.12)',
          border: 'rgba(0, 128, 96, 0.3)',
          color: '#00a47c',
          dotColor: '#00a47c',
          dotPulse: false,
          Icon: Video
        };
      case 'pushed_to_shopify':
        return {
          label: customText || 'Pushed to Shopify',
          bg: 'rgba(0, 128, 96, 0.12)',
          border: 'rgba(0, 128, 96, 0.3)',
          color: '#00a47c',
          dotColor: '#00a47c',
          dotPulse: false,
          Icon: ExternalLink
        };

      // 2. Warning / Attention / In Review (Polaris Amber: #ffc453)
      case 'pending':
        return {
          label: customText || 'Pending',
          bg: 'rgba(255, 196, 83, 0.12)',
          border: 'rgba(255, 196, 83, 0.3)',
          color: '#ffc453',
          dotColor: '#ffc453',
          dotPulse: true,
          Icon: Clock
        };
      case 'queued':
        return {
          label: customText || 'Queued',
          bg: 'rgba(255, 196, 83, 0.12)',
          border: 'rgba(255, 196, 83, 0.3)',
          color: '#ffc453',
          dotColor: '#ffc453',
          dotPulse: true,
          Icon: Clock
        };
      case 'needs_review':
        return {
          label: customText || 'Needs Review',
          bg: 'rgba(255, 196, 83, 0.12)',
          border: 'rgba(255, 196, 83, 0.3)',
          color: '#ffc453',
          dotColor: '#ffc453',
          dotPulse: true,
          Icon: AlertCircle
        };
      case 'needs_images':
      case 'unsupported_category':
        return {
          label: customText || (status === 'unsupported_category' ? 'Unsupported Category' : 'Needs Hi-Res Images'),
          bg: 'rgba(255, 196, 83, 0.12)',
          border: 'rgba(255, 196, 83, 0.3)',
          color: '#ffc453',
          dotColor: '#ffc453',
          dotPulse: false,
          Icon: Image
        };

      // 3. Info / Draft / In Progress (Polaris Light Blue: #b4e1fa)
      case 'draft':
        return {
          label: customText || 'Draft',
          bg: 'rgba(180, 225, 250, 0.12)',
          border: 'rgba(180, 225, 250, 0.3)',
          color: '#b4e1fa',
          dotColor: '#b4e1fa',
          dotPulse: false,
          Icon: Edit3
        };
      case 'rendering':
        return {
          label: customText || 'Rendering',
          bg: 'rgba(180, 225, 250, 0.12)',
          border: 'rgba(180, 225, 250, 0.3)',
          color: '#b4e1fa',
          dotColor: '#b4e1fa',
          dotSpin: true,
          Icon: Cpu
        };
      case 'stitching':
        return {
          label: customText || 'Stitching',
          bg: 'rgba(180, 225, 250, 0.12)',
          border: 'rgba(180, 225, 250, 0.3)',
          color: '#b4e1fa',
          dotColor: '#b4e1fa',
          dotSpin: true,
          Icon: Film
        };
      case 'syncing':
        return {
          label: customText || 'Syncing',
          bg: 'rgba(180, 225, 250, 0.12)',
          border: 'rgba(180, 225, 250, 0.3)',
          color: '#b4e1fa',
          dotColor: '#b4e1fa',
          dotSpin: true,
          Icon: RefreshCw
        };

      // 4. Critical / Failure / Unfulfilled (Polaris Red: #d82c0d / #f87171)
      case 'failed':
      case 'error':
        return {
          label: customText || 'Failed',
          bg: 'rgba(216, 44, 13, 0.12)',
          border: 'rgba(216, 44, 13, 0.3)',
          color: '#f87171',
          dotColor: '#d82c0d',
          dotPulse: false,
          Icon: AlertCircle
        };
      case 'rejected':
        return {
          label: customText || 'Rejected',
          bg: 'rgba(216, 44, 13, 0.12)',
          border: 'rgba(216, 44, 13, 0.3)',
          color: '#f87171',
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
          bg: 'rgba(140, 145, 150, 0.12)',
          border: 'rgba(140, 145, 150, 0.25)',
          color: '#8c9196',
          dotColor: '#8c9196',
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
