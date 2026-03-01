import React from 'react';

interface DarkContentBlockProps {
  children: React.ReactNode;
}

export function DarkContentBlock({ children }: DarkContentBlockProps) {
  return (
    <div className="not-prose bg-slate-900 text-white rounded-3xl p-10 md:p-14 shadow-xl my-16">
      <div className="text-gray-300 leading-relaxed text-lg">
        {children}
      </div>
    </div>
  );
}
