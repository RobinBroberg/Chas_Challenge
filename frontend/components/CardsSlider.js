"use client";

import React, { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Moon,
  Coffee,
  FirstAid,
  HeartPulse,
  Users,
  Leaf,
  Dumbbell,
  Utensils,
  Sun,
} from "lucide-react";

const iconMap = {
  BookOpen,
  Moon,
  Coffee,
  FirstAid,
  HeartPulse,
  Users,
  Leaf,
  Dumbbell,
  Utensils,
  Sun,
};

export default function CardsSlider() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Sample cards data
  const cards = [
    {
      icon: "BookOpen",
      title: "Mental Hälsa",
      text: "Lär dig tekniker för att minska stress och ångest i vardagen.",
      highlight: true,
      cta: "Skapa ett konto här",
    },
    {
      icon: "Moon",
      title: "Bättre Sömn",
      text: "Våra guider hjälper dig att uppnå en mer uppfriskande sömn.",
      highlight: false,
      cta: "Läs mer",
    },
    {
      icon: "Coffee",
      title: "Energiboost",
      text: "Upptäck nya sätt att hålla energin uppe under dagen utan koffein.",
      highlight: false,
      cta: "Läs mer",
    },
    {
      icon: "Leaf",
      title: "Mindfulness",
      text: "Öva på närvaro och medvetenhet för att minska stressnivåer.",
      highlight: false,
      cta: "Läs mer",
    },
    {
      icon: "Dumbbell",
      title: "Träning",
      text: "Fysisk aktivitet som stärker både kropp och sinne.",
      highlight: false,
      cta: "Läs mer",
    },
    {
      icon: "Utensils",
      title: "Näringslära",
      text: "Ät rätt för bättre fokus, humör och välmående.",
      highlight: false,
      cta: "Läs mer",
    },
    {
      icon: "HeartPulse",
      title: "Hjärt­hälsa",
      text: "Tips för att främja ett starkt och friskt hjärta.",
      highlight: false,
      cta: "Läs mer",
    },
  ];

  // Implement the missing handler functions
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 350; // Adjust scroll amount as needed
    if (container) {
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full">
      {/* Scrollable Cards Area */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 scroll-smooth py-6 px-4 md:px-8 cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          userSelect: isDragging ? "none" : "auto",
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {cards.map((card, i) => {
          const Icon = iconMap[card.icon] || BookOpen;
          return (
            <div
              key={i}
              className={`min-w-[280px] md:min-w-[320px] max-w-[300px] md:max-w-[350px] flex-shrink-0 rounded-3xl p-6 md:p-8 shadow-lg ${
                card.highlight
                  ? "bg-[#5E7154] text-white"
                  : "bg-white text-black border border-[#DADAD9]"
              }`}
            >
              <div className="flex flex-col h-full">
                {/* icon */}
                <div className="mb-6 self-center p-4 rounded-full bg-white/20">
                  <Icon
                    className={`h-10 w-10 ${
                      card.highlight ? "text-white" : "text-[#5E7154]"
                    }`}
                  />
                </div>

                {/* title + text */}
                <h3 className="text-xl font-bold mb-4 text-center">
                  {card.title}
                </h3>
                <p className="text-base mb-6 flex-1">{card.text}</p>

                {/* CTA button */}
                <button
                  className={`mt-auto rounded-full px-6 py-3 text-base font-semibold transition hover:scale-105 ${
                    card.highlight
                      ? "bg-white text-[#5E7154] hover:bg-gray-100"
                      : "border border-[#5E7154] text-[#5E7154] hover:bg-[#5E7154] hover:text-white"
                  }`}
                >
                  {card.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-end mt-4 pr-4 md:pr-8">
        <div className="flex space-x-3 bg-white/10 backdrop-blur-sm rounded-full p-1">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full transition hover:bg-[#579257] cursor-pointer border border-[#5E7154]"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} className="text-[#5E7154]" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full transition hover:bg-[#579257] cursor-pointer border border-[#5E7154]"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} className="text-[#5E7154]" />
          </button>
        </div>
      </div>
    </div>
  );
}
