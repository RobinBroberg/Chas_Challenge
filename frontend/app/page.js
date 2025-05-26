import CardsSlider from "@/components/CardsSlider";
import Link from "next/link";

export default function Home() {
  const cards = [
    {
      icon: "Book",
      title: "Skapa",
      text: "Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.",
      cta: "Skapa ett konto här",
      highlight: true,
    },
    {
      icon: "Moon",
      title: "Tips för bättre sömn",
      text: "Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.",
      highlight: false,
    },
    {
      icon: "Coffee",
      title: "Mikropauser i vardagen",
      text: "Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.",
      highlight: false,
    },
    {
      icon: "FirstAid",
      title: "Vägen tillbaka från sjukskrivning",
      text: "Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.",
      highlight: false,
    },
    {
      icon: "Heart",
      title: "Hälsosamma Vanor",
      text: "Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.",
      highlight: true,
    },
    {
      icon: "Users",
      title: "Grupprogram",
      text: "Libero nunc facilisis auctor diam suspendisse pharetra nisi. Mauris ornare imperdiet.",
      highlight: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f1ea] flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative w-full mb-12">
        <img
          src="/landingHeader.png"
          alt="Logo"
          className="w-full h-[500px] sm:h-[650px] md:h-[750px] lg:h-[850px] object-cover brightness-75"
        />

        {/* BALANCE Title */}
        <div className="absolute inset-0 flex items-center px-4 md:px-10 z-10">
          <h1 className="text-white font-montserrat text-4xl sm:text-5xl md:text-[7rem] lg:text-[9rem] 2xl:text-[12rem] tracking-widest font-medium leading-none text-center md:text-left">
            BALANCE
          </h1>
        </div>

        {/* Subtext */}
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 md:px-14 pb-20 sm:pb-32 md:pb-48 lg:pb-60 z-10">
          <h3 className="text-white font-bold font-montserrat tracking-wide text-lg sm:text-xl md:text-3xl lg:text-4xl">
            DITT STÖD FÖR ETT HÅLLBART VÄLMÅENDE
          </h3>
          <p className="text-white text-base sm:text-lg md:text-xl font-montserrat font-extralight leading-snug text-left pt-2">
            Stärk din hälsa både i och utanför arbetet, ett steg närmare mot
            ditt bästa jag – din resa mot mer balans börjar här.
          </p>
        </div>
      </header>
      {/* Section Title */}
      <section className="flex flex-col items-center w-full px-4 py-8 bg-[#f5f1ea]">
        <h2 className="text-[#3e3a35] font-sans font-bold tracking-normal text-xl md:text-[2rem] mb-6">
          DIN GUIDE TILL BALANS
        </h2>

        {/* CARD SLIDER SECTION */}
        <CardsSlider cards={cards} />
      </section>

      {/* Full Width Image with Centered h2 */}
      <div className="relative w-full my-10">
        <img
          src="/balanceMeeting.png"
          alt="Landing Image"
          className="w-full md:h-[650px] object-cover brightness-75"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl md:text-5xl text-center px-4">
          DIN HÄLSA. DITT TEMPO. DITT VÄLMÅENDE.
        </h2>
      </div>

      {/* App Showcase Section */}
      <section className="w-full bg-[#f5f1ea] py-16 px-4 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 ">
          {/* Left content */}
          <div className="w-full md:w-1/2 space-y-4 font-montserrat">
            <h2 className="font-bold text-black md:text-[2.1rem] mb-4">
              EN PLATS FÖR DINA MEDARBETARES VÄLMÅENDE
            </h2>
            <p className="text-gray-800 text-lg mb-8">
              Genom att ansluta till Balance som arbetsgivare får du
              kartläggning samt statistik över hur dina medarbetare mår och
              insikt i deras arbetssituation. Medarbetarna får tillgång till
              enkla verktyg för att förebygga stress och stöd på vägen mot
              bättre balans i vardagen mellan arbetsliv och fritid. Detta skapar
              en mer hållbar och trivsam arbetsvardag för alla i organisationen.
            </p>
            <div className="flex justify-center md:justify-end">
              <button className="border-2 border-[#5d8b5d] bg-[#5b6b5b] hover:bg-[#4a574a] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 cursor-pointer">
                OM OSS
              </Link>
            </div>
          </div>

          {/* Right mockup */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-64 md:w-80">
              <img
                src="/balancePhone.png"
                alt="Balance app"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Swipe Section */}
      <section className="w-full bg-[#EAE9E4] py-16 px-4 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Left side - Image */}
            <div className="w-full md:w-1/2">
              <img
                src="/collage.png"
                alt="Balance Collage"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Right side - Categories */}
            <div className="w-full md:w-1/2 space-y-8 font-montserrat">
              <div className="mb-8">
                <h3 className="text-[#000000] font-bold text-2xl mb-8 w-full whitespace-normal">
                  EN TJÄNST SOM SÄTTER DIG OCH DIN HÄLSA I FOKUS
                </h3>

                <h4 className="text-[#000000] font-bold text-xl mb-2">
                  Plattformen erbjuder
                </h4>
                <p className="text-gray-800 p-4 rounded-md">
                  Här får du ett enkelt och personligt stöd i vardagen.
                  Plattformen hjälper dig att synliggöra ditt välmående, ta del
                  av friskvårdsförmåner och få koll på hur du mår över tid.
                </p>
              </div>

              <div className="space-y-8 font-montserrat">
                {/* Category 1 - Full width */}
                <div className="flex items-start gap-6 text-[#000000]">
                  <div className="h-16 w-16 bg-[#EAE9E4] rounded-full flex items-center justify-center text-2xl font-bold shadow-md border">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">
                      Balansundersökning
                    </h4>
                    <p className="text-gray-700">
                      Ta tempen på ditt välmående och få en överblick över hur
                      du mår. Resultatet hjälper dig att prioritera din hälsa på
                      ett hållbart sätt.
                    </p>
                  </div>
                </div>

                {/* Categories 2 and 3 - Side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category 2 */}
                  <div className="flex items-start gap-6 text-[#000000]">
                    <div className="h-16 w-16 bg-[#EAE9E4] rounded-full flex items-center justify-center text-2xl font-bold shadow-md border">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Friskvårdskoll</h4>
                      <p className="text-gray-700">
                        Se hur mycket friskvårdsbidrag du har kvar och vad du
                        kan använda det till. Enkelt, tydligt och uppdaterat i
                        realtid.
                      </p>
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div className="flex items-start gap-6 text-[#000000]">
                    <div className="h-16 w-16  rounded-full flex items-center justify-center text-2xl font-bold shadow-md border">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">
                        Personlig översikt
                      </h4>
                      <p className="text-gray-700">
                        Din personliga vy visar hur vanor påverkar ditt
                        välmående och hjälper dig hålla fokus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-full">
        <div className="w-full mb-2">
          {/* First large image with overlay text */}
          <div className="relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105">
            <img
              src="/balanceSleep.png"
              alt="Balance Sleep"
              className="w-full h-64 md:h-80 object-cover brightness-90"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-xl md:text-2xl font-bold tracking-wider">
                TIPS FÖR BÄTTRE SÖMN
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-1/3">
            <div className="relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 h-64">
              <img
                src="/balanceStretch.png"
                alt="Balance Stretch"
                className="w-full h-full object-cover brightness-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-xl font-bold tracking-wider">
                  MIKROPAUSER I VARDAGEN
                </h2>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 h-64">
              <img
                src="/balanceHead.png"
                alt="Balance Head"
                className="w-full h-full object-cover brightness-60"
              />
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <h2 className="text-white text-xl md:text-2xl font-bold tracking-wider text-center max-w-[90%]">
                  VÄGEN TILLBAKA FRÅN SJUKSKRIVNING
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#f5f1ea] py-16 px-4 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-20 md:gap-48">
          {/* Left mockup (was previously on right) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-64 md:w-80">
              <img
                src="/balancePhone2.png"
                alt="Balance app"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right content (was previously on left) */}
          <div className="w-full md:w-2/2 space-y-4  px-4 md:px-0">
            <div className="w-full md:w-4/4 space-y-4 font-wix-display px-4 md:px-0 text-right pr-10">
              <h2 className="font-extrabold text-black md:text-[1.7rem] mb-4">
                UTFORSKA DINA FRISKVÅRDSMÖJLIGHETER
              </h2>
              <p className="text-gray-800 text-lg mb-8">
                Utforska hur du kan använda ditt friskvårdsbidrag på ett sätt
                som passar dig. Välj bland olika kategorier som träning,
                avslappning, gruppaktiviteter och mental återhämtning. Oavsett
                om du söker ny energi, rörelse eller återhämtning hittar du
                något som passar just dig. Allt är samlat på ett och samma
                ställe för att göra det enkelt för dig att ta hand om din hälsa
                på ett sätt som känns rätt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full">
        <div className="w-full h-80 md:h-96 lg:h-[500px] relative overflow-hidden">
          <img
            src="/balanceGroup.png"
            alt="Balance Group"
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute left-4 text-center md:left-20 top-1/2 transform -translate-y-1/2 bg-white/90 p-4 md:p-8 rounded-2xl w-[90%] md:w-[600px]">
            <h2 className="text-lg md:text-3xl font-montserrat font-bold text-black mb-3 text-center md:text-left whitespace-normal">
              FÖRENKLA ARBETETS VARDAG
            </h2>
            <p className="text-sm md:text-base text-gray-800 font-montserrat mb-4">
              Vi hjälper arbetsgivare att skapa en hållbar arbetsmiljö där
              människor mår bra och presterar bättre. Plattformen ger insikter
              om välmående, förenklar friskvårdshantering och stärker det
              dagliga stödet.
            </p>
            <p className="text-sm md:text-base text-gray-800 font-montserrat mb-5 font-bold">
              Vill du veta mer om hur det fungerar?
            </p>
            <button className="bg-[#5a7350] text-white px-6 py-2 md:text-[0.8rem] font-semibold md:text-base uppercase font-montserrat rounded-4xl hover:bg-[#3e4f37] transition-all duration-300 cursor-pointer">
              LÄS MER
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
