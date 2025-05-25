import React from "react";
import Link from "next/link";
import { VscArrowCircleRight } from "react-icons/vsc";

const WellnessCard = ({
  remainingBalance = 0,
  totalAllowance = 0,
  remainingDays = 0,
}) => {
  return (
    <div className="bg-[#565E40] text-white p-4 rounded-xl shadow-[inset_0_10px_10px_-6px_rgba(255,255,255,0.4)] flex flex-col justify-between md:h-[140px] h-[160px]">
      <div className="flex justify-between items-start">
        <p className="font-bold md:hidden">FRISKVÅRDSPOTT</p>
        <p className="font-bold hidden md:inline">FRISKVÅRDSPOTT</p>
        <p className="text-xs font-semibold hidden md:block">
          {remainingDays} dagar kvar
        </p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <p className="text-3xl font-semibold">
          {remainingBalance} / {totalAllowance} kr
        </p>
        <Link href="/friskvard">
          <VscArrowCircleRight className="text-white text-3xl ml-4 hidden md:inline cursor-pointer hover:scale-110 transition-transform" />
        </Link>
      </div>

      <div className="flex justify-end md:hidden">
        <p className="text-xs font-semibold">{remainingDays} dagar kvar</p>
      </div>
    </div>
  );
};

export default WellnessCard;
