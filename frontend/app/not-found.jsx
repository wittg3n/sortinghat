"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-2xl overflow-hidden border-0 shadow-lg">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            {/* Lottie side */}
            <div className="bg-muted/40 flex items-center justify-center p-6">
              <div className="w-full max-w-sm">
                <DotLottieReact
                  src="https://lottie.host/65e279fc-ac72-4e21-a9bc-b7996091b2f0/zG40FQzyZv.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>

            {/* Text + actions */}
            <div className="p-8 flex flex-col justify-center text-right">
              <p className="text-sm text-muted-foreground mb-2">خطای ۴۰۴</p>
              <h1 className="text-3xl font-bold tracking-tight">
                صفحه مورد نظر یافت نشد
              </h1>
              <p className="mt-3 text-sm text-muted-foreground leading-6">
                ممکن است آدرس را اشتباه وارد کرده باشید یا صفحه حذف شده باشد.
                می‌توانید به صفحه اصلی برگردید یا به صفحه قبل بازگردید.
              </p>

              <div className="mt-6 flex items-center gap-3 justify-end">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="h-4 w-4" />
                  بازگشت
                </Button>

                <Link href="/" className="inline-flex">
                  <Button className="gap-2">
                    <Home className="h-4 w-4" />
                    صفحه اصلی
                  </Button>
                </Link>
              </div>

              {/* optional hint */}
              <p className="mt-4 text-xs text-muted-foreground">
                اگر فکر می‌کنید این خطاست، لطفاً با پشتیبانی تماس بگیرید.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
