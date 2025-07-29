import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-2xl w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
