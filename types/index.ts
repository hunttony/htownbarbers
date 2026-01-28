export interface SiteSettings {
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
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
}
