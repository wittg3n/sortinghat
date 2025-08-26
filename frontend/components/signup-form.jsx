"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const schema = z
  .object({
    name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
    email: z.string().email("ایمیل معتبر وارد کنید"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    confirmPassword: z.string().min(6, "تأیید رمز عبور الزامی است"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "رمز عبور و تأیید آن باید یکسان باشد",
    path: ["confirmPassword"],
  });

export function SignupForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => console.log(data);

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-sm rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg shadow-slate-900/5 ring-1 ring-slate-200/60 p-8 md:p-10",
        className
      )}
      {...props}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Logo className="h-10 w-auto" />
          <h1 className="text-2xl font-bold text-slate-900">ثبت نام</h1>
          <p className="text-sm text-slate-500">
            حساب کاربری دارید؟{" "}
            <a
              href="/login"
              className="font-semibold text-indigo-600 hover:underline"
            >
              ورود
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">نام</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="نام خود را وارد کنید"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">ایمیل</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="example@mail.com"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">رمز عبور</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="••••••"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword">تأیید رمز عبور</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder="••••••"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          ثبت نام
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-400">
        با کلیک روی ادامه، شما با{" "}
        <a href="#" className="font-semibold text-slate-500 hover:underline">
          شرایط استفاده
        </a>{" "}
        و{" "}
        <a href="#" className="font-semibold text-slate-500 hover:underline">
          حریم خصوصی
        </a>{" "}
        موافقت می‌کنید.
      </p>
    </div>
  );
}
