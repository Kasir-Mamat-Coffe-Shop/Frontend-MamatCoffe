// Modal.js
import React from "react";

const Modal = (props) => {
  const { isOpen, onClose, children } = props;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-[9999]">
      <div className="relative bg-white rounded-md shadow-lg overflow-hidden">
        <button
          className="absolute top-2 right-2 text-gray-500 bg-transparent border-0 hover:text-black active:text-black focus:text-black focus:outline-none active:outline-none"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
