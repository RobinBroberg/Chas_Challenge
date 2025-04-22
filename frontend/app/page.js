export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f1ea] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-[#4e4a45] mb-6">
          WorkWell
        </h1>
        <p className="text-[#6d665e] text-lg md:text-xl mb-8">
          En plattform för arbetsgivare och anställda – för att förebygga
          stress, öka välmåendet och skapa en hållbar arbetsmiljö✨
        </p>
        <button className="bg-[#d4bfa5] hover:bg-[#c6aa8c] text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition mr-4">
          Kom igång
        </button>

        <button className="bg-[#b9a38a] hover:bg-[#ba9c7b] text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition">
          Logga in
        </button>
      </div>
    </main>
  );
}
