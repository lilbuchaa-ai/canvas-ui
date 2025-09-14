<template>
  <div class="min-h-screen bg-gradient-subtle">
    <!-- Starfield Background -->
    <StarfieldCanvas />
    
    <!-- Static starfield overlay -->
    <div class="fixed inset-0 opacity-30 pointer-events-none" style="z-index: 2;">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,hsl(var(--bg-950))_100%)]"></div>
      <div class="absolute inset-0" 
           style="background-image: radial-gradient(1px 1px at 20px 30px, rgba(236,238,247,0.1), transparent), radial-gradient(1px 1px at 40px 70px, rgba(245,212,143,0.08), transparent), radial-gradient(0.5px 0.5px at 90px 40px, rgba(139,92,246,0.06), transparent), radial-gradient(0.5px 0.5px at 130px 80px, rgba(217,70,239,0.04), transparent);">
      </div>
    </div>
    
    <!-- Nebula background -->
    <div class="fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-96 opacity-20 pointer-events-none" style="z-index: 2;">
      <div class="absolute inset-0 bg-gradient-radial from-violet/30 via-magenta/20 to-transparent blur-3xl"></div>
    </div>
    
    <!-- Header -->
    <AppHeader />
    
    <!-- Main Content -->
    <main class="relative" style="z-index: 10;">
      <!-- Hero Section -->
      <section id="hero" class="min-h-screen flex items-center justify-center px-4 pt-20" data-parallax="0.6">
        <div class="container mx-auto text-center max-w-4xl">
          <h1 class="mb-6">
            Unlock Your <span class="gradient-text">Cosmic</span> Destiny
          </h1>
          <p class="text-xl text-text-muted leading-relaxed mb-12 max-w-2xl mx-auto">
            Discover the profound wisdom written in the stars. Our expert astrologers provide personalized insights to guide your journey through life's celestial tapestry.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button class="cta-button px-8 py-4 rounded-full font-medium text-white focus-cosmic text-lg">
              Get Your Reading
            </button>
            <button class="flex items-center gap-2 text-text-base hover:text-violet transition-colors duration-200 px-6 py-4 glass-surface glass-hover rounded-full focus-cosmic">
              Learn More
              <component :is="ChevronDownIcon" :size="20" />
            </button>
          </div>
        </div>
      </section>
      
      <!-- Zodiac Grid Section -->
      <section id="zodiac" class="py-20 px-4" data-parallax="0.8">
        <div class="container mx-auto">
          <SectionHeader
            subtitle="Zodiac Signs"
            title="Your Celestial Blueprint"
            description="Each zodiac sign carries unique cosmic energies that shape personality, relationships, and life path. Discover the profound influence of your celestial signature."
            :titleGradient="true"
            class="mb-16"
          />
          
          <div ref="zodiacRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <ZodiacBadge
              v-for="(sign, index) in zodiacSigns"
              :key="sign.name"
              :name="sign.name"
              :dateRange="sign.dateRange"
              :iconName="sign.iconName"
              :description="sign.description"
              :delay="index * 100"
            />
          </div>
        </div>
      </section>
      
      <!-- Services Carousel Section -->
      <section id="services" class="py-20 px-4" data-parallax="0.9">
        <div class="container mx-auto max-w-6xl">
          <SectionHeader
            subtitle="Our Services"
            title="Cosmic Guidance Awaits"
            description="Explore our range of personalized astrology services designed to illuminate your path forward."
            class="mb-16"
          />
          
          <ServicesCarousel />
        </div>
      </section>
      
      <!-- Call to Action Section -->
      <section id="cta" class="py-20 px-4">
        <div class="container mx-auto max-w-4xl">
          <GlowCard glowIntensity="high" class="text-center">
            <h2 class="font-heading font-bold text-3xl md:text-4xl text-text-base mb-6">
              Ready to Explore Your <span class="gradient-text">Cosmic Journey</span>?
            </h2>
            <p class="text-xl text-text-muted leading-relaxed mb-8 max-w-2xl mx-auto">
              Begin your personalized astrology experience today. Our expert readers are standing by to unveil the mysteries written in your stars.
            </p>
            <button class="cta-button px-10 py-4 rounded-full font-medium text-white focus-cosmic text-lg">
              Start Your Reading
            </button>
          </GlowCard>
        </div>
      </section>
    </main>
    
    <!-- Footer -->
    <footer class="relative py-12 px-4 border-t border-white/10" style="z-index: 10;">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-3">
            <component :is="SparklesIcon" :size="24" class="text-violet" />
            <span class="font-heading font-bold text-lg text-text-base">Cosmic</span>
          </div>
          
          <nav class="flex gap-6">
            <a href="#" class="text-text-muted hover:text-text-base transition-colors duration-200">Privacy</a>
            <a href="#" class="text-text-muted hover:text-text-base transition-colors duration-200">Terms</a>
            <a href="#" class="text-text-muted hover:text-text-base transition-colors duration-200">Contact</a>
          </nav>
          
          <p class="text-text-muted text-sm">
            © 2024 Cosmic Astrology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const SparklesIcon = resolveComponent('IconSparkles')
