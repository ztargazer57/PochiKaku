"use client";
import { motion } from "framer-motion";
import FloatingCard from "./FloatingCard";
import Image from "next/image";

interface Art {
  id: number;
  title: string;
  artist: string;
  img: string;
}

interface HeroSectionProps {
  artworks: Art[];
}

export default function HeroSection({ artworks }: HeroSectionProps) {
  return (
    <section className="min-h-screen grid md:grid-cols-2 items-center px-6 md:px-16 gap-10 relative">
      {/* LEFT TEXT */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          A Home for<br />Your Art
        </h1>
        <p className="text-lg max-w-md">
          Share, discover, and grow with a cozy community of artists.
        </p>
        <div className="flex gap-4">
          <button className="bg-[#6b4f3b] text-white px-6 py-3 rounded-2xl shadow hover:scale-105 transition">
            Join Community
          </button>
          <button className="border border-[#6b4f3b] px-6 py-3 rounded-2xl hover:scale-105 transition">
            Explore Art
          </button>
        </div>
      </motion.div>

      {/* RIGHT FLOATING CARDS */}
      <div className="relative h-100">
        <div className="absolute inset-0 z-0">
          <Image src="/backgrounds/lp-bg-img.jpg" alt="floating cards bg" fill className="object-cover opacity-30 blur-lg" priority />
        </div>
        {artworks.slice(0, 4).map((art, i) => (
          <FloatingCard
            key={art.id}
            title={art.title}
            img={art.img}
            className={i === 0 ? "top-0 left-10" : i === 1 ? "top-20 right-0" : i === 2 ? "bottom-0 left-0" : "bottom-10 right-20"}
            delay={i * 0.3}
          />
        ))}
      </div>
    </section>
  );
}