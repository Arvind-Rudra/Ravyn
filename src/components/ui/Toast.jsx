'use client';

import { useEffect, useState } from 'react';

export default function Toast({ message = 'Something happened!', type = 'success', duration = 3000 }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  const bgColors = {
    success: 'bg-[#3D5AFE]',      // Electric Blue
    error: 'bg-[#FF3B30]',        // Electric Red
    warning: 'bg-[#FFD500]',      // Cyber Yellow
    info: 'bg-[#121212]',         // Jet Black
  };

  const textColor = type === 'warning' ? 'text-[#121212]' : 'text-[#FAFAFA]';

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50
        px-6 py-4 rounded-lg shadow-xl
        transition-all duration-500 ease-in-out
        ${bgColors[type] || bgColors.success} ${textColor}
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      <span className="text-sm font-semibold">{message}</span>
    </div>
  );
}
