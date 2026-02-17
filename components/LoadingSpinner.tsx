import React from 'react';

export const LoadingSpinner: React.FC<{ text?: string }> = ({ text = "正在请示锦囊妙计..." }) => (
  <div className="flex flex-col items-center justify-center space-y-4 p-8">
    <div className="relative w-16 h-16">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-stone-200 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-amber-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
    <p className="text-stone-600 font-serif italic animate-pulse">{text}</p>
  </div>
);