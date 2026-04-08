"use client";
import { motion } from "framer-motion";

export default function ValueProps() {
  const features = [
    { title: "Small Community", desc: "Tight-knit and supportive.", ml: false },
    { title: "No Algorithm", desc: "Everyone gets seen.", ml: true },
    { title: "Growth Focused", desc: "Improve together.", ml: false },
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-[#efe6d8]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">Built for Real Artists</h2>
          <p className="max-w-md">No algorithms. No pressure. Just a space where your work gets seen and appreciated.</p>
        </motion.div>

        <div className="grid gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={`bg-white p-6 rounded-2xl shadow ${f.ml ? 'ml-10' : ''}`}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', delay: i * 0.3 }}
            >
              <h3 className="font-bold">{f.title}</h3>
              <p className="text-sm opacity-70">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}