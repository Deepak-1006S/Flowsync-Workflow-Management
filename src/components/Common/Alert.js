/**
 * Alert/Toast Component
 * Display notifications to users
 */

import React, { useState, useEffect } from 'react';

const Alert = ({ message, type = 'info', duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-100 border-green-300 text-green-800',
    error: 'bg-red-100 border-red-300 text-red-800',
    warning: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    info: 'bg-blue-100 border-blue-300 text-blue-800',
  };

  const icon = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`border-l-4 p-4 rounded ${bgColor[type]}`}>
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold">{icon[type]}</span>
        <span>{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="ml-auto font-bold cursor-pointer opacity-70 hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
