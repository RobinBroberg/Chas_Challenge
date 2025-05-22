"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WellbeingStats() {
  const [period, setPeriod] = useState("month");

  const stats = [
    "Fysiskt välmående",
    "Psykiskt välmående",
    "Arbetsbelastning",
    "Balans mellan arbete och fritid",
    "Stressnivå",
    "Samarbete och teamkänsla",
  ];

  const colors = [
    { label: "Utmaningar", color: "bg-red-700" },
    { label: "Belöningar", color: "bg-green-700" },
  ];

  // Dummy data för månad och år (du kan byta ut mot riktig data)
  const dataMonth = [
    {
      name: "1",
      Fysiskt: 3,
      Psykiskt: 4,
      Arbetsbelastning: 2,
      Balans: 5,
      Stress: 3,
      Samarbete: 4,
    },
    {
      name: "2",
      Fysiskt: 4,
      Psykiskt: 3,
      Arbetsbelastning: 3,
      Balans: 4,
      Stress: 4,
      Samarbete: 3,
    },
    {
      name: "3",
      Fysiskt: 5,
      Psykiskt: 4,
      Arbetsbelastning: 4,
      Balans: 3,
      Stress: 2,
      Samarbete: 5,
    },
    {
      name: "4",
      Fysiskt: 4,
      Psykiskt: 5,
      Arbetsbelastning: 3,
      Balans: 4,
      Stress: 3,
      Samarbete: 4,
    },
    {
      name: "5",
      Fysiskt: 3,
      Psykiskt: 4,
      Arbetsbelastning: 2,
      Balans: 5,
      Stress: 4,
      Samarbete: 3,
    },
    {
      name: "6",
      Fysiskt: 4,
      Psykiskt: 3,
      Arbetsbelastning: 3,
      Balans: 4,
      Stress: 3,
      Samarbete: 4,
    },
  ];

  const dataYear = [
    {
      name: "Jan",
      Fysiskt: 4,
      Psykiskt: 3,
      Arbetsbelastning: 4,
      Balans: 4,
      Stress: 3,
      Samarbete: 5,
    },
    {
      name: "Feb",
      Fysiskt: 3,
      Psykiskt: 4,
      Arbetsbelastning: 3,
      Balans: 5,
      Stress: 2,
      Samarbete: 4,
    },
    {
      name: "Mar",
      Fysiskt: 5,
      Psykiskt: 5,
      Arbetsbelastning: 4,
      Balans: 3,
      Stress: 3,
      Samarbete: 3,
    },
    {
      name: "Apr",
      Fysiskt: 4,
      Psykiskt: 4,
      Arbetsbelastning: 3,
      Balans: 4,
      Stress: 4,
      Samarbete: 4,
    },
    {
      name: "Maj",
      Fysiskt: 3,
      Psykiskt: 3,
      Arbetsbelastning: 2,
      Balans: 5,
      Stress: 3,
      Samarbete: 5,
    },
    {
      name: "Jun",
      Fysiskt: 4,
      Psykiskt: 4,
      Arbetsbelastning: 3,
      Balans: 4,
      Stress: 2,
      Samarbete: 4,
    },
  ];

  const data = period === "month" ? dataMonth : dataYear;

  return (
    <section className="p-5 bg-white rounded-md shadow-[0_1px_9px_rgba(139,139,139,0.25)]">
      {/* Färgmarkeringar högst upp */}
      <div className="flex gap-6 mb-3">
        {colors.map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full ${color}`} />
            <span className="text-sm font-semibold text-stone-800">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Översiktstext */}
      <p className="mb-5 text-xs text-stone-500 italic">
        Översikt över vilka team som deltar
      </p>

      {/* Header med titel och periodval */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-base font-bold text-stone-900">
            Välmåendestatistik
          </h3>
          <p className="text-xs text-neutral-400">Per team</p>
        </div>
        <div className="flex rounded-3xl bg-black bg-opacity-10 p-2 space-x-2">
          <button
            className={`px-5 py-1.5 text-xs font-semibold rounded-full transition ${
              period === "month"
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`}
            onClick={() => setPeriod("month")}
          >
            Månad
          </button>
          <button
            className={`px-5 py-1.5 text-xs font-semibold rounded-full transition ${
              period === "year"
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`}
            onClick={() => setPeriod("year")}
          >
            År
          </button>
        </div>
      </div>

      {/* Statistiklista med nummer och underscore */}
      <div className="flex gap-6">
        <div className="flex flex-col gap-3 text-xs font-bold text-stone-700 min-w-max">
          {stats.map((text, i) => (
            <p key={i} className="whitespace-nowrap">
              <span>{i + 1}</span>
              <span className="mx-2 underline decoration-stone-400 underline-offset-4">
                {" ".repeat(5)}
              </span>
              <span>{text}</span>
            </p>
          ))}
        </div>

        {/* Statistik-graf */}
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 6]} />
              <Tooltip />

              {/* En linje per kategori, olika färger */}
              <Line
                type="monotone"
                dataKey="Fysiskt"
                stroke="#EF4444"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Psykiskt"
                stroke="#F59E0B"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Arbetsbelastning"
                stroke="#10B981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Balans"
                stroke="#3B82F6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Stress"
                stroke="#8B5CF6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Samarbete"
                stroke="#EC4899"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Nummer under grafen */}
      <div className="mt-5 text-xs font-bold text-stone-700 text-center select-none"></div>
    </section>
  );
}
