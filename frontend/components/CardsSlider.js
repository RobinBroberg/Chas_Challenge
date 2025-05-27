"use client";

import React from "react";
import { FaBalanceScale } from "react-icons/fa";
import { BsBarChart } from "react-icons/bs";
import { BiSolidReceipt } from "react-icons/bi";

// Map all icons
const iconMap = {
  FaBalanceScale,
  BsBarChart,
  BiSolidReceipt,
};
import Link from "next/link";

export default function CardsSlider() {
  const cards = [
    {
      icon: "", // No icon
      title: "Kom igång redan idag!",
      text: "Som arbetsgivare väljer du hur ofta du ska mäta balansen hos dina medarbetare.",
      highlight: true,
      cta: "Anslut till Balance",
    },
    {
      icon: "FaBalanceScale",
      title: "Balansundersökning",
      text: "I vårt paket finns tio stycken skräddarsydda frågor om välmående på arbetsplatsen.",
      highlight: false,
    },
    {
      icon: "BsBarChart",
      title: "Statistik",
      text: "Medarbetarnas svar presenteras i statistikformat med enkel överblick i en dashboard.",
      highlight: false,
    },
    {
      icon: "BiSolidReceipt",
      title: "Kvittohantering",
      text: "Godkänn och överblicka status över medarbetarnas friskvårdsutlägg.",
      highlight: false,
    },
  ];

  return (
    <div className="w-full py-6 px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {cards.map((card, i) => {
          const Icon = iconMap[card.icon];

          return (
            <div
              key={i}
              className={`rounded-3xl p-6 md:p-8 flex flex-col ${
                card.highlight
                  ? "bg-[#5E7154] text-white transform scale-107 mr-4 shadow-2xl"
                  : "bg-white text-black border border-[#DADAD9] shadow-lg"
              }`}
            >
              {/* Icon */}
              {Icon && (
                <div className="mb-6 self-center p-4 rounded-full bg-white/20">
                  <Icon
                    className={`h-14 w-14 ${
                      card.highlight ? "text-white" : "text-[#5E7154]"
                    }`}
                  />
                </div>
              )}

              {/* Title */}
              <h3
                className={`text-lg md:text-2xl font-bold text-center ${
                  card.highlight ? "mt-8 mb-12" : "mb-14"
                }`}
              >
                {card.title}
              </h3>

              {/* Text */}
              <p className="text mb-6 text-center mx-6 flex-1">{card.text}</p>

              {/* CTA Button (only on first card) */}
              {card.cta && (
                <div className="flex justify-center">
                  <Link href="/contact" className="flex justify-center">
                    <button
                      className={`${
                        card.highlight ? "mt-2 px-6" : "mt-auto px-6"
                      } rounded-full py-3 text-base font-semibold transition-all duration-300 w-fit cursor-pointer ${
                        card.highlight
                          ? "bg-white text-[#5E7154] hover:bg-gray-100 hover:shadow-md"
                          : "border border-[#5E7154] text-[#5E7154] hover:bg-[#5E7154] hover:text-white hover:shadow-sm"
                      }`}
                    >
                      {card.cta}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
