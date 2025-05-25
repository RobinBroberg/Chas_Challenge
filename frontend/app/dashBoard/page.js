"use client";

import React from "react";

export default function DashboardPage() {
  const receiptDone = 12;
  const receiptsCount = 30;
  const percent = Math.round((receiptDone / receiptsCount) * 100);

  return (
    <div className="min-h-screen bg-[#B8AFA7] py-4 px-4">
      {/* Top Navigation */}
      <div className="bg-[#3D3D3D] text-white px-10 py-4 flex justify-between items-center">
        <p className="text-xl font-bold tracking-wide">BALANCE</p>
        <div className="flex gap-8 text-sm font-medium">
          <p>BALANSUNDERSÖKNING</p>
          <p>KVITTOHANTERING</p>
          <p>FRISKVÅRD</p>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-lg">🔔</span>
          <span className="text-lg">⚙️</span>
          <img
            src="/managerProfile.png"
            alt="Profil"
            className="w-10 h-10 rounded-full object-cover border"
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-[1440px] mx-auto bg-[#E8E6E0] px-10 py-8 mt-4 rounded shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-black">Dashboard</h1>
            <p className="text-sm text-black mt-1">
              Här får du en enkel överblick över teamet och dagens viktiga
              händelser
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-semibold text-black text-lg">HR</p>
            <img
              src="/managerProfile.png"
              alt="Profil"
              className="w-12 h-12 rounded-full object-cover border"
            />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left column - cards */}
          <div className="col-span-2 grid grid-cols-2 gap-6">
            {/* Medarbetare */}
            <div className="bg-gradient-to-br from-[#AEB396] to-[#232F21] text-white rounded-xl shadow-md flex flex-col items-center justify-center text-center h-[220px]">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl mb-3">
                👥
              </div>
              <p className="text-4xl font-bold">30</p>
              <p className="text-sm mt-1">Medarbetare</p>
            </div>

            {/* Friskvårdsbidrag */}
            <div className="bg-[#DFE2D2] text-black rounded-xl shadow-md flex flex-col justify-center items-center text-center px-4 h-[220px]">
              <p className="text-xs font-semibold text-gray-700">
                Användning av friskvårdsbidrag
              </p>
              <p className="text-[10px] text-gray-500 mt-1">
                Totalt kvitton godkända
              </p>
              <p className="text-4xl font-bold mt-4">18/30</p>
            </div>

            {/* Balansundersökning */}
            <div className="bg-[#DFE2D2] text-black rounded-xl shadow-md flex flex-col justify-center items-center text-center px-4 h-[220px]">
              <p className="text-xs font-semibold text-gray-700">
                Balansundersökning
              </p>
              <p className="text-[10px] text-gray-500 mt-1">
                Besvarade undersökningar
              </p>
              <p className="text-4xl font-bold mt-4">27/30</p>
            </div>

            {/* Kvittogodkännande */}
            <div className="bg-white text-black rounded-xl shadow-md flex flex-col justify-center items-center text-center px-4 h-[220px]">
              <h2 className="text-sm font-semibold">Kvittogodkännande</h2>
              <img src="/Vector.png" alt="Vector" />
              <div
                className="w-[120px] h-[120px] rounded-full flex items-center justify-center mt-2"
                style={{
                  background: `conic-gradient(
                    #BABEA7 0% ${100 - percent}%,
                    #4A5A41 ${100 - percent}%,
                    #99AE86 100%
                  )`,
                }}
              >
                <div className="w-[82px] h-[82px] bg-white rounded-full flex flex-col items-center justify-center">
                  <p className="text-black font-semibold text-xl">{percent}%</p>
                  <p className="text-black font-semibold text-xs pt-1">
                    godkända
                  </p>
                </div>
              </div>
              <p className="text-black font-semibold text-sm tracking-tight pt-4 p-2">
                {receiptDone} av {receiptsCount} godkända min väns
                kvittogodkännande
              </p>
            </div>
          </div>

          {/* Right column - chart */}
          <div className="col-span-1 bg-white rounded-xl shadow-lg px-6 py-6">
            <h2 className="text-lg font-bold">Statistik per besvarad fråga</h2>
            <p className="text-sm text-gray-500 mt-1">Mitt team</p>

            <ul className="text-sm text-gray-800 mt-4 space-y-1">
              <li>1. Motivation</li>
              <li>2. Rimlig arbetsbelastning</li>
              <li>3. Rimlig stressnivå</li>
              <li>4. Fysisk och psykisk trygghet</li>
              <li>5. Återhämtning under arbetsdagen</li>
              <li>6. Balans mellan privatliv och arbetsliv</li>
              <li>7. Samarbete och sammanhållning</li>
              <li>8. Tillräckligt stöd vid utmaningar</li>
            </ul>

            {/* Chart with color levels */}
            <div className="mt-6">
              <div className="w-full h-40 bg-gray-100 flex items-end gap-2 px-4 py-2 rounded">
                {[
                  { val: 80, level: "high" },
                  { val: 100, level: "high" },
                  { val: 55, level: "med" },
                  { val: 40, level: "low" },
                  { val: 95, level: "high" },
                  { val: 60, level: "med" },
                  { val: 70, level: "med" },
                  { val: 30, level: "low" },
                ].map((item, i) => {
                  let color = "#AEB396"; // Hög
                  if (item.level === "med") color = "#C4C7B4";
                  if (item.level === "low") color = "#E2E2DC";
                  return (
                    <div
                      key={i}
                      className="w-4 rounded-t"
                      style={{
                        height: `${item.val * 0.8}px`,
                        backgroundColor: color,
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-gray-600 px-4 mt-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <span key={i}>{i}</span>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-end gap-4 mt-4 pr-2 text-xs text-gray-700">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#AEB396]" />
                  Hög
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#C4C7B4]" />
                  Medel
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#E2E2DC]" />
                  Låg
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
