# Barbershop Template Setup Guide

This is a reusable template for creating multiple barbershop websites. Each shop gets its own independent website while maintaining the template codebase.

## 🚀 Quick Start: Creating a New Shop

### Method 1: Using the Generator Script (Recommended)

```bash
npm run create-shop -- --name "Antonio's Barbershop" --city "Austin" --state "TX"
```

This command will:
- ✅ Copy the entire template
- ✅ Generate shop-specific configuration
- ✅ Update branding and metadata
- ✅ Initialize a new Git repository
- ✅ Create a standalone shop site

### Method 2: Manual Setup

1. **Clone/Copy the template:**
   ```bash
   git clone <template-repo> antonio-barbers
   cd antonio-barbers
   ```

2. **Create `.env.local` file:**
   ```bash
   cp .env.example .env.local
   ```

3. **Edit `.env.local` with shop details:**
   ```env
   SHOP_NAME=Antonio's Barbershop
   SHOP_CITY=Austin
   SHOP_STATE=TX
   SHOP_PHONE=(512) 555-0123
   SHOP_EMAIL=info@antoniobarbers.com
   SHOP_ADDRESS=456 Main Street, Austin, TX 78701
   ```

4. **Update `data/settings.json`:**
   ```json
   {
     "businessName": "Antonio's Barbershop",
     "address": "456 Main Street, Austin, TX 78701",
     "phone": "(512) 555-0123",
     "email": "info@antoniobarbers.com",
     "hours": { ... },
     "theme": { ... },
     "socialMedia": { ... }
   }
   ```

5. **Install dependencies and run:**
   ```bash
   npm install
   npm run dev
   ```

## 📁 File Structure

```
barbers-template/
├── app/                      # Next.js app directory
│   ├── api/
│   │   ├── gallery/route.ts   # Returns gallery images
│   │   └── settings/route.ts  # Returns business settings
│   ├── layout.tsx             # Main layout (uses dynamic metadata)
│   ├── page.tsx               # Homepage
│   └── dashboard/page.tsx     # Admin dashboard
├── components/                # React components
│   ├── Navigation.tsx         # Navbar (loads settings dynamically)
│   ├── Hero.tsx              # Hero section
│   ├── Services.tsx          # Services section
│   ├── Gallery.tsx           # Gallery section
│   ├── About.tsx             # About section
│   ├── Contact.tsx           # Contact form
│   └── Footer.tsx            # Footer (loads settings dynamically)
├── data/
│   ├── settings.json         # 🔑 Shop-specific settings (EDIT THIS)
│   └── gallery.json          # 🔑 Gallery images (EDIT THIS)
├── lib/
│   └── settings.ts           # Settings helper functions
├── .env.example              # Environment template
├── .env.local               # ⚠️ Shop-specific (git-ignored)
└── package.json             # Project metadata
```

## 🎨 Customization Points

### For Each New Shop:

1. **`.env.local`** - Environment variables
2. **`data/settings.json`** - Business information, hours, contact details
3. **`data/gallery.json`** - Shop photos
4. **`components/Hero.tsx`** - Update hero text/images if needed
5. **`tailwind.config.ts`** - Can override colors via CSS

### Do NOT Modify (Shared Template):

- ❌ Core component logic
- ❌ API routes
- ❌ Utility functions
- ❌ Configuration files (tsconfig.json, next.config.js, etc.)

## 🔄 How Settings Are Loaded

### At Build Time:
- `app/layout.tsx` reads theme colors from `data/settings.json`
- Meta tags are set with shop-specific information

### At Runtime:
- Components fetch `/api/settings` endpoint
- Settings are loaded dynamically from `data/settings.json`
- This allows real-time updates without rebuilding

### Via Environment Variables:
- `.env.local` can override default settings
- Useful for production deployments

## 🚀 Deployment

Each shop is a standalone Next.js application that can be deployed independently:

### Deploy to Vercel:
```bash
vercel deploy
```

### Deploy to Docker:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Deploy to AWS, Azure, GCP:
Use the standard Next.js deployment guides with your `.env.local` secrets.

## 📝 Managing Multiple Shops

### Option A: Separate Repositories
- Each shop has its own GitHub repo
- Independent deployment pipelines
- Isolated version control history
- ✅ Recommended for maximum independence

### Option B: Monorepo Structure
```
barbers-monorepo/
├── template/          (shared code)
├── shops/
│   ├── houston/
│   ├── austin/
│   └── dallas/
```

Run separate instances from the same repo.

### Option C: Docker Compose
```yaml
version: '3'
services:
  houston:
    build: .
    env_file: .env.houston
    ports: "3001:3000"
  austin:
    build: .
    env_file: .env.austin
    ports: "3002:3000"
```

## 🔐 Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use environment variables for secrets** - API keys, phone numbers, emails
3. **Set different themes per shop** - Maintain brand identity
4. **Keep credentials in `.env.local`** - Not in `data/settings.json`

## 🐛 Troubleshooting

### "Module not found" errors
```bash
npm install
npm run build
```

### Settings not updating
- Clear browser cache
- Restart dev server: `npm run dev`
- Check `/api/settings` response in browser

### Git conflicts
When updating template:
```bash
git fetch origin
git merge --no-commit --no-ff origin/main
# Resolve conflicts in data/ and .env.local
git commit
```

## 📞 Support

For template issues:
- Check `data/settings.json` is valid JSON
- Verify all required fields exist
- Review API responses: `http://localhost:3000/api/settings`

## 🎯 Next Steps

1. Create new shop site: `npm run create-shop -- --name "Shop Name" --city "City" --state "ST"`
2. Edit `data/settings.json` with shop info
3. Upload gallery images to `data/gallery.json`
4. Deploy to your hosting platform
5. Configure domain and SSL

---

**Template Version:** 1.0.0  
**Last Updated:** January 27, 2026
