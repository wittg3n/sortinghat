import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import jalaali from "jalaali-js";

const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const PERSIAN_WEEKDAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function toPersianNumber(n) {
  return String(n).replace(/\d/g, (d) =>
    String.fromCharCode(0x06f0 + Number(d))
  );
}
function getDaysInJalaaliMonth(jy, jm) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return jalaali.isLeapJalaaliYear(jy) ? 30 : 29;
}

export default function JalaliDatePicker({
  value = null,
  onChange = () => {},
  placeholder = "انتخاب تاریخ",
  id = "jalali-datepicker",
}) {
  const todayG = new Date();
  const todayJ = jalaali.toJalaali(
    todayG.getFullYear(),
    todayG.getMonth() + 1,
    todayG.getDate()
  );
  const initial = value
    ? typeof value === "string"
      ? (() => {
          const [y, m, d] = value.split("-");
          return { jy: +y, jm: +m, jd: +d };
        })()
      : value
    : todayJ;

  const [selected, setSelected] = useState(initial);
  const [viewYear, setViewYear] = useState(initial.jy);
  const [viewMonth, setViewMonth] = useState(initial.jm);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  const monthDays = useMemo(() => {
    const days = getDaysInJalaaliMonth(viewYear, viewMonth);
    const g = jalaali.toGregorian(viewYear, viewMonth, 1);
    const first = new Date(g.gy, g.gm - 1, g.gd).getDay();
    const startIndex = (first + 1) % 7;
    const arr = [];
    for (let i = 0; i < startIndex; i++) arr.push(null);
    for (let d = 1; d <= days; d++)
      arr.push({ jy: viewYear, jm: viewMonth, jd: d });
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [viewYear, viewMonth]);

  function handleSelect(day) {
    if (!day) return;
    setSelected(day);
    setOpen(false);
  }
  function handleToday() {
    setSelected(todayJ);
    setViewYear(todayJ.jy);
    setViewMonth(todayJ.jm);
    setOpen(false);
  }

  return (
    <div className="w-64">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div>
            <Input
              readOnly
              id={id}
              value={
                selected
                  ? `${toPersianNumber(selected.jy)} ${
                      PERSIAN_MONTHS[selected.jm - 1]
                    } ${toPersianNumber(selected.jd)}`
                  : ""
              }
              placeholder={placeholder}
              className="text-right cursor-pointer bg-[#111111] text-[#fca45c] border-0 focus:ring-0 focus:outline-none rounded-xl"
            />
          </div>
        </PopoverTrigger>
        <AnimatePresence>
          {open && (
            <PopoverContent
              align="start"
              className="w-[320px] p-0 rounded-2xl bg-[#111111] text-[#fca45c] shadow-lg border border-[#222] rtl"
              sideOffset={6}
            >
              <motion.div
                dir="rtl"
                className="space-y-3 p-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      onClick={() =>
                        viewMonth === 1
                          ? (setViewMonth(12), setViewYear((y) => y - 1))
                          : setViewMonth((m) => m - 1)
                      }
                      variant="ghost"
                      className="text-[#fca45c] hover:bg-[#1a1a1a]"
                    >
                      ‹
                    </Button>
                    <motion.span
                      key={viewMonth}
                      className="text-sm font-semibold"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {toPersianNumber(viewYear)}{" "}
                      {PERSIAN_MONTHS[viewMonth - 1]}
                    </motion.span>
                    <Button
                      size="icon"
                      onClick={() =>
                        viewMonth === 12
                          ? (setViewMonth(1), setViewYear((y) => y + 1))
                          : setViewMonth((m) => m + 1)
                      }
                      variant="ghost"
                      className="text-[#fca45c] hover:bg-[#1a1a1a]"
                    >
                      ›
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleToday}
                    className="bg-[#fca45c] text-[#111111] hover:opacity-80 rounded-lg px-3 py-1"
                  >
                    امروز
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {PERSIAN_WEEKDAYS.map((w) => (
                    <div key={w} className="font-medium opacity-80">
                      {w}
                    </div>
                  ))}
                  {monthDays.map((cell, idx) => {
                    if (!cell) return <div key={idx} className="h-9" />;
                    const isSel =
                      selected.jy === cell.jy &&
                      selected.jm === cell.jm &&
                      selected.jd === cell.jd;
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleSelect(cell)}
                        whileTap={{ scale: 0.9 }}
                        className={`h-9 rounded-lg flex items-center justify-center text-sm transition ${
                          isSel
                            ? "bg-[#fca45c] text-[#111111]"
                            : "hover:bg-[#1a1a1a]"
                        }`}
                      >
                        {toPersianNumber(cell.jd)}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </PopoverContent>
          )}
        </AnimatePresence>
      </Popover>
    </div>
  );
}
