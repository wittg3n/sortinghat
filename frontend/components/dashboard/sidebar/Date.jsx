"use client";
import React from "react";

export default function TodayDate() {
  const today = new Date();
  const formatted = today.toLocaleDateString("fa-IR-u-ca-gregory", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="text-[12px] border-[1px] px-2 py-1 rounded text-gray-400 border-gray-700">
      {formatted}
    </div>
  );
}
