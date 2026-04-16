import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    modal: {
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '24px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      position: 'relative' as const,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      borderBottom: '1px solid #f3f4f6',
      paddingBottom: '12px',
    },
    titleText: {
      margin: 0,
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#000000',
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      lineHeight: '1',
      cursor: 'pointer',
      color: '#9ca3af',
      padding: 0,
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.titleText}>{title}</h3>
          <button style={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;