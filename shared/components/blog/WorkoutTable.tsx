import React from 'react';

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  notes?: string;
}

interface WorkoutTableProps {
  title?: string;
  exercises: Exercise[];
}

export function WorkoutTable({ title, exercises }: WorkoutTableProps) {
  return (
    <div className="not-prose my-8">
      {title && (
        <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4">
          {title}
        </h3>
      )}
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-6 py-3">Exercise</th>
              <th className="px-6 py-3">Sets</th>
              <th className="px-6 py-3">Reps</th>
              <th className="px-6 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {exercises.map((ex, i) => (
              <tr key={i} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-medium text-slate-900">{ex.name}</td>
                <td className="px-6 py-4 text-slate-600">{ex.sets}</td>
                <td className="px-6 py-4 text-slate-600">{ex.reps}</td>
                <td className="px-6 py-4 text-slate-500 text-sm">{ex.notes ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
