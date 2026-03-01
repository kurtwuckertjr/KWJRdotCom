import React from 'react';

interface WarningItem {
  title: string;
  description: string;
}

interface WarningGridProps {
  items: WarningItem[];
  cols?: 2 | 3;
}

export function WarningGrid({ items, cols = 2 }: WarningGridProps) {
  const gridCols = cols === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2';

  return (
    <div className={`not-prose grid ${gridCols} gap-6`}>
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-red-50 border border-red-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-base font-bold text-red-700 uppercase tracking-wider mb-3">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
