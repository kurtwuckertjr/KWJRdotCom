import React from 'react';

interface StatItem {
  label: string;
  value: string;
}

interface StatGridProps {
  items: StatItem[];
  cols?: 2 | 3 | 4;
}

export function StatGrid({ items, cols = 3 }: StatGridProps) {
  const gridCols =
    cols === 2
      ? 'grid-cols-2'
      : cols === 4
      ? 'grid-cols-2 md:grid-cols-4'
      : 'grid-cols-1 md:grid-cols-3';

  return (
    <div className={`not-prose grid ${gridCols} gap-6`}>
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100"
        >
          <p className="text-3xl font-black text-slate-900 mb-1">{item.value}</p>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
