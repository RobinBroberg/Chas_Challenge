"use client";

const ExtraSidePages = ({ imageSrc, title, text }) => {
  return (
    <div className="bg-white text-black">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-[400px] object-cover"
      />

      <div className="flex flex-col space-y-24 px-24 py-30">
        <h2 className="font-extrabold text-2xl">{title}</h2>
        <p className="font-Montserrat font-medium text-2xl w-4xl">{text}</p>
      </div>
    </div>
  );
};

export default ExtraSidePages;
