import React from 'react';

interface ScriptureCardProps {
  reference: string;
  quote: string;
  explanation?: string;
}

export function ScriptureCard({ reference, quote, explanation }: ScriptureCardProps) {
  return (
    <div className="not-prose bg-neutral-50 border border-neutral-200 rounded-3xl p-8 md:p-10 my-8">
      <blockquote className="text-lg italic text-slate-700 leading-relaxed mb-4">
        "{quote}"
      </blockquote>
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
        {reference}
      </p>
      {explanation && (
        <>
          <hr className="border-neutral-200 my-4" />
          <p className="text-gray-600 leading-relaxed">{explanation}</p>
        </>
      )}
    </div>
  );
}
