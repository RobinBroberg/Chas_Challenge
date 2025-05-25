"use client";

import { IoReceiptOutline } from "react-icons/io5";
import { uploadReceipt } from "@/services/api";
import { useRef, useState, useEffect } from "react";

export default function ReceiptUpload({ onUploadSuccess }) {
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const result = await uploadReceipt(file);
      const { amount, vendor } = result.data || {};

      if (amount && vendor) {
        setToast({
          message: `Kvitto från ${vendor} på ${amount} kr har laddats upp`,
          type: "success",
        });
      } else if (amount) {
        setToast({
          message: `Kvitto uppladdat! ${amount} kr beräknat`,
          type: "success",
        });
      } else {
        setToast({
          message: "Kvitto uppladdat, men AI kunde inte läsa beloppet.",
          type: "warning",
        });
      }

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      setToast({
        message: `Fel vid uppladdning: ${err.message}`,
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

  const getToastStyles = () => {
    return (
      "fixed top-6 right-6 z-50 px-6 py-4 shadow-lg text-sm font-medium bg-white border border-[#A3B17C] max-w-xs" +
      " rounded-tr-2xl rounded-br-2xl rounded-bl-2xl rounded-tl-none"
    );
  };

  return (
    <>
      {toast.message && (
        <div className={getToastStyles()}>
          <div className="text-gray-900 font-semibold mb-1 text-base">
            Kvitto uppladdat!
          </div>
          <div className="text-gray-600 text-sm">{toast.message}</div>
        </div>
      )}

      <div className="flex justify-between items-center w-full">
        <p className="font-semibold text-sm">Belopp</p>

        <label htmlFor="receipt-upload" className="cursor-pointer">
          <IoReceiptOutline className="text-xl hover:text-[#C8B5A7]" />
        </label>

        <input
          id="receipt-upload"
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
      </div>
    </>
  );
}
