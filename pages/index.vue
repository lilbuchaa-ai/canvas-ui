<template>
  <div>
    <AppHeader />
    
    <main>
      <!-- Hero Section -->
      <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <!-- Background Effects -->
        <StarfieldCanvas />
        
        <!-- Hero Content -->
        <div class="relative z-10 container mx-auto px-6 text-center">
          <div class="max-w-4xl mx-auto space-y-8">
            <!-- Animated Badge -->
            <div class="inline-flex items-center gap-2 glass-surface rounded-full px-6 py-3 text-sm font-medium text-starlight border border-white/10 animate-fade-in">
              <IconSparkles :size="16" class="animate-pulse" />
              <span>Discover Your Cosmic Destiny</span>
            </div>
            
            <!-- Main Headline -->
            <h1 class="font-heading font-bold text-6xl md:text-7xl lg:text-8xl leading-tight">
              <span class="gradient-text">Unlock the</span><br>
              <span class="text-white">Mysteries of</span><br>
              <span class="gradient-text">the Universe</span>
            </h1>
            
            <!-- Subtitle -->
            <p class="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              Journey through cosmic wisdom with personalized horoscopes, mystical tarot readings, 
              and profound astrological insights that illuminate your path forward.
            </p>
            
            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink 
                to="/astro"
                class="btn-primary px-8 py-4 rounded-full font-medium text-lg transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starlight focus-visible:ring-offset-2 focus-visible:ring-offset-bg-950"
              >
                Get Your Reading
              </NuxtLink>
              <button 
                @click="scrollToExplore"
                class="btn-secondary px-8 py-4 rounded-full font-medium text-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starlight focus-visible:ring-offset-2 focus-visible:ring-offset-bg-950"
              >
                Explore Services
                <IconChevronDown :size="20" />
              </button>
            </div>
          </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <IconChevronDown :size="24" class="text-starlight opacity-60" />
        </div>
      </section>
      
      <!-- Teaser Sections -->
      <ZodiacTeaser />
      <TarotTeaser />
      <CompatibilityTeaser />
      
      <!-- Full Zodiac Guide Section -->
      <section class="py-32 relative">
        <div class="container mx-auto px-6">
          <SectionHeader
            subtitle="Complete Astrological Guide"
            title="All Zodiac Signs"
            description="Dive deep into the characteristics, traits, and cosmic influences of each zodiac sign."
            titleGradient
            className="mb-20"
          />
          
          <!-- Zodiac Grid -->
          <div ref="zodiacRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
      
      <!-- Services Section -->
      <ServicesCarousel />
      
      <!-- CTA Section -->
      <section class="py-32">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <GlowCard className="text-center p-12" glowIntensity="high">
              <div class="space-y-6">
                <h2 class="font-heading font-bold text-4xl gradient-text">
                  Ready to Begin Your Journey?
                </h2>
                <p class="text-xl text-text-muted max-w-2xl mx-auto">
                  Let the cosmos guide you towards clarity, purpose, and profound understanding 
                  of your place in the universe.
                </p>
                <NuxtLink 
                  to="/auth"
                  class="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starlight focus-visible:ring-offset-2 focus-visible:ring-offset-bg-950"
                >
                  Start Your Reading
                  <IconArrowRight :size="20" />
                </NuxtLink>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import IconSparkles from '~/components/Icon/Sparkles.vue'
import IconChevronDown from '~/components/Icon/ChevronDown.vue'
import IconArrowRight from '~/components/Icon/ArrowRight.vue'

const scrollToExplore = () => {
  const element = document.querySelector('#services')
  element?.scrollIntoView({ behavior: 'smooth' })
}

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