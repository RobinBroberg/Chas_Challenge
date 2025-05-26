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
    <div className="flex w-full min-h-screen">
      <div className="w-[45%] min-h-screen">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-[60%] bg-[#FBFAF5] flex items-center">
        <div className="max-w-2xl px-16 ">
          <h3 className="text-2xl font-bold text-black tracking-wide pt-20">
            {undertitle}
          </h3>
          <p className="text-lg font-medium tracking-wide text-gray-700 font-montserrat leading-relaxed pt-16">
            {text}
          </p>
          <p className="text-lg font-medium tracking-wide text-gray-700 font-montserrat leading-relaxed pt-6">
            {text2}
          </p>
          <p className="text-lg font-medium tracking-wide text-gray-700 font-montserrat leading-relaxed pt-6">
            {text3}
          </p>
          <p className="text-lg font-medium tracking-wide text-gray-700 font-montserrat leading-relaxed pt-6 mb-10">
            {text4}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageTextSection;
