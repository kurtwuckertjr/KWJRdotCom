'use client';

import {
  Info,
  BookOpen,
  ShieldCheck,
  Globe,
  Lock,
  Zap,
  AlertTriangle,
  CheckCircle,
  Star,
  Heart,
  Target,
  Lightbulb,
  Award,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICONS: { name: string; icon: LucideIcon }[] = [
  { name: 'Info', icon: Info },
  { name: 'BookOpen', icon: BookOpen },
  { name: 'ShieldCheck', icon: ShieldCheck },
  { name: 'Globe', icon: Globe },
  { name: 'Lock', icon: Lock },
  { name: 'Zap', icon: Zap },
  { name: 'AlertTriangle', icon: AlertTriangle },
  { name: 'CheckCircle', icon: CheckCircle },
  { name: 'Star', icon: Star },
  { name: 'Heart', icon: Heart },
  { name: 'Target', icon: Target },
  { name: 'Lightbulb', icon: Lightbulb },
  { name: 'Award', icon: Award },
];

interface IconPickerProps {
  label?: string;
  value: string;
  onChange: (iconName: string) => void;
}

export function IconPicker({ label = 'Icon', value, onChange }: IconPickerProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <div className="grid grid-cols-5 gap-1">
        {ICONS.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => onChange(name)}
            className={`flex h-8 w-full items-center justify-center rounded-md transition ${
              value === name
                ? 'bg-teal-600/20 text-teal-400 ring-1 ring-teal-600/40'
                : 'bg-gray-800/50 text-gray-500 hover:bg-gray-800 hover:text-gray-300'
            }`}
            title={name}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
