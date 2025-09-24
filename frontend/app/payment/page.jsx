"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PricingCard } from "@/components/payment/PricingCard";
import { FeatureSection } from "@/components/payment/FeatureSection";
import { PlansComparisonTable } from "@/components/payment/PlansComparisonTable";
import * as Icons from "lucide-react";
import data from "@/entities/payment/subscriptionData";

export default function SubscriptionPage() {
  const router = useRouter();

  const getIcon = (name) => Icons[name] || Icons.Star;

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-teal-900/20">
      <div className="keyboard-focus-outline fixed top-4 left-4 z-50">
        <Button
          className="text-white bg-none bg-gray-900 hover:bg-gray-800 cursor-pointer"
          onClick={() => router.back()}
        >
          <Icons.ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-transparent to-teal-500/10 blur-3xl" />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-300 to-pink-500 bg-clip-text text-transparent">
              مجیک هت
            </h1>
            <p className="mt-2 text-gray-300 text-lg">
              با قدرت هوش مصنوعی، بهترین دانشگاه‌ها رو پیدا کن و آینده‌ات رو
              بساز 🚀
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.pricingPlans.map((plan, i) => (
            <PricingCard
              key={i}
              {...plan}
              icon={getIcon(plan.icon)}
              features={plan.features.map((f) => ({
                ...f,
                icon: getIcon(f.icon),
              }))}
            />
          ))}
        </div>

        <FeatureSection
          title="چرا مجیک هت؟"
          features={data.features.map((f) => ({ ...f, icon: getIcon(f.icon) }))}
        />

        <PlansComparisonTable data={data.tableData} />

        <FeatureSection
          title="چرا به ما اعتماد کنید؟"
          features={data.trustItems.map((f) => ({
            ...f,
            icon: getIcon(f.icon),
          }))}
        />
      </div>
    </main>
  );
}
