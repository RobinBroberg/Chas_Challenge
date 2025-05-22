import React from "react";

const CircleProgress = ({
  percentage,
  size,
  strokeWidth,
  circleColor,
  bgColor,
  text,
  textSize,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  return (
    <svg width={size} height={size} className="block mx-auto">
      <circle
        stroke={bgColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke={circleColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      <text
        x="50%"
        y="50%"
        dy="0.3em"
        textAnchor="middle"
        fontSize={textSize || size * 0.15}
        fontWeight="bold"
        fill={circleColor}
        fontFamily="'Montserrat', sans-serif"
      >
        {text}
      </text>
    </svg>
  );
};

const Card = ({
  title,
  subtitle,
  footer,
  circlePercentage,
  circleText,
  bgColor = "#C7CBBB",
  width = 309,
  height = 265,
  circleTextSize,
  children,
}) => {
  const oliveGreen = "#808000";
  const footerColor = "#4A4A4A";

  return (
    <div
      className="rounded-xl p-5 flex flex-col justify-between shadow-md font-[Montserrat]"
      style={{ backgroundColor: bgColor, width, height }}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-[#1A1A1A] text-2xl font-bold mb-2 flex items-center gap-2">
          {title}
          {title === "Välmåendestatistik" && (
            <span role="img" aria-label="statistik">
              📊
            </span>
          )}
        </h2>

        {/* Månad & År Buttons */}
        {title === "Välmåendestatistik" && (
          <div className="flex gap-2">
            <button
              className="px-4 py-1 rounded-full text-white text-sm font-semibold"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)), linear-gradient(322deg, #232F21 0%, #D5DABC 95.67%)",
              }}
            >
              Månad
            </button>
            <button
              className="px-4 py-1 rounded-full text-white text-sm font-semibold"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)), linear-gradient(322deg, #232F21 0%, #D5DABC 95.67%)",
              }}
            >
              År
            </button>
          </div>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-[#4A4A4A] text-base font-normal mb-2">{subtitle}</p>
      )}

      {/* Per team och linje */}
      {title === "Välmåendestatistik" && (
        <div className="w-full mt-1">
          <p className="text-[10.8px] font-semibold">Per team</p>
          <div className="w-full border-b border-black mt-1" />
        </div>
      )}

      {/* Cirkel / extra innehåll */}
      {circlePercentage !== undefined && (
        <CircleProgress
          percentage={circlePercentage}
          size={150}
          strokeWidth={12}
          circleColor={oliveGreen}
          bgColor="#D3D3D3"
          text={circleText}
          textSize={circleTextSize}
        />
      )}

      {children}

      {/* Footer */}
      {footer && (
        <p
          className={`self-start ${
            circlePercentage !== undefined
              ? "text-[#4A4A4A] text-base font-medium mt-2"
              : "text-black text-[60px] font-semibold leading-[170%] tracking-wide"
          }`}
        >
          {footer}
        </p>
      )}
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="p-8 bg-[#f0f0f0] min-h-screen flex flex-col gap-5">
      {/* Rad 1 - två kort sida vid sida */}
      <div className="flex gap-5">
        <Card
          title="Hälsokartläggning"
          subtitle="Besvarat undersökning"
          footer="27/30"
          bgColor="#C7CBBB"
        />

        <Card
          title="Kvittogodkännande"
          circlePercentage={60}
          circleText="60% godkända"
          footer="18/30 godkända"
          circleTextSize={150 * 0.1}
        />
      </div>

      {/* Rad 2 - Välmåendestatistik */}
      <Card
        title="Välmåendestatistik"
        subtitle="Besvaras inom 3 dagar"
        footer="0/10 besvarade"
        width={640}
        height={375}
      />
    </div>
  );
};

export default Dashboard;
