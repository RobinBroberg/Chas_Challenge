"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FormStart() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleStart = () => {
    router.push("/survey/surveyPage");
  };

  const handleInfo = () => {
    router.push("/aboutSurvey");
  };

  return (
    <div
      className={`min-h-screen p-6 sm:p-20  bg-cover bg-center sm:bg-white flex justify-center items-center`}
      style={{
        backgroundImage: isMobile ? "url('/formImage.png')" : "none",
      }}
    >
      <div className="flex flex-col sm:flex-row justify-center items-start  rounded-sm">
        <div className="border border-[#232F21] rounded-sm w-full sm:w-3xl h-[550px] bg-[#5F6F52] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center ">
            <h2 className="font-Montserrat font-normal text-lg sm:text-2xl md:text-3xl text-center">
              Du har blivit bjuden till en
            </h2>
            <h2 className="font-Montserrat font-normal text-lg sm:text-2xl md:text-3xl pb-20 sm:pb-6 text-center">
              Balansundersökning!
            </h2>

            <h3 className="font-Montserrat font-normal text-base md:text-lg text-center">
              Tidsåtgång: ca 15 min
            </h3>
            <h4 className="font-Montserrat font-normal text-sm p-3 text-center">
              Samtliga frågor är obligatoriska
            </h4>
          </div>

          <div className="text-black font-medium text-xl md:text-2xl pt-10 md:pt-8 flex flex-col md:flex-row gap-8 md:gap-10">
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

        {/* Only show image on sm and up */}
        <div className="hidden sm:flex items-center h-[550px]">
          <img
            src="/formImage.png"
            className="h-[500px] w-[415px] border border-[#232F21] rounded-tr-sm rounded-br-sm"
          />
        </div>
      </div>
    </div>
  );
}
