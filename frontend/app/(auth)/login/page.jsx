"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";

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
import { Logo } from "@/components/logo";
import Link from "next/link";

// auth hook
import useAuth from "@/hooks/useAuth";

// --- Validation schema ---
const LoginSchema = z.object({
  email: z
    .string({ required_error: "ایمیل را وارد کنید" })
    .min(1, "ایمیل را وارد کنید")
    .email("ایمیل را وارد کنید"),
  password: z
    .string({ required_error: "گذرواژه را وارد کنید" })
    .min(8, "گذرواژه باید حداقل ۸ کاراکتر باشد"),
});

export default function AnimatedLoginPage() {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const { login, loading, error } = useAuth();

  const onSubmit = async (values) => {
    await login(values); // hook handles redirect and errors
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/40 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="w-full max-w-md"
      >
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
            className="flex items-center space-x-reverse space-x-2 w-full"
          >
            <Logo className="w-full h-auto " />
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center"
        >
          خوش آمدید
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground mt-3 text-center"
        >
          هنوز حساب کاربری ندارید؟{" "}
          <Link
            href="/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            ثبت نام
          </Link>{" "}
          کنید
        </motion.p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-5"
          >
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
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error message */}
            <AnimatePresence initial={false}>
              {error && (
                <motion.div
                  key="submit-error"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-sm text-destructive"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.div
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
            >
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    در حال ورود...
                  </span>
                ) : (
                  "ورود"
                )}
              </Button>
            </motion.div>
          </form>
        </Form>

        {/* Bottom hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.25 }}
          className="text-center text-xs text-muted-foreground mt-4"
        >
          با ورود، شما موافقت می‌کنید با شرایط و قوانین ما.
        </motion.div>
      </motion.div>
    </div>
  );
}
