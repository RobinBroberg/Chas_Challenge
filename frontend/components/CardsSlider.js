"use client";

import { useRef } from "react";
import { Book, Leaf, Heart, Clock, Users, Coffee } from "lucide-react";

export default function CardSlider() {
  const scrollRef = useRef();

  // Sample card data with icon names
  const cards = [
    {
      icon: "Book",
      title: "Våra Tjänster",
      text: "Vi erbjuder en rad olika tjänster anpassade för dina behov. Kontakta oss för att få veta mer om hur vi kan hjälpa dig.",
      highlight: true,
      cta: "Läs Mer",
    },
    {
      icon: "Leaf",
      title: "Hållbarhet",
      text: "Vårt fokus på hållbara lösningar hjälper dig att minska din miljöpåverkan samtidigt som du sparar resurser.",
      highlight: false,
      cta: "Upptäck",
    },
    {
      icon: "Heart",
      title: "Om Oss",
      text: "Lär känna vårt team och vår historia. Vi har över 10 års erfarenhet inom branschen och brinner för kvalitet.",
      highlight: false,
      cta: "Vår Historia",
    },
    {
      icon: "Clock",
      title: "Öppettider",
      text: "Vi finns tillgängliga när du behöver oss. Kolla våra öppettider eller boka en tid som passar dig bäst.",
      highlight: true,
      cta: "Boka Tid",
    },
    {
      icon: "Users",
      title: "Referenser",
      text: "Se vad våra kunder säger om oss. Vi är stolta över vårt arbete och våra nöjda kunder är vårt bästa betyg.",
      highlight: false,
      cta: "Läs Omdömen",
    },
    {
      icon: "Coffee",
      title: "Kontakta Oss",
      text: "Har du frågor eller vill diskutera ett projekt? Vi finns här för att hjälpa dig. Kontakta oss idag.",
      highlight: false,
      cta: "Kontakt",
    },
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Book":
        return <Book />;
      case "Leaf":
        return <Leaf />;
      case "Heart":
        return <Heart />;
      case "Clock":
        return <Clock />;
      case "Users":
        return <Users />;
      case "Coffee":
        return <Coffee />;
      default:
        return <Book />;
    }
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = 320;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-7xl px-4">
      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border rounded-full shadow hover:bg-[#5E7154] hover:text-white"
      >
        ←
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border rounded-full shadow hover:bg-[#5E7154] hover:text-white"
      >
        →
      </button>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className={`min-w-[260px] md:min-w-[300px] h-80 rounded-3xl shadow-md p-6 flex flex-col justify-between ${
              card.highlight
                ? "bg-[#5E7154] text-white"
                : "bg-white text-black border border-[#DADAD9]"
            }`}
          >
            <div className="flex justify-center mb-4">
              <div
                className={`p-3 rounded-full ${
                  card.highlight
                    ? "bg-white text-[#5E7154]"
                    : "bg-[#F5F5F5] text-[#5E7154]"
                }`}
              >
                {getIcon(card.icon)}
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">
              {card.title}
            </h3>
            <p className="text-sm mb-4">{card.text}</p>
            <button
              className={`mt-auto rounded-full px-4 py-2 text-sm font-medium ${
                card.highlight
                  ? "bg-white text-[#5E7154]"
                  : "border border-[#5E7154] text-[#5E7154]"
              }`}
            >
              {card.cta || "Läs Mer"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
