"use client";

const ExtraSidePages = ({ imageSrc, title, text }) => {
  return (
    <div className="bg-white text-black">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-[350px] object-cover"
      />

      <div className="flex flex-col px-24 py-16 tracking-wider">
        <h1 className="font-extrabold text-2xl font-Wix Madefor Display">
          {title}
        </h1>
        <p className="font-Montserrat font-medium text-lg w-5xl pt-12">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ExtraSidePages;
