import CardsSlider from "@/components/CardsSlider";

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
    <main className="min-h-screen bg-[#f5f1ea] flex flex-col items-center">
      {/* Hero Section */}
      <header className="relative w-full mb-12">
        <img
          src="/landingHeader.png"
          alt="Logo"
          className="w-full h-[850px] object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-start px-10">
          <h1 className="text-white font-montserrat text-8xl md:text-[14rem] tracking-widest">
            BALANCE
          </h1>
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-end px-10 pb-[7.5rem]">
          <h3 className="text-white font-bold font-montserrat tracking-wide text-3xl md:text-[3.2rem]">
            DITT STÖD FÖR ETT HÅLLBART VÄLMÅENDE
          </h3>
          <p className="text-white text-xl font-montserrat md:text-[1.7rem] font-extralight leading-snug mb-2">
            Stärk din hälsa både i och utanför arbetet, ett steg närmare mot
            ditt bästa jag - din resa mot mer balans börjar här
          </p>
        </div>
      </header>

      {/* Section Title */}
      <section className="flex flex-col items-center w-full px-4 py-8 bg-[#f5f1ea]">
        <h2 className="text-[#3e3a35] font-sans font-bold tracking-widest text-xl md:text-[2rem] mb-6">
          DIN GUIDE TILL BALANS
        </h2>

        {/* CARD SLIDER SECTION */}
        <CardsSlider cards={cards} />
      </section>

      {/* Full Width Image with Centered h2 */}
      <div className="relative w-screen my-10">
        <img
          src="/landingIMG.jpg"
          alt="Landing Image"
          className="w-full md:h-[450px] object-cover brightness-75"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-white font-bold text-5xl text-center px-4">
          DIN HÄLSA. DITT TEMPO. DITT VÄLMÅENDE.
        </h2>
      </div>

      {/* App Showcase Section */}
      <section className="w-full bg-[#f5f1ea] py-16 px-4 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left content */}
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="font-bold text-black md:text-[2.1rem] mb-4">
              EN PLATS FÖR DITT VÄLMÅENDE
            </h2>
            <p className="text-gray-800 text-lg mb-8">
              Med Balance får du en personlig översikt över hur du mår, enkla
              verktyg för att förebygga stress och stöd på vägen mot bättre
              balans i vardagen.Med Balance får du en personlig översikt över
              hur du mår, enkla verktyg för att förebygga stress och stöd på
              vägen mot bättre balans i vardagen.
            </p>
            <div className="flex justify-end">
              <button className="border-2 border-[#6ea16e] bg-[#5b6b5b] hover:bg-[#4a574a] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 cursor-pointer">
                OM OSS
              </button>
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
          <h2 className="text-center font-bold text-black text-4xl md:text-5xl mb-12">
            SWIPE
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Left side - Image */}
            <div className="w-full md:w-1/2">
              <img
                src="/balanceCollage.png"
                alt="Balance Collage"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Right side - Categories */}
            <div className="w-full md:w-1/2 space-y-8">
              <div className="mb-6">
                <h3 className="text-[#4f8942] font-bold text-xl mb-2">
                  Kategorier
                </h3>
                <p className="text-gray-800 p-4 rounded-md">
                  Med swipefunktionen kan användaren enkelt navigera mellan
                  olika kategorier genom att svepa åt vänster eller höger. Det
                  ger en smidig och intuitiv upplevelse där man snabbt kan hitta
                  det innehåll man är intresserad av oavsett om det handlar om
                  att träna kroppen, lugna sinnet eller hitta inspiration.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#4f8942]">
                {/* Category 1 */}
                <div className="flex items-start gap-4 text-[#4f8942]">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Träning</h4>
                    <p className="text-gray-700">
                      Här hittar du olika träningspass från yoga för nybörjare
                      till intensiva HIIT-pass. Träna hemma i din egen takt –
                      inga redskap krävs!
                    </p>
                  </div>
                </div>

                {/* Category 2 */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Mindfulness</h4>
                    <p className="text-gray-700">
                      Guidad meditation, andningsövningar och avslappning för
                      att minska stress och öka närvaro i vardagen.
                    </p>
                  </div>
                </div>

                {/* Category 3 */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full  flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Poddar</h4>
                    <p className="text-gray-700">
                      Lyssna på inspirerande poddar om hälsa, personlig
                      utveckling och mental styrka – perfekt för promenaden
                      eller vilan.
                    </p>
                  </div>
                </div>

                {/* Category 4 */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full  flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Hälsa & Livsstil</h4>
                    <p className="text-gray-700">
                      Tips och inspiration om kost, sömn, balans och dagliga
                      rutiner för ett hållbart välmående.
                    </p>
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
            <div className="relative overflow-hidden  transition-all duration-500 ease-in-out transform hover:scale-105 h-64">
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
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-xl font-bold tracking-wider">
                  VÄGEN TILLBAKA FRÅN SJUKSKRIVNING
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#f5f1ea] py-16 px-4 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-48">
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

          <br />
          {/* Right content (was previously on left) */}
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="font-bold text-black md:text-[2.8rem] mb-4">
              FRISKVÅRDSHANTERING
            </h2>
            <p className="text-gray-800 text-lg mb-8">
              Med Balance får du en personlig översikt över hur du mår, enkla
              verktyg för att förebygga stress och stöd på vägen mot bättre
              balans i vardagenMed Balance får du en personlig översikt över hur
              du mår, enkla verktyg för att förebygga stress och stöd på vägen
              mot bättre balans i vardagen.
            </p>
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

          {/* Overlay card with text */}
          <div className="absolute left-12 md:left-20 top-1/2 transform -translate-y-1/2 bg-white/70 p-6 md:p-8 rounded-xl max-w-md">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-black mb-4">
              UTMANINGAR
            </h2>
            <p className="text-gray-800 font-montserrat mb-6">
              Gör hälsa till en naturlig del av din arbetsdag – delta i
              utmaningar som peppar, motiverar och stärker gemenskapen med dina
              kollegor
            </p>
            <button className="bg-[#4b6043] text-white px-6 py-2 uppercase text-sm font-montserrat font-medium rounded-lg hover:bg-[#3e4f37] transition-colors">
              LÄS MER
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
