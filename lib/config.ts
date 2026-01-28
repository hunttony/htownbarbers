// This file provides configuration helpers for shop-specific settings
// Edit this file to customize your shop's appearance and information

export const shopConfig = {
  // Load settings from environment variables or defaults
  shopName: process.env.SHOP_NAME || 'Barbershop',
  shopCity: process.env.SHOP_CITY || 'City',
  shopState: process.env.SHOP_STATE || 'ST',
  
  // Contact Information
  phone: process.env.SHOP_PHONE || '',
  email: process.env.SHOP_EMAIL || '',
  address: process.env.SHOP_ADDRESS || '',
  
  // Business Hours
  hours: {
    monday: process.env.SHOP_HOURS_MONDAY || '9:00 AM - 7:00 PM',
    tuesday: process.env.SHOP_HOURS_TUESDAY || '9:00 AM - 7:00 PM',
    wednesday: process.env.SHOP_HOURS_WEDNESDAY || '9:00 AM - 7:00 PM',
    thursday: process.env.SHOP_HOURS_THURSDAY || '9:00 AM - 7:00 PM',
    friday: process.env.SHOP_HOURS_FRIDAY || '9:00 AM - 7:00 PM',
    saturday: process.env.SHOP_HOURS_SATURDAY || '9:00 AM - 6:00 PM',
    sunday: process.env.SHOP_HOURS_SUNDAY || '10:00 AM - 4:00 PM',
  },
  
  // Theme Colors
  theme: {
    primary: process.env.THEME_PRIMARY || '#1a1a1a',
    secondary: process.env.THEME_SECONDARY || '#d4af37',
    accent: process.env.THEME_ACCENT || '#8b7355',
  },
  
  // Social Media Links
  social: {
    facebook: process.env.SOCIAL_FACEBOOK || '',
    instagram: process.env.SOCIAL_INSTAGRAM || '',
    twitter: process.env.SOCIAL_TWITTER || '',
  },
  
  // Meta Tags
  meta: {
    title: process.env.META_TITLE || 'Barbershop - Premium Grooming',
    description: process.env.META_DESCRIPTION || 'Premium barbershop services',
  },
};

// Helper to format shop name with location
export const getShopDisplayName = (): string => {
  if (shopConfig.shopCity && shopConfig.shopState) {
    return `${shopConfig.shopName} - ${shopConfig.shopCity}, ${shopConfig.shopState}`;
  }
  return shopConfig.shopName;
};

// Helper to check if business is open
export const isBusinessOpen = (): boolean => {
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'lowercase' }) as keyof typeof shopConfig.hours;
  const currentTime = now.toLocaleTimeString('en-US', { hour12: true });
  
  // This is a simplified check - implement full logic as needed
  return true;
};