const ChevronDownIcon = resolveComponent('IconChevronDown')

const zodiacSigns = [
  { name: 'Aries', dateRange: 'Mar 21 - Apr 19', iconName: 'Flame', description: 'Bold and pioneering spirit' },
  { name: 'Taurus', dateRange: 'Apr 20 - May 20', iconName: 'Gem', description: 'Steady and reliable nature' },
  { name: 'Gemini', dateRange: 'May 21 - Jun 20', iconName: 'Twins', description: 'Curious and adaptable mind' },
  { name: 'Cancer', dateRange: 'Jun 21 - Jul 22', iconName: 'Shell', description: 'Nurturing and intuitive soul' },
  { name: 'Leo', dateRange: 'Jul 23 - Aug 22', iconName: 'Crown', description: 'Confident and creative heart' },
  { name: 'Virgo', dateRange: 'Aug 23 - Sep 22', iconName: 'Sparkles', description: 'Analytical and perfectionist approach' },
  { name: 'Libra', dateRange: 'Sep 23 - Oct 22', iconName: 'Scales', description: 'Harmonious and diplomatic essence' },
  { name: 'Scorpio', dateRange: 'Oct 23 - Nov 21', iconName: 'Zap', description: 'Intense and transformative power' },
  { name: 'Sagittarius', dateRange: 'Nov 22 - Dec 21', iconName: 'Target', description: 'Adventurous and philosophical mind' },
  { name: 'Capricorn', dateRange: 'Dec 22 - Jan 19', iconName: 'Shield', description: 'Ambitious and disciplined approach' },
  { name: 'Aquarius', dateRange: 'Jan 20 - Feb 18', iconName: 'Wind', description: 'Innovative and humanitarian vision' },
  { name: 'Pisces', dateRange: 'Feb 19 - Mar 20', iconName: 'Droplet', description: 'Compassionate and artistic soul' },
]

const zodiacRef = ref<HTMLElement>()

onMounted(() => {
  // Intersection Observer for zodiac cards
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.group')
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-fade-in-up')
            }, index * 100)
          })
        }
      })
    },
    { threshold: 0.1 }
  )

  if (zodiacRef.value) {
    observer.observe(zodiacRef.value)
  }

  // Parallax effect
  const handleScroll = () => {
    const scrollY = window.scrollY
    const parallaxElements = document.querySelectorAll('[data-parallax]')
    
    parallaxElements.forEach((element) => {
      const rate = parseFloat(element.getAttribute('data-parallax') || '0')
      const yPos = -(scrollY * rate)
      ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
    })
  }

  window.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('scroll', handleScroll)
  })
})

// SEO
useHead({
  title: 'Cosmic Astrology - Premium Astrology Readings',
  meta: [
    { name: 'description', content: 'Unlock your cosmic destiny with premium astrology readings. Expert astrologers provide personalized insights to guide your celestial journey.' },
    { name: 'keywords', content: 'astrology, horoscope, zodiac signs, birth chart, cosmic guidance, personalized readings' },
    { property: 'og:title', content: 'Cosmic Astrology - Premium Astrology Readings' },
    { property: 'og:description', content: 'Discover the profound wisdom written in the stars with our expert astrology services.' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>