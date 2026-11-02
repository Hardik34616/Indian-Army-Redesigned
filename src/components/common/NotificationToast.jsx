import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const NotificationToast = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = Info;
        if (toast.type === 'success') Icon = CheckCircle2;
        if (toast.type === 'error' || toast.type === 'warning') Icon = AlertCircle;

        return (
          <div key={toast.id} className={`toast-bubble toast-${toast.type} animate-fade-in`}>
            <Icon size={18} className="toast-icon" />
            <span className="toast-message">{toast.message}</span>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 420px;
          width: calc(100% - 48px);
        }

        .toast-bubble {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #ffffff;
          border-radius: var(--radius-md);
          padding: 12px 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          font-size: 0.84375rem;
          font-weight: 600;
        }

        [data-theme='dark'] .toast-bubble {
          background: var(--army-dark);
          border-color: var(--border-medium);
          color: #ffffff;
        }

        .toast-bubble.toast-success {
          border-left: 4px solid #16a34a;
        }
        .toast-bubble.toast-success .toast-icon {
          color: #16a34a;
        }

        .toast-bubble.toast-info {
          border-left: 4px solid var(--gold-primary);
        }
        .toast-bubble.toast-info .toast-icon {
          color: var(--gold-primary);
        }

        .toast-bubble.toast-error {
          border-left: 4px solid #dc2626;
        }
        .toast-bubble.toast-error .toast-icon {
          color: #dc2626;
        }

        .toast-message {
          flex: 1;
          line-height: 1.4;
        }

        .toast-close-btn {
          color: var(--text-muted);
          padding: 2px;
          transition: color 0.2s;
        }

        .toast-close-btn:hover {
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};

export default NotificationToast;
