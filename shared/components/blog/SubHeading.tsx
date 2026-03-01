import React from 'react';

interface SubHeadingProps {
  color?: 'amber' | 'slate';
  children: React.ReactNode;
}

export function SubHeading({ color = 'slate', children }: SubHeadingProps) {
  const colorClass = color === 'amber' ? 'text-amber-600' : 'text-slate-900';

  return (
    <h3 className={`not-prose text-xl font-bold ${colorClass} uppercase tracking-widest mb-6`}>
      {children}
    </h3>
  );
}
