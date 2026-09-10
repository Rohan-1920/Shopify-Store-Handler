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
  switch (status) {
    case 'synced':
      return (
        <span className="badge badge-success">
          <CheckCircle2 size={13} />
          {customText || 'Synced'}
        </span>
      );
    case 'eligible':
      return (
        <span className="badge badge-success">
          <Sparkles size={13} />
          {customText || 'Eligible'}
        </span>
      );
    case 'ineligible':
      return (
        <span className="badge badge-neutral">
          <XCircle size={13} />
          {customText || 'Ineligible'}
        </span>
      );
    case 'not_generated':
      return (
        <span className="badge badge-neutral">
          <Clock size={13} />
          {customText || 'Not Generated'}
        </span>
      );
    case 'draft':
      return (
        <span className="badge badge-warning">
          <Edit3 size={13} />
          {customText || 'Draft'}
        </span>
      );
    case 'needs_review':
      return (
        <span className="badge badge-warning">
          <AlertCircle size={13} />
          {customText || 'Needs Review'}
        </span>
      );
    case 'approved':
      return (
        <span className="badge badge-success">
          <Check size={13} />
          {customText || 'Approved'}
        </span>
      );
    case 'rejected':
      return (
        <span className="badge badge-critical">
          <XCircle size={13} />
          {customText || 'Rejected'}
        </span>
      );
    case 'queued':
      return (
        <span className="badge badge-info">
          <Clock size={13} />
          {customText || 'Queued'}
        </span>
      );
    case 'rendering':
      return (
        <span className="badge badge-info">
          <Cpu size={13} className="spin" />
          {customText || 'Rendering'}
        </span>
      );
    case 'stitching':
      return (
        <span className="badge badge-info">
          <Film size={13} />
          {customText || 'Stitching'}
        </span>
      );
    case 'completed':
    case 'ready':
      return (
        <span className="badge badge-success">
          <Video size={13} />
          {customText || 'Completed'}
        </span>
      );
    case 'pushed_to_shopify':
      return (
        <span className="badge badge-success">
          <ExternalLink size={13} />
          {customText || 'Pushed to Shopify'}
        </span>
      );
    case 'failed':
    case 'error':
      return (
        <span className="badge badge-critical">
          <AlertCircle size={13} />
          {customText || 'Failed'}
        </span>
      );
    case 'cancelled':
      return (
        <span className="badge badge-neutral">
          <XCircle size={13} />
          {customText || 'Cancelled'}
        </span>
      );
    case 'pending':
      return (
        <span className="badge badge-neutral">
          <Clock size={13} />
          {customText || 'Pending'}
        </span>
      );
    case 'syncing':
      return (
        <span className="badge badge-info">
          <RefreshCw size={13} className="spin" />
          {customText || 'Syncing'}
        </span>
      );
    case 'needs_images':
    case 'unsupported_category':
      return (
        <span className="badge badge-warning">
          <Image size={13} />
          {customText || (status === 'unsupported_category' ? 'Unsupported Category' : 'Needs Hi-Res Images')}
        </span>
      );
    default:
      return (
        <span className="badge badge-neutral">
          <HelpCircle size={13} />
          {customText || status}
        </span>
      );
  }
};
