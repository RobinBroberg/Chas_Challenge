"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { getAllowance } from "@/services/api";
import ReceiptUpload from "@/components/ReceiptUploadForm";

// data på centers där man kan nyttja friskvårdsbidraget
const Centers = [
  {
    id: 1,
    name: "duCalme",
    image: "/ducalme.png",
    url: "https://www.ducalme.se",
    category: "Avslappning & Återhämtning",
  },
  {
    id: 2,
    name: "NEST Innerhealth Studio",
    image: "/nest-studio.jpg",
    url: "https://www.nestinnerhealth.se",
    category: "Avslappning & Återhämtning",
  },
  {
    id: 3,
    name: "Remedysthlm",
    image: "/remedysthlm.jpg",
    url: "https://www.remedysthlm.com/",
    category: ["Avslappning & Återhämtning", "Träning & Motion"],
  },
  {
    id: 4,
    name: "Stockholm Pilates Center",
    image: "/stockholm-pilates.jpg",
    url: "https://www.stockholmpilates.se",
    category: "Träning & Motion",
  },
  {
    id: 5,
    name: "Altromondo Yoga",
    image: "/altromondo-yoga.jpg",
    url: "https://www.altromondoyoga.se",
    category: ["Avslappning & Återhämtning", "Träning & Motion"],
  },

  {
    id: 6,
    name: "Axelsons SPA",
    image: "/axelsons-spa.jpg",
    url: "https://www.axelsons.se",
    category: "Avslappning & Återhämtning",
  },
  {
    id: 7,
    name: "SATS",
    image: "/sats.jpg",
    url: "https://www.sats.se",
    category: "Träning & Motion",
  },
  {
    id: 8,
    name: "EFCrossfit",
    image: "/efcrossfit.jpg",
    url: "https://www.efcrossfit.se",
    category: "Träning & Motion",
  },
  {
    id: 9,
    name: "REI Kampsport",
    image: "/rei-kampsport.jpg",
    url: "https://www.reikampsport.se",
    category: "Träning & Motion",
  },
  {
    id: 10,
    name: "Stockholm Kickboxning",
    image: "/stockholm-kickboxning.jpg",
    url: "https://www.stockholmkickboxning.se",
    category: "Träning & Motion",
  },
  {
    id: 11,
    name: "Runacademy",
    image: "/runacademy.jpg",
    url: "https://www.runacademy.se",
    category: "Träning & Motion",
  },
  {
    id: 12,
    name: "Medley",
    image: "/medley.jpg",
    url: "https://www.medley.se",
    category: "Träning & Motion",
  },
];

// Categories for dropdown
const categories = ["Alla", "Avslappning & Återhämtning", "Träning & Motion"];

export default function WellnessBenefitsPage() {
  const [remainingBalance, setRemainingBalance] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter centers based on category
  const filteredCenters = Centers.filter((center) => {
    const centerCategories = Array.isArray(center.category)
      ? center.category
      : [center.category];
    return (
      selectedCategory === "Alla" || centerCategories.includes(selectedCategory)
    );
  });

  async function fetchAllowance() {
    try {
      const data = await getAllowance();
      setRemainingBalance(data.remaining);
    } catch (err) {
      console.error("Failed to load allowance:", err);
    }
  }

  useEffect(() => {
    fetchAllowance();
  }, []);

  return (
    <div className="max-w mx-auto p-6 md:p-22 bg-[#FBFAF5] font-montserrat min-h-screen flex flex-col">
      {/* Friskvårdens balans + text */}
      <div className="flex flex-col md:flex-row items-center mb-5 md:mb-10">
        <div className="w-full md:w-1/3  bg-gradient-to-br from-[#aeb396] to-[#232F21] text-white shadow-2xl p-3 rounded-lg mb-4 mt-4 md:mt-0 md:mb-0 flex flex-col items-center justify-center">
          <p className="font-bold text-sm pt-2">FRISKVÅRDSBIDRAG</p>
          <span
            className="text-white font-montserrat font-bold p-8 md:p-14 whitespace-nowrap"
            style={{
              textShadow: "0 7px 4px rgba(0, 0, 0, 0.25)",
              fontSize: "clamp(30px, 6vw, 50px)",
              lineHeight: "100%",
            }}
          >
            {remainingBalance !== null ? `${remainingBalance} kr` : "Laddar..."}
          </span>

          <div className="flex justify-between items-center w-full px-2">
            <ReceiptUpload onUploadSuccess={fetchAllowance} />
          </div>
        </div>

        <div className="hidden w-full md:w-2/3 md:flex flex-col items-center gap-4 text-center md:px-32">
          <h1 className="text-2xl font-bold text-gray-800">
            DAGS ATT ANVÄNDA FRISKVÅRDSBIDRAGET?
          </h1>
          <p>
            Här får du koll på hur mycket du har kvar och massor av tips på vad
            du kan använda det till! Plattformen gör det enkelt att hitta något
            som passar just dig.
          </p>
        </div>
      </div>

      {/* Category Dropdown */}
      <div className="mb-9 relative">
        <div
          className="bg-[#F6F4F0] border border-[#EFEFEF] shadow-inner rounded-md p-2 flex items-center justify-between cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="text-[#C4C4C4]">
            {selectedCategory === "Alla" ? "Sök" : selectedCategory}
          </span>
          <HiOutlineAdjustmentsVertical />
        </div>
        {isDropdownOpen && (
          <div className="absolute z-10 right-6 w-full bg-[#FBFAF5] shadow-inner rounded-md -mt-4  max-h-60 max-w-2xs overflow-y-auto border border-[#D7D7D7]">
            {categories.map((category) => (
              <div
                key={category}
                className={`p-2 cursor-pointer ${
                  selectedCategory === category
                    ? "bg-[rgba(70,76,53,0.33)] text-gray-800 font-semibold"
                    : "hover:bg-[rgba(70,76,53,0.33)]"
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsDropdownOpen(false);
                }}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Centers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCenters.map((center) => (
          <a
            key={center.id}
            href={center.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-90 transition-opacity"
          >
            <div className="relative w-full h-32 md:h-48 bg-black rounded-lg">
              <Image
                src={center.image}
                alt={center.name}
                fill
                className="object-cover object-center "
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              <div className="absolute inset-0 flex justify-center items-center">
                <h3 className="font-extrabold text-lg md:text-2xl text-white drop-shadow-lg">
                  {center.name}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
