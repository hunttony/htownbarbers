# Component Showcase

## All Available Components

### 1. Navigation Component
**File**: `components/Navigation.tsx`
- Sticky header with transparent/solid background on scroll
- Desktop horizontal menu
- Mobile hamburger menu
- Smooth scroll links
- Dashboard access button
- Animated open/close

**Features**:
- Auto-hide on scroll down
- Smooth animations
- Responsive breakpoints
- Link to dashboard

---

### 2. Hero Component
**File**: `components/Hero.tsx`
- Full-screen hero section
- Background image with overlay
- Animated text entrance
- Two CTA buttons
- Scroll indicator animation

**Customizable**:
- Background image
- Headline text
- Subheadline
- Button text and links

---

### 3. Services Component
**File**: `components/Services.tsx`
- Grid layout (4 columns desktop, 2 tablet, 1 mobile)
- Icon for each service
- Service title, description, and price
- Hover lift animation
- Easy to add/remove services

**Service Structure**:
```typescript
{
  icon: LucideIcon,
  title: string,
  description: string,
  price: string
}
```

---

### 4. About Component
**File**: `components/About.tsx`
- Two-column layout (text + image)
- Business description
- Three statistics with icons
- Professional image
- Responsive stacking on mobile

**Stats Included**:
- Happy Clients
- Years Experience
- Average Rating

---

### 5. Gallery Component
**File**: `components/Gallery.tsx`
- 3-column grid (responsive)
- Image hover effects
- Lightbox on click
- Smooth animations
- Images from API

**Features**:
- Click to enlarge
- Smooth transitions
- Responsive grid
- Easy image management

---

### 6. Contact Component
**File**: `components/Contact.tsx`
- Two-column layout
- Contact form (name, email, phone, message)
- Business information cards
- Icons for each info type
- Form validation

**Info Displayed**:
- Address
- Phone
- Email
- Business hours

---

### 7. Footer Component
**File**: `components/Footer.tsx`
- Three-column layout
- About text
- Contact information
- Business hours
- Social media links
- Copyright notice

**Sections**:
- Company info
- Contact details
- Operating hours

---

## Dashboard Components

### Dashboard Page
**File**: `app/dashboard/page.tsx`
- Tab-based interface
- Three main tabs:
  1. Business Info
  2. Gallery Management
  3. Theme Colors

**Tab 1 - Business Info**:
- Business name editor
- Address input
- Phone number
- Email address
- Hours for each day of week

**Tab 2 - Gallery**:
- View all images
- Add new images (URL + description)
- Delete images
- Real-time updates

**Tab 3 - Theme Colors**:
- Primary color picker
- Secondary color picker
- Accent color picker
- Live preview boxes
- Hex code input

---

## API Routes

### Settings API
**File**: `app/api/settings/route.ts`
- GET: Fetch current settings
- PUT: Update settings
- Manages business info and theme

### Gallery API
**File**: `app/api/gallery/route.ts`
- GET: Fetch all gallery images
- POST: Add new image
- DELETE: Remove image by ID

---

## Styling System

### Global Styles
**File**: `app/globals.css`
- CSS variables for theming
- Tailwind imports
- Base reset styles

### Theme Variables
```css
--color-primary: #1a1a1a (Dark)
--color-secondary: #d4af37 (Gold)
--color-accent: #8b7355 (Brown)
```

### Tailwind Config
**File**: `tailwind.config.ts`
- Custom color mappings
- Extended theme
- Content paths

---

## Animation Examples

### Fade In On Scroll
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### Hover Lift
```tsx
<motion.div
  whileHover={{ y: -10 }}
>
  Content
</motion.div>
```

### Slide In From Side
```tsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
>
  Content
</motion.div>
```

---

## Icon Library

Using **Lucide React**:
- Scissors (logo)
- Menu/X (mobile nav)
- MapPin, Phone, Mail (contact)
- Clock (hours)
- Settings, Image, Palette (dashboard)
- Plus, Trash2 (gallery)
- Star, Users, ThumbsUp (stats)
- Sparkles, Award (services)

---

## Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

---

## Color Palette

### Default Theme
- **Primary**: #1a1a1a (Near Black)
- **Secondary**: #d4af37 (Gold)
- **Accent**: #8b7355 (Brown)
- **Gray-50**: #f9fafb
- **Gray-600**: #4b5563

### Usage
- Primary: Headers, dark backgrounds, footer
- Secondary: Buttons, highlights, icons
- Accent: Subtle accents
- Grays: Text, backgrounds

---

## Typography

Using **Inter** font family from Google Fonts:
- Headings: Bold (700)
- Body: Regular (400)
- Buttons: Semibold (600)

### Size Scale
- Hero: 5xl - 7xl
- Section Titles: 4xl - 5xl
- Card Titles: 2xl
- Body: base - lg
- Small: sm

---

## Best Practices

1. **Keep animations smooth** - Use 300ms duration
2. **Maintain contrast** - Ensure text readability
3. **Optimize images** - Use Next.js Image component
4. **Test responsive** - Check all breakpoints
5. **Update content** - Use dashboard for easy updates
6. **Keep it simple** - Don't over-animate
7. **Accessibility** - Use semantic HTML

---

## Extending the Site

### Add a New Page
1. Create file in `app/new-page/page.tsx`
2. Add link in Navigation component
3. Follow existing component patterns

### Add New Service
Edit `components/Services.tsx`:
```typescript
{
  icon: YourIcon,
  title: "New Service",
  description: "Description here",
  price: "$XX",
}
```

### Change Hero Image
Edit `components/Hero.tsx` - update the `src` prop in the Image component.

---

This showcase provides a complete overview of all components and how to customize them!
