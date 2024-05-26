import React, { useEffect } from 'react';
import './App.css';

const ToastNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [message, onClose]);

  return (
    <div className="toast-notification">
      <span>{message}</span>
    </div>
  );
};

export default ToastNotification;
