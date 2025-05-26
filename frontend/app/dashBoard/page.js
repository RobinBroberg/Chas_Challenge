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
    let level = "low";
    if (q.average_score >= 80) level = "high";
    else if (q.average_score >= 60) level = "med";
    return {
      val: q.average_score ? Math.round(q.average_score) : 0,
      level,
      label: q.question_text,
    };
  });

  // ----------------------- LOADING STATE -----------------------
  if (loading)
    return <div className="text-center py-20 text-xl">Laddar...</div>;

  // ----------------------- UI -----------------------
  return (
    <div className="min-h-screen bg-[#B8AFA7] py-4 px-4">
      {/* ----------------------- CONTAINER ----------------------- */}
      <div className="w-full max-w-[1440px] mx-auto bg-[#E8E6E0] px-10 py-8 mt-4 rounded shadow-sm">
        {/* ----------------------- HEADER ----------------------- */}
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

        {/* ----------------------- GRID LAYOUT ----------------------- */}
        <div className="grid grid-cols-3 gap-6">
          {/* ----------------------- KORTSEKTION (VÄNSTER) ----------------------- */}
          <div className="col-span-1 grid grid-cols-2 gap-6">
            {/* ---- Medarbetare ---- */}
            <div className="bg-gradient-to-br from-[#AEB396] to-[#232F21] text-white rounded-xl shadow-md flex flex-col items-center justify-center text-center h-[220px]">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl mb-3">
                👥
              </div>
              <p className="text-4xl font-bold">{noneAdmins.length}</p>
              <p className="text-sm mt-1">Medarbetare</p>
            </div>

            {/* ---- Friskvårdsbidrag ---- */}
            <div className="bg-[#DEDED7] text-[#232F21] rounded-xl shadow-md flex flex-col justify-center items-start px-6 h-[220px]">
              <p className="text-[16px] font-semibold tracking-tight text-black text-left">
                Användning av friskvårdsbidrag
              </p>
              <p className="text-[10px] text-[#A4A4A4] mt-1">
                Totalt kvitton godkända
              </p>
              <p className="text-4xl font-bold mt-4 text-black">
                {receiptDone}/{receiptsCount}
              </p>
            </div>

            {/* ---- Balansundersökning ---- */}
            <div className="bg-[#DEDED7] text-[#232F21] rounded-xl shadow-md flex flex-col justify-center items-center text-center px-4 h-[250px]">
              <p className="text-xs font-semibold text-[#797979]">
                Balansundersökning
              </p>
              <p className="text-[10px] text-[#A4A4A4] mt-1">
                Besvarade undersökningar
              </p>
              <p className="text-4xl font-bold mt-4">27/30</p>
            </div>

            {/* ---- Kvittogodkännande ---- */}
            <div className="bg-gradient-to-br from-[#AEB396] to-[#232F21] text-white rounded-xl shadow-md flex flex-col justify-center items-center text-center px-4 h-[250px]">
              <div className="flex justify-center items-center p-2 gap-2">
                <h2 className="font-semibold text-base tracking-tight">
                  Kvittogodkännande
                </h2>
                <img src="/Vector.png" alt="ikon" />
              </div>
              <div
                className="w-[120px] h-[120px] rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(
                    #BABEA7 0% ${100 - percent}%,
                    #ffffff ${100 - percent}%,
                    #99AE86 100%
                  )`,
                }}
              >
                <div className="w-[80px] h-[80px] rounded-full bg-white flex flex-col items-center justify-center text-[#4A5A41]">
                  <p className="text-lg font-semibold">{percent}%</p>
                  <p className="text-xs">godkända</p>
                </div>
              </div>
              <p className="text-xs mt-3 text-white">
                {receiptDone} av {receiptsCount}
              </p>
            </div>
          </div>

          {/* ----------------------- STATISTIK (HÖGER) ----------------------- */}
          <div className="col-span-2 bg-white rounded-xl shadow-lg px-6 py-6">
            {/* ---- Rubrik och beskrivning ---- */}
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-[#232F21]">
                Statistik per besvarad fråga
              </h2>
              <p className="text-sm text-[#797979] mt-1">Mitt team</p>

              {/* ---- Info + Legend ---- */}
              <div className="flex flex-col items-end">
                <p className="text-[12px] font-semibold leading-[1.7] text-[#232F21] text-right">
                  Färgerna visualiserar medarbetarnas upplevelse
                  <br />
                  av arbetsmiljön
                </p>
                <div className="flex flex-col gap-2 text-xs text-[#232F21] mt-6">
                  <div className="flex items-center gap-x-2">
                    <span>Hög</span>
                    <div className="w-6 h-6 rounded-sm bg-[#AEB396]" />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <span>Medel</span>
                    <div className="w-6 h-6 rounded-sm bg-[#C4C7B4]" />
                  </div>
                  <div className="flex items-center gap-x-4">
                    <span>Låg</span>
                    <div className="w-6 h-6 rounded-sm bg-[#DEDED7]" />
                  </div>
                </div>
              </div>
            </div>

            {/* ---- Frågelista ---- */}
            <ul className="text-sm text-[#232F21] mt-4 space-y-1">
              {barData.map((q, i) => (
                <li key={i}>
                  {i + 1}. {q.label}
                </li>
              ))}
            </ul>

            {/* ---- Stapeldiagram ---- */}
            <div className="mt-2">
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="h-40 bg-[#F2F2F2] flex items-end gap-2 px-4 py-2 rounded">
                    {barData.map((item, i) => {
                      let color =
                        "bg-gradient-to-br from-[#AEB396] to-[#232F21]";
                      if (item.level === "med")
                        color = "bg-gradient-to-br from-[#C4C7B4] to-[#232F21]";
                      if (item.level === "low")
                        color = "bg-gradient-to-br from-[#DEDED7] to-[#232F21]";
                      return (
                        <div
                          key={i}
                          className={`w-4 rounded-t ${color}`}
                          style={{ height: `${item.val * 0.8}px` }}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-[10px] text-[#797979] px-4 mt-1">
                    {barData.map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
