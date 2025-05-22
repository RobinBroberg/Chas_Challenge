"use client";

export default function StatCard({
  title,
  subtitle,
  value,
  chart,
  footer,
  className,
}) {
  return (
    <article
      className={`p-5 rounded-md shadow-[0_1px_9px_rgba(139,139,139,0.25)] bg-white ${
        className || ""
      }`}
    >
      <h3 className="mb-4 text-base font-bold">{title}</h3>

      {subtitle && (
        <p className="mb-8 text-xs opacity-40 text-black text-opacity-80">
          {subtitle}
        </p>
      )}

      {value && (
        <div className="text-6xl font-bold text-stone-700">{value}</div>
      )}

      {chart}

      {footer && <p className="mt-5 text-sm font-bold text-center">{footer}</p>}
    </article>
  );
}
