// ---------------- PricingCard.jsx ----------------
"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlowEffect } from "./GlowEffect";

export function PricingCard({
  title,
  subtitle,
  price,
  features,
  icon: Icon,
  highlighted = false,
  glowColors,
}) {
  if (highlighted) {
    return (
      <div className="relative h-full w-full group transform transition-all duration-300">
        <GlowEffect colors={glowColors} mode="rotate" blur="strong" />
        <div className="relative rounded-lg bg-gray-900 p-6 text-white h-full flex flex-col shadow-2xl ring-2 ring-pink-500/40">
          <span className="absolute -top-3 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-md">
            پیشنهاد ما
          </span>

          {/* Content section - grows to fill available space */}
          <div className="flex flex-col items-center justify-center flex-grow">
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              {title}
            </h3>
            <p className="mt-2 text-gray-300 text-sm">{subtitle}</p>
            <p className="mt-4 text-4xl font-extrabold text-white">{price}</p>

            <ul className="mt-4 flex flex-col gap-2 text-gray-200 text-sm">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  {f.icon && <f.icon className="w-4 h-4 text-pink-400" />}
                  {f.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Button section - sticks to bottom */}
          <div className="mt-6 flex gap-2">
            <Button
              variant="default"
              className="flex-1 bg-teal-300 text-gray-900 hover:bg-teal-400 focus:ring-4 focus:ring-teal-200"
            >
              انتخاب پلن
            </Button>
            {/* Add more buttons here if needed */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-6 flex flex-col h-full">
      {/* Content section - grows to fill available space */}
      <div className="flex flex-col gap-4 text-center flex-grow">
        {Icon && <Icon className="w-10 h-10 mx-auto text-teal-400" />}
        <CardHeader>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <p className="text-gray-300">{subtitle}</p>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <p className="text-3xl font-extrabold text-white">{price}</p>
          <ul className="mt-4 flex flex-col gap-2 text-gray-200 text-sm flex-grow">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                {f.icon && <f.icon className="w-4 h-4 text-teal-400" />}
                {f.text}
              </li>
            ))}
          </ul>
        </CardContent>
      </div>

      {/* Button section - sticks to bottom */}
      <div className="mt-6 flex gap-2">
        <Button
          variant="default"
          className="flex-1 bg-gray-900 border-1 border-gray-800 text-white hover:bg-gray-800 focus:ring-4 focus:ring-teal-200"
        >
          انتخاب پلن
        </Button>
        {/* Add more buttons here if needed */}
      </div>
    </Card>
  );
}
