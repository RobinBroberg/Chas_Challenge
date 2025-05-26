"use client";

export default function About() {
  return (
    <div className="bg-white text-black">
      <img src="tempImage.png" className="w-full h-[350px] object-cover"></img>
      <div className="flex flex-col px-24 py-14 tracking-wider">
        <h1 className="font-extrabold text-2xl font-wix madefor display">
          OM OSS
        </h1>
        <h2 className="font-bold text-xl pt-14 font-montserrat">
          Balance, ett stöd för hållbart välmående på jobbet
        </h2>
        <p className="font-medium text-lg w-5xl pt-6 font-montserrat">
          Balance är en digital plattform skapad för att stötta medarbetares
          hälsa, främja balansen mellan arbetsliv och privatliv samt personlig
          utveckling. Vi tror inte att välmående handlar om prestation eller
          perfektion utan om att hitta sin egen rytm och få stöd på vägen. I en
          vardag som ofta är fylld av högt tempo, krav och stress är det
          viktigare än någonsin att kunna pausa, reflektera och ta hand om sig
          själv fysiskt och mentalt.
        </p>
        <h2 className="font-bold text-xl pt-12 font-montserrat">
          För dig som medarbetare
        </h2>
        <p className="font-medium text-lg w-5xl pt-6 font-montserrat">
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
        <h2 className="font-bold text-xl pt-12 font-montserrat">
          För arbetsgivare - en investering i långsiktig hälsa
        </h2>
        <p className="font-medium text-lg w-5xl pt-6 font-montserrat">
          Balance är även ett stöd för arbetsgivare som prioriterar välmående på
          arbetsplatsen och vill skapa en hållbar arbetsmiljö där individer mår
          bra och kan utvecklas. Genom att ansluta er till Balance visar ni att
          ni värdesätter era medarbetares hälsa och välbefinnande. Plattformen
          ger insikter om medarbetares välmående över tid vilket kan skapa ännu
          bättre förutsättningar på arbetsplatsen.
        </p>
        <h2 className="font-bold text-xl pt-12 font-montserrat">Vår vision</h2>
        <p className="font-medium text-lg w-5xl pt-6 font-montserrat">
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
