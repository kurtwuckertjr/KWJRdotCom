import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="not-prose text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic border-b-2 border-slate-100 pb-6 mb-12">
      {children}
    </h2>
  );
}
