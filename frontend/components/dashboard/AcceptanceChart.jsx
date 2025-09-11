import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "امن", probability: 85, count: 4 },
  { name: "هدف", probability: 65, count: 6 },
  { name: "رسیدن", probability: 25, count: 2 },
];

export function AcceptanceChart() {
  return (
    <Card className="bg-white/70 backdrop-blur-md border border-slate-200/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900">
          پیش‌بینی پذیرش بر اساس دسته‌بندی
        </CardTitle>
        <p className="text-sm text-slate-600">
          نرخ موفقیت پیش‌بینی شده توسط هوش مصنوعی برای درخواست‌های شما
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={12}
              fontWeight={500}
            />
            <YAxis stroke="#64748b" fontSize={12} fontWeight={500} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
              formatter={(value, name) => [
                name === "probability" ? `${value}%` : value,
                name === "probability" ? "نرخ موفقیت" : "دانشگاه‌ها",
              ]}
            />
            <Bar
              dataKey="probability"
              fill="url(#colorGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
