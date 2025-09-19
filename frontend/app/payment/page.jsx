"use client";
import React from "react";
import {
  Clock,
  CreditCard,
  Star,
  Sparkles,
  Rocket,
  Shield,
  Check,
  FileCheck,
  TrendingUp,
  MessageCircle,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { PricingCard } from "@/components/payment/PricingCard";
import { FeatureSection } from "@/components/payment/FeatureSection";
import { PlansComparisonTable } from "@/components/payment/PlansComparisonTable";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function SubscriptionPage() {
  const pricingPlans = [
    {
      title: "استارتر",
      subtitle: "برای شروع و آشنایی",
      price: "50,000 تومان",
      icon: Clock,
      features: [
        { text: "۷ روز دسترسی کامل", icon: Check },
        { text: "۵ پیشنهاد دانشگاه هوشمند", icon: FileCheck },
        { text: "آنالیز پروفایل", icon: TrendingUp },
        { text: "پشتیبانی ایمیلی", icon: MessageCircle },
      ],
    },
    {
      title: "پلن ویژه",
      subtitle: "بهترین انتخاب برای شما",
      price: "750,000 تومان",
      highlighted: true,
      glowColors: ["#0894FF", "#C959DD", "#FF2E54", "#FF9004"],
      icon: Star, // Added missing icon
      features: [
        { text: "۶ ماه دسترسی VIP", icon: Star },
        { text: "پیشنهادات نامحدود", icon: Sparkles },
        { text: "مشاور اختصاصی AI", icon: Rocket },
        { text: "پشتیبانی اولویت‌دار", icon: Shield },
      ],
    },
    {
      title: "نخبه",
      subtitle: "برای متقاضیان جدی",
      price: "1,500,000 تومان",
      icon: CreditCard,
      features: [
        { text: "۳۶۵ روز دسترسی VIP", icon: Star },
        { text: "پیشنهادات نامحدود", icon: Sparkles },
        { text: "دسترسی اولیه به ویژگی‌های جدید", icon: Zap },
        { text: "مشاور اختصاصی AI", icon: Rocket },
        { text: "پشتیبانی اولویت‌دار", icon: Shield },
        { text: "۲ ماه رایگان اضافه!", icon: CreditCard },
      ],
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "پیشنهادات نامحدود",
      description: "به راحتی بیشترین تعداد دانشگاه مناسب را مشاهده کنید.",
    },
    {
      icon: Rocket,
      title: "مشاور اختصاصی AI",
      description: "یک دستیار هوش مصنوعی همیشه در کنار شماست.",
    },
    {
      icon: Shield,
      title: "پشتیبانی اولویت‌دار",
      description: "همیشه سریع‌ترین پاسخ‌ها و راهنمایی‌ها را دریافت کنید.",
    },
  ];

  const trustItems = [
    {
      icon: Check,
      title: "ضمانت بازگشت وجه",
      description: "در صورت عدم رضایت، وجه شما بازگردانده می‌شود.",
    },
    {
      icon: Shield,
      title: "امنیت داده‌ها",
      description: "تمام اطلاعات شما به صورت امن ذخیره می‌شود.",
    },
    {
      icon: Rocket,
      title: "پشتیبانی سریع",
      description: "در کمترین زمان ممکن پاسخ سوالات شما داده می‌شود.",
    },
  ];

  const tableData = {
    headers: ["ویژگی", "استارتر", "پلن ویژه", "نخبه"],
    rows: [
      ["مدت دسترسی", "۷ روز", "۶ ماه", "۱۲ ماه"],
      ["پیشنهادات دانشگاه", "۵", "نامحدود", "نامحدود"],
      ["مشاور اختصاصی AI", "❌", "✅", "✅"],
      ["پشتیبانی اولویت‌دار", "❌", "✅", "✅"],
      ["قیمت", "۵۰,۰۰۰ تومان", "۷۵۰,۰۰۰ تومان", "۱,۵۰۰,۰۰۰ تومان"],
    ],
  };
  const router = useRouter();
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-teal-900/20">
      <div className="keyboard-focus-outline fixed top-4 left-4 z-50">
        {" "}
        <Button
          className="text-white bg-none bg-gray-900 hover:bg-gray-800"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
        {/* Header */}
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <PricingCard key={i} {...plan} />
          ))}
        </div>

        {/* Feature Section */}
        <FeatureSection title="چرا مجیک هت؟" features={features} />

        {/* Comparison Table */}
        <PlansComparisonTable data={tableData} />

        {/* Trust Section */}
        <FeatureSection title="چرا به ما اعتماد کنید؟" features={trustItems} />
      </div>
    </main>
  );
}
