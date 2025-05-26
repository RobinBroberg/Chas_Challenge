"use client";
import ProfileSidebar from "@/components/ProfileSidebar";

import { useEffect, useState } from "react";
import {
  getAllowance,
  getCurrentUser,
  getMonthlyStats,
  getAnswerHistory,
  getSubmissionAnswers,
} from "@/services/api";
import SurveyAnswerModal from "@/components/SurveyAnswerModal";
import { Bar } from "react-chartjs-2";
import { VscArrowCircleRight } from "react-icons/vsc";
import { BsEmojiGrin } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import { BsEmojiNeutral } from "react-icons/bs";
import { BsEmojiFrown } from "react-icons/bs";
import { BsEmojiAngry } from "react-icons/bs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ProfileCard from "@/components/ProfileCard";
import WellnessCard from "@/components/WellnessCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MedarbetarProfil() {
  const [status, setStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [remainingBalance, setRemainingBalance] = useState(null);
  const [totalAllowance, setTotalAllowance] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
  const [modalAnswers, setModalAnswers] = useState([]);

  // Dagens datum för datumformat och friskvård
  const today = new Date();

  // Format för Datum
  const formattedDate = `Datum: ${today.getDate()}/${
    today.getMonth() + 1
  } - ${today.getFullYear()}`;

  // Antal dagar kvar av friskvård
  const endOfYear = new Date(today.getFullYear(), 11, 31);
  const msPerDay = 1000 * 60 * 60 * 24;
  const remainingDays = Math.ceil((endOfYear - today) / msPerDay);

  const handleOpenModal = async (submissionId) => {
    try {
      const answers = await getSubmissionAnswers(submissionId);
      setModalAnswers(answers);
      setSelectedSubmissionId(submissionId);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to load submission answers:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [user, stats, history, allowance] = await Promise.all([
          getCurrentUser(),
          getMonthlyStats(),
          getAnswerHistory(),
          getAllowance(),
          getSubmissionAnswers(),
        ]);

        setUser({
          ...user,
          avatar: user.avatar || "/profileEmployee.png",
        });
        setMonthlyStats(stats);
        setHistory(history);
        setRemainingBalance(allowance.remaining);
        setTotalAllowance(allowance.total);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const wellbeingData = {
    labels: monthlyStats.map((s) =>
      new Date(s.month + "-01").toLocaleString("sv-SE", { month: "long" })
    ),
    datasets: [
      {
        label: "Välmående",
        data: monthlyStats.map((s) => s.average),
        backgroundColor: "#9EA28B",
        hoverBackgroundColor: "#7e816f",
        borderRadius: 6,
        barPercentage: 0.7,
      },
    ],
  };

  if (loading) {
    return null;
  }

  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/EmployeeBG.png")' }}
    >
      <div className="hidden md:block">
        <ProfileSidebar />
      </div>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 sm:p-6 w-full max-w-screen-xl mx-auto">
        {/* Rubrik */}

        <div className="col-span-1 md:col-span-3">
          <h1 className="text-2xl font-semibold mb-5 text-white">Profil</h1>
          <p className="text-white mt-1 mb-2 font-medium relative inline-block after:block after:h-[1px] after:bg-white after:w-full md:after:w-[650px] after:mt-3">
            Hej {user.first_name}! Välkommen in här har du översikt över dina
            aktuella insikter.
          </p>
        </div>
        <div className="block md:hidden ">
          <ProfileSidebar />
        </div>
        {/* Profilkort */}
        <ProfileCard title="MEDARBETARE" user={user} />

        {/* Kolum 2 */}

        <div className="order-2 md:order-none md:col-span-1 flex flex-col h-full gap-6 md:h-[720px]">
          {/* Dagens status */}
          <div className="bg-[#565E40] text-white p-4 rounded-xl min-h-[250px] flex flex-col justify-start shadow-[inset_0_10px_10px_-6px_rgba(255,255,255,0.4)] md:basis-1/2">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold">DAGENS STATUS</p>
              <p className="text-sm">{formattedDate}</p>
            </div>
            <div className="flex justify-between flex-wrap gap-4 mt-16">
              {[
                {
                  icon: <BsEmojiGrin className="text-4xl md:text-5xl" />,
                  alt: "På topp",
                },
                {
                  icon: <BsEmojiSmile className="text-4xl md:text-5xl" />,
                  alt: "Känns bra",
                },
                {
                  icon: <BsEmojiNeutral className="text-4xl md:text-5xl" />,
                  alt: "Helt okej",
                },
                {
                  icon: <BsEmojiFrown className="text-4xl md:text-5xl" />,
                  alt: "Lite nere",
                },
                {
                  icon: <BsEmojiAngry className="text-4xl md:text-5xl" />,
                  alt: "Stressad",
                },
              ].map((item, index) => {
                const isSelected = status === index;
                const hasChosen = status !== null;
                return (
                  <button
                    key={index}
                    onClick={() => setStatus(index)}
                    className={`flex flex-col items-center transition-all duration-300 ${
                      isSelected
                        ? "scale-140"
                        : hasChosen
                        ? "opacity-40 blur-[2px]"
                        : ""
                    }`}
                  >
                    {item.icon}
                    <p className="text-xs mt-1 text-center">{item.alt}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Historik */}
          <div className="order-5 md:order-none md:col-span-1 bg-white/75 border-white p-4 rounded-xl min-h-[150px] md:min-h-[360px] flex flex-col justify-between shadow md:basis-1/2">
            <div>
              <h2 className="font-bold mb-6 text-sm text-black">
                HISTORIK AV TIDIGARE UNDERSÖKNINGAR
              </h2>
              <ul className="list-disc list-inside space-y-2 text-xl text-black">
                {history.map((entry, index) => {
                  const formattedDate = new Date(entry.date).toLocaleDateString(
                    "sv-SE"
                  );

                  return (
                    <li
                      key={index}
                      className="flex items-center gap-2 justify-center md:justify-start"
                    >
                      <span className="inline-block w-30">{formattedDate}</span>
                      <button
                        onClick={() => handleOpenModal(entry.submission_id)}
                      >
                        <VscArrowCircleRight className="text-gray-500 text-xl cursor-pointer" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* <p className="text-sm font-medium text-black self-end mt-4">
              5/7 Avklarade
            </p> */}
          </div>
        </div>

        <div className="order-4 md:order-none md:col-span-1 flex flex-col gap-6 md:h-[720px]">
          {/* Kolum 3 */}
          <div className="order-3 grid grid-cols-2 gap-4 md:grid-cols-1">
            {/* Friskvård */}
            <WellnessCard
              remainingBalance={remainingBalance}
              totalAllowance={totalAllowance}
              remainingDays={remainingDays}
            />

            {/* Quote */}
            <div className="bg-white/10 backdrop-blur-sm shadow-md text-white p-4 rounded-xl border border-white md:h-[180px]">
              <div className="flex items-center justify-start gap-2 mb-2">
                <h2 className="font-bold text-sm">DAGENS QUOTE</h2>
                <img
                  src="/flower.png"
                  alt="Citatikon"
                  className="w-4 h-4 object-contain"
                />
              </div>
              <p className="text-sm mt-8 font-semibold">
                Stäng av mejlen i 30 minuter och fokusera på en sak i taget
              </p>
            </div>
          </div>

          {/* Statistik */}
          <div className="order-4 bg-black/10 backdrop-blur-sm border border-white p-4 rounded-xl shadow-md md:h-[360px] flex flex-col">
            <h2 className="font-bold mb-4 text-white">
              {user.first_name.toUpperCase()}S VÄLMÅENDESTATISTIK
            </h2>
            <div className="flex-1 overflow-hidden">
              <Bar
                className="w-full h-full"
                data={wellbeingData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: { legend: { display: false } },
                  animation: { duration: 800, easing: "easeOutQuart" },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: "#ffffff" },
                      grid: { color: "rgba(255,255,255,0.1)" },
                    },
                    x: {
                      ticks: { color: "#ffffff" },
                      grid: { display: false },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </main>
      {showModal && (
        <SurveyAnswerModal
          visible={showModal}
          answers={modalAnswers}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
