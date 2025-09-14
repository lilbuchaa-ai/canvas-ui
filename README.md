# Cosmic Astrology - Premium Nuxt 4 + Vue 3 App

A premium astrology homepage built with Nuxt 4, Vue 3 Composition API, and TailwindCSS featuring a cosmic starfield theme, interactive orbital zodiac badges, glass morphism carousel, and elegant animations.

## 🌟 Features

- **Dark-First Design**: Premium cosmic theme with violet/magenta accents
- **Interactive Starfield**: Multi-layer animated background with parallax
- **Orbital Zodiac Badges**: Circular badges with rotating orbital rings
- **Services Carousel**: Scroll-snap carousel with center emphasis
- **Glass Morphism**: Elegant glass surface effects throughout
- **Accessibility**: Full keyboard navigation, reduced motion support
- **Performance**: Optimized for Lighthouse 95+ scores

## 🚀 Tech Stack

- **Nuxt 4** - Full-stack Vue framework
- **Vue 3** - Composition API with TypeScript
- **TailwindCSS** - Utility-first styling with custom design tokens
- **CSS Animations** - Hardware-accelerated micro-interactions

## Design System

### Colors (HSL-based)
- **Background**: `--bg-950` (#070711), `--bg-900` (#0A0C16), `--surface` (#0F1220)
- **Text**: `--text-base` (#ECEEF7), `--text-muted` (#A6AEC8)
- **Accents**: `--violet` (#8B5CF6), `--magenta` (#D946EF), `--mint` (#2DD4BF), `--starlight` (#F5D48F)

### Typography Scale
- **H1**: 56-64px / 1.05 line-height, -1% letter-spacing
- **H2**: 34-40px / 1.1 line-height, -0.5% letter-spacing
- **Body**: 16-18px / 1.6 line-height

## Customization Guide

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate
```

## ⚙️ Customization

### Star Density
Modify star count in `components/StarfieldCanvas.vue`:
```javascript
const starCount = Math.floor((width * height) / 15000) // Increase divisor for fewer stars
```

### Carousel Snap Points
Adjust carousel behavior in `components/ServicesCarousel.vue`:
```javascript
const cardWidth = 320 // Adjust card width
autoPlayInterval = setInterval(() => {
  nextSlide()
}, 5000) // Change auto-play duration
```

### Tilt Intensity
Modify 3D tilt effects in `assets/css/main.css`:
```css
.tilt-hover:hover {
  transform: perspective(1000px) rotateX(-2deg) rotateY(4deg) translateZ(8px);
  /* Adjust rotation values for more/less tilt */
}
```

### Animation Speed
Control orbit and shimmer animations:
```css
.orbit-ring {
  animation: rotate 12s linear infinite; /* Slower = larger number */
}

.shimmer::before {
  animation: shimmer 2.3s ease-in-out infinite; /* Adjust timing */
}
```

## Performance Optimization

- Fonts are preloaded with `font-display: swap`
- Starfield uses `requestAnimationFrame` for smooth 60fps
- 3D transforms use `transform-gpu` for hardware acceleration
- Intersection Observer for staggered zodiac animations
- Parallax effects respect reduced motion preferences

## Accessibility Features

- Single H1 per page with proper heading hierarchy
- ARIA roles for carousel (`role="region"`, `aria-roledescription="carousel"`)
- Keyboard navigation support
- Focus management with custom `focus-cosmic` class
- High contrast ratios (≥4.5:1) maintained
- Screen reader announcements for carousel changes

## Browser Support

- Modern browsers with ES2020+ support
- CSS Grid and Flexbox
- CSS Custom Properties
- Intersection Observer API
- RequestAnimationFrame API

## 🎯 Performance

- **Preloaded fonts** with `font-display: swap`
- **Hardware acceleration** with `transform-gpu`
- **Reduced motion** respect for accessibility
- **Lazy loading** with Intersection Observer
- **Optimized animations** with `requestAnimationFrame`

## ♿ Accessibility

- Single H1 per page for SEO
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast ratios (4.5:1+)
- Reduced motion preferences honored

## Performance Targets

- Lighthouse Performance: ≥95
- Cumulative Layout Shift (CLS): <0.1
- Largest Contentful Paint (LCP): <2.5s on 3G Fast
- First Input Delay (FID): <100ms

## 📱 Responsive Design

- **Desktop**: 4-column zodiac grid, full navigation
- **Tablet**: 2-column layout, condensed navigation  
- **Mobile**: Single column, hamburger menu

## 🌐 SEO Optimized

- Meta tags and Open Graph
- Structured semantic markup
- Clean URLs and navigation
- Performance optimizations
- Mobile-first indexing ready

## 📄 License

MIT License - feel free to use for personal or commercial projects.