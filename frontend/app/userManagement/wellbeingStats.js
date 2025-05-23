"use client";

export default function WellbeingStats() {
  return (
    <section className="p-5 bg-white rounded-md shadow-[0_1px_9px_rgba(139,139,139,0.25)]">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-base font-bold text-stone-900 tracking-wide">
            Välmåendestatistik
          </h3>
          <p className="text-xs text-stone-500 tracking-wide">Per team</p>
          <div className="w-28 h-0.5 bg-stone-300 mt-1" />
        </div>

        <div className="flex space-x-2">
          <button className="px-4 py-1.5 text-xs font-semibold text-white bg-lime-600 rounded-full hover:opacity-90 transition">
            Månad
          </button>
          <button className="px-4 py-1.5 text-xs font-semibold bg-white text-black border border-stone-300 rounded-full hover:bg-stone-100 transition">
            År
          </button>
        </div>
      </div>

      {/* Värden och Statistik */}
      <div className="flex gap-6">
        {/* Värde-lista */}
        <div className="flex flex-col gap-3 text-xs font-bold text-stone-700 opacity-80 min-w-max">
          <p>Fysiskt välmående</p>
          <p>Psykiskt välmående</p>
          <p>Arbetsbelastning</p>
          <p>Balans mellan arbete och fritid</p>
          <p>Stressnivå</p>
          <p>Samarbete och teamkänsla</p>
        </div>

        {/* Statistik-graf med staplar och siffror under */}
        <div className="flex-grow">
          <svg
            width="100%"
            height="200"
            viewBox="0 0 300 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Staplar */}
            <rect x="0" y="160" width="30" height="20" fill="#EF4444" />
            <rect x="40" y="150" width="30" height="30" fill="#F59E0B" />
            <rect x="80" y="120" width="30" height="60" fill="#10B981" />
            <rect x="120" y="100" width="30" height="80" fill="#3B82F6" />
            <rect x="160" y="130" width="30" height="50" fill="#8B5CF6" />
            <rect x="200" y="90" width="30" height="90" fill="#EC4899" />

            {/* Siffror under varje stapel */}
            <text
              x="15"
              y="195"
              textAnchor="middle"
              fontSize="10"
              fill="#374151"
            >
              1
            </text>
            <text
              x="55"
              y="195"
              textAnchor="middle"
              fontSize="10"
              fill="#374151"
            >
              2
            </text>
            <text
              x="95"
              y="195"
              textAnchor="middle"
              fontSize="10"
              fill="#374151"
            >
              3
            </text>
            <text
              x="135"
              y="195"
              textAnchor="middle"
              fontSize="10"
              fill="#374151"
            >
              4
            </text>
            <text
              x="175"
              y="195"
              textAnchor="middle"
              fontSize="10"
              fill="#374151"
            >
              5
            </text>
            <text
              x="215"
              y="195"
              textAnchor="middle"
              fontSize="10"
              fill="#374151"
            >
              6
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
