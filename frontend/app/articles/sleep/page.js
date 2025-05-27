"use client";

export default function Sleep() {
  return (
    <div className="bg-white text-black">
      <img
        src="/sleepImage.png"
        className="w-full h-[200px] sm:h-[300px] md:h-[350px] object-cover"
        alt="Sleep illustration"
      />
      <div className="flex flex-col px-6 sm:px-12 md:px-24 py-12 sm:py-16 md:py-20 tracking-wider">
        <h1 className="font-extrabold text-xl sm:text-2xl md:text-3xl font-wix madefor display">
          SÖMN ÄR GRUNDEN FÖR ÅTERHÄMTNING
        </h1>
        <h2 className="font-bold text-base sm:text-lg md:text-xl pt-6 sm:pt-8 font-montserrat">
          Varför behöver vi sömn?
        </h2>
        <p className="font-medium text-sm sm:text-base md:text-lg max-w-5xl pt-4 sm:pt-6 font-montserrat">
          Sömn påverkar hur vi mår, tänker och presterar. När vi sover bra har
          vi lättare att fokusera, fatta beslut och hantera stress. Dålig sömn
          kan däremot göra att vi känner oss trötta, spända eller mindre
          motiverade.
        </p>
        <p className="font-medium text-sm sm:text-base md:text-lg max-w-5xl pt-4 sm:pt-6 font-montserrat">
          På vår plattform vill vi uppmuntra till återhämtning som fungerar i
          vardagen. Genom att bli medveten om dina sömnvanor och små justeringar
          i kvällsrutinerna, kan du skapa bättre balans.
        </p>
        <p className="font-medium text-sm sm:text-base md:text-lg max-w-5xl pt-4 sm:pt-6 font-montserrat">
          Sömn är en vital del av återhämtning, att sova gott är avgörande för
          både fysisk och mental hälsa. Nedan följer några praktiska råd som kan
          förbättra din sömnkvalitet.
        </p>

        {[
          "1. Skapa en regelbunden sömnrutin Försök att gå och lägga dig och vakna vid samma tid varje dag, även på helger. Det hjälper din kropp att ställa in sin inre klocka och förbättrar sömnkvaliteten.",
          "2. Varva ner innan läggdags Undvik stimulerande aktiviteter som att titta på skärmar eller arbeta sent på kvällen. Istället kan du prova avslappningsövningar, läsa en bok eller ta ett varmt bad för att signalera till kroppen att det är dags att sova.",
          "3. Fysisk aktivitet under dagen Regelbunden motion kan förbättra sömnen, men undvik intensiv träning sent på kvällen då det kan göra det svårare att somna.",
          "4. Begränsa koffein och alkohol Undvik att konsumera koffeinhaltiga drycker som kaffe, te och energidrycker samt alkohol flera timmar innan läggdags, eftersom de kan störa sömnen.",
          "5. Exponera dig för dagsljus Att få naturligt ljus under dagen, särskilt på morgonen, hjälper till att reglera din dygnsrytm och förbättrar sömnkvaliteten.",
          "6. Hantera stress och oro Om du har mycket tankar som snurrar, skriv ner dem i en dagbok innan du går och lägger dig. Det kan hjälpa dig att släppa oron och sova bättre.",
          "7. Undvik tupplurar på dagen Om du har svårt att somna på kvällen, försök att undvika att sova under dagen. Om du behöver vila, håll tuppluren kort (20-30 minuter) och tidigt på eftermiddagen.",
        ].map((tip, index) => (
          <p
            key={index}
            className="font-medium text-sm sm:text-base md:text-md max-w-5xl pt-4 sm:pt-6 font-montserrat whitespace-pre-line"
          >
            {tip}
          </p>
        ))}
      </div>
    </div>
  );
}
