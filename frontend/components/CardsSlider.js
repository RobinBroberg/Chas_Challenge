"use client";

import React from "react";

import { FaBalanceScale } from "react-icons/fa";
import { BsBarChart } from "react-icons/bs";
import { BiSolidReceipt } from "react-icons/bi";

import {
  BookOpen,
  Moon,
  Coffee,
  HeartPulse,
  Users,
  Leaf,
  Dumbbell,
  Utensils,
  Sun,
} from "lucide-react";

// Map all icons
const iconMap = {
  BookOpen,
  Moon,
  Coffee,
  HeartPulse,
  Users,
  Leaf,
  Dumbbell,
  Utensils,
  Sun,
  FaBalanceScale,
  BsBarChart,
  BiSolidReceipt,
};

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = iconMap[card.icon];

          return (
            <div
              key={i}
              className={`rounded-3xl p-6 md:p-8 shadow-lg flex flex-col ${
                card.highlight
                  ? "bg-[#5E7154] text-white"
                  : "bg-white text-black border border-[#DADAD9]"
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
              <h3 className="text-3xl font-bold mb-14 text-center">
                {card.title}
              </h3>

              {/* Text */}
              <p className="text-2xl mb-16 text-center flex-1">{card.text}</p>

              {/* Only show CTA on first card */}
              {card.cta && (
                <button
                  className={`mt-auto rounded-full px-6 py-3 text-base font-semibold transition hover:scale-105 ${
                    card.highlight
                      ? "bg-white text-[#5E7154] hover:bg-gray-100"
                      : "border border-[#5E7154] text-[#5E7154] hover:bg-[#5E7154] hover:text-white"
                  }`}
                >
                  {card.cta}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
