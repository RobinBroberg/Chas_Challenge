"use client";

import React from "react";

const ImageTextSection = ({
  imageSrc,
  title,
  undertitle,
  text,
  text2,
  text3,
  text4,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <div className="w-full md:w-2/5 min-h-[300px] md:min-h-screen">
        <img
          src={imageSrc}
          alt={title || undertitle}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-3/5 bg-[#FBFAF5] flex items-center">
        <div className="max-w-2xl px-6 sm:px-12 md:px-16 py-12 md:py-20">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-wide pt-8 md:pt-0">
            {undertitle}
          </h3>
          <p className="text-base sm:text-lg font-medium tracking-wide text-gray-700 font-montserrat leading-relaxed pt-8">
            {text}
          </p>
          <p className="text-base sm:text-lg font-medium tracking-wide text-gray-700 font-montserrat leading-relaxed pt-6">
            {text2}
          </p>
          <p className="text-base sm:text-lg font-medium tracking-wide text-gray-700 font-montserrat leading-relaxed pt-6">
            {text3}
          </p>
          <p className="text-base sm:text-lg font-medium tracking-wide text-gray-700 font-montserrat leading-relaxed pt-6 mb-10">
            {text4}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageTextSection;
