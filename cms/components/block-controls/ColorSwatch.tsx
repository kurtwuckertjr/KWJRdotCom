'use client';

interface ColorSwatchProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  colors?: { name: string; value: string; hex: string }[];
}

const DEFAULT_COLORS = [
  { name: 'Teal', value: 'teal', hex: '#14b8a6' },
  { name: 'Amber', value: 'amber', hex: '#f59e0b' },
  { name: 'Navy', value: 'navy', hex: '#1e3a5f' },
];

export function ColorSwatch({ label = 'Accent', value, onChange, colors = DEFAULT_COLORS }: ColorSwatchProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onChange(color.value)}
            className={`group relative h-7 w-7 rounded-full transition-all ${
              value === color.value
                ? 'ring-2 ring-offset-2 ring-offset-gray-950 scale-110'
                : 'hover:scale-105'
            }`}
            style={{
              backgroundColor: color.hex,
              ['--tw-ring-color' as string]: color.hex,
            }}
            title={color.name}
          >
            {value === color.value && (
              <svg className="absolute inset-0 m-auto h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
