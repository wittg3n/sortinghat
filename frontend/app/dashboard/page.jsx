import { DashboardCards } from "@/components/dashboard/dashboardCards";
import { QuickActions } from "@/components/dashboard/quick-actions";
import AnimatedCard from "@/components/dashboard/AnimatedCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const circleVariants = {
    initial: { scale: 1, x: -16, y: -16 },
    hover: { scale: 1.4, x: -10, y: -10 },
  };
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
          <AnimatedCard
            title="به سورتینگ‌هت خوش آمدید"
            subtitle="دستیار هوش مصنوعی شما برای اپلای، آماده است تا بهترین مسیر تحصیلی را به شما پیشنهاد دهد."
            gradientFrom="rgba(59,130,246,0.8)"
            gradientTo="rgba(59,130,246,1)"
            circleVariants={circleVariants}
            className="text-white"
          >
            <div className="flex flex-wrap gap-3">
              <Link href="/profile">
                <Button className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  تکمیل پروفایل
                </Button>
              </Link>
              <Link href="/universities">
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  مشاهده پیشنهادها
                </Button>
              </Link>
            </div>
          </AnimatedCard>

          <div className="px-4 lg:px-6">
            <DashboardCards />
          </div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
