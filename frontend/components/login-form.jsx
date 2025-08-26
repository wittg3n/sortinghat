"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AppWindowIcon, CodeIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
// تعریف اسکیما با Zod
const loginSchema = z.object({
  email: z.string().email({ message: "ایمیل معتبر وارد کنید" }),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
});

export function LoginForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
    // اینجا می‌توانید لاگین واقعی یا fetch API انجام دهید
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="/" className="flex flex-col items-center gap-2">
              <Logo className="w-[100px] h-auto" />
            </a>
            <h1 className="text-xl font-bold">خوش آمدید</h1>
            <div className="text-center text-sm">
              حساب کاربری ندارید؟{" "}
              <a href="/signup" className="underline underline-offset-4">
                ثبت نام
              </a>
            </div>
          </div>

          {/* ایمیل */}
          <div className="grid gap-3">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              id="email"
              {...register("email")}
              placeholder="example@mail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* رمز عبور */}
          <div className="grid gap-3">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="رمز عبور"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            ورود
          </Button>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              یا
            </span>
          </div>

          <div className="gap-4">
            <Button
              variant="outline"
              type="button"
              className="w-full flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 533.5 544.3"
                className="h-5 w-5"
              >
                <path
                  fill="#4285F4"
                  d="M533.5 278.4c0-17.4-1.4-34.1-4.1-50.3H272v95h146.9c-6.3 34-25.2 62.9-53.9 82v68h87.1c50.8-46.8 81.4-116 81.4-194.7z"
                />
                <path
                  fill="#34A853"
                  d="M272 544.3c72.6 0 133.6-24.1 178.1-65.5l-87.1-68c-24.2 16.2-55 25.7-91 25.7-69.8 0-129-47.2-150.1-110.6H31.7v69.7C75.5 478.7 169 544.3 272 544.3z"
                />
                <path
                  fill="#FBBC05"
                  d="M121.9 325.6c-4.9-14.7-7.7-30.4-7.7-46.6s2.8-31.9 7.7-46.6V162.6H31.7c-15.3 29.6-24 62.9-24 97.4s8.7 67.8 24 97.4l90.2-69.7z"
                />
                <path
                  fill="#EA4335"
                  d="M272 107.1c39.5 0 74.8 13.6 102.8 40.3l77.2-77.2C405.6 24.1 344.6 0 272 0 169 0 75.5 65.6 31.7 162.6l90.2 69.7c21.1-63.4 80.3-110.6 150.1-110.6z"
                />
              </svg>
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
