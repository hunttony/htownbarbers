import { SiteSettings } from "@/types";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "settings.json");

function ensureDataFile() {
  const dir = path.dirname(dataPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataPath)) {
    const defaultSettings: SiteSettings = {
      businessName: "Houston Barbers",
      address: "123 Main Street, Houston, TX 77002",
      phone: "(713) 555-0123",
      email: "info@houstonbarbers.com",
      hours: {
        monday: "9:00 AM - 7:00 PM",
        tuesday: "9:00 AM - 7:00 PM",
        wednesday: "9:00 AM - 7:00 PM",
        thursday: "9:00 AM - 7:00 PM",
        friday: "9:00 AM - 7:00 PM",
        saturday: "9:00 AM - 6:00 PM",
        sunday: "10:00 AM - 4:00 PM",
      },
      theme: {
        primary: "#1a1a1a",
        secondary: "#d4af37",
        accent: "#8b7355",
      },
      socialMedia: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
      },
    };
    fs.writeFileSync(dataPath, JSON.stringify(defaultSettings, null, 2));
  }
}

export function getSettings(): SiteSettings {
  ensureDataFile();
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
}

export function updateSettings(newSettings: Partial<SiteSettings>): SiteSettings {
  ensureDataFile();
  const currentSettings = getSettings();
  const updatedSettings = { ...currentSettings, ...newSettings };
  fs.writeFileSync(dataPath, JSON.stringify(updatedSettings, null, 2));
  return updatedSettings;
}
