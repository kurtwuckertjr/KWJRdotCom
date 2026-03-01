export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-7 w-24 rounded bg-gray-800" />
          <div className="mt-2 h-4 w-32 rounded bg-gray-800" />
        </div>
        <div className="h-10 w-28 rounded-lg bg-gray-800" />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-800">
        <div className="border-b border-gray-800 bg-gray-900/50 px-4 py-3">
          <div className="flex gap-16">
            <div className="h-3 w-12 rounded bg-gray-800" />
            <div className="h-3 w-16 rounded bg-gray-800" />
            <div className="h-3 w-12 rounded bg-gray-800" />
            <div className="h-3 w-10 rounded bg-gray-800" />
            <div className="h-3 w-14 rounded bg-gray-800" />
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b border-gray-800 px-4 py-4">
            <div className="flex items-center gap-16">
              <div className="h-4 w-48 rounded bg-gray-800" />
              <div className="h-3 w-16 rounded bg-gray-800" />
              <div className="h-5 w-20 rounded-full bg-gray-800" />
              <div className="h-3 w-10 rounded bg-gray-800" />
              <div className="h-3 w-20 rounded bg-gray-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
