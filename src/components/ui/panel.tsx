export default function Panel() {
    return (
      <div className="divide-y divide-gray-200 overflow-hidden relative border shadow min-w-[500px] rounded-2xl border-zinc-700">
        <div className="px-4 py-5 sm:px-6 bg-zinc-900">
          {/* Content goes here */}
          {/* We use less vertical padding on card headers on desktop than on body sections */}
        </div>
        <div className="px-4 py-5 sm:p-6 h-[200px] bg-neutral-900 overflow-y-scroll">{/* Content goes here */}</div>
      </div>
    )
  }