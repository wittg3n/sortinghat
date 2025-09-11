"use client";

import Link from "next/link";
import { FileText, University, CheckCircle2 } from "lucide-react";

export function QuickActions() {
  return (
    <div className="backdrop-blur-sm border border-gray-800 rounded-xl p-6 mx-6">
      <h2 className="text-lg font-semibold text-white mb-4"> دسترسی سریع ⚡</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {/* بارگذاری مدارک */}
        <Link
          href="/profile"
          className="p-4 rounded-lg border border-gray-800 hover:bg-gray-800/50 transition-all duration-300 group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 group-hover:bg-gray-200 transition-all duration-300">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-200">بارگذاری مدارک</h3>
              <p className="text-sm text-gray-400">افزودن ریزنمرات، مقالات</p>
            </div>
          </div>
        </Link>

        {/* کاوش دانشگاه‌ها */}
        <Link
          href="/universities"
          className="p-4 rounded-lg border border-gray-800 hover:bg-gray-800/50 transition-colors duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
              <University className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-200">کاوش دانشگاه‌ها</h3>
              <p className="text-sm text-gray-400">پیشنهادات هوش مصنوعی</p>
            </div>
          </div>
        </Link>

        {/* شروع درخواست‌ها */}
        <div className="p-4 rounded-lg border border-gray-800 hover:bg-gray-800/50 transition-colors duration-200 group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-200">شروع درخواست‌ها</h3>
              <p className="text-sm text-gray-400">کمک‌رسانی خودکار</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
