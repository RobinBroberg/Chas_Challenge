"use client";

import React, { useEffect, useState } from "react";
import { getAllReceipts, getCompanyAverages } from "@/services/api";

export default function DashboardPage() {
  const [receipts, setReceipts] = useState([]);
  const [averages, setAverages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [receiptsData, averagesData] = await Promise.all([
          getAllReceipts(),
          getCompanyAverages(),
        ]);
        setReceipts(receiptsData);
        setAverages(averagesData);
      } catch {
        alert("Kunde inte hämta dashboard-data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-montserrat">Laddar...</div>
    );
  }

  return (
    <main className="min-h-screen bg-[#B8AFA7] py-4 px-4 font-montserrat">
      <section className="w-full max-w-[1440px] mx-auto bg-[#E8E6E0] px-10 py-8 mt-4 rounded-2xl shadow-sm">
        {/* Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-[32px] font-semibold text-[#232F21] tracking-tight">
              Dashboard
            </h1>
            <p className="text-base font-medium leading-[1.7] tracking-[0.02em] text-[#232F21]/70 mt-2">
              Här får du en enkel överblick över teamet och dagens viktiga
              händelser
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-base font-semibold leading-[1.7] tracking-[0.02em] text-[#232F21]">
              HR
            </p>
            <img
              src="/managerProfile.png"
              alt="Profil"
              className="w-10 h-10 rounded-lg object-cover border border-[#232F21]/30"
            />
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side: Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              bg="from-[#AEB396] to-[#232F21]"
              textColor="text-white"
              icon="👥"
              value="30"
              label="Medarbetare"
            />

            <InfoCard
              title="Användning av friskvårdsbidrag"
              subtitle="Totalt kvitton godkända"
              value={`${receiptDone}/${receiptsCount}`}
            />

            <InfoCard
              title="Balansundersökning"
              subtitle="Besvarade undersökningar"
              value="27/30"
            />

            <ReceiptCircle
              percent={percent}
              done={receiptDone}
              total={receiptsCount}
            />
          </div>

          {/* Right side: Statistik */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-semibold leading-[1.7] tracking-[0.02em] text-[#232F21]">
                Statistik per besvarad fråga
              </h2>
              <p className="text-base font-medium leading-[1.7] tracking-[0.02em] text-[#797979] mt-1">
                Mitt team
              </p>
              <div className="h-px w-full bg-[#E0E0DB] my-3" />

              <ul className="space-y-2 text-sm text-[#232F21]">
                {barData.map((item, index) => (
                  <li key={index}>
                    {index + 1}. {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <div className="flex items-end gap-[6px] h-44 bg-[#F2F2F2] rounded px-3 py-2">
                {barData.map((item, index) => {
                  const colors = {
                    high: "#AEB396",
                    med: "#C4C7B4",
                    low: "#DEDED7",
                  };
                  return (
                    <div
                      key={index}
                      className="w-4 rounded-full"
                      style={{
                        height: `${item.val * 1.2}px`,
                        backgroundColor: colors[item.level],
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-[#797979] mt-1 px-1">
                {barData.map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-end gap-4 mt-4 pr-2 text-xs text-[#232F21]">
                <LegendItem color="#AEB396" label="Hög" />
                <LegendItem color="#C4C7B4" label="Medel" />
                <LegendItem color="#DEDED7" label="Låg" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Enhetliga kort
function Card({ bg, textColor, icon, value, label }) {
  return (
    <div
      className={`bg-gradient-to-br ${bg} ${textColor} rounded-2xl shadow-sm p-6 flex items-center gap-4`}
    >
      <div className="w-12 h-12 bg-white/30 flex items-center justify-center rounded-full text-2xl">
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-base font-semibold leading-[1.7] tracking-[0.02em] font-montserrat">
          {label}
        </p>
      </div>
    </div>
  );
}

function InfoCard({ title, subtitle, value }) {
  return (
    <div className="bg-[#DEDED7] text-[#232F21] rounded-3xl shadow-sm p-6 flex flex-col justify-start items-start">
      <p className="text-base font-semibold font-montserrat leading-[1.7] tracking-[0.02em]">
        {title}
      </p>
      <p className="text-base font-medium font-montserrat leading-[1.7] tracking-[0.02em] mt-1 text-[#232F21]/70">
        {subtitle}
      </p>
      <p className="text-3xl font-bold mt-4">{value}</p>
    </div>
  );
}

function ReceiptCircle({ percent, done, total }) {
  return (
    <div className="bg-[#DEDED7] text-[#232F21] rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center">
      <h2 className="text-base font-semibold font-montserrat leading-[1.7] tracking-[0.02em]">
        Kvittogodkännande
      </h2>
      <div
        className="w-[120px] h-[120px] rounded-full flex items-center justify-center mt-4"
        style={{
          background: `conic-gradient(#AEB396 ${percent}%, #E0E0DB 0%)`,
        }}
      >
        <div className="w-[82px] h-[82px] bg-white rounded-full flex flex-col items-center justify-center">
          <p className="text-black font-bold text-xl">{percent}%</p>
          <p className="text-black text-xs pt-1">Godkända</p>
        </div>
      </div>
      <p className="text-sm pt-4">
        {done} av {total} kvitton godkända
      </p>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-base font-medium leading-[1.7] tracking-[0.02em]">
        {label}
      </span>
    </div>
  );
}
