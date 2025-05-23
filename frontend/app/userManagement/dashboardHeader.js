"use client";

export default function DashboardHeader() {
  return (
    <section className="mb-10">
      <h1 className="mb-2.5 text-3xl font-bold tracking-wider text-stone-900">
        Dashboard
      </h1>
      <p className="mb-2 text-lg font-bold tracking-wider text-stone-700">
        Här får du en snabb överblick över teamet och dagens viktiga händelser
      </p>

      {/* Linje under texten */}
      <div className="h-0.5 bg-stone-500 w-3/4 max-w-md" />
    </section>
  );
}
