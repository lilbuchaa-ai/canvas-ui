# Cosmic Astrology - Premium Homepage

A dark-first astrology homepage built with React, TypeScript, and Tailwind CSS featuring an interactive starfield, zodiac grid, and premium glass morphism design.

## Features

- **Interactive Starfield**: Three-layer background with static micro-stars, animated bigger stars, and nebula effects
- **Zodiac Grid**: Circular badges with orbital rings and 3D tilt effects
- **Services Carousel**: Interactive scroll-snap carousel with center emphasis
- **Glass Morphism**: Premium glass surfaces with gradient borders and hover effects
- **Motion System**: Respects `prefers-reduced-motion` for accessibility
- **Typography**: Plus Jakarta Sans headings, Inter body text with proper scaling

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

### Adjusting Star Density

Edit `src/components/StarfieldCanvas.tsx`:

```typescript
// Line 42: Adjust star count calculation
const starCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 20000));
// Change the divisor (20000) to adjust density:
// - Lower number = more stars (e.g., 15000)
// - Higher number = fewer stars (e.g., 25000)
```

### Carousel Snap Points

Edit `src/components/ServicesCarousel.tsx`:

```typescript
// Line 49: Adjust auto-play interval
autoPlayRef.current = setInterval(() => {
  setCurrentIndex((prev) => (prev + 1) % totalItems);
}, 4000); // Change 4000ms to desired interval

// Line 95: Adjust card spacing
style={{ transform: `translateX(-${currentIndex * 320}px)` }}
// Change 320 to adjust snap point spacing
```

### 3D Tilt Intensity

Edit tilt angles in components:

**ZodiacBadge.tsx** (Line 28):
```typescript
`perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) scale(1.02)`;
// Change the multiplier (4) to adjust tilt intensity:
// - Lower = subtle (e.g., 2)
// - Higher = dramatic (e.g., 6)
```

**GlowCard.tsx** (Line 31):
```typescript
`perspective(1000px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) scale(1.02)`;
// Adjust the multiplier (3) for card tilt intensity
```

### Motion & Animation Control

All animations respect `prefers-reduced-motion: reduce`. To globally adjust:

**CSS Custom Properties** in `src/index.css`:
```css
--ease-cosmic: cubic-bezier(0.2, 0.8, 0.2, 1); /* Animation curve */
```

**Orbit Animation Speed** (Line 102):
```css
.orbit-ring {
  animation: orbit 20s linear infinite; /* Change 20s duration */
}
```

**Shimmer Duration** (Line 106):
```css
.shimmer {
  animation: shimmer 2.3s ease-in-out infinite; /* Change 2.3s duration */
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

## Development

```bash
npm install
npm run dev
```

## Performance Targets

- Lighthouse Performance: ≥95
- Cumulative Layout Shift (CLS): <0.1
- Largest Contentful Paint (LCP): <2.5s on 3G Fast
- First Input Delay (FID): <100ms

Built with React 18, TypeScript, Tailwind CSS, and Vite.