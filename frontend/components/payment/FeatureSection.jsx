// ---------------- FeatureSection.jsx ----------------
"use client";
import React from "react";

export function FeatureSection({ title, features }) {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        {title}
      </h2>
      <div className="grid md:grid-cols-3 gap-6 text-gray-200">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg shadow-md"
          >
            {f.icon && <f.icon className="w-10 h-10 mb-2" />}
            <h3 className="font-bold text-lg mb-1">{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
