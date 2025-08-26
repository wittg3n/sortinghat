"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Brain,
  FileText,
  Upload,
  Mail,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  Target,
  Zap,
} from "lucide-react";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { HeroHeader } from "@/components/header";
import { Hero } from "@/components/Hero";
import { Blob } from "@/components/blob";
// 🟦 Bento features
const bentoFeatures = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Filter your files by date.",
    href: "/",
    cta: "Learn more",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when someone shares a file or mentions you.",
    href: "/",
    cta: "Learn more",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 🟩 App features
  const appFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description:
        "Smart algorithms analyze your profile and suggest the best-fit universities based on your academic background and preferences.",
    },
    {
      icon: FileText,
      title: "Auto-Fill Applications",
      description:
        "Automatically populate application forms with your stored information, saving hours of repetitive data entry.",
    },
    {
      icon: Upload,
      title: "Document Management",
      description:
        "Securely upload, organize, and manage all your application documents in one centralized location.",
    },
    {
      icon: Mail,
      title: "Gmail Integration",
      description:
        "Seamlessly connect with Gmail to track application communications and never miss important updates.",
    },
  ];

  const workflowSteps = [
    { icon: Users, title: "Login", description: "Create your secure account" },
    { icon: Upload, title: "Upload", description: "Add your documents" },
    {
      icon: Target,
      title: "Select",
      description: "Choose target universities",
    },
    {
      icon: Brain,
      title: "AI Suggestions",
      description: "Get smart recommendations",
    },
    {
      icon: CheckCircle,
      title: "Confirm",
      description: "Review your selections",
    },
    { icon: Zap, title: "Apply", description: "Submit applications" },
    {
      icon: GraduationCap,
      title: "Approval",
      description: "Track acceptance status",
    },
  ];

  const universities = [
    "Harvard University",
    "Stanford University",
    "MIT",
    "Oxford University",
    "Cambridge University",
    "Yale University",
    "Princeton University",
    "Columbia University",
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20"
    >
      <HeroHeader />

      {/* Hero Section */}
      <Hero />

      {/* Animation + Info Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="mx-auto w-full max-w-7xl flex flex-col md:flex-row-reverse items-center gap-10 md:gap-20 px-6">
          {/* text side */}
          <div className="flex-1 text-center md:text-right space-y-6">
            <h2 className="text-4xl md:text-5xl font-[900] tracking-tight text-slate-900 leading-tight">
              هوش مصنوعی در خدمت شما
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-md md:max-w-none">
              با استفاده از الگوریتم‌های هوش مصنوعی، پیشنهاد بهترین دانشگاه‌ها و
              برنامه‌ها متناسب با پروفایل شما را دریافت کنید. همه چیز در یک
              تجربه ساده و سریع.
            </p>
          </div>

          {/* lottie side */}
          <div className="relative flex-1 flex justify-center md:justify-end pl-">
            {/* Blob background */}
            <div className="absolute inset-0 hidden md:block pointer-events-none pr-[150px] pt-[60px]">
              <div className="w-72 h-72 md:w-96 md:h-96 relative mx-auto">
                <Blob />
              </div>
            </div>

            {/* Lottie animation */}
            <div className="w-72 h-72 md:w-96 md:h-96 flex items-center justify-center relative z-10">
              <DotLottieReact
                src="https://lottie.host/874270ac-f791-4488-bd2d-115218612ee1/8sgI0XzX2R.lottie"
                loop
                autoplay
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bento Features Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
            ویژگی‌های کلیدی
          </h2>
          <BentoGrid className="lg:grid-rows-3">
            {bentoFeatures.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* App Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              ویژگی‌های هوشمند
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              ابزارهای هوشمند طراحی شده برای تجربه دانشجوی مدرن
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {appFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden hover:scale-105 hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              فرآیند ۷ مرحله‌ای ساده
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              از ایجاد حساب تا دریافت تاییدیه، ما در هر مرحله همراه شما هستیم
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-emerald-200 transform -translate-y-1/2 hidden lg:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-8">
              {workflowSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 relative z-10">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>

                  <div className="absolute -top-3 -left-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-20">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Universities / Social Proof */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-600 mb-12">
            دانشگاه‌های برتر که به ما اعتماد دارند
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {universities.map((university, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <span className="text-slate-600 font-semibold text-sm">
                  {university}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            آماده‌ی تغییر آینده خود هستید؟
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            به هزاران دانشجویی بپیوندید که موفق شدند با SortingHat به دانشگاه
            مورد نظرشان برسند.
          </p>

          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-6 rounded-2xl text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            شروع کنید
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            SortingHat
          </div>
          <p className="text-slate-400">
            © 2025 SortingHat. All rights reserved. Empowering students
            worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}
