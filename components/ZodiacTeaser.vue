<template>
  <section class="py-16 px-4">
    <div class="container mx-auto">
      <SectionHeader
        subtitle="Zodiac Preview"
        title="Discover Your Sign"
        description="Explore the celestial energies that guide your cosmic blueprint"
        class="mb-12"
      />
      
      <!-- Horizontal scroll container -->
      <div class="relative overflow-hidden">
        <!-- Gradient masks -->
        <div class="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg-950 to-transparent z-10 pointer-events-none" />
        <div class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg-950 to-transparent z-10 pointer-events-none" />
        
        <!-- Scroll container -->
        <div 
          ref="scrollContainer"
          class="flex gap-6 py-8 px-4 snap-x snap-mandatory overflow-x-auto scrollbar-hide"
          @scroll="handleScroll"
        >
          <div
            v-for="(sign, index) in zodiacSigns"
            :key="sign.name"
            class="flex-shrink-0 snap-center transition-all duration-200 ease-cosmic transform-gpu"
            :class="getCardClasses(index)"
          >
            <a
              :href="`#astro-${sign.name.toLowerCase()}`"
              class="block group focus-cosmic rounded-2xl"
              @mouseenter="handleCardHover(index)"
              @focus="handleCardHover(index)"
            >
              <div class="relative p-6 glass-surface rounded-2xl tilt-hover shimmer overflow-hidden">
                <!-- Orbit ring -->
                <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div class="absolute inset-2 rounded-full border border-amethyst/30">
                    <div 
                      class="absolute w-1.5 h-1.5 bg-gradient-to-r from-amethyst to-aurora-teal rounded-full -top-0.5 left-1/2 transform -translate-x-1/2 shadow-glow-amethyst"
                      :class="{ 'animate-spin': !motionReduced && (hoveredIndex === index) }"
                      :style="{ animationDuration: '3s' }"
                    />
                  </div>
                </div>
                
                <!-- Content -->
                <div class="relative z-10 text-center space-y-4">
                  <!-- Icon -->
                  <div class="flex justify-center">
                    <div class="w-12 h-12 flex items-center justify-center glass-surface rounded-full group-hover:scale-110 transition-transform duration-200">
                      <component :is="getIcon(sign.iconName)" :size="24" class="text-text-base group-hover:text-amethyst transition-colors" />
                    </div>
                  </div>
                  
                  <!-- Sign info -->
                  <div>
                    <h3 class="font-heading font-bold text-lg text-text-base mb-1">
                      {{ sign.name }}
                    </h3>
                    <p class="text-amber text-sm font-medium mb-2">
                      {{ sign.dateRange }}
                    </p>
                    <p class="text-text-muted text-sm leading-relaxed">
                      {{ sign.hook }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { reduced: motionReduced } = useMotion()

const zodiacSigns = [
  { name: 'Aries', dateRange: 'Mar 21 - Apr 19', iconName: 'Flame', hook: 'Bold pioneers of the cosmos' },
  { name: 'Taurus', dateRange: 'Apr 20 - May 20', iconName: 'Gem', hook: 'Grounded in earthly wisdom' },
  { name: 'Gemini', dateRange: 'May 21 - Jun 20', iconName: 'Twins', hook: 'Masters of cosmic duality' },
  { name: 'Cancer', dateRange: 'Jun 21 - Jul 22', iconName: 'Shell', hook: 'Guardians of intuitive depths' },
  { name: 'Leo', dateRange: 'Jul 23 - Aug 22', iconName: 'Crown', hook: 'Radiant solar sovereigns' },
  { name: 'Virgo', dateRange: 'Aug 23 - Sep 22', iconName: 'Sparkles', hook: 'Celestial perfectionists' },
  { name: 'Libra', dateRange: 'Sep 23 - Oct 22', iconName: 'Scales', hook: 'Harmony seekers of balance' },
  { name: 'Scorpio', dateRange: 'Oct 23 - Nov 21', iconName: 'Zap', hook: 'Transformative mystic force' },
  { name: 'Sagittarius', dateRange: 'Nov 22 - Dec 21', iconName: 'Target', hook: 'Cosmic truth seekers' },
  { name: 'Capricorn', dateRange: 'Dec 22 - Jan 19', iconName: 'Shield', hook: 'Mountain climbing souls' },
  { name: 'Aquarius', dateRange: 'Jan 20 - Feb 18', iconName: 'Wind', hook: 'Innovative cosmic rebels' },
  { name: 'Pisces', dateRange: 'Feb 19 - Mar 20', iconName: 'Droplet', hook: 'Dreamers of infinite oceans' },
]

const scrollContainer = ref<HTMLElement>()
const hoveredIndex = ref(-1)
const centerIndex = ref(1)

const handleScroll = () => {
  if (!scrollContainer.value) return
  
  const container = scrollContainer.value
  const cardWidth = 200 // Approximate card width
  const scrollLeft = container.scrollLeft
  const newCenterIndex = Math.round(scrollLeft / cardWidth)
  centerIndex.value = Math.max(0, Math.min(newCenterIndex, zodiacSigns.length - 1))
}

const handleCardHover = (index: number) => {
  hoveredIndex.value = index
}

const getCardClasses = (index: number) => {
  const isCentered = Math.abs(index - centerIndex.value) <= 0
  return [
    'w-48',
    isCentered ? 'scale-100 opacity-100' : 'scale-95 opacity-75'
  ]
}

const getIcon = (iconName: string) => {
  const iconMap: Record<string, any> = {
    Flame: resolveComponent('IconFlame'),
    Gem: resolveComponent('IconGem'),
    Twins: resolveComponent('IconTwins'),
    Shell: resolveComponent('IconShell'),
    Crown: resolveComponent('IconCrown'),
    Sparkles: resolveComponent('IconSparkles'),
    Scales: resolveComponent('IconScales'),
    Zap: resolveComponent('IconZap'),
    Target: resolveComponent('IconTarget'),
    Shield: resolveComponent('IconShield'),
    Wind: resolveComponent('IconWind'),
    Droplet: resolveComponent('IconDroplet')
  }
  return iconMap[iconName] || resolveComponent('IconSparkles')
}

onMounted(() => {
  // Center the scroll on the middle item
  if (scrollContainer.value) {
    const cardWidth = 200
    const centerOffset = (zodiacSigns.length / 2 - 1) * cardWidth
    scrollContainer.value.scrollLeft = centerOffset
  }
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>