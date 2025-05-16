"use client";
import { useState } from "react";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";
import { useRouter } from "next/navigation";

const questions = [
  [
    { name: "q1", question: "1. Hur trivs du på arbetsplatsen?" },
    {
      name: "q2",
      question: "2. Känner du att dina arbetsuppgifter är meningsfulla?",
    },
    { name: "q3", question: "3. Hur upplever du din relation med kollegor?" },
    { name: "q4", question: "4. Hur ofta får du feedback från din chef?" },
  ],
  [
    {
      name: "q5",
      question: "5. Hur väl stämmer dina arbetsuppgifter med dina kompetenser?",
    },
    {
      name: "q6",
      question: "6. Känner du att du har möjlighet att utvecklas på jobbet?",
    },
    { name: "q7", question: "7. Hur nöjd är du med företagets kommunikation?" },
    {
      name: "q8",
      question:
        "8. Känner du att du har en bra balans mellan arbete och fritid?",
    },
  ],
  [
    {
      name: "q9",
      question: "9. Hur stressad känner du dig under arbetsdagar?",
    },
    { name: "q10", question: "10. Hur trygg känner du dig i din anställning?" },
  ],
];

function FormQuestions({ name, question, value, onChange }) {
  return (
    <div className=" font-Montserrat flex flex-row items-center justify-between w-full py-5 space-x-10">
      <p className="font-medium text-lg w-1/3">{question}</p>
      <div className="flex justify-evenly gap-24 items-center w-2/3">
        {[1, 2, 3, 4, 5].map((num) => (
          <label key={num} className="flex items-center justify-center">
            <input
              type="radio"
              name={name}
              value={num}
              checked={value === String(num)}
              required
              className="accent-green-600 w-8 h-8"
              onChange={onChange}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FormPage() {
  const [responses, setResponses] = useState({});
  const [page, setPage] = useState(0);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "q9") {
      setResponses((prev) => ({ ...prev, [name]: value }));
    } else {
      setResponses((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    const currentQuestions = questions[page];
    const allAnswered = currentQuestions.every((q) => responses[q.name]);

    if (!allAnswered) {
      alert("Vänlig svara på alla frågor innan du går vidare.");
      return;
    }

    if (page < questions.length - 1) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 0);
        return nextPage;
      });
    }
  };

  const handleBack = () => {
    if (page > 0) {
      setPage((prevPage) => {
        const prev = prevPage - 1;
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 0);
        return prev;
      });
    }
  };

  const handleFinish = () => {
    const allQuestions = questions.flat();
    const allAnswered = allQuestions.every((q) => {
      if (q.name === "q9") {
        return responses[q.name] === "yes" || responses[q.name] === "no";
      }
      if (q.name === "q10") {
        return responses[q.name] && responses[q.name].trim() !== "";
      }

      return responses[q.name];
    });

    if (!allAnswered) {
      alert("Var vänlig svara på alla frågor innan du avslutar.");
      return;
    }

    console.log("Responses:", responses);
    // Optional: send data to backend here
    router.push("/formDone");
  };

  return (
    // first page
    <div className="bg-white">
      {page === 0 && (
        <div className="w-full h-[400px] flex items-center justify-center bg-linear-0 from-[#4A5A41] to-[#99AE86]">
          <div className="flex flex-col space-y-10">
            <h1 className="flex justify-center font-bold text-5xl font-Wix Madefor Display">
              Balansundersökning
            </h1>
            <h2 className="flex justify-center font-normal text-2xl font-Montserrat">
              Kartläggning av arbetssituation
            </h2>
          </div>
        </div>
      )}
      {page === 0 && (
        <div className="flex justify-center items-center pt-20">
          <img src="Progressbar1.png" className=" w-lg h-10"></img>
        </div>
      )}

      {page === 1 && (
        <div className="flex justify-center items-center pt-20">
          <img src="Progressbar2.png" className="w-lg h-10" />
        </div>
      )}

      <div className="flex justify-center pt-22 p-4">
        <div
          className={`w-5xl min-h-[600px] text-black ${
            page !== 2
              ? "border border-[#CCCFBC] rounded-[10px] bg-[#F7F7F1]"
              : "bg-white"
          }`}
        >
          {page < 2 ? (
            <form onSubmit={(e) => e.preventDefault()} className="py-10">
              <h2 className="font-semibold font-Montserrat text-2xl px-10">
                Så upplever jag min arbetssituation
              </h2>
              <div className="flex justify-end ">
                <ul className="grid grid-cols-5 w-2/3 font-Montserrat font-medium text-lg pt-10 pb-5">
                  <li className="flex flex-col items-center text-center">
                    <span>Instämmer</span>
                    <span>inte alls</span>
                  </li>
                  <li className="flex flex-col items-center text-center">
                    <span>Instämmer</span>
                    <span>inte</span>
                  </li>
                  <li className="flex flex-col items-center justify-center text-center">
                    <span>Varken eller</span>
                  </li>
                  <li className="flex flex-col items-center justify-center text-center">
                    <span>Instämmer</span>
                  </li>
                  <li className="flex flex-col items-center text-center">
                    <span>Instämmer</span>
                    <span>helt</span>
                  </li>
                </ul>
              </div>

              {questions[page].map(({ name, question }, index) => (
                <div
                  key={name}
                  className={`w-full h-[150px] px-10 py-8 ${
                    index % 2 === 0 ? "bg-[#DAE0D3]" : "bg-[#F7F7F1]"
                  }`}
                >
                  <FormQuestions
                    name={name}
                    question={question}
                    value={responses[name]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </form>
          ) : (
            // last page
            <div className="flex flex-col justify-center items-center bg-white">
              <div className="flex justify-center items-center">
                <img src="Progressbar3.png" className="w-lg h-10" />
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full max-w-4xl space-y-24 pt-24"
              >
                {questions[page].map(({ name, question }) => (
                  <div key={name} className="space-y-5">
                    <p className="font-semibold text-2xl px-28 font-Montserrat">
                      {question}
                    </p>

                    {name === "q9" ? (
                      <div className="flex justify-center gap-10 pt-10">
                        <button
                          type="button"
                          className="flex items-center justify-center bg-[#F5F5F1] w-[330px] h-[330px] border border-[#96A56B] rounded-full cursor-pointer transition-transform duration-150 active:scale-105"
                          onClick={() =>
                            setResponses((prev) => ({ ...prev, q9: "yes" }))
                          }
                        >
                          <LuThumbsUp className="size-32 text-green-500" />
                        </button>
                        <button
                          type="button"
                          className="flex items-center justify-center bg-[#F5F5F1] w-[330px] h-[330px] border border-[#96A56B] rounded-full cursor-pointer transition-transform duration-150 active:scale-105"
                          onClick={() =>
                            setResponses((prev) => ({ ...prev, q9: "no" }))
                          }
                        >
                          <LuThumbsDown className="size-32 text-red-500" />
                        </button>
                      </div>
                    ) : name === "q10" ? (
                      <div className="flex justify-center pt-10 font-Montserrat ">
                        <textarea
                          name="q10"
                          value={responses.q10 || ""}
                          onChange={handleChange}
                          required
                          placeholder="Ange ditt svar"
                          className="w-[650px] h-56 bg-[#F5F5F1] border border-[#768354] rounded-lg text-lg p-4 resize-none align-top"
                        />
                      </div>
                    ) : (
                      // Default 1–5 radio
                      <FormQuestions
                        name={name}
                        question={question}
                        value={responses[name]}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                ))}
              </form>
            </div>
          )}
        </div>
      </div>

      <div>
        {page === questions.length - 1 ? (
          <div className="flex justify-center pt-16 pb-20">
            <button
              onClick={handleFinish}
              className="text-white w-[217px] h-[83px] bg-linear-0 from-[#4A5A41] to-[#99AE86]  drop-shadow-[#00000040] inset-shadow-[#BDBCBC40] backdrop-blur-lg rounded-[60px] font-normal text-3xl cursor-pointer"
            >
              Skicka
            </button>
          </div>
        ) : (
          <div className="flex justify-between px-14 pb-16">
            {page > 0 && (
              <button
                onClick={handleBack}
                className="text-5xl text-[#4A5A41] cursor-pointer"
              >
                <BsArrowLeftCircle />
              </button>
            )}
            <div className="flex justify-end w-full">
              <button
                onClick={handleNext}
                className="text-5xl text-[#4A5A41] cursor-pointer"
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
