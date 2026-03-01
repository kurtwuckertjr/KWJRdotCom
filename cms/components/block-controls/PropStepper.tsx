'use client';

import { Minus, Plus } from 'lucide-react';

interface PropStepperProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

export function PropStepper({ label, value, min = 1, max = 4, step = 1, onChange }: PropStepperProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          disabled={value <= min}
          className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-800 text-gray-400 transition hover:bg-gray-700 hover:text-gray-200 disabled:opacity-30"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="min-w-[2rem] text-center text-sm font-bold text-white">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          disabled={value >= max}
          className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-800 text-gray-400 transition hover:bg-gray-700 hover:text-gray-200 disabled:opacity-30"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
