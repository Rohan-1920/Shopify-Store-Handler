import React from 'react';
import { X, CheckCircle2, AlertTriangle, Info, Bell, Check } from 'lucide-react';
import type { NotificationItem } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer-content">
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--xora-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '15px' }}>
            <Bell size={18} style={{ color: 'var(--xora-primary)' }} />
            Notifications & System Logs
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Actions Bar */}
        <div style={{
          padding: '8px 20px',
          backgroundColor: 'var(--xora-bg-app)',
          borderBottom: '1px solid var(--xora-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px'
        }}>
          <span style={{ color: 'var(--xora-text-secondary)' }}>
            {notifications.filter(n => !n.read).length} unread alerts
          </span>
          <button 
            className="btn btn-tertiary btn-sm"
            onClick={onMarkAllRead}
            style={{ padding: '2px 6px', fontSize: '11.5px' }}
          >
            <Check size={13} /> Mark all read
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
          {notifications.map((n) => (
            <div 
              key={n.id}
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: n.read ? 'var(--xora-surface)' : 'var(--xora-primary-light)',
                border: '1px solid ' + (n.read ? 'var(--xora-border-subtle)' : 'var(--xora-primary-border)'),
                marginBottom: '10px',
                transition: 'var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                {n.type === 'success' && <CheckCircle2 size={16} style={{ color: 'var(--xora-primary)', marginTop: '2px' }} />}
                {n.type === 'warning' && <AlertTriangle size={16} style={{ color: '#8A6100', marginTop: '2px' }} />}
                {n.type === 'info' && <Info size={16} style={{ color: 'var(--xora-info)', marginTop: '2px' }} />}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--xora-text-primary)' }}>{n.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--xora-text-secondary)', marginTop: '2px' }}>{n.message}</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--xora-text-muted)', marginTop: '4px' }}>{n.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
