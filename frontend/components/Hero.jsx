"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "./magicui/border-beam";
// 🌀 Animated Background Particles
const AnimatedBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
          }}
          animate={{
            x: particle.x,
            y: particle.y,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

// ⚡ Typewriter Effect Component
const TypewriterText = ({ text, speed = 70, pause = 2000 }) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer;

    if (!isDeleting && index < text.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayText(text.slice(0, index + 1));
        setIndex(index + 1);
      }, speed);
    } else if (!isDeleting && index === text.length) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && index > 0) {
      // Deleting backwards
      timer = setTimeout(() => {
        setDisplayText(text.slice(0, index - 1));
        setIndex(index - 1);
      }, speed / 1.8);
    } else if (isDeleting && index === 0) {
      // Restart typing
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, text, speed, pause]);

  return (
    <span className="font-Anjoman">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// 🚀 Main Hero Section
export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden pt-[200px] pb-32">
      <AnimatedBackground />

      {/* 🔮 Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[conic-gradient(at_top_left,_#ff6b6b,_#feca57,_#48dbfb,_#1dd1a1,_#5f27cd,_#ff6b6b)] opacity-40 rounded-full blur-3xl"
        animate={{
          x: [0, 120, 0],
          y: [0, -120, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[conic-gradient(at_bottom_right,_#ff9ff3,_#feca57,_#1dd1a1,_#54a0ff,_#5f27cd,_#ff9ff3)] opacity-40 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          <Badge
            variant="secondary"
            className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 rounded-full text-sm font-medium inline-flex items-center justify-center gap-2"
          >
            اپلای هوشمند به تمام دانشگاه‌های فرانسه
          </Badge>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
            <span className="bg-gradient-to-r from-[#370a99] to-[#ea3780] bg-clip-text text-transparent animate-gradient">
              مجیک هت
            </span>
          </h1>

          {/* 🎯 AI Typing Effect */}
          <div
            dir="rtl"
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-8 font-Anjoman"
          >
            <TypewriterText
              className="font-Anjoman"
              text="با کمک هوش مصنوعی، مسیر اپلای رو از پیچیدگی به سادگی تبدیل می‌کنیم..."
            />
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <RainbowButton
              variant="white"
              className="relative overflow-hidden px-8 py-6 text-lg"
            >
              <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              همین حالا شروع کنید
            </RainbowButton>
          </motion.div>

          {/* 📊 Stats Counter */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[
              { value: "10K+", label: "دانشجوی موفق" },
              { value: "200+", label: "دانشگاه همکار" },
              { value: "95%", label: "رضایت مشتری" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 🔥 Gradient Animation CSS */}
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};
