"use client";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/AuroraBg";
import { ShimmerButton } from "@/components/magicui/shimmer-button"; // installed via npx magicui-cli
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const handleGoogle = () =>
    router.push("localhost:3000/api/google/google-auth"); // your backend

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 ring-1 ring-white/20 p-8 md:p-10 space-y-6"
      >
        <h1 className="text-center text-3xl font-bold text-white">ورود</h1>
        <p className="text-center text-sm text-white/70">
          وارد حساب گوگل خود شوید
        </p>

        <ShimmerButton
          onClick={handleGoogle}
          className="w-full h-11 !rounded-xl !bg-white/20 !text-white hover:!bg-white/30"
        >
          ورود با Google
        </ShimmerButton>
      </motion.div>
    </AuroraBackground>
  );
}
