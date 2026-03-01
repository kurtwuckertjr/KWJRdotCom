'use client';

interface PropTextFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function PropTextField({ label, value, placeholder, onChange }: PropTextFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1.5 text-xs text-gray-300 placeholder-gray-600 focus:border-teal-500 focus:outline-none"
      />
    </div>
  );
}
