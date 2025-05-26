"use client";

import React, { useEffect, useState } from "react";
import { getAllReceipts, getCompanyAverages, getUsers } from "@/services/api";

export default function DashboardPage() {
  // ----------------------- STATE -----------------------
  const [receipts, setReceipts] = useState([]);
  const [averages, setAverages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ----------------------- FETCH DATA -----------------------
  useEffect(() => {
    async function fetchData() {
      try {
        const [receiptsData, averagesData, usersData] = await Promise.all([
          getAllReceipts(),
          getCompanyAverages(),
          getUsers(),
        ]);
        setReceipts(receiptsData);
        setAverages(averagesData);
        setUsers(usersData);
      } catch (err) {
        alert("Kunde inte hämta dashboard-data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ----------------------- BEREGNINGAR -----------------------
  const noneAdmins = users.filter((u) => u.role !== "admin");
  const receiptDone = receipts.filter((r) => r.status === "approved").length;
  const receiptsCount = receipts.length;
  const percent =
    receiptsCount > 0 ? Math.round((receiptDone / receiptsCount) * 100) : 0;

  const barData = averages.slice(0, 8).map((q) => {
    let level = "high";
    if (q.average_score < 2.5) level = "low";
    else if (q.average_score < 3.5) level = "med";

    return {
      val: q.average_score ? Math.round(q.average_score * 10) : 0, // to scale the bar height
      level,
      label: q.question_text,
    };
  });

  // ----------------------- LOADING STATE -----------------------
  if (loading)
    return <div className="text-center py-20 text-xl">Laddar...</div>;

  // ----------------------- UI -----------------------
  return (
    <div className="min-h-screen bg-[#EAE9E4] py-4 px-4">
      <div className="w-full  mx-auto  px-6 md:px-10 py-8 mt-4 rounded shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6 flex-wrap gap-4">
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

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Left: Summary cards */}
          <div className="grid grid-cols-2 gap-6 col-span-1">
            {/* Medarbetare */}
            <div className="bg-gradient-to-br from-[#AEB396] to-[#232F21] text-white rounded-xl shadow-md flex flex-col items-center justify-center text-center h-[200px] sm:h-[220px] lg:h-[250px]">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl mb-3">
                👥
              </div>
              <p className="text-4xl font-bold">{noneAdmins.length}</p>
              <p className="text-sm mt-1">Medarbetare</p>
            </div>

            {/* Friskvårdsbidrag */}
            <div
              className="bg-[#A3B17C] text-[#232F21] rounded-xl shadow-md flex flex-col justify-center  px-6 h-[200px] sm:h-[220px] lg:h-[250px]"
              style={{ backgroundColor: "rgba(163, 177, 124, 0.5)" }}
            >
              <p className="text-[16px] font-semibold  text-black text-center">
                Användning av friskvårdsbidrag
              </p>
              <p className="text-[13px]  mt-1 text-center">
                Totalt kvitton godkända
              </p>
              <p className="text-4xl font-bold mt-4 text-[#232F21] text-center">
                {receiptDone}/{receiptsCount}
              </p>
            </div>

            {/* Balansundersökning */}
            <div
              className="bg-[#A3B17C] text-[#232F21] rounded-xl shadow-md flex flex-col justify-center items-center text-center px-4 h-[250px] sm:h-[220px] lg:h-[250px] col-span-2 sm:col-span-1"
              style={{ backgroundColor: "rgba(163, 177, 124, 0.5)" }}
            >
              <p className="text-xs font-semibold text-black">
                Balansundersökning
              </p>
              <p className="text-[10px]  mt-1">Besvarade undersökningar</p>
              <p className="text-4xl font-bold mt-4">27/30</p>
            </div>

            {/* Kvittogodkännande */}
            <div className="bg-gradient-to-br from-[#AEB396] to-[#232F21] text-white rounded-xl shadow-md flex flex-col justify-center items-center text-center px-4 h-[250px] sm:h-[220px] lg:h-[250px] col-span-2 sm:col-span-1">
              {/* Title */}
              <div className="flex justify-center items-center gap-2 mb-2">
                <h2 className="font-semibold text-sm tracking-tight">
                  Kvittogodkännande
                </h2>
                <img src="/Vector.png" alt="ikon" className="w-4 h-4" />
              </div>

              {/* Donut */}
              <div
                className="w-[130px] h-[130px] rounded-full flex items-center justify-center shadow-inner"
                style={{
                  background: `conic-gradient(
                    #232F21 0% ${percent}%,
                    #ffffff ${percent}% 100%
                    )`,
                  boxShadow: "inset 4px 4px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="w-[90px] h-[90px] rounded-full bg-white flex flex-col items-center justify-center text-[#4A5A41] shadow-md">
                  <p className="text-[18px] font-bold">{percent}%</p>
                  <p className="text-[11px] font-medium -mt-1">godkända</p>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-xs mt-3 text-white opacity-90 font-medium">
                {receiptDone} av {receiptsCount}
              </p>
            </div>
          </div>

          {/* Right: Statistics panel */}
          <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-lg px-6 py-6 flex flex-col lg:flex-row items-center lg:items-start gap-6 h-full">
            {/* Left: Questions */}
            <div className="flex-1">
              <h2 className="text-lg font-bold text-[#232F21] mb-1">
                Statistik per besvarad fråga
              </h2>
              <p className="text-sm text-[#797979] mb-4">Mitt team</p>
              <ul className="text-sm text-[#232F21] space-y-1">
                {barData.map((q, i) => (
                  <li key={i}>
                    {i + 1}. {q.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Middle: Custom Bar Chart */}
            <div className="flex flex-col items-center flex-[0.8]">
              {/* Right: Legend */}
              <div className="flex flex-col justify-center items-end flex-1 text-xs text-[#232F21]">
                <p className="text-[12px] font-semibold leading-relaxed text-right mb-3">
                  Färgerna visualiserar medarbetarnas upplevelse
                  <br />
                  av arbetsmiljön
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-x-2">
                    <span>Hög</span>
                    <div className="w-6 h-6 rounded-sm bg-[#AEB396]" />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <span>Medel</span>
                    <div className="w-6 h-6 rounded-sm bg-[#C4C7B4]" />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <span>Låg</span>
                    <div className="w-6 h-6 rounded-sm bg-[#DEDED7]" />
                  </div>
                </div>
              </div>

              <div className="w-full max-w-[360px] h-[250px]  flex items-end gap-5 px-4 py-2 rounded">
                {barData.map((item, i) => {
                  let color = "bg-gradient-to-br from-[#AEB396] to-[#232F21]";
                  if (item.level === "med")
                    color = "bg-gradient-to-br from-[#C4C7B4] to-[#AEB396]";
                  if (item.level === "low")
                    color = "bg-gradient-to-br from-[#DEDED7] to-[#C4C7B4]";
                  return (
                    <div
                      key={i}
                      className={`w-5 px-3 rounded-t ${color}`}
                      style={{ height: `${item.val * 4}px` }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-[#797979] w-full max-w-[360px] px-4 mt-1">
                {barData.map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
