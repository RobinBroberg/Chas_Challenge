"use client";
import { FiCheck } from "react-icons/fi";
export default function FormResult() {
  return (
    <div className="bg-white text-black flex flex-col items-center  justify-center p-20">
      <h1 className="font-Wix Madefor Display font-semibold text-4xl">
        Balansundersökning genomförd!
      </h1>
      <h2 className="font-Montserrat font-normal text-2xl pt-14">Tack!</h2>
      <h3 className="font-Montserrat font-normal text-2xl">
        Dina svar har skickats
      </h3>
      <div className="w-[225px] h-[225px] border-[0.45px] border-black rounded-full bg-[#DAE0D3] flex items-center justify-center mt-16">
        <FiCheck className="h-[120px] w-[120px] text-[#56584D]" />
      </div>
    </div>
  );
}
