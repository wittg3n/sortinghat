// ---------------- PlansComparisonTable.jsx ----------------
"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PlansComparisonTable({ data }) {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        مقایسه پلن‌ها
      </h2>
      <Table className="text-gray-200 min-w-[600px]">
        <TableCaption>مقایسه ویژگی‌های پلن‌ها</TableCaption>
        <TableHeader>
          <TableRow>
            {data.headers.map((h, i) => (
              <TableHead key={i}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
