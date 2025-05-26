"use client";

import React from "react";
import ImageTextSection from "@/components/ImageTextSection";

export default function BackFromSickness() {
  return (
    <div>
      <ImageTextSection
        imageSrc="/sickImage.png"
        undertitle="VÄGEN TILLBAKA FRÅN SJUKSKRIVNING"
        text="Att komma tillbaka efter en sjukskrivning kan vara utmanande både
        fysiskt och mentalt. Många känner oro över att inte kunna prestera som
        tidigare och det kan vara svårt att hitta tillbaka till rätt balans
        mellan arbete och återhämtning. Här kan plattformen Balance vara ett
        stöd."
        text2="Genom balansundersökningar får arbetsgivare insikt i hur anställda mår
        och kan identifiera områden som behöver extra stöd. Detta gör det
        lättare för anställda att återgå till arbetet i sin takt."
        text3="Balance hjälper också användare att nyttja sitt friskvårdsbidrag genom
        aktiviteter inom träning, mindfulness, poddar och hälsa/livsstil. Via
        plattformens utmaningssida kan medarbetare delta i exempelvis
        stegutmaningar som skapar gemenskap och motivation."
        text4="Sammanfattningsvis ger Balance både arbetsgivare och anställda verktyg
        för att stödja en hälsosam och hållbar återgång till arbetslivet."
      />
    </div>
  );
}
