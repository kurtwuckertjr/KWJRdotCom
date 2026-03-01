import React from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="not-prose space-y-4">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-2xl border border-gray-200 bg-white overflow-hidden"
        >
          <summary className="cursor-pointer px-8 py-6 text-lg font-bold text-slate-900 flex items-center justify-between hover:bg-slate-50 transition">
            {item.question}
            <span className="ml-4 text-gray-400 group-open:rotate-45 transition-transform text-2xl">
              +
            </span>
          </summary>
          <div className="px-8 pb-6 text-gray-600 leading-relaxed">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
