import React from 'react';

interface ReferenceListProps {
  items: string[];
}

export function ReferenceList({ items }: ReferenceListProps) {
  return (
    <div className="not-prose my-8">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        References
      </h3>
      <ol className="space-y-2 list-decimal list-inside">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-gray-500 leading-relaxed">
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}
