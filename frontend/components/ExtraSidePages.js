"use client";

const ExtraSidePages = ({ imageSrc, title, text }) => {
  return (
    <div className="bg-white text-black">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-[200px] sm:h-[300px] md:h-[350px] object-cover"
      />

      <div className="flex flex-col px-6 sm:px-12 md:px-24 py-10 sm:py-16 tracking-wider max-w-6xl mx-auto">
        <h1 className="font-extrabold text-xl sm:text-2xl md:text-3xl font-wix madefor display">
          {title}
        </h1>
        <p className="font-montserrat font-medium text-sm sm:text-base md:text-lg max-w-full sm:max-w-5xl pt-8 sm:pt-12 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ExtraSidePages;
