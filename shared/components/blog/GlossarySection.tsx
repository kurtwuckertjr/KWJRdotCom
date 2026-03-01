import React from 'react';

interface GlossaryTerm {
  term: string;
  definition: string;
}

interface GlossarySectionProps {
  letter: string;
  terms: GlossaryTerm[];
}

export function GlossarySection({ letter, terms }: GlossarySectionProps) {
  return (
    <div className="not-prose my-8">
      <h3 className="text-2xl font-black text-teal-600 uppercase mb-4 border-b border-gray-200 pb-2">
        {letter}
      </h3>
      <dl className="space-y-4">
        {terms.map((item, i) => (
          <div key={i}>
            <dt className="font-bold text-slate-900">{item.term}</dt>
            <dd className="text-gray-600 leading-relaxed ml-4">{item.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
