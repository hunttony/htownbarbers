"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";

interface SiteSettings {
  businessName: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Failed to load settings:", err));
  }, []);

  if (!settings) return null;

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-secondary mb-4">{settings.businessName}</h3>
            <p className="text-gray-300 mb-4">
              Premium barbershop serving Houston with expert cuts, styling, and grooming services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-secondary mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-secondary mt-1" />
                <span className="text-gray-300">
                  {settings.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-secondary" />
                <span className="text-gray-300">{settings.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-secondary" />
                <span className="text-gray-300">{settings.email}</span>
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-secondary mb-4">Hours</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Mon - Fri:</span>
                <span className="text-right">{settings.hours.monday}</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-right">{settings.hours.saturday}</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-right">{settings.hours.sunday}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} {settings.businessName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
