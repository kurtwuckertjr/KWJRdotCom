import React from 'react';

interface StepItem {
  title: string;
  description: string;
}

interface StepListProps {
  items: StepItem[];
  accent?: 'teal' | 'amber' | 'navy';
}

export function StepList({ items, accent = 'teal' }: StepListProps) {
  const accentColor =
    accent === 'amber' ? 'text-amber-500' :
    accent === 'navy' ? 'text-indigo-400' :
    'text-teal-400';
  const hoverBg =
    accent === 'amber' ? 'group-hover:bg-amber-500' :
    accent === 'navy' ? 'group-hover:bg-indigo-600' :
    'group-hover:bg-teal-600';
  const hoverLine =
    accent === 'amber' ? 'group-hover:bg-amber-100' :
    accent === 'navy' ? 'group-hover:bg-indigo-100' :
    'group-hover:bg-teal-100';

  return (
    <ul className="not-prose space-y-12">
      {items.map((item, i) => (
        <li key={i} className="flex gap-6 group">
          <div className="flex flex-col items-center shrink-0">
            <div className={`w-10 h-10 rounded-full bg-slate-900 ${accentColor} flex items-center justify-center font-black text-lg ${hoverBg} group-hover:text-white transition-all duration-300`}>
              {i + 1}
            </div>
            {i < items.length - 1 && (
              <div className={`w-px h-full bg-slate-100 ${hoverLine} mt-2 transition-colors`} />
            )}
          </div>
          <div>
            <h4 className="text-xl font-black uppercase text-slate-900 mb-2">{item.title}</h4>
            <p className="text-gray-500 font-light leading-relaxed">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
