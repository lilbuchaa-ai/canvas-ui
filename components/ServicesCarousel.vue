<template>
  <div class="relative overflow-hidden">
    <!-- Gradient masks -->
    <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-950 to-transparent z-10 pointer-events-none" />
    <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-950 to-transparent z-10 pointer-events-none" />
    
    <!-- Carousel container -->
    <div 
      ref="scrollRef"
      class="flex gap-8 transition-transform duration-300 ease-cosmic py-8"
      :style="{ transform: `translateX(${translateX}px)` }"
    >
      <div
        v-for="(service, index) in services"
        :key="service.id"
        class="flex-shrink-0 w-80 transition-all duration-300 ease-cosmic transform-gpu"
        :class="getCardScale(index)"
        :style="{ zIndex: getCardZIndex(index) }"
      >
        <GlowCard 
          :glowIntensity="index === currentIndex ? 'high' : 'low'"
          class="h-full"
        >
          <div class="text-center space-y-6">
            <!-- Service Icon -->
            <div class="flex justify-center">
              <OrbitIcon :iconName="service.iconName" size="lg" />
            </div>
            
            <!-- Service Content -->
            <div>
              <h3 class="font-heading font-bold text-xl text-text-base mb-3">
                {{ service.title }}
              </h3>
              <p class="text-text-muted leading-relaxed mb-6">
                {{ service.description }}
              </p>
              <button class="inline-flex items-center gap-2 text-violet hover:text-magenta transition-colors duration-200 font-medium">
                Learn more
                <component :is="ArrowRightIcon" :size="16" />
              </button>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
    
    <!-- Navigation Controls -->
    <div class="flex justify-center items-center gap-4 mt-8">
      <!-- Previous Button -->
      <button
        @click="prevSlide"
        class="p-2 glass-surface glass-hover rounded-full focus-cosmic transition-all duration-200"
      >
        <component :is="ChevronLeftIcon" :size="20" class="text-text-base" />
      </button>
      
      <!-- Dot Indicators -->
      <div class="flex gap-2">
        <button
          v-for="(service, index) in services"
          :key="`dot-${service.id}`"
          @click="goToSlide(index)"
          class="w-2 h-2 rounded-full transition-all duration-200 focus-cosmic"
          :class="index === currentIndex ? 'bg-violet shadow-glow-violet' : 'bg-text-muted/30 hover:bg-text-muted/50'"
        />
      </div>
      
      <!-- Next Button -->
      <button
        @click="nextSlide"
        class="p-2 glass-surface glass-hover rounded-full focus-cosmic transition-all duration-200"
      >
        <component :is="ChevronRightIcon" :size="20" class="text-text-base" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Service {
  id: string
  title: string
  description: string
  iconName: string
}

const services: Service[] = [
  { id: '1', title: 'Birth Chart Analysis', description: 'Unlock the secrets written in the stars at your moment of birth', iconName: 'Sparkles' },
  { id: '2', title: 'Relationship Compatibility', description: 'Discover the cosmic chemistry between you and your partner', iconName: 'Target' },
  { id: '3', title: 'Career Path Guidance', description: 'Align your professional journey with celestial wisdom', iconName: 'Crown' },
]

const ArrowRightIcon = resolveComponent('IconArrowRight')
const ChevronLeftIcon = resolveComponent('IconChevronLeft') 
const ChevronRightIcon = resolveComponent('IconChevronRight')

const currentIndex = ref(1) // Start with middle item
const isAutoPlaying = ref(true)
const scrollRef = ref<HTMLDivElement>()
let autoPlayInterval: ReturnType<typeof setInterval> | undefined

const totalItems = services.length
const cardWidth = 320 // 80 * 4 (w-80 = 20rem = 320px) + gap

const translateX = computed(() => {
  const containerWidth = 1200 // Approximate container width
  const centerOffset = (containerWidth - cardWidth) / 2
  return centerOffset - (currentIndex.value * (cardWidth + 32)) // 32px gap
})

const goToSlide = (index: number) => {
  currentIndex.value = index
  resetAutoPlay()
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % totalItems
  resetAutoPlay()
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + totalItems) % totalItems
  resetAutoPlay()
}

const resetAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
  startAutoPlay()
}

const startAutoPlay = () => {
  if (!isAutoPlaying.value) return
  
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

const getCardScale = (index: number) => {
  if (index === currentIndex.value) return 'scale-100 opacity-100'
  return 'scale-[0.94] opacity-[0.72]'
}

const getCardZIndex = (index: number) => {
  if (index === currentIndex.value) return 20
  return 10
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
})

// Pause auto-play on hover
const handleMouseEnter = () => {
  isAutoPlaying.value = false
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
}

const handleMouseLeave = () => {
  isAutoPlaying.value = true
  startAutoPlay()
}
</script>