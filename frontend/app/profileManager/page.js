"use client";

import { useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Link from "next/link";

export default function profileManager() {
  const [status, setStatus] = useState(null);



const today = new Date();
const formattedDate = `Datum: ${today.getDate()}/${today.getMonth() + 1} - ${today.getFullYear()}`;

// Antal dagar kvar av friskvård 
const endOfYear = new Date(today.getFullYear(), 11, 31); 
const msPerDay = 1000 * 60 * 60 * 24;
const remainingDays = Math.ceil((endOfYear - today) / msPerDay);

  

  const user = {
    name: "Ryan Garcia",
    email: "Ryan.garcia@gmail.com",
    title: "HR Ansvarig",
    department: "Personalavdelningen",
    avatar: "/managerProfile.png",
  };


return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/EmployeeBG.png")' }}
    >
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 sm:p-6 w-full max-w-screen-xl mx-auto">
  
    
        <div className="col-span-1 md:col-span-3">
          <h1 className="text-2xl font-semibold mb-5 text-white">Profil</h1>
          <p className="text-white mt-1 mb-2 font-medium relative inline-block after:block after:h-[1px] after:bg-white after:w-full md:after:w-[750px] after:mt-3">
            Hej {user.name.split(" ")[0]}! Välkommen in här får du koll på teamets puls och dina viktigaste uppgifter.
          </p>
        </div>
  
        {/* Profilkort */}
        <div className="order-1 md:order-none md:col-span-1 bg-white/75 p-6 pt-4 rounded-xl shadow items-center text-left border border-white flex flex-col md:h-[720px]">
          <div className="w-full h-full flex flex-col justify-start">
            <div className="w-full flex justify-between items-start mt-1 mb-6">
              <p className="font-semibold text-2xl text-black relative inline-block after:block after:h-[1px] after:bg-black after:w-[80px] after:mt-1">
                HR
              </p>
            </div>
  
            <div className="flex justify-center mt-10">
              <img src={user.avatar} className="rounded-full w-45 h-45 md:w-55 md:h-55 object-cover border-2 border-[#5F6F52] shadow-md" alt={user.name} />
            </div>
  
            <div className="mt-13 space-y-6 text-black font-light text-base">
              <div className="border-b border-black pt-2 pb-3 mb-8">{user.name}</div>
              <div className="border-b border-black pt-2 pb-3 mb-8">{user.email}</div>
              <div className="border-b border-black pt-2 pb-3 mb-8">{user.title}</div>
              <div className="border-b border-black pt-2 pb-3 mb-8">{user.department}</div>
            </div>
          </div>
        </div>
  

        {/* Kolum 2 */}

        <div className="order-3 md:order-none md:col-span-1 flex flex-col h-full gap-6">

        <div className="bg-white/70 text-black p-4 rounded-xl min-h-[250px] flex flex-col justify-start shadow-[inset_0_10px_10px_-6px_rgba(255,255,255,0.4)] md:basis-1/2">
  <div className="mt-2">
    <h1 className="font-bold mb-10">ONBOARDA PERSONAL</h1>
    <p className="mt-4 text-2xl">Registrera nyanställda och starta deras onboarding direkt</p>

    <div className="flex justify-end mt-20 mr-6  text-5xl text-black hover:text-green-900 cursor-pointer transition">
      <IoArrowForwardCircleOutline />
    </div>
  </div>
</div>

  
          {/* Kvittogodkännande */}
          <div className="order-4 md:order-none md:col-span-1 bg-white/75 border-white p-4 rounded-xl min-h-[150px] md:min-h-[360px] flex flex-col justify-between shadow md:basis-1/2">
            <div>
              <h2 className="font-bold mb-6 text-black">KVITTOGODKÄNNANDE</h2>
              <p className="mt-10 text-2xl text-black">Granska och godkänn inlämnade kvitto samt säkerställ att alla uppgifter är korrekta</p>
            </div>
            <div className="flex justify-end mb-5 mr-6 text-5xl text-black  hover:text-green-900 cursor-pointer transition">
    <IoArrowForwardCircleOutline />
  </div>
          </div>
        </div>
  
            
        <div className="order-2 md:order-none md:col-span-1 flex flex-col gap-6 md:h-[720px]">
          
  
  {/* Kolum 3 */}
  <div className="order-2 grid grid-cols-2 gap-4 md:grid-cols-1">

   {/* Friskvård */}
<div className="bg-[#565E40] text-white p-4 rounded-xl shadow-[inset_0_10px_10px_-6px_rgba(255,255,255,0.4)] flex flex-col justify-between md:h-[140px] h-[160px]">
  
  <div className="flex justify-between items-start">
 
    <p className="font-bold md:hidden mb-3">FRISKVÅRDSPOTT</p> 
    <p className="font-bold hidden md:inline">FRISKVÅRD</p> 

    {/* Desktop) */}
    <p className="text-xs font-semibold hidden md:block">{remainingDays} dagar kvar</p>
  </div>

  <div className="flex items-center gap-2 mb-4">
    <p className="text-3xl font-semibold">3000/3000 kr</p>
  </div>

  {/*  mobil  */}
  <div className="flex justify-end md:hidden">
    <p className="text-xs font-semibold mb-2">{remainingDays} dagar kvar</p>
  </div>
</div>


    {/* Quote */}
    <div className="bg-white/10 backdrop-blur-sm shadow-md text-white p-4 rounded-xl border border-white md:h-[180px]">
      <div className="flex items-center justify-start gap-2 mb-2">
        <h2 className="font-bold text-sm">DAGENS QUOTE</h2>
        <img src="/flower.png" alt="Citatikon" className="w-4 h-4 object-contain" />
      </div>
      <p className="text-sm mt-8 font-semibold">Att logga ut en stund kan ge mer klarhet än att jobba över</p>
    </div>
  </div>


  {/* Balansundersökningar */}
  <div className="order-5 md:order-last bg-white/90 border-white p-4 rounded-xl shadow-md md:h-[360px] flex flex-col">
    <h2 className="font-bold mb-4 text-black">SKICKA UT BALANSUNDERSÖKNINGAR</h2>
    <p className="text-black text-2xl text-center m-8">Skicka ut en ny balansundersökning för att samla medarbetarfeedback</p>
    <button className="bg-gradient-to-r mb-3 from-[#5b6142] to-[#343a28] hover:from-[#6f7650] hover:to-[#3e4531] text-white font-medium py-4 px-15 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-fit mx-auto">
  Till frågorna
</button>

    
  </div>

</div>

    </main>
  </div>
);
}

