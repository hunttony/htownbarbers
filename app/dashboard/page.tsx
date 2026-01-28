"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Image as ImageIcon,
  Palette,
  MapPin,
  Phone,
  Mail,
  Clock,
  Save,
  Trash2,
  Plus,
} from "lucide-react";

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
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("settings");
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  useEffect(() => {
    fetchSettings();
    fetchGalleryImages();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      setGalleryImages(data);
    } catch (error) {
      console.error("Failed to fetch gallery images:", error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      
      if (response.ok) {
        setSaveMessage("Settings saved successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
        
        // Update CSS variables
        if (settings?.theme) {
          document.documentElement.style.setProperty("--color-primary", settings.theme.primary);
          document.documentElement.style.setProperty("--color-secondary", settings.theme.secondary);
          document.documentElement.style.setProperty("--color-accent", settings.theme.accent);
        }
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      setSaveMessage("Failed to save settings");
    }
  };

  const handleAddImage = async () => {
    if (!newImageUrl) return;
    
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newImageUrl, alt: newImageAlt }),
      });
      
      if (response.ok) {
        fetchGalleryImages();
        setNewImageUrl("");
        setNewImageAlt("");
        setSaveMessage("Image added successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      }
    } catch (error) {
      console.error("Failed to add image:", error);
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        fetchGalleryImages();
        setSaveMessage("Image deleted successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      }
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const tabs = [
    { id: "settings", label: "Business Info", icon: Settings },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "theme", label: "Theme Colors", icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your website settings and content</p>
        </motion.div>

        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500 text-white px-6 py-3 rounded-lg mb-6"
          >
            {saveMessage}
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-secondary text-primary"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Business Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-primary mb-2">
                  <Settings size={16} />
                  <span>Business Name</span>
                </label>
                <input
                  type="text"
                  value={settings.businessName}
                  onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-primary mb-2">
                  <MapPin size={16} />
                  <span>Address</span>
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-primary mb-2">
                    <Phone size={16} />
                    <span>Phone</span>
                  </label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-primary mb-2">
                    <Mail size={16} />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-primary mb-4">
                  <Clock size={16} />
                  <span>Business Hours</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(settings.hours).map(([day, time]) => (
                    <div key={day}>
                      <label className="text-sm text-gray-600 capitalize mb-1 block">{day}</label>
                      <input
                        type="text"
                        value={time}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            hours: { ...settings.hours, [day]: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSaveSettings}
                className="flex items-center space-x-2 bg-secondary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-all"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Gallery Management</h2>
            
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-primary mb-4">Add New Image</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                />
                <input
                  type="text"
                  placeholder="Image Description (Alt Text)"
                  value={newImageAlt}
                  onChange={(e) => setNewImageAlt(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                />
                <button
                  onClick={handleAddImage}
                  className="flex items-center space-x-2 bg-secondary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-all"
                >
                  <Plus size={20} />
                  <span>Add Image</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{image.alt}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Theme Tab */}
        {activeTab === "theme" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Theme Colors</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-primary mb-2 block">
                  Primary Color (Dark backgrounds)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={settings.theme.primary}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        theme: { ...settings.theme, primary: e.target.value },
                      })
                    }
                    className="w-20 h-20 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme.primary}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        theme: { ...settings.theme, primary: e.target.value },
                      })
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-primary mb-2 block">
                  Secondary Color (Gold accents)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={settings.theme.secondary}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        theme: { ...settings.theme, secondary: e.target.value },
                      })
                    }
                    className="w-20 h-20 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme.secondary}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        theme: { ...settings.theme, secondary: e.target.value },
                      })
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-primary mb-2 block">
                  Accent Color
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={settings.theme.accent}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        theme: { ...settings.theme, accent: e.target.value },
                      })
                    }
                    className="w-20 h-20 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme.accent}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        theme: { ...settings.theme, accent: e.target.value },
                      })
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold text-primary mb-4">Preview</h3>
                <div className="space-y-4">
                  <div
                    style={{ backgroundColor: settings.theme.primary }}
                    className="h-20 rounded-lg flex items-center justify-center text-white font-semibold"
                  >
                    Primary Color
                  </div>
                  <div
                    style={{ backgroundColor: settings.theme.secondary }}
                    className="h-20 rounded-lg flex items-center justify-center text-primary font-semibold"
                  >
                    Secondary Color
                  </div>
                  <div
                    style={{ backgroundColor: settings.theme.accent }}
                    className="h-20 rounded-lg flex items-center justify-center text-white font-semibold"
                  >
                    Accent Color
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveSettings}
                className="flex items-center space-x-2 bg-secondary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-all"
              >
                <Save size={20} />
                <span>Save Theme</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
