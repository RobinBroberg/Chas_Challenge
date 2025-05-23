"use client";

import React, { useState } from "react";
import { Check, X, Eye, Users } from "lucide-react";

export default function ReceiptManagement() {
  const [receipts, setReceipts] = useState([
    {
      id: 1,
      name: "Blanca R.",
      date: "2025-02-10",
      amount: "1500 kr",
      status: "approved",
    },
    {
      id: 2,
      name: "Erik S.",
      date: "2025-02-08",
      amount: "2200 kr",
      status: "pending",
    },
    {
      id: 3,
      name: "Maria L.",
      date: "2025-02-05",
      amount: "800 kr",
      status: "approved",
    },
    {
      id: 4,
      name: "Amanda S.",
      date: "2025-02-10",
      amount: "1000 kr",
      status: "pending",
    },
  ]);

  const pendingReceipts = receipts.filter((r) => r.status === "pending");
  const totalReceipts = receipts.length;
  const approvedPercentage = Math.round(
    (receipts.filter((r) => r.status === "approved").length / totalReceipts) *
      100
  );
  const approvedCount = receipts.filter((r) => r.status === "approved").length;
  const awaitingApproval = pendingReceipts.length;

  const handleApprove = (id) => {
    setReceipts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
    );
  };

  const handleReject = (id) => {
    setReceipts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
    );
  };

  return (
    <div className="min-h-screen bg-[#EAE9E4] p-4 md:p-6 font-montserrat">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black my-6">
            Kvittohantering
          </h1>

          <p className="text-sm font-semibold">
            Översikt över inskickade kvitton och åtgärder
          </p>
        </div>

        {/* Grid Layout - Mobile: 1 column, Desktop: 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
          {/* Approval Card */}
          <div className="lg:col-span-1 bg-white rounded-sm p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Kvittogodkännande</h3>
            </div>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient
                      id="ringGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#aeb396" />
                      <stop offset="100%" stopColor="#232F21" />
                    </linearGradient>
                  </defs>

                  {/* Bakgrundscirkel */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#C7CBBB"
                    strokeWidth="16"
                    fill="none"
                  />

                  {/* Godkänd-procent cirkel med gradient */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="url(#ringGradient)"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${(approvedPercentage / 100) * 251}, 251`}
                    strokeDashoffset="0"
                    strokeLinecap="butt"
                  />
                </svg>

                {/* Text i mitten */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-semibold">
                      {approvedPercentage}%
                    </div>
                    <div className="text-xs font-semibold">godkända</div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-sm font-semibold">
              {approvedCount + 12} av {totalReceipts + 12} kvitton godkända
            </p>
          </div>

          {/* Stats Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#BABEA7] rounded-sm p-8 shadow-sm flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div>
                <Users className="w-12 h-12" />
              </div>
              <div className="text-center md:text-left flex flex-col md:flex-row items-center md:items-baseline space-y-1 md:space-y-0 md:space-x-2">
                <div className="text-6xl font-bold">30</div>
                <div className="text-lg">
                  {" "}
                  <span className="font-bold"> kvitton</span> totalt
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#aeb396] to-[#232F21] rounded-sm p-8 shadow-sm flex flex-col items-center justify-center">
              <div className="text-center flex flex-col md:flex-row items-center md:items-baseline space-y-1 md:space-y-0 md:space-x-2">
                <div className="text-6xl font-bold">{awaitingApproval}</div>
                <div className="text-lg opacity-90 text-white pl-2">
                  väntar på godkännande
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Approval Table/Card Section */}
        <div className="bg-white rounded-sm shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-black">
              Kvitton att godkänna
            </h2>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {pendingReceipts.map((receipt) => (
              <div
                key={receipt.id}
                className="p-6 border-b border-gray-200 last:border-b-0"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm mb-1">Namn</div>
                      <div className="font-medium">{receipt.name}</div>
                    </div>
                    <div>
                      <div className="text-sm  mb-1">Datum</div>
                      <div className="">{receipt.date}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm  mb-1">Belopp</div>
                      <div className="font-semibold ">{receipt.amount}</div>
                    </div>
                    <div>
                      <div className="text-sm  mb-1">Kvitto</div>
                      <button className="text-black hover:text-blue-800 underline">
                        Visa kvitto
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-2">Åtgärd</div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApprove(receipt.id)}
                        className="bg-black hover:bg-gray-800 text-white p-3 rounded-full"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleReject(receipt.id)}
                        className="bg-black hover:bg-gray-800 text-white p-3 rounded-full"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-base font-medium text-black">
                    Namn
                  </th>
                  <th className="px-6 py-4 text-left text-base font-medium text-black">
                    Datum
                  </th>
                  <th className="px-6 py-4 text-left text-base font-medium text-black">
                    Belopp
                  </th>
                  <th className="px-6 py-4 text-left text-base font-medium text-black">
                    Kvitto
                  </th>
                  <th className="px-6 py-4 text-left text-base font-medium text-black">
                    Åtgärd
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingReceipts.map((receipt, index) => (
                  <tr
                    key={receipt.id}
                    className={`${
                      index !== pendingReceipts.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-black">{receipt.name}</td>
                    <td className="px-6 py-4 text-black">{receipt.date}</td>
                    <td className="px-6 py-4 text-black">{receipt.amount}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 underline">
                        Visa kvitto
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleApprove(receipt.id)}
                          className="bg-black hover:bg-gray-800 text-white p-2 rounded-full"
                          title="Godkänn"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(receipt.id)}
                          className="bg-black hover:bg-gray-800 text-white p-2 rounded-full"
                          title="Avslå"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pendingReceipts.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Inga kvitton väntar på godkännande
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
