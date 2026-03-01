import React from 'react';

interface CalloutBoxProps {
  accent?: 'teal' | 'amber' | 'navy';
  title?: string;
  children: React.ReactNode;
}

export function CalloutBox({ accent = 'teal', title, children }: CalloutBoxProps) {
  const borderColor =
    accent === 'amber' ? 'border-amber-500' :
    accent === 'navy' ? 'border-indigo-700' :
    'border-teal-600';

  return (
    <div className={`not-prose bg-slate-50 border-l-4 ${borderColor} p-8 md:p-12 rounded-r-3xl shadow-sm my-16`}>
      {title && (
        <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
          {title}
        </h3>
      )}
      <div className="text-lg leading-relaxed text-slate-700">
        {children}
      </div>
    </div>
  );
}
