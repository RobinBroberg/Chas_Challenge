"use client";
import React from "react";

import DashboardHeader from "./dashboardHeader";
import StatCard from "./statCard";
import WellbeingStats from "./wellbeingStats";
import TeamChallenges from "./teamChallenges";

export default function DashboardLayout() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Wix+Madefor+Display:wght@600&display=swap"
        rel="stylesheet"
      />
      <div className="min-h-screen bg-stone-200 font-montserrat">
        <main className="px-12 py-10 max-w-[1280px] mx-auto">
          <DashboardHeader />

          <div className="flex flex-col items-end mb-12">
            <h2 className="text-3xl font-bold tracking-wide mb-1">HR</h2>
            <div className="w-[58px] h-px bg-stone-700 mb-4" />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a724d2c2334c6118d80253d5e6bd87ad5b18d7bd"
              alt="HR Profile"
              className="rounded-full border border-stone-600 shadow-md w-[70px] h-[70px]"
            />
          </div>

          <div className="grid grid-cols-4 gap-5 mb-10 max-md:grid-cols-2 max-sm:grid-cols-1">
            <StatCard
              title="Hälsokartläggning"
              subtitle="Besvarat undersökningen"
              value="27/30"
            />
            <StatCard
              title="Kvittogodkännande"
              chart={
                <div className="relative w-[150px] h-[150px] flex items-center justify-center">
                  <svg
                    className="transform -rotate-90"
                    width="150"
                    height="150"
                  >
                    <circle
                      cx="75"
                      cy="75"
                      r="60"
                      stroke="#E5E7EB"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="75"
                      cy="75"
                      r="60"
                      stroke="#65A30D"
                      strokeWidth="12"
                      strokeDasharray={2 * Math.PI * 60}
                      strokeDashoffset={2 * Math.PI * 60 * (1 - 0.6)}
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-2xl font-bold text-stone-800">60%</div>
                    <div className="text-xs text-stone-600">godkända</div>
                  </div>
                </div>
              }
              footer="18 av 30 kvitton godkända"
            />
            <StatCard
              title="Användning av friskvårdsbidrag"
              chart={
                <div className="flex flex-col items-center">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/db095a6631d02abe35c52e129fd19edb06244163"
                    alt="Wellness Icon"
                    className="mb-2"
                  />
                  <div className="text-3xl font-bold text-stone-700">18/30</div>
                </div>
              }
            />
            <StatCard title="Medarbetare" value="30" />
          </div>

          <div className="grid grid-cols-[640px_1fr] gap-5 max-md:grid-cols-1">
            <WellbeingStats />
            <TeamChallenges />
          </div>
        </main>
      </div>
    </>
  );
}
