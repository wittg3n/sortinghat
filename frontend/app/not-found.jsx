"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-gray-100">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-8xl font-extrabold ">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold">
          صفحه مورد نظر یافت نشد
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          ممکن است آدرس را اشتباه وارد کرده باشید یا صفحه حذف شده باشد.
        </p>

        <div className="flex gap-4 justify-center mt-4">
          <Button
            className="flex items-center gap-2 cursor-pointer bg-teal-400 hover:bg-teal-500"
            onClick={() => router.back()}
          >
            بازگشت <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  );
}
