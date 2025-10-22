'use client';

import { XIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-black rounded-2xl max-w-md w-full border border-white/20">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/20">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Подтвердить',
  cancelText = 'Отменить',
  type = 'info'
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getButtonStyles = () => {
    switch (type) {
      case 'danger':
        return 'bg-white hover:bg-gray-100 text-black border border-gray-300';
      case 'warning':
        return 'bg-white hover:bg-gray-100 text-black border border-gray-300';
      default:
        return 'bg-white hover:bg-gray-100 text-black border border-gray-300';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <p className="text-gray-300">{message}</p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition duration-300 border border-white"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${getButtonStyles()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

export function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = 'info'
}: AlertModalProps) {
  const getIconAndColor = () => {
    switch (type) {
      case 'success':
        return { icon: '✓', color: 'text-green-400' };
      case 'error':
        return { icon: '✕', color: 'text-red-400' };
      default:
        return { icon: 'ℹ', color: 'text-blue-400' };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className={`text-2xl ${color}`}>{icon}</div>
          <p className="text-gray-300">{message}</p>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-gray-200 text-black rounded-lg font-medium transition duration-300"
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
}
