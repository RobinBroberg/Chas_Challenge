"use client";
import { useState, useEffect } from "react";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { getQuestions } from "@/services/api";
import { postAnswers } from "@/services/api";

function FormQuestions({ id, question, value, onChange }) {
  return (
    <div className="font-montserrat flex flex-col md:flex-row items-start md:items-center justify-between w-full py-5 gap-4 md:gap-10">
      <p className="font-medium text-base md:text-lg w-full md:w-1/3">
        {question}
      </p>
      <div className="flex flex-wrap md:flex-nowrap justify-between sm:justify-between gap-4 sm:gap-10 md:gap-16 lg:gap-20 xl:gap-24 w-full md:w-2/3 max-w-[600px] lg:max-w-none">
        {[1, 2, 3, 4, 5].map((num) => (
          <label key={num} className="flex items-center justify-center">
            <input
              type="radio"
              id={id}
              value={num}
              checked={value === String(num)}
              required
              className="accent-green-600 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 cursor-pointer"
              onChange={onChange}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FormPage() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [groupedQuestions, setGroupedQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getQuestions();
        const formatted = data.map((q) => ({
          ...q,
          id: q.id,
          question: q.question_text,
        }));

        const groups = [
          formatted.slice(0, 4),
          formatted.slice(4, 8),
          formatted.slice(8, 10),
        ];

        setAllQuestions(formatted);
        setGroupedQuestions(groups);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        alert("Kunde inte ladda frågor.");
        router.push("/login");
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (page < groupedQuestions.length) {
      const currentQuestions = groupedQuestions[page];
      const allAnswered = currentQuestions.every((q) => responses[q.id]);

      if (!allAnswered) {
        alert("Vänligen svara på alla frågor innan du går vidare.");
        return;
      }

      setPage((prev) => {
        const next = prev + 1;
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
        return next;
      });
    }
  };

  const handleBack = () => {
    if (page > 0) {
      setPage((prev) => {
        const back = prev - 1;
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
        return back;
      });
    }
  };

  const handleFinish = async () => {
    const validQuestions = allQuestions.filter(
      (q) => q.id !== "q11" && q.id !== "q12"
    );

    const allAnswered = validQuestions.every(
      (q) => responses[q.id] && responses[q.id].toString().trim() !== ""
    );

    if (!allAnswered) {
      alert("Var vänlig svara på alla frågor innan du avslutar.");
      return;
    }

    const formatted = validQuestions.map((q) => ({
      question_id: q.id,
      answer_value: parseInt(responses[q.id]),
    }));

    try {
      await postAnswers(formatted);
      router.push("/survey/complete");
    } catch (err) {
      console.error("Failed to post answers:", err);
      alert("Något gick fel vid inskickningen.");
    }
  };

  return (
    <div className="bg-white">
      {page === 0 && (
        <>
          <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center bg-gradient-to-b from-[#4A5A41] to-[#99AE86]">
            <div className="flex flex-col space-y-6 md:space-y-10 text-center px-4">
              <h1 className="font-bold text-3xl md:text-5xl font-Wix Madefor Display">
                Balansundersökning
              </h1>
              <h2 className="font-normal text-lg md:text-2xl font-montserrat">
                Kartläggning av arbetssituation
              </h2>
            </div>
          </div>
          <div className="flex justify-center items-center pt-10 sm:pt-16 md:pt-20">
            <img
              src="/Progressbar1.png"
              className="w-xs sm:w-lg md:w-full max-w-md h-6 sm:h-8 md:h-10"
            />
          </div>
        </>
      )}

      {page === 1 && (
        <div className="flex justify-center items-center pt-10 sm:pt-16 md:pt-20">
          <img
            src="/Progressbar2.png"
            className="w-xs sm:w-lg md:w-full max-w-md h-6 sm:h-8 md:h-10"
          />
        </div>
      )}
      {page === 2 && (
        <div className="flex justify-center items-center pt-10 sm:pt-16 md:pt-20">
          <img
            src="/Progressbar3.png"
            className="w-xs sm:w-lg md:w-full max-w-md h-6 sm:h-8 md:h-10"
          />
        </div>
      )}
      <div className="flex justify-center  md:pt-20 p-10">
        <div
          className={`w-full max-w-6xl mx-auto px-4 md:px-10 text-black ${
            page < groupedQuestions.length
              ? "border border-[#CCCFBC] rounded-[10px] bg-[#F7F7F1]"
              : "bg-white"
          }`}
        >
          {page < groupedQuestions.length ? (
            <form onSubmit={(e) => e.preventDefault()} className="py-10">
              <h2 className="font-semibold font-montserrat text-xl md:text-2xl px-2 md:px-10">
                Så upplever jag min arbetssituation
              </h2>
              <div className="flex justify-end">
                <ul className="grid grid-cols-5 gap-x-2 sm:gap-x-4 w-full md:w-2/3 font-montserrat text-xs sm:text-sm md:text-lg pt-10 pb-5">
                  <li className="text-center">
                    Instämmer
                    <br />
                    inte alls
                  </li>
                  <li className="text-center">
                    Instämmer
                    <br />
                    inte
                  </li>
                  <li className="text-center flex items-center">
                    Varken eller
                  </li>
                  <li className="text-center flex items-center">Instämmer</li>
                  <li className="text-center">
                    Instämmer
                    <br />
                    helt
                  </li>
                </ul>
              </div>

              {groupedQuestions[page]?.map(({ id, question }, index) => {
                const questionNumber = page * 4 + index + 1;
                return (
                  <div
                    key={id}
                    className={`w-full min-h-[120px] px-4 md:px-10 py-8 ${
                      index % 2 === 0 ? "bg-[#DAE0D3]" : "bg-[#F7F7F1]"
                    }`}
                  >
                    <FormQuestions
                      id={id}
                      question={`${questionNumber}. ${question}`}
                      value={responses[id]}
                      onChange={handleChange}
                    />
                  </div>
                );
              })}
            </form>
          ) : (
            // Last page
            <div className="flex flex-col justify-center items-center bg-white">
              <div className="flex justify-center items-center pt-6 sm:pt-8 md:pt-10">
                <img
                  src="/Progressbar3.png"
                  className="w-xs sm:w-lg md:w-full max-w-md h-6 sm:h-8 md:h-10"
                />
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full max-w-4xl space-y-24 pt-14 sm:pt-18 md:pt-24"
              >
                <div className="space-y-4 px-4">
                  <p className="font-semibold text-lg md:text-2xl md:px-28 font-montserrat">
                    11. Skulle du rekommendera din arbetsplats till andra?
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-10">
                    <button
                      type="button"
                      className={`flex items-center justify-center bg-[#F5F5F1] w-40 h-40 sm:w-60 sm:h-60 md:w-[330px] md:h-[330px] rounded-full cursor-pointer transition-all duration-300
                       ${
                         responses.q11 === "yes"
                           ? "border-4 border-green-500"
                           : "border border-[#96A56B]"
                       }`}
                      onClick={() =>
                        setResponses((prev) => ({ ...prev, q11: "yes" }))
                      }
                    >
                      <LuThumbsUp className="size-16 sm:size-24 md:size-32 text-green-500" />
                    </button>

                    <button
                      type="button"
                      className={`flex items-center justify-center bg-[#F5F5F1] w-40 h-40 sm:w-60 sm:h-60 md:w-[330px] md:h-[330px] rounded-full cursor-pointer transition-all duration-300
                     ${
                       responses.q11 === "no"
                         ? "border-4 border-red-500"
                         : "border border-[#96A56B]"
                     }`}
                      onClick={() =>
                        setResponses((prev) => ({ ...prev, q11: "no" }))
                      }
                    >
                      <LuThumbsDown className="size-16 sm:size-24 md:size-32 text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4 px-4">
                  <p className="font-semibold text-lg md:text-2xl md:px-28 font-montserrat">
                    12. Vill du ge någon mer feedback?
                  </p>
                  <div className="flex justify-center pt-4 font-montserrat">
                    <textarea
                      name="q12"
                      value={responses.q12 || ""}
                      onChange={handleChange}
                      required
                      placeholder="Ange ditt svar"
                      className="w-full max-w-[650px] h-40 md:h-56 bg-[#F5F5F1] border border-[#768354] rounded-lg text-base md:text-lg p-4 resize-none"
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <div>
        {page === groupedQuestions.length ? (
          <div className="flex justify-center pt-16 pb-20">
            <button
              onClick={handleFinish}
              className="text-white w-full max-w-[217px] h-16 md:h-[83px] bg-[#5F6F52] hover:bg-[#464C35] rounded-full cursor-pointer text-xl md:text-3xl transition-colors duration-200"
              style={{
                boxShadow: "inset 0px 21px 11.9px rgba(189, 188, 188, 0.25)",
              }}
            >
              Skicka
            </button>
          </div>
        ) : (
          <div className="flex justify-between px-4 md:px-14 pb-16">
            {page > 0 && (
              <button
                onClick={handleBack}
                className="text-4xl md:text-5xl text-[#4A5A41] cursor-pointer"
              >
                <BsArrowLeftCircle />
              </button>
            )}
            <div className="flex justify-end w-full">
              <button
                onClick={handleNext}
                className="text-4xl md:text-5xl text-[#4A5A41] cursor-pointer"
              >
                <BsArrowRightCircle />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
