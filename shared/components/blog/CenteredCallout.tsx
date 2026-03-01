import React from 'react';

interface CenteredCalloutProps {
  size?: 'sm' | 'lg';
  children: React.ReactNode;
}

export function CenteredCallout({ size = 'sm', children }: CenteredCalloutProps) {
  const sizeClasses =
    size === 'lg'
      ? 'text-center text-slate-900 font-black uppercase tracking-tighter text-2xl'
      : 'text-slate-500 text-sm font-bold uppercase tracking-widest text-center';

  return (
    <p className={`not-prose mt-8 ${sizeClasses}`}>
      {children}
    </p>
  );
}
