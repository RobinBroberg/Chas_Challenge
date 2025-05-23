"use client";

import { IoReceiptOutline } from "react-icons/io5";
import { uploadReceipt } from "@/services/api";
import { useRef } from "react";

export default function ReceiptUpload({ onUploadSuccess }) {
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const result = await uploadReceipt(file);
      const { amount, vendor } = result.data || {};

      if (amount && vendor) {
        alert(`Kvitto från ${vendor} på ${amount} kr har laddats upp`);
      } else if (amount) {
        alert(`Kvitto uppladdat! ${amount} kr beräknat`);
      } else {
        alert("Kvitto uppladdat, men AI kunde inte läsa beloppet.");
      }
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      alert(`Fel vid uppladdning: ${err.message}`);
    }
  };

  return (
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
  );
}
