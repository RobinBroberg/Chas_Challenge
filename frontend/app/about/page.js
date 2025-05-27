"use client";

export default function About() {
  return (
    <div className="bg-white text-black">
      <img
        src="tempImage.png"
        alt="About us"
        className="w-full h-[200px] sm:h-[300px] md:h-[350px] object-cover"
      />
      <div className="flex flex-col px-6 sm:px-12 md:px-24 py-10 sm:py-14 tracking-wider max-w-7xl mx-auto">
        <h1 className="font-extrabold text-xl sm:text-2xl md:text-3xl font-wix madefor display">
          OM OSS
        </h1>

        <h2 className="font-bold text-lg sm:text-xl md:text-2xl pt-8 sm:pt-14 font-montserrat">
          Balance, ett stöd för hållbart välmående på jobbet
        </h2>
        <p className="font-medium text-sm sm:text-base md:text-lg max-w-full sm:max-w-5xl pt-4 sm:pt-6 font-montserrat leading-relaxed">
          Balance är en digital plattform skapad för att stötta medarbetares
          hälsa, främja balansen mellan arbetsliv och privatliv samt personlig
          utveckling. Vi tror inte att välmående handlar om prestation eller
          perfektion utan om att hitta sin egen rytm och få stöd på vägen. I en
          vardag som ofta är fylld av högt tempo, krav och stress är det
          viktigare än någonsin att kunna pausa, reflektera och ta hand om sig
          själv fysiskt och mentalt.
        </p>

        <h2 className="font-bold text-lg sm:text-xl md:text-2xl pt-8 sm:pt-12 font-montserrat">
          För dig som medarbetare
        </h2>
        <p className="font-medium text-sm sm:text-base md:text-lg max-w-full sm:max-w-5xl pt-4 sm:pt-6 font-montserrat leading-relaxed">
          Plattformen är skapad med dig som medarbetare i åtanke. Med Balance
          får du tillgång till verktyg, övningar och inspiration som hjälper dig
          att må bättre över tid. Oavsett om du vill skapa bättre rutiner,
          hantera vardagsstress och återhämtning eller bli mer medveten om dina
          behov så finns vi här för att stötta dig. Du väljer själv vad du vill
          fokusera på och hur du vill använda plattformen. Det är din resa och
          du bestämmer takten. Vi vet att små steg kan göra stor skillnad, hos
          oss får du stöd i stunden samtidigt som du bygger vanor som håller
          över tid.
        </p>

        <h2 className="font-bold text-lg sm:text-xl md:text-2xl pt-8 sm:pt-12 font-montserrat">
          För arbetsgivare - en investering i långsiktig hälsa
        </h2>
        <p className="font-medium text-sm sm:text-base md:text-lg max-w-full sm:max-w-5xl pt-4 sm:pt-6 font-montserrat leading-relaxed">
          Balance är även ett stöd för arbetsgivare som prioriterar välmående på
          arbetsplatsen och vill skapa en hållbar arbetsmiljö där individer mår
          bra och kan utvecklas. Genom att ansluta er till Balance visar ni att
          ni värdesätter era medarbetares hälsa och välbefinnande. Plattformen
          ger insikter om medarbetares välmående över tid vilket kan skapa ännu
          bättre förutsättningar på arbetsplatsen.
        </p>

        <h2 className="font-bold text-lg sm:text-xl md:text-2xl pt-8 sm:pt-12 font-montserrat">
          Vår vision
        </h2>
        <p className="font-medium text-sm sm:text-base md:text-lg max-w-full sm:max-w-5xl pt-4 sm:pt-6 font-montserrat leading-relaxed">
          Vi vill bidra till en arbetskultur där välmående ses som en naturlig
          och viktig del av arbetslivet. Där varje medarbetare känner sig sedd
          och stöttad för att växa i sitt arbete och i livet i stort. Balance är
          mer än ett verktyg. Det är en väg mot hållbar hälsa, i ditt tempo och
          på dina villkor.
        </p>
      </div>
    </div>
  );
}
