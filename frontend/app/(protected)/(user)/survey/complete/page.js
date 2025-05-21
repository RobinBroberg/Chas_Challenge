"use client";
import { FiCheck } from "react-icons/fi";
export default function FormResult() {
  return (
    <div className="bg-white text-black flex flex-col items-center justify-center p-14 sm:p-18 md:p-20">
      <h1 className="font-Wix Madefor Display font-semibold text-xl sm:text-3xl md:text-4xl lg:text-5xl">
        Balansundersökning genomförd!
      </h1>
      <h2 className="font-Montserrat font-normal text-lg sm:text-2xl md:text-3xl pt-6 sm:pt-8 md:pt-14">
        Tack!
      </h2>
      <h3 className="font-Montserrat font-normal text-lg sm:text-2xl md:text-3xl">
        Dina svar har skickats
      </h3>
      <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[225px] md:h-[225px] border-[0.45px] border-black rounded-full bg-[#DAE0D3] flex items-center justify-center mt-8 sm:mt-12 md:mt-16">
        <FiCheck className="h-[90px] w-[90px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] text-[#56584D]" />
      </div>
    </div>
  );
}
