# Houston Barbers Website - Reusable Template

A modern, responsive template for barbershop websites built with Next.js 14, TypeScript, and Tailwind CSS. **Designed to be easily customized for any barbershop without affecting the template.**

## ✨ Template Features

- 🎨 Modern, attractive design with smooth animations (Framer Motion)
- 📱 Fully responsive for all devices
- 🎯 Complete website sections:
  - Hero section with eye-catching design
  - Services showcase
  - About section with statistics
  - Photo gallery with lightbox
  - Contact form with business information
  - Footer with social links
- 🛠️ Admin Dashboard to manage:
  - Business information (name, address, phone, email)
  - Business hours
  - Gallery images (add/remove)
  - Theme colors (customizable color scheme)
- 🎨 Dynamic theme system with CSS variables
- ⚡ Fast performance with Next.js 14 App Router
- ✅ TypeScript for type safety
- 🎭 Smooth animations and transitions
- 🏗️ **Multi-shop support** - Create unlimited shops from one template

## 🚀 Quick Start - Create a New Shop

Generate a new shop website with one command:

```bash
npm run create-shop -- --name "Your Shop Name" --city "CityName" --state "ST"
```

Example:
```bash
npm run create-shop -- --name "Antonio's Barbershop" --city "Austin" --state "TX"
```

This automatically:
- ✅ Copies the template
- ✅ Generates shop-specific config
- ✅ Updates branding and metadata
- ✅ Initializes Git repository
- ✅ Creates independent shop site

**[👉 Full Setup Guide](TEMPLATE_SETUP.md)**

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd barbers
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
   - Main website: [http://localhost:3000](http://localhost:3000)
   - Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## Project Structure

```
barbers/
├── app/
│   ├── api/              # API routes
│   │   ├── gallery/      # Gallery management API
│   │   └── settings/     # Settings management API
│   ├── dashboard/        # Admin dashboard page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── Navigation.tsx    # Navigation bar
│   ├── Hero.tsx          # Hero section
│   ├── Services.tsx      # Services section
│   ├── About.tsx         # About section
│   ├── Gallery.tsx       # Gallery section
│   ├── Contact.tsx       # Contact section
│   └── Footer.tsx        # Footer
├── lib/                  # Utility functions
│   └── settings.ts       # Settings management
├── types/                # TypeScript type definitions
│   └── index.ts
└── public/               # Static assets

## Using the Dashboard

### Access the Dashboard

Navigate to `/dashboard` to access the admin panel.

### Business Information

- Update business name, address, phone, and email
- Modify business hours for each day of the week
- Changes are saved and reflected immediately on the main website

### Gallery Management

- Add new images by entering image URLs
- Delete existing images
- All changes update the gallery section in real-time

### Theme Colors

- Customize the three main theme colors:
  - Primary: Used for dark backgrounds and text
  - Secondary: Used for accents and call-to-action buttons (default: gold)
  - Accent: Additional accent color
- Use the color picker or enter hex codes manually
- Preview colors before saving
- Changes apply instantly across the entire website

## Customization

### Adding Your Own Images

The project uses Unsplash images by default. To use your own images:

1. Add images to the `public/images` folder
2. Update image paths in components or use the dashboard to add new gallery images

### Modifying Services

Edit the `services` array in [components/Services.tsx](components/Services.tsx) to add, remove, or modify service offerings.

### Changing Default Theme

Update the CSS variables in [app/globals.css](app/globals.css):

```css
:root {
  --color-primary: #1a1a1a;    /* Dark color */
  --color-secondary: #d4af37;  /* Gold color */
  --color-accent: #8b7355;     /* Brown color */
}
```

## Building for Production

```bash
npm run build
npm start
```

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Images**: Next.js Image component with Unsplash

## Features Breakdown

### Animations

- Smooth page transitions
- Scroll-triggered animations
- Hover effects on cards and buttons
- Animated scroll indicator on hero section
- Gallery lightbox with fade effects

### Responsive Design

- Mobile-first approach
- Breakpoints for tablets and desktops
- Collapsible mobile navigation
- Optimized layouts for all screen sizes

### Performance

- Next.js Image optimization
- Code splitting
- Server-side rendering
- Fast page loads

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is provided as-is for your barbershop website needs.

## Support

For questions or issues, please refer to the Next.js documentation at [https://nextjs.org/docs](https://nextjs.org/docs)
