"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Art {
  id: number;
  title: string;
  artist: string;
  img: string;
}

interface FeaturedArtProps {
  artworks: Art[];
}

export default function FeaturedArt({ artworks }: FeaturedArtProps) {
  return (
    <section className="py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-10">Featured Art</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art, i) => (
            <motion.div
              key={art.id}
              className={`bg-white rounded-2xl p-4 shadow transition hover:-translate-y-1
                ${i % 3 === 1 ? "md:mt-10" : ""}
                ${i % 3 === 2 ? "md:mt-20" : ""}
              `}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <div className="relative h-40 rounded-xl overflow-hidden mb-3">
                <Image src={art.img} alt={art.title} fill className="object-cover" priority={i < 3} />
              </div>
              <h3 className="font-semibold">{art.title}</h3>
              <p className="text-sm opacity-70">by {art.artist}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}