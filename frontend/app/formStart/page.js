"use client";
import { useRouter } from "next/navigation";

export default function FormStart() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/form");
  };

  const handleInfo = () => {
    router.push("/aboutForm");
  };

  return (
    <div className="bg-white p-20">
      <div className="flex justify-center items-start">
        <div className="border border-[#232F21] rounded-sm w-2xl sm:w-3xl h-[550px] bg-[#5F6F52] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-Montserrat font-normal text-xl sm:text-2xl md:text-3xl text-center">
              Du har blivit bjuden till en
            </h2>
            <h2 className="font-Montserrat font-normal text-xl sm:text-2xl md:text-3xl pb-6 text-center">
              Balansundersökning!
            </h2>

            <h3 className="font-Montserrat font-normal text-base md:text-lg text-center">
              Tidsåtgång: ca 15 min
            </h3>
            <h4 className="font-Montserrat font-normal text-sm p-3 text-center">
              Samtliga frågor är obligatoriska
            </h4>
          </div>

          <div className="text-black font-medium text-xl md:text-2xl pt-6 md:pt-8 flex flex-col md:flex-row gap-4 md:gap-10">
            <button
              onClick={handleStart}
              className="bg-white w-40 h-14 md:w-44 md:h-16 rounded-[60px] cursor-pointer"
            >
              Starta
            </button>
            <button
              onClick={handleInfo}
              className="bg-white w-40 h-14 md:w-44 md:h-16 rounded-[60px] cursor-pointer"
            >
              Info
            </button>
          </div>
        </div>

        <div className="flex items-center h-[550px]">
          <img
            src="/formImage.png"
            className="h-[500px] w-[415px] border border-[#232F21] rounded-tr-sm rounded-br-sm"
          />
        </div>
      </div>
    </div>
  );
}
