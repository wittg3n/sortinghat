import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendDirection = "up",
  color = "blue",
}) {
  const colorClasses = {
    blue: "from-magenta-500 to-purple-500",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-violet-600",
    amber: "from-amber-500 to-orange-600",
  };

  return (
    <MotionCard
      whileHover="hover"
      initial="initial"
      className="relative overflow-hidden backdrop-blur-md border border-gray-800 hover:shadow-lg transition-all duration-300"
    >
      {/* دایره پس‌زمینه */}
      <motion.div
        className={`absolute top-0 left-0 w-32 h-32 transform -translate-x-8 -translate-y-8 bg-gradient-to-r ${colorClasses[color]} rounded-full opacity-10`}
        variants={{
          initial: { scale: 1, opacity: 0.1 },
          hover: { scale: 1.5, opacity: 0.2 },
        }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
      />

      <CardContent className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} shadow-md`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          {trend && (
            <Badge
              variant="secondary"
              className={`${
                trendDirection === "up"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {trendDirection === "up" ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {trend}
            </Badge>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-100 mb-1">{value}</h3>
          <p className="text-sm font-medium text-gray-300 mb-1">{title}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </CardContent>
    </MotionCard>
  );
}
