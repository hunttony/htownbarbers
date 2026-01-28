# Quick Start Guide

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Main Site: http://localhost:3000
   - Dashboard: http://localhost:3000/dashboard

## What You Get

### Main Website (/)
- **Hero Section**: Full-screen banner with call-to-action buttons
- **Services**: Display your barbershop services with prices
- **About**: Tell your story with stats
- **Gallery**: Showcase your work with images
- **Contact**: Contact form and business information
- **Footer**: Social media links and hours

### Dashboard (/dashboard)
Manage your entire website without touching code:

#### Business Info Tab
- Update business name
- Change address
- Modify phone and email
- Edit business hours for each day

#### Gallery Tab
- Add new images by URL
- Delete images you don't want
- All changes appear instantly on the main site

#### Theme Colors Tab
- Change the primary color (dark backgrounds)
- Change the secondary color (gold accents/buttons)
- Change the accent color
- Live preview before saving
- Use color picker or enter hex codes

## Customization Tips

### Change Service Prices
Edit `components/Services.tsx` - look for the `services` array

### Add Your Logo
1. Add logo file to `public/` folder
2. Edit `components/Navigation.tsx` to use your logo image

### Modify Contact Info
Use the dashboard at `/dashboard` - no code needed!

### Change Theme Colors
Use the dashboard at `/dashboard` - Theme Colors tab

## Build for Production

When ready to deploy:

```bash
npm run build
npm start
```

## Support

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

Enjoy your new barbershop website! 💈
