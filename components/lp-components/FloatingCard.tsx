"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface FloatingCardProps {
  title: string;
  img: string;
  className?: string;
  animateY?: number[];
  delay?: number;
  sizeClass?: string;
}

export default function FloatingCard({ title, img, className = "", animateY = [0, -10, 0], delay = 0, sizeClass="w-50" }: FloatingCardProps) {
  return (
    <motion.div
      className={`absolute z-10 bg-white p-3 rounded-2xl shadow hover:scale-105 transition ${sizeClass} ${className}`}
      animate={{ y: animateY }}
      transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', delay }}
    >
      <div className="h-24 rounded-xl mb-2 relative overflow-hidden">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <p className="text-sm font-medium">{title}</p>
    </motion.div>
  );
}