"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import universities from "@/entities/all.js"; // ✅ load your json

export default function UniversitiesTabsContent() {
  return (
    <Tabs defaultValue="suggested" dir="rtl" className="w-full">
      <TabsList className="border-gray-800 bg-900 font-bold w-[220px]">
        <TabsTrigger value="suggested">پیشنهاد هوش مصنوعی</TabsTrigger>
        <TabsTrigger value="choose">شخصی‌سازی</TabsTrigger>
      </TabsList>

      <TabsContent
        value="suggested"
        className="grid gap-4 mt-4 grid-cols-1 pl-6"
      >
        {universities.map((uni, i) => (
          <Card key={i} className="p-4 text-right">
            <CardHeader>
              <CardTitle className="font-bold text-lg">
                🎓 {uni.mention} {uni.parcours ? ` - ${uni.parcours}` : ""}
              </CardTitle>
              {uni.candidatable ? (
                <Badge className="bg-green-600 text-white">قابل ثبت‌نام</Badge>
              ) : (
                <Badge className="bg-red-600 text-white">غیرقابل ثبت‌نام</Badge>
              )}
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
              {uni.commentaire && (
                <p className="text-gray-300">{uni.commentaire}</p>
              )}

              {uni.lieux && (
                <div>
                  <strong>محل برگزاری:</strong>
                  <ul className="list-disc pr-5">
                    {uni.lieux.map((loc, idx) => (
                      <li key={idx}>
                        {loc.site} - {loc.ville} ({loc.region})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {uni.stats && (
                <div className="flex gap-4">
                  <span>
                    نرخ دسترسی: {Math.round(uni.stats.tauxAcces * 100)}%
                  </span>
                  <span>آخرین رتبه: {uni.stats.rangDernierAppele}</span>
                  <span>
                    تعداد درخواست‌ها: {uni.stats.candidaturesConfirmees}
                  </span>
                </div>
              )}

              {uni.droitsInscription && (
                <p className="text-gray-400">
                  <strong>شهریه:</strong> {uni.droitsInscription}
                </p>
              )}

              {uni.url && (
                <a
                  href={uni.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  اطلاعات بیشتر
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="choose" className="mt-4">
        <Card className="p-6 text-center text-gray-400">
          این بخش برای انتخاب‌های شخصی شماست.
        </Card>
      </TabsContent>
    </Tabs>
  );
}
