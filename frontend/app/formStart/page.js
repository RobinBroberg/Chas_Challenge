"use client";
import { useRouter } from "next/navigation";

export default function FormStart() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/form");
  };
  return (
    <div className="bg-white p-20">
      <div className="flex justify-center items-start">
        <div className="border border-[#232F21] rounded-sm w-3xl h-[550px] bg-[#5F6F52] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-Montserrat font-normal text-3xl">
              Du har blivit bjuden till en
            </h2>
            <h2 className="font-Montserrat font-normal text-3xl pb-10">
              Balansundersökning!
            </h2>

            <h3 className="font-Montserrat font-normal text-lg">
              Tidsåtgång: ca 15 min
            </h3>
            <h4 className="font-Montserrat font-normal text-sm p-3">
              Samtliga frågor är obligatoriska
            </h4>
          </div>
          <div className="text-black font-medium text-2xl pt-8 flex gap-10">
            <button
              onClick={handleStart}
              className="bg-white w-44 h-16 rounded-[60px] cursor-pointer"
            >
              Starta
            </button>
            <button className="bg-white w-44 h-16 rounded-[60px] cursor-pointer">
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
