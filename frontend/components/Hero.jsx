"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const TypewriterText = ({ text, speed = 70, pause = 2000 }) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer;

    if (!isDeleting && index < text.length) {
      timer = setTimeout(() => {
        setDisplayText(text.slice(0, index + 1));
        setIndex(index + 1);
      }, speed);
    } else if (!isDeleting && index === text.length) {
      timer = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && index > 0) {
      timer = setTimeout(() => {
        setDisplayText(text.slice(0, index - 1));
        setIndex(index - 1);
      }, speed / 1.8);
    } else if (isDeleting && index === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, text, speed, pause]);

  return (
    <span className="font-Anjoman text-3xl font-bold">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export const Hero = () => {
  return (
    <section dir="rtl" className="relative overflow-hidden py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* راست (متن) */}
        <div className="flex flex-col items-start md:items-start text-center md:text-right space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            راحت ترین راه اپلای
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            با SortingHat فقط یک بار مدارکتان را بارگذاری کنید. سامانه با کمک
            هوش مصنوعی بهترین دانشگاه‌ها را پیشنهاد می‌دهد و فرآیند اپلای را
            به‌صورت خودکار یا راهنمای مرحله‌به‌مرحله انجام می‌دهد.
          </p>
          <button className="px-6 py-3 bg-mist-800 text-white rounded-lg shadow-md hover:bg-blue-500 transition">
            شروع کنید
          </button>
        </div>

        {/* چپ (تصویر) */}
        <div className="flex justify-center">
          <div className="relative w-full h-[600px] md:h-[800px]">
            <Image
              src="/hero-image.png"
              alt="Hero image"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
