import React from 'react';

interface SuccessMessageProps {
  onReset: () => void;
}

export function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <div className="bg-green-900/50 border border-green-500 rounded-lg p-6 text-center">
      <h2 className="text-2xl font-bold mb-2">Message Scheduled!</h2>
      <p className="text-gray-300 mb-4">Your note will be delivered at the scheduled time.</p>
      <button
        onClick={onReset}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
      >
        Schedule Another
      </button>
    </div>
  );
}