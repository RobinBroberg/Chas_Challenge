"use client";
import ExtraSidePages from "@/components/ExtraSidePages";

export default function AboutSurvey() {
  return (
    <ExtraSidePages
      imageSrc="/datoImage.png"
      title="OM BALANSUNDERSÖKNINGEN"
      text="Balansundersökningen är ett digitalt verktyg som hjälper dig att
        reflektera över din arbetssituation och hur den påverkar ditt välmående.
        Den består av ett antal frågor som rör motivation, arbetsbelastning,
        trygghet, återhämtning och balans mellan arbete och privatliv. Syftet är
        att ge dig en tydlig bild av hur du upplever din arbetsdag, och att
        uppmärksamma faktorer som påverkar din energi, trivsel och arbetsglädje.
        Det tar bara några minuter att genomföra undersökningen, och dina svar
        är anonyma. När du har svarat får du ett resultat som du kan använda som
        stöd för att skapa bättre balans - både i vardagen och på arbetsplatsen.
        Balansundersökningen kan göras regelbundet för att följa utvecklingen
        över tid."
    ></ExtraSidePages>
  );
}
