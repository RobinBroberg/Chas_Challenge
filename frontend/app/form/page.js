"use client";
import { useState } from "react";

export default function Form() {
  const [responses, setResponses] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Responses:", responses);
    alert("Ditt svar har skickats.");
  };

  return (
    <div>
      <div
        className="w-full h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/loginpic.png')" }}
      >
        <div className="flex flex-col space-y-10">
          <h1 className="flex justify-center font-bold text-6xl">
            MEDARBETARANKÄT
          </h1>
          <h2
            className="flex justify-center font-semibold text-3xl"
            style={{ color: "#FFFAFA" }}
          >
            Undersökning om medarbetarnöjdhet
          </h2>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col pl-[155px] bg-white space-y-6 text-black"
      >
        <h3 className="font-semibold pt-10 text-xl">
          Svar från 1-5 (1 lägsta betyg och 5 högsta)
        </h3>

        {[
          { name: "q1", question: "1. hur ofta är du nöjd på jobbet?" },
          { name: "q2", question: "2. Hur är din sömnskvalite?" },
          {
            name: "q3",
            question: "3. hur upplever mängden av arbete som du får?",
          },
          {
            name: "q4",
            question:
              "4. Hur bekväm är du med att ta tiden till din psykisk och fysisk hälsa?",
          },
          {
            name: "q5",
            question: "5. Hur mycket energi har du inför ett arbetspass?",
          },
          {
            name: "q6",
            question:
              "6. Hur ofta tar du småpauser för att samla energin under ett arbetspass?",
          },
          {
            name: "q7",
            question: "7. Hur väl hjälper jobbet till ett mer hälsosamt liv?",
          },
        ].map(({ name, question }) => (
          <div key={name}>
            <p className="font-medium mb-2">{question}</p>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num} className="flex flex-col items-center">
                  <input
                    type="radio"
                    name={name}
                    value={num}
                    required
                    className="accent-blue-500"
                    onChange={handleChange}
                  />
                  <span className="text-sm mt-1">{num}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div>
          <button
            type="submit"
            className="px-27 py-4 bg-gray-300 text-white rounded-full hover:bg-gray-400 transition font-bold text-lg m-6"
            style={{ color: "#47423E" }}
          >
            Skicka
          </button>
        </div>
      </form>
    </div>
  );
}
