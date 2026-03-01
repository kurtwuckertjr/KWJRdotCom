import React from 'react';

interface ComparisonGridProps {
  leftTitle?: string;
  rightTitle?: string;
  leftItems: string[];
  rightItems: string[];
  accent?: 'teal' | 'amber' | 'navy';
  reversed?: boolean;
}

const accentStyles = {
  teal: {
    bg: 'bg-teal-900/30 border border-teal-700/30',
    title: 'text-teal-600',
    text: 'text-slate-700',
    marker: 'text-teal-600',
  },
  amber: {
    bg: 'bg-amber-900/30 border border-amber-700/30',
    title: 'text-amber-600',
    text: 'text-slate-700',
    marker: 'text-amber-600',
  },
  navy: {
    bg: 'bg-indigo-900/30 border border-indigo-700/30',
    title: 'text-indigo-600',
    text: 'text-slate-700',
    marker: 'text-indigo-600',
  },
};

const darkStyles = {
  bg: 'bg-slate-900',
  title: 'text-white',
  text: 'text-gray-300',
  minusMarker: 'text-red-400',
  plusMarker: 'text-teal-400',
};

export function ComparisonGrid({
  leftTitle = 'Before',
  rightTitle = 'After',
  leftItems,
  rightItems,
  accent = 'teal',
  reversed = false,
}: ComparisonGridProps) {
  const colors = accentStyles[accent];

  // Normal: left=dark (minus), right=accented (plus)
  // Reversed: left=accented (plus), right=dark (minus)
  const leftStyle = reversed ? colors : darkStyles;
  const rightStyle = reversed ? darkStyles : colors;
  const leftMarker = reversed ? colors.marker : darkStyles.minusMarker;
  const leftSymbol = reversed ? '+' : '-';
  const rightMarker = reversed ? darkStyles.minusMarker : colors.marker;
  const rightSymbol = reversed ? '-' : '+';

  return (
    <div className="not-prose grid md:grid-cols-2 gap-6 my-12">
      <div className={`${leftStyle.bg} rounded-3xl p-8`}>
        <h3 className={`text-lg font-bold ${leftStyle.title} uppercase tracking-wider mb-4`}>
          {leftTitle}
        </h3>
        <ul className="space-y-3">
          {leftItems.map((item, i) => (
            <li key={i} className={`flex gap-3 ${leftStyle.text}`}>
              <span className={`${leftMarker} shrink-0`}>{leftSymbol}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${rightStyle.bg} rounded-3xl p-8`}>
        <h3 className={`text-lg font-bold ${rightStyle.title} uppercase tracking-wider mb-4`}>
          {rightTitle}
        </h3>
        <ul className="space-y-3">
          {rightItems.map((item, i) => (
            <li key={i} className={`flex gap-3 ${rightStyle.text}`}>
              <span className={`${rightMarker} shrink-0`}>{rightSymbol}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
