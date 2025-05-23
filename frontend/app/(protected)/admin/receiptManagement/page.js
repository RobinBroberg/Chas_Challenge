"use client";
import { useState } from "react";
import { RiGroupLine } from "react-icons/ri";

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
  const pendingReceipts = receipts.filter(
    (receipt) => receipt.status === "pending"
  );

  const handleApprove = (id) => {
    setReceipts((prev) =>
      prev.map((receipt) =>
        receipt.id === id ? { ...receipt, status: "approved" } : receipt
      )
    );
    alert("Kvittot godkänt");
  };

  const handleReject = (id) => {
    setReceipts((prev) =>
      prev.map((receipt) =>
        receipt.id === id ? { ...receipt, status: "rejected" } : receipt
      )
    );
    alert("Kvittot nekad");
  };

  // const handleAccept = () => {
  //   alert("Kvittot godkänt");
  // };
  // const handleDenied = () => {
  //   alert("Kvittot nekad");
  // };

  const receiptsCount = 30;
  const pending = 1;
  const receiptDone = 18;
  const percent = 60;

  return (
    <div className="bg-[#EAE9E4] p-4 md:p-8">
      <div className="font-montserrat text-black tracking-wider space-y-4">
        <h1 className="font-bold text-2xl md:text-3xl">Kvittohantering</h1>
        <h2 className="font-semibold text-sm md:text-lg">
          Översikt över inskickade kvitton och åtgärder
        </h2>
      </div>
      <div className="sm:hidden border-b border-[#5F6F52] pt-5 mx-full"></div>

      <div className="w-full flex flex-col md:flex-col lg:flex-row justify-between gap-2 pt-5">
        <div className="w-full md:w-full lg:w-[220px] xl:w-[260px] h-[250px] font-montserrat bg-white border rounded-[5px] flex flex-col justify-center items-center ">
          <div className="text-black flex justify-center p-2 gap-2">
            <h2 className="font-semibold text-base tracking-tight">
              Kvittogodkännande
            </h2>
            <img src="/Vector.png" />
          </div>
          <div
            className="w-[120px] h-[120px] rounded-full flex items-center justify-center"
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
              <p className="text-black font-semibold text-xs pt-1">godkända</p>
            </div>
          </div>
          <p className="text-black font-semibold text-sm tracking-tight pt-4 p-2">
            {receiptDone} av {receiptsCount} godkända
          </p>
        </div>

        <div className="flex flex-1 gap-4">
          <div className="flex-1 h-[164px] sm:h-[250px] bg-[#BABEA7] border rounded-[5px] flex items-center justify-center">
            <div className="flex flex-col sm:flex sm:flex-row items-center px-4">
              <RiGroupLine className="w-[80px] sm:w-[50px] md:w-[100px] h-[80px] sm:h-[100px] sm:mr-6 text-black" />
              <span className="font-montserrat text-black tracking-wider font-bold text-base sm:text-2xl md:text-4xl lg:text-6xl pt-2">
                {receipts.length}{" "}
                <span className=" text-base sm:text-xl md:text-2xl">
                  kvitton{" "}
                  <span className="text-sm sm:text-lg md:text-2xl">totalt</span>
                </span>
              </span>
            </div>
          </div>

          <div className="flex-1 h-[164px] sm:h-[250px] bg-gradient-to-l from-[#232F21] to-[#99AE86] border rounded-[5px] flex items-center justify-center">
            <div className="flex flex-col sm:flex-row items-center justify-center text-center font-montserrat font-bold tracking-widest text-black">
              <span className="text-4xl sm:text-6xl md:text-5xl mb-1 sm:mb-0 sm:mr-4 lg:mr-6">
                {pending}
              </span>
              <span className="pt-4 text-xs sm:text-xl md:text-2xl text-white">
                Väntar på godkännadet
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-full h-auto md:h-[420px] bg-white border rounded-[5px] font-montserrat tracking-wider mt-5 overflow-x-auto">
        <h1 className="font-bold text-xl md:text-2xl text-black p-6 md:p-10">
          Kvitton att godkänna
        </h1>

        {/* Desktop  */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full ">
            <thead>
              <tr className="border-b border-gray-200 ">
                <th className="px-6 py-4 text-left font-semibold text-xl text-black">
                  Namn
                </th>
                <th className="px-6 py-4 text-left font-semibold text-xl text-black">
                  Datum
                </th>
                <th className="px-6 py-4 text-left font-semibold text-xl text-black">
                  Belopp
                </th>
                <th className="px-6 py-4 text-left font-semibold text-xl text-black">
                  Kvitto
                </th>
                <th className="px-6 py-4 text-left font-semibold text-xl text-black">
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
                  <td className="text-lg md:text-xl px-6 py-4 text-black">
                    {receipt.name}
                  </td>
                  <td className="text-lg md:text-xl px-6 py-4 text-black">
                    {receipt.date}
                  </td>
                  <td className="text-lg md:text-xl px-6 py-4 text-black">
                    {receipt.amount}
                  </td>
                  <td className="text-lg md:text-xl  px-6 py-4">
                    <button className="text-lg md:text-xl underline cursor-pointer text-black">
                      Visa kvitto
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <button
                        onClick={() => handleApprove(receipt.id)}
                        title="Godkänn"
                      >
                        <img
                          src="/check-circle-rounded.png"
                          className="w-[30px] h-[30px] cursor-pointer"
                          alt="Approve"
                        />
                      </button>
                      <button
                        onClick={() => handleReject(receipt.id)}
                        title="Avslå"
                      >
                        <img
                          src="/circle-remove.png"
                          className="w-[24px] h-[24px] cursor-pointer"
                          alt="Reject"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden border-b border-[#D3DEC9] mx-4 md:mx-10 "></div>

        {/* Mobile */}
        <div className="flex flex-col sm:p-10 md:hidden">
          {pendingReceipts.map((receipt) => (
            <div
              key={receipt.id}
              className="flex flex-col gap-10 px-6 py-10 border-b border-gray-200"
            >
              <div className="flex justify-between items-center border-b border-[#D3DEC9] mx-4 pb-4">
                <span className="text-black text-base font-semibold">Namn</span>
                <span className="text-black text-base text-right">
                  {receipt.name}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-[#D3DEC9] mx-4 pb-2">
                <span className="text-black text-base font-semibold">
                  Datum
                </span>
                <span className="text-black text-base text-right">
                  {receipt.date}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-[#D3DEC9] mx-4 pb-2">
                <span className="text-black text-base font-semibold">
                  Belopp
                </span>
                <span className="text-black text-base text-right">
                  {receipt.amount}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-[#D3DEC9] mx-4 pb-2">
                <span className="text-black text-base font-semibold">
                  Kvitto
                </span>
                <a className="underline cursor-pointer text-black text-base text-right">
                  Visa kvitto
                </a>
              </div>

              <div className="flex justify-between items-center border-b border-[#D3DEC9] mx-4 pb-2">
                <span className="text-black text-base font-semibold">
                  Åtgärd
                </span>
                <div className="flex items-center gap-2 pl-4 cursor-pointer">
                  <button onClick={() => handleApprove(receipt.id)}>
                    <img
                      src="/check-circle-rounded.png"
                      className="w-[30px] h-[30px] cursor-pointer"
                      alt="Approve"
                    />
                  </button>
                  <button onClick={() => handleReject(receipt.id)}>
                    <img
                      src="/circle-remove.png"
                      className="w-[24px] h-[24px] cursor-pointer"
                      alt="Reject"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
