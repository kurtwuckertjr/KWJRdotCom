import React from 'react';
import { BlogIcon } from './IconRegistry';

interface FeaturedCardProps {
  icon?: string;
  children: React.ReactNode;
}

export function FeaturedCard({ icon, children }: FeaturedCardProps) {
  return (
    <section className="not-prose bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
      {icon && (
        <div className="absolute top-0 right-0 p-8 text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity">
          <BlogIcon name={icon} size={120} />
        </div>
      )}
      <div className="relative z-10 space-y-4">
        {children}
      </div>
    </section>
  );
}
