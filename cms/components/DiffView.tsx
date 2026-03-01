'use client';

import { useState } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

interface DiffViewProps {
  original: string;
  formatted: string;
  onAccept: (formatted: string) => void;
  onReject: () => void;
}

/**
 * Split-view diff showing original vs AI-formatted markdown.
 * Author can accept the formatted version or reject it.
 */
export function DiffView({ original, formatted, onAccept, onReject }: DiffViewProps) {
  const originalLines = original.split('\n');
  const formattedLines = formatted.split('\n');

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
        <h3 className="text-sm font-semibold text-gray-300">
          AI Format Suggestions
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onReject}
            className="inline-flex items-center gap-1 rounded-md bg-gray-800 px-3 py-1 text-xs font-medium text-gray-400 transition hover:bg-gray-700 hover:text-gray-200"
          >
            <X className="h-3 w-3" />
            Reject
          </button>
          <button
            onClick={() => onAccept(formatted)}
            className="inline-flex items-center gap-1 rounded-md bg-teal-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-teal-500"
          >
            <Check className="h-3 w-3" />
            Accept All
          </button>
        </div>
      </div>

      {/* Side-by-side diff */}
      <div className="flex flex-1 overflow-hidden">
        {/* Original */}
        <div className="w-1/2 overflow-y-auto border-r border-gray-800">
          <div className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-600 border-b border-gray-800 bg-gray-900/50">
            Original
          </div>
          <pre className="p-3 text-xs leading-relaxed text-gray-500 whitespace-pre-wrap font-mono">
            {original}
          </pre>
        </div>

        {/* Formatted */}
        <div className="w-1/2 overflow-y-auto">
          <div className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-teal-600 border-b border-gray-800 bg-gray-900/50">
            AI Formatted
          </div>
          <pre className="p-3 text-xs leading-relaxed text-gray-300 whitespace-pre-wrap font-mono">
            {formatted.split('\n').map((line, i) => {
              const isDirective = line.startsWith(':::');
              return (
                <span
                  key={i}
                  className={isDirective ? 'text-teal-400 font-semibold' : ''}
                >
                  {line}
                  {'\n'}
                </span>
              );
            })}
          </pre>
        </div>
      </div>
    </div>
  );
}
