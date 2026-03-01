import React from 'react';

interface ObjectionBlockProps {
  objection: string;
  reply: string;
}

export function ObjectionBlock({ objection, reply }: ObjectionBlockProps) {
  return (
    <div className="not-prose my-8 border-l-4 border-neutral-300 pl-6">
      <p className="text-lg font-bold text-slate-900 mb-3">
        "{objection}"
      </p>
      <p className="text-gray-600 leading-relaxed">{reply}</p>
    </div>
  );
}
