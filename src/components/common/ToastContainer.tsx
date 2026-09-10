import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast" role="status">
          {toast.type === 'success' && <CheckCircle2 size={18} style={{ color: '#008060' }} />}
          {toast.type === 'error' && <AlertCircle size={18} style={{ color: '#D72C0D' }} />}
          {toast.type === 'info' && <Info size={18} style={{ color: '#2C6ECB' }} />}
          <span>{toast.text}</span>
          <button 
            aria-label="Dismiss toast notification"
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#8C9196', 
              cursor: 'pointer',
              display: 'inline-flex',
              marginLeft: '8px' 
            }}
            onClick={() => onDismiss(toast.id)}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
