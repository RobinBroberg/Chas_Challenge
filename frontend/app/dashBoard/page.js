"use client";

import React, { useEffect, useState } from "react";
import { getAllReceipts, getCompanyAverages } from "@/services/api";

export default function DashboardPage() {
  const [receipts, setReceipts] = useState([]);
  const [averages, setAverages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hämta data från API
  useEffect(() => {
    async function fetchData() {
      try {
        const [receiptsData, averagesData] = await Promise.all([
          getAllReceipts(),
          getCompanyAverages(),
        ]);
        setReceipts(receiptsData);
        setAverages(averagesData);
      } catch (err) {
        alert("Kunde inte hämta dashboard-data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Räkna godkända kvitton
  const receiptDone = receipts.filter((r) => r.status === "approved").length;
  const receiptsCount = receipts.length;
  const percent =
    receiptsCount > 0 ? Math.round((receiptDone / receiptsCount) * 100) : 0;

  // För stapeldiagrammet: använd averages
  // averages = [{ question_id, question_text, average_score, total_answers }]
  // Om du vill ha max 8 frågor:
  const barData = averages.slice(0, 8).map((q) => {
    let level = "low";
    if (q.average_score >= 80) level = "high";
    else if (q.average_score >= 60) level = "med";
    return {
      val: q.average_score ? Math.round(q.average_score) : 0,
      level,
      label: q.question_text,
    };
  });

  useEffect(() => {
    const handleGlobalClick = () => {
      console.log("Globalt klick registrerat");
    };

    const handleGlobalChange = () => {
      console.log("Globalt onChange registrerat");
    };

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("change", handleGlobalChange);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("change", handleGlobalChange);
    };
  }, []);

  // Lägg till loading här
  if (loading)
    return <div className="text-center py-20 text-xl">Laddar...</div>;

  return (
    <div
      className="min-h-screen bg-[#B8AFA7] py-4 px-4"
      onClick={() => console.log("Klick på sidan")}
    >
      <div className="w-full max-w-[1440px] mx-auto bg-[#E8E6E0] px-10 py-8 mt-4 rounded shadow-sm">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#232F21]">Dashboard</h1>
            <p className="text-sm text-[#232F21] mt-1 opacity-80">
              Här får du en enkel överblick över teamet och dagens viktiga
              händelser
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-semibold text-[#232F21] text-lg">HR</p>
            <img
              src="/managerProfile.png"
              alt="Profil"
              className="w-12 h-12 rounded-full object-cover border"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 grid grid-cols-2 gap-6">
            {/* Medarbetare */}
            <div className="bg-gradient-to-br from-[#AEB396] to-[#232F21] text-white rounded-xl shadow-md flex flex-col items-center justify-center text-center h-[220px]">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl mb-3">
                👥
              </div>
              <p className="text-4xl font-bold">
                {/* Lägg till antal anställda här om du har det */}30
              </p>
              <p className="text-sm mt-1">Medarbetare</p>
            </div>

            {/* Friskvårdsbidrag */}
            <div className="bg-[#DEDED7] text-[#232F21] rounded-xl shadow-md flex flex-col justify-center items-center text-center px-4 h-[220px]">
              <p className="text-xs font-semibold text-[#797979]">
                Användning av friskvårdsbidrag
              </p>
              <p className="text-[10px] text-[#A4A4A4] mt-1">
                Totalt kvitton godkända
              </p>
              <p className="text-4xl font-bold mt-4">
                {receiptDone}/{receiptsCount}
              </p>
            </div>

            {/* Balansundersökning */}
            <div className="bg-[#DEDED7] text-[#232F21] rounded-xl shadow-md flex flex-col justify-center items-center text-center px-4 h-[220px]">
              <p className="text-xs font-semibold text-[#797979]">
                Balansundersökning
              </p>
              <p className="text-[10px] text-[#A4A4A4] mt-1">
                Besvarade undersökningar
              </p>
              <p className="text-4xl font-bold mt-4">
                {/* Lägg till dynamiskt värde här om du har det */}27/30
              </p>
            </div>

            {/* Kvittogodkännande */}
            <div className="bg-[#DEDED7] text-[#232F21] rounded-xl shadow-md flex flex-col justify-center items-center text-center px-4 h-[220px]">
              <h2 className="text-sm font-semibold">Kvittogodkännande</h2>
              <img src="/Vector.png" alt="Vector" />
              <div
                className="w-[120px] h-[120px] rounded-full flex items-center justify-center mt-2"
                style={{
                  background: `conic-gradient(#BABEA7 0% ${
                    100 - percent
                  }%, #BABEA7 ${100 - percent}%, #BABEA7 100%)`,
                }}
              >
                <div className="w-[82px] h-[82px] bg-white rounded-full flex flex-col items-center justify-center">
                  <p className="text-black font-semibold text-xl">{percent}%</p>
                  <p className="text-black font-semibold text-xs pt-1">
                    Godkända
                  </p>
                </div>
              </div>
              <p className="text-black font-semibold text-sm tracking-tight pt-4 p-2">
                {receiptDone} av {receiptsCount} Kvittogodkännande
              </p>
            </div>
          </div>

          {/* Statistikpanel */}
          <div className="col-span-1 bg-white rounded-xl shadow-lg px-6 py-6">
            <h2 className="text-lg font-bold text-[#232F21]">
              Statistik per besvarad fråga
            </h2>
            <p className="text-sm text-[#797979] mt-1">Mitt team</p>

            <ul className="text-sm text-[#232F21] mt-4 space-y-1">
              {barData.map((q, i) => (
                <li key={i}>
                  {i + 1}. {q.label}
                </li>
              ))}
            </ul>

            {/* Stapeldiagram */}
            <div className="mt-6">
              <div className="w-full h-40 bg-[#F2F2F2] flex items-end gap-2 px-4 py-2 rounded">
                {barData.map((item, i) => {
                  let color = "#AEB396";
                  if (item.level === "med") color = "#C4C7B4";
                  if (item.level === "low") color = "#DEDED7";
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
              <div className="flex justify-between text-[10px] text-[#797979] px-4 mt-1">
                {barData.map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-end gap-4 mt-4 pr-2 text-xs text-[#232F21]">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#AEB396]" />
                  Hög
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#C4C7B4]" />
                  Medel
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#DEDED7]" />
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
