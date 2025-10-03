"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// ================= SCHEMAS =================
const Stage1Schema = z
  .object({
    name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
    email: z.string().email("ایمیل معتبر نیست"),
    password: z.string().min(8, "گذرواژه باید حداقل ۸ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "گذرواژه‌ها مطابقت ندارند",
    path: ["confirmPassword"],
  });

const Stage2Schema = z.object({
  phone: z.string().min(8, "شماره معتبر نیست"),
});

const Stage3Schema = z.object({
  gpa: z.string().optional(),
  major: z.string().optional(),
  sat: z.string().optional(),
  ielts: z.string().optional(),
  profilePicture: z.any().optional(),
});

// ================= COMPONENT =================
export default function MultiStepSignup() {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // Stage forms
  const form1 = useForm({ resolver: zodResolver(Stage1Schema) });
  const form2 = useForm({ resolver: zodResolver(Stage2Schema) });
  const form3 = useForm({ resolver: zodResolver(Stage3Schema) });

  const nextStage = (values) => {
    setFormData((prev) => ({ ...prev, ...values }));
    setStage((s) => s + 1);
  };

  const prevStage = () => setStage((s) => s - 1);

  const finalSubmit = async (values) => {
    const allData = { ...formData, ...values };

    const formBody = new FormData();
    Object.entries(allData).forEach(([key, value]) => {
      if (value) formBody.append(key, value);
    });

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        body: formBody, // includes file upload
      });

      if (!res.ok) throw new Error("ثبت نام ناموفق بود");
      alert("ثبت نام با موفقیت انجام شد ✅");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/40 p-4">
      <motion.div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        {/* Stage container */}
        <AnimatePresence mode="wait">
          {/* ========== Stage 1 ========== */}
          {stage === 1 && (
            <motion.div
              key="stage1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <Form {...form1}>
                <form
                  onSubmit={form1.handleSubmit(nextStage)}
                  className="space-y-4"
                >
                  <FormField
                    name="name"
                    control={form1.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label>نام</Label>
                        <FormControl>
                          <Input {...field} placeholder="نام شما" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="email"
                    control={form1.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label>ایمیل</Label>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="password"
                    control={form1.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label>گذرواژه</Label>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="confirmPassword"
                    control={form1.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label>تکرار گذرواژه</Label>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    ادامه
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}

          {/* ========== Stage 2 ========== */}
          {stage === 2 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <Form {...form2}>
                <form
                  onSubmit={form2.handleSubmit(nextStage)}
                  className="space-y-4"
                >
                  <FormField
                    name="phone"
                    control={form2.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label>شماره تلفن</Label>
                        <FormControl>
                          <PhoneInput
                            {...field}
                            international
                            defaultCountry="IR"
                            countries={["IR", "FR"]}
                            placeholder="شماره موبایل"
                            className="border rounded-md px-3 py-2 w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStage}>
                      قبلی
                    </Button>
                    <Button type="submit">ادامه</Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}

          {/* ========== Stage 3 ========== */}
          {stage === 3 && (
            <motion.div
              key="stage3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <Form {...form3}>
                <form
                  onSubmit={form3.handleSubmit(finalSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    name="profilePicture"
                    control={form3.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label>عکس پروفایل (اختیاری)</Label>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => field.onChange(e.target.files[0])}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="gpa"
                    control={form3.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label>GPA</Label>
                        <FormControl>
                          <Input {...field} placeholder="مثلاً 3.8" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="major"
                    control={form3.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label>رشته مورد نظر</Label>
                        <FormControl>
                          <Input {...field} placeholder="Computer Science" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="sat"
                    control={form3.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label>SAT</Label>
                        <FormControl>
                          <Input {...field} placeholder="1200" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="ielts"
                    control={form3.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label>IELTS</Label>
                        <FormControl>
                          <Input {...field} placeholder="7.5" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStage}>
                      قبلی
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "در حال ثبت نام..." : "ثبت نام"}
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
