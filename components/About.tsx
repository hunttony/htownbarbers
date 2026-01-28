"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Star, ThumbsUp } from "lucide-react";

const stats = [
  { icon: Users, value: "10K+", label: "Happy Clients" },
  { icon: Star, value: "15+", label: "Years Experience" },
  { icon: ThumbsUp, value: "5 Star", label: "Average Rating" },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              About Houston Barbers
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Since 2009, we've been Houston's trusted destination for premium grooming services. 
              Our team of master barbers combines traditional techniques with modern trends to 
              deliver exceptional results every time.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Located in the heart of Houston, we pride ourselves on creating a welcoming 
              atmosphere where every client receives personalized attention and leaves looking 
              their absolute best.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <Icon className="text-secondary mx-auto mb-2" size={32} />
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-96 lg:h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070"
              alt="Barber at work"
              fill
              className="object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
