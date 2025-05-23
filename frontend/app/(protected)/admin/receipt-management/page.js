"use client";
import { RiGroupLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { approveReceipt, rejectReceipt, getAllReceipts } from "@/services/api";

export default function ReceiptManagement() {
  const [allReceipts, setAllReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [rejectModal, setRejectModal] = useState({ open: false, id: null });
  const [rejectReason, setRejectReason] = useState("");
  const [toast, setToast] = useState({ message: "", type: "" });

  useEffect(() => {
    async function fetchReceipts() {
      try {
        const data = await getAllReceipts();
        setAllReceipts(data);
      } catch (err) {
        console.error("Error fetching receipts:", err);
        setError("Kunde inte hämta kvitton");
      } finally {
        setLoading(false);
      }
    }

    fetchReceipts();
  }, []);

  const pendingReceipts = allReceipts.filter((r) => r.status === "pending");
  const receiptsCount = allReceipts.length;
  const pending = pendingReceipts.length;
  const receiptDone = allReceipts.filter((r) => r.status === "approved").length;
  const percent =
    receiptsCount > 0 ? Math.round((receiptDone / receiptsCount) * 100) : 0;

  const handleApprove = async (id) => {
    try {
      await approveReceipt(id);
      setAllReceipts((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
      );

      setToast({ message: "Kvittot godkänt", type: "success" });
    } catch (err) {
      setToast({
        message: err.message || "Kunde inte godkänna kvittot",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (toast.message) {
      const timeout = setTimeout(
        () => setToast({ message: "", type: "" }),
        4000
      );
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  return (
    <div className="bg-[#EAE9E4] p-4 md:p-8">
      {toast.message && (
        <div className="bg-[#4A5A41] text-white fixed top-20 right-14 z-50 px-4 py-2 rounded shadow text-sm font-semibold font-montserrat">
          {toast.message}
        </div>
      )}

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
                {receiptsCount}{" "}
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
                    {receipt.first_name} {receipt.last_name}
                  </td>
                  <td className="text-lg md:text-xl px-6 py-4 text-black">
                    {new Date(receipt.uploaded_at).toLocaleDateString("sv-SE")}
                  </td>
                  <td className="text-lg md:text-xl px-6 py-4 text-black">
                    {receipt.amount}
                  </td>
                  <td className="text-lg md:text-xl  px-6 py-4">
                    <button
                      className="text-lg md:text-xl underline cursor-pointer text-black"
                      onClick={() =>
                        setModalImage(
                          `${process.env.NEXT_PUBLIC_API_URL}/${receipt.file_path}`
                        )
                      }
                    >
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
                        onClick={() =>
                          setRejectModal({ open: true, id: receipt.id })
                        }
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

        {modalImage && (
          <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-lg max-w-[90%] max-h-[90%] overflow-auto">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setModalImage(null)}
                  className="text-black font-bold"
                >
                  Stäng ✕
                </button>
              </div>
              <img
                src={modalImage}
                alt="Receipt"
                className="max-w-full max-h-[80vh]"
              />
            </div>
          </div>
        )}

        {rejectModal.open && (
          <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 ">
            <div className="bg-[#EAE9E4] p-6 border-2 border-[#232F21] rounded shadow max-w-md w-10/12 space-y-4">
              <h2 className="text-xl font-semibold text-black">
                Avvisa kvitto
              </h2>
              <p className="text-black text-sm">
                Ange en anledning till avslag:
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
                className="w-full border focus:border-[#4A5A41] focus:ring-[#4A5A41] focus:outline-none p-2 rounded text-black"
                placeholder="Skriv din anledning här..."
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    setRejectModal({ open: false, id: null });
                    setRejectReason("");
                  }}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Avbryt
                </button>
                <button
                  onClick={async () => {
                    if (!rejectReason.trim()) return;

                    try {
                      await rejectReceipt(rejectModal.id, rejectReason);
                      setAllReceipts((prev) =>
                        prev.filter((r) => r.id !== rejectModal.id)
                      );
                      setRejectModal({ open: false, id: null });
                      setRejectReason("");
                    } catch (err) {
                      alert(err.message || "Kunde inte avvisa kvittot");
                    }
                  }}
                  className="px-4 py-2 bg-gradient-to-br from-[#232F21] to-[#718065] text-white rounded"
                >
                  Avvisa
                </button>
              </div>
            </div>
          </div>
        )}

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
                  {receipt.first_name} {receipt.last_name}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-[#D3DEC9] mx-4 pb-2">
                <span className="text-black text-base font-semibold">
                  Datum
                </span>
                <span className="text-black text-base text-right">
                  {new Date(receipt.uploaded_at).toLocaleDateString("sv-SE")}
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
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/${receipt.file_path}`}
                  target="_blank"
                >
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
                  <button
                    onClick={() =>
                      setRejectModal({ open: true, id: receipt.id })
                    }
                  >
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
