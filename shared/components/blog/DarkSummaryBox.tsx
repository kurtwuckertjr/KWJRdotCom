import React from 'react';
import { BlogIcon } from './IconRegistry';

interface DarkSummaryBoxProps {
  title?: string;
  icon?: string;
  accent?: 'teal' | 'navy';
  children: React.ReactNode;
}

export function DarkSummaryBox({ title, icon, accent = 'teal', children }: DarkSummaryBoxProps) {
  const glowColor = accent === 'navy' ? 'bg-indigo-500/5 group-hover:bg-indigo-500/10' : 'bg-teal-500/5 group-hover:bg-teal-500/10';
  const iconBg = accent === 'navy' ? 'bg-indigo-700' : 'bg-teal-600';
  const titleColor = accent === 'navy' ? 'text-indigo-400' : 'text-teal-400';

  return (
    <div className="not-prose bg-slate-900 text-white rounded-[3rem] p-12 mt-20 shadow-2xl relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-64 h-64 ${glowColor} rounded-full blur-[100px] transition-all duration-1000`} />
      <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
        <div className={`${iconBg} text-white p-4 rounded-2xl shadow-lg shrink-0`}>
          <BlogIcon name={icon ?? 'Info'} size={32} />
        </div>
        <div>
          {title && (
            <h4 className={`text-2xl font-black uppercase tracking-tight mb-6 ${titleColor}`}>
              {title}
            </h4>
          )}
          <div className="text-gray-300 leading-relaxed text-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
