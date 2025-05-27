"use client";
import ProfileSidebar from "@/components/ProfileSidebar";

import { useEffect, useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { getAllowance, getCurrentUser } from "@/services/api";
import ProfileCard from "@/components/ProfileCard";
import WellnessCard from "@/components/WellnessCard";

export default function profileManager() {
  const [user, setUser] = useState(null);
  const [remainingBalance, setRemainingBalance] = useState(null);
  const [totalAllowance, setTotalAllowance] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const formattedDate = `Datum: ${today.getDate()}/${
    today.getMonth() + 1
  } - ${today.getFullYear()}`;

  // Antal dagar kvar av friskvård
  const endOfYear = new Date(today.getFullYear(), 11, 31);
  const msPerDay = 1000 * 60 * 60 * 24;
  const remainingDays = Math.ceil((endOfYear - today) / msPerDay);

  useEffect(() => {
    async function fetchData() {
      try {
        const [user, allowance] = await Promise.all([
          getCurrentUser(),
          getAllowance(),
        ]);

        setUser({
          ...user,
          avatar: user.avatar || "/managerProfile.png",
        });

        setRemainingBalance(allowance.remaining);
        setTotalAllowance(allowance.total);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div
      className="flex min-h-screen bg-cover bg-center justify-center"
      style={{ backgroundImage: 'url("/EmployeeBG.png")' }}
    >
      <div className="flex">
        <div className="hidden md:block mt-34 mr-8">
          <ProfileSidebar />
        </div>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 sm:p-6 w-full max-w-screen-xl mx-auto mb-12">
          <div className="col-span-1 md:col-span-3">
            <h1 className="text-2xl font-semibold mb-5 text-white">Profil</h1>
            <p className="text-white mt-1 mb-2 font-medium relative inline-block after:block after:h-[1px] after:bg-white after:w-full md:after:w-[750px] after:mt-3">
              Hej {user.first_name}! Välkommen in här får du koll på teamets
              puls och dina viktigaste uppgifter.
            </p>
          </div>
          <div className="block md:hidden ">
            <ProfileSidebar />
          </div>
          {/* Profilkort */}
          <ProfileCard title="HR" user={user} />

          {/* Kolum 2 */}
          <div className="order-3 md:order-none md:col-span-1 flex flex-col h-full gap-6 md:h-[720px]">
            <div className="bg-white/70 text-black p-4 rounded-xl min-h-[250px] flex flex-col justify-start shadow-[inset_0_10px_10px_-6px_rgba(255,255,255,0.4)] md:basis-1/2">
              <div className="mt-2">
                <h1 className="font-bold mb-10">ONBOARDA PERSONAL</h1>
                <p className="mt-4 text-2xl">
                  Registrera nyanställda och starta deras onboarding direkt
                </p>

                <div className="flex justify-end mt-20 mr-6">
                  <Link
                    href="/admin/add-user"
                    className=" text-5xl text-black hover:text-green-900 cursor-pointer transition"
                  >
                    <IoArrowForwardCircleOutline />
                  </Link>
                </div>
              </div>
            </div>

            {/* Kvittogodkännande */}
            <div className="order-4 md:order-none md:col-span-1 bg-white/75 border-white p-4 rounded-xl min-h-[150px] md:min-h-[360px] flex flex-col justify-between shadow md:basis-1/2">
              <div>
                <h2 className="font-bold mb-6 text-black">KVITTOGODKÄNNANDE</h2>
                <p className="mt-10 text-2xl text-black">
                  Granska och godkänn inlämnade kvitto samt säkerställ att alla
                  uppgifter är korrekta
                </p>
              </div>
              <div className="flex justify-end mb-5 mr-6">
                <Link
                  href="/admin/receipt-management"
                  className=" text-5xl text-black hover:text-green-900 cursor-pointer transition"
                >
                  <IoArrowForwardCircleOutline />
                </Link>
              </div>
            </div>
          </div>

          <div className="order-2 md:order-none md:col-span-1 flex flex-col gap-6 md:h-[720px]">
            {/* Kolum 3 */}
            <div className="order-2 grid grid-cols-2 gap-4 md:grid-cols-1">
              {/* Friskvård */}
              <WellnessCard
                remainingBalance={remainingBalance}
                totalAllowance={totalAllowance}
                remainingDays={remainingDays}
              />

              {/* Quote */}
              <div className="bg-white/10 backdrop-blur-sm shadow-md text-white p-4 rounded-xl border border-white md:h-[180px]">
                <div className="flex items-center justify-start gap-2 mb-2">
                  <h2 className="font-bold text-sm">DAGENS QUOTE</h2>
                  <img
                    src="/flower.png"
                    alt="Citatikon"
                    className="w-4 h-4 object-contain"
                  />
                </div>
                <p className="text-sm mt-8 font-semibold">
                  Att logga ut en stund kan ge mer klarhet än att jobba över
                </p>
              </div>
            </div>

            {/* Balansundersökningar */}
            <div className="order-5 md:order-last bg-white/90 border-white p-4 rounded-xl shadow-md md:h-[360px] flex flex-col">
              <h2 className="font-bold mb-4 text-black">
                SKICKA UT BALANSUNDERSÖKNINGAR
              </h2>
              <p className="text-black text-2xl text-center m-8">
                Skicka ut en ny balansundersökning för att samla
                medarbetarfeedback
              </p>

              <div className="flex justify-center">
                <Link href="/admin/surveys">
                  <button className="bg-gradient-to-r mb-3 from-[#5b6142] to-[#343a28] hover:from-[#6f7650] hover:to-[#3e4531] text-white font-medium py-4 px-15 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-fit">
                    Till frågorna
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
