"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, User, Lock } from "lucide-react";

// shadcn/ui components
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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Logo } from "@/components/logo";
import Link from "next/link";

// --- Validation schema ---
const SignupSchema = z
  .object({
    name: z
      .string({ required_error: "نام را وارد کنید" })
      .min(2, "نام باید حداقل ۲ کاراکتر باشد"),
    email: z
      .string({ required_error: "ایمیل را وارد کنید" })
      .min(1, "ایمیل را وارد کنید")
      .email("ایمیل معتبر نیست"),
    password: z
      .string({ required_error: "گذرواژه را وارد کنید" })
      .min(8, "گذرواژه باید حداقل ۸ کاراکتر باشد"),
    confirmPassword: z.string({ required_error: "تکرار گذرواژه را وارد کنید" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "گذرواژه‌ها مطابقت ندارند",
  });

export default function AnimatedSignupPage() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    setSubmitError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.log(errData);
        throw new Error(errData.message || "Signup failed");
      }

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setOpen(true);
      form.reset();
    } catch (e) {
      setSubmitError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/40 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="w-full max-w-md"
      >
        <div className="p-6 sm:p-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, scale: 1.1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 8 }}
            whileHover={{ scale: 1.15, rotate: 2 }}
            className="flex justify-center mb-10 w-[120px] mx-auto"
          >
            <Link
              href="/"
              aria-label="home"
              className="flex items-center w-full"
            >
              <Logo className="w-full h-auto" />
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center"
          >
            ایجاد حساب کاربری
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground mt-3 text-center"
          >
            حساب کاربری دارید؟{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              وارد شوید
            </Link>{" "}
          </motion.p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 space-y-5"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name" className="text-sm">
                      نام
                    </Label>
                    <FormControl>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 opacity-70" />
                        </div>
                        <Input
                          id="name"
                          type="text"
                          placeholder="نام شما"
                          className="pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email" className="text-sm">
                      ایمیل
                    </Label>
                    <FormControl>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 opacity-70" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-9"
                          autoComplete="email"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password" className="text-sm">
                      گذرواژه
                    </Label>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="confirmPassword" className="text-sm">
                      تکرار گذرواژه
                    </Label>
                    <FormControl>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Errors */}
              <AnimatePresence initial={false}>
                {submitError && (
                  <motion.div
                    key="submit-error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-sm text-destructive"
                  >
                    {submitError}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.div
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
              >
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      در حال ثبت نام...
                    </span>
                  ) : (
                    "ثبت نام"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.25 }}
          className="text-center text-xs text-muted-foreground mt-4"
        >
          با ثبت نام، شما موافقت می‌کنید با شرایط و قوانین ما.
        </motion.div>
      </motion.div>

      {/* Success dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="dialog"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              <DialogContent className="sm:max-w-md">
                <DialogTitle> ثبتنام موفق</DialogTitle>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">ثبت نام موفق</h2>
                  <p className="text-sm text-muted-foreground">
                    حساب شما با موفقیت ایجاد شد!
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setOpen(false)}>ادامه</Button>
                </div>
              </DialogContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
}
