import React from "react";
import { createPortal } from "react-dom";

function ReadOnlyQuestion({ question, value }) {
  return (
    <div className="font-montserrat flex flex-col md:flex-row items-start md:items-center justify-between w-full py-3 gap-4 md:gap-8">
      <p className="font-medium text-sm md:text-base w-full md:w-1/3">
        {question}
      </p>
      <div className="flex justify-between gap-3 md:gap-6 w-full md:w-2/3">
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              value === num
                ? "bg-[#7B8273] border-[#7B8273] text-white"
                : "border-[#C4C4C4] bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function SurveyAnswerModal({ visible, onClose, answers }) {
  if (!visible) return null;

  return createPortal(
    <div className="fixed inset-0 bg-transparent bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto  p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-6">Dina svar</h2>

        <div className="space-y-4">
          {answers.map((a, idx) => (
            <div
              key={idx}
              className={`w-full px-4 py-4 ${
                idx % 2 === 0 ? "bg-[#DAE0D3]" : "bg-[#F7F7F1]"
              }`}
            >
              <ReadOnlyQuestion
                question={`${idx + 1}. ${a.question_text}`}
                value={a.answer_value}
              />
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
