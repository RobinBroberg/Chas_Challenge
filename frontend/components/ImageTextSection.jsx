"use client";

import React from "react";

const ImageTextSection = ({ imageSrc, title, undertitle, text }) => {
  return (
    <div className="flex w-full h-screen">

     
      <div className="w-[45%] h-full">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-[60%] bg-[#FBFAF5] flex items-center">
        <div className="max-w-2xl px-16">
          <h1 className="text-4xl font-bold text-black mb-25">{title}</h1>
          <h3 className="text-2xl font-bold text-black mb-15">{undertitle}</h3>
          <p className="text-lg text-gray-700 font-Montserrat leading-relaxed mb-20">{text}</p>
        </div>
      </div>
    </div>
  );
};


export default ImageTextSection;

