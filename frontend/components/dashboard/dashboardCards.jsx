"use client";

import { GraduationCap, FileText, University, Target } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";

export function DashboardCards({
  profileCompletion = 0,
  documentsUploaded = 0,
  documents = [],
  universities = [],
  avgProbability = 0,
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* کارت خوش‌آمدگویی (می‌توانید SectionCard اضافه کنید اگر لازم است) */}

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="تکمیل پروفایل"
          value={`${profileCompletion}%`}
          subtitle="پروفایل خود را کامل‌تر کنید"
          icon={GraduationCap}
          trend={profileCompletion > 50 ? "+12%" : ""}
          trendDirection="up"
          color="blue"
        />

        <StatsCard
          title="مدارک تایید شده"
          value={documentsUploaded}
          subtitle={`${(documents || []).length} مدارک بارگذاری شده`}
          icon={FileText}
          trend={documentsUploaded > 0 ? "+3 این هفته" : ""}
          trendDirection="up"
          color="green"
        />

        <StatsCard
          title="دانشگاه‌های یافت شده"
          value={`${(universities || []).length}`}
          subtitle="به‌صورت هوش مصنوعی انتخاب شده"
          icon={University}
          trend={(universities || []).length > 5 ? "تنوع عالی" : ""}
          color="purple"
        />

        <StatsCard
          title="میانگین شانس موفقیت"
          value={`${avgProbability}%`}
          subtitle="پذیرش پیش‌بینی شده"
          icon={Target}
          trend={avgProbability > 60 ? "پروفایل قوی" : ""}
          trendDirection={avgProbability > 60 ? "up" : "down"}
          color="amber"
        />
      </div>

      {/* نمودارها و فعالیت اخیر */}
    </div>
  );
}
