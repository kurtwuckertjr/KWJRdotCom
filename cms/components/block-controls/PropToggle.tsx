'use client';

interface PropToggleProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export function PropToggle({ label, value, options, onChange }: PropToggleProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <div className="flex rounded-lg bg-gray-800/50 p-0.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 rounded-md px-3 py-1.5 text-[10px] font-semibold transition ${
              value === opt.value
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
