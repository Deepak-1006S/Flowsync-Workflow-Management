/**
 * Loading Spinner Component
 * Reusable loading indicator
 */

import React from 'react';

const LoadingSpinner = ({ message = 'Loading...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-gray-600">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return <div className="flex justify-center p-8">{content}</div>;
};

export default LoadingSpinner;
