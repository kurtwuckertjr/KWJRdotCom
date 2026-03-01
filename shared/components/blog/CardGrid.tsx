import React from 'react';

interface CardItem {
  title: string;
  description: string;
  number?: number;
}

interface CardGridProps {
  items: CardItem[];
  cols?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'definition';
}

export function CardGrid({ items, cols = 3, variant = 'default' }: CardGridProps) {
  const gridCols =
    cols === 1
      ? 'grid-cols-1'
      : cols === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : cols === 4
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 md:grid-cols-3';

  const gap = variant === 'definition' ? 'gap-6' : 'gap-12';

  return (
    <div className={`not-prose grid ${gridCols} ${gap}`}>
      {items.map((item, i) => (
        variant === 'definition' ? (
          <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <h5 className="font-black text-slate-900 mb-2 uppercase text-sm">{item.title}</h5>
            <p className="text-xs text-slate-500 font-light italic">{item.description}</p>
          </div>
        ) : (
          <section
            key={i}
            className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500"
          >
            <h3 className="text-xl font-bold text-teal-600 uppercase tracking-widest mb-6 flex items-center gap-3">
              {item.number != null ? `${item.number}. ` : ''}
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </section>
        )
      ))}
    </div>
  );
}
