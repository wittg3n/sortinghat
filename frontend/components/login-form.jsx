"use client";

import { motion } from "framer-motion";
import { Logo } from "./logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";
// --- Schema with Zod ---
const loginSchema = z.object({
  email: z.string().email({ message: "ایمیل معتبر وارد کنید" }),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
});

export function LoginForm({ className, ...props }) {
  const { handleGoogleLogin } = useGoogleSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="/" className="flex flex-col items-center gap-2">
              {/* --- Animated Logo --- */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                  delay: 0.2,
                }}
              >
                <Logo className="w-[100px] h-auto" />
              </motion.div>
            </a>
            <h1 className="text-xl font-bold">خوش آمدید</h1>
            <div className="text-center text-sm">
              حساب کاربری ندارید؟{" "}
              <a href="/signup" className="underline underline-offset-4">
                ثبت نام
              </a>
            </div>
          </div>

          {/* Example: Google Button */}
          <div className="flex flex-col gap-6">
            {/* existing form */}
            <Button
              variant="outline"
              type="button"
              onClick={() => handleGoogleLogin()}
              className="w-full flex items-center justify-center gap-2"
            >
              ورود با گوگل
            </Button>
          </div>
        </div>
      </form>

      <div className="text-muted-foreground text-center text-xs">
        با کلیک روی ادامه، شما با <a href="#">شرایط استفاده</a> و{" "}
        <a href="#">حریم خصوصی</a> موافقت می‌کنید.
      </div>
    </div>
  );
}
