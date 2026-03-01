import React from 'react';

interface ChecklistProps {
  items: string[];
}

export function Checklist({ items }: ChecklistProps) {
  return (
    <ul className="not-prose space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start">
          <svg
            className="w-5 h-5 text-teal-600 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-700 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
