'use client';

import { XIcon } from './Icons';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessModal({ isOpen, onClose, message }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-black rounded-2xl max-w-md w-full p-8 relative border border-white/20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <XIcon size={24} />
        </button>

        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">
            Заявка отправлена!
          </h3>
          
          <p className="text-gray-300 mb-6">
            {message}
          </p>

          <div className="bg-white/10 rounded-lg p-4 mb-6 border border-white/20">
            <p className="text-sm text-white">
              <strong>Что дальше?</strong>
            </p>
            <ul className="text-sm text-gray-300 mt-2 space-y-1">
              <li>• Мы свяжемся с вами в течение 15 минут</li>
              <li>• Обсудим детали вашего проекта</li>
              <li>• Предложим оптимальное решение</li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-white text-black font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
}
