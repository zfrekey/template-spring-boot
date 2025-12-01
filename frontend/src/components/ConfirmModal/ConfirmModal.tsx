'use client';

import styles from './styles.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar'
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        
        <div className={styles.actions}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            {confirmText}
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
