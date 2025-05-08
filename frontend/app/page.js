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
          <h1 className="text-white font-sans text-8xl md:text-[17rem] tracking-widest">
            BALANCE
          </h1>
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-end px-10 pb-20">
          <h3 className="text-white font-extrabold tracking-wide text-3xl md:text-[3.7rem]">
            DITT STÖD FÖR ETT HÅLLBART VÄLMÅENDE
          </h3>
          <p className="text-white text-xl md:text-[2.2rem] font-extralight leading-snug mb-2">
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

      {/* Full Width Image */}
      <div className="w-full max-w-7xl px-6 my-10">
        <img
          src="/landingIMG.jpg"
          alt="Landing Image"
          className="w-full h-auto md:h-[450px] object-cover"
        />
      </div>
    </main>
  );
}
