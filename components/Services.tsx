"use client";

import { motion } from "framer-motion";
import { Scissors, Sparkles, Clock, Award } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Haircuts",
    description: "Classic and modern cuts tailored to your style",
    price: "$35",
  },
  {
    icon: Sparkles,
    title: "Beard Trim & Shave",
    description: "Hot towel shave and precision beard grooming",
    price: "$25",
  },
  {
    icon: Clock,
    title: "Hair & Beard Combo",
    description: "Complete grooming package for the perfect look",
    price: "$55",
  },
  {
    icon: Award,
    title: "Kids Haircut",
    description: "Gentle and fun haircuts for children",
    price: "$25",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional grooming services tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Icon className="text-secondary" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-3xl font-bold text-secondary">{service.price}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
