<template>
  <div 
    class="relative overflow-hidden"
    @mouseenter="carousel.pause"
    @mouseleave="carousel.resume"
    @focusin="carousel.pause"
    @focusout="carousel.resume"
  >
    <!-- Gradient masks -->
    <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-950 to-transparent z-10 pointer-events-none" />
    <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-950 to-transparent z-10 pointer-events-none" />
    
    <!-- Carousel container -->
    <div 
      ref="scrollRef"
      class="flex gap-8 py-8 snap-x snap-mandatory overflow-x-auto scrollbar-hide"
      role="region"
      aria-label="Services carousel"
      :aria-live="carousel.isPlaying ? 'polite' : 'off'"
    >
      <div
        v-for="(service, index) in services"
        :key="service.id"
        class="flex-shrink-0 w-80 snap-center transition-all duration-200 ease-cosmic transform-gpu"
        :class="getCardScale(index)"
      >
        <GlowCard 
          :glowIntensity="index === carousel.currentIndex ? 'high' : 'low'"
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
        @click="carousel.prev"
        class="p-2 glass-surface glass-hover rounded-full focus-cosmic transition-all duration-200"
        aria-label="Previous service"
      >
        <component :is="ChevronLeftIcon" :size="20" class="text-text-base" />
      </button>
      
      <!-- Dot Indicators -->
      <div class="flex gap-2" role="tablist" aria-label="Service indicators">
        <button
          v-for="(service, index) in services"
          :key="`dot-${service.id}`"
          @click="carousel.goTo(index)"
          class="w-2 h-2 rounded-full transition-all duration-200 focus-cosmic"
          :class="index === carousel.currentIndex ? 'bg-amethyst shadow-glow-amethyst' : 'bg-text-muted/30 hover:bg-text-muted/50'"
          role="tab"
          :aria-selected="index === carousel.currentIndex"
          :aria-label="`Go to ${service.title}`"
        />
      </div>
      
      <!-- Next Button -->
      <button
        @click="carousel.next"
        class="p-2 glass-surface glass-hover rounded-full focus-cosmic transition-all duration-200"
        aria-label="Next service"
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
  { id: '4', title: 'Transit Forecasting', description: 'Navigate upcoming celestial influences and opportunities', iconName: 'Wind' },
]

const ArrowRightIcon = resolveComponent('IconArrowRight')
const ChevronLeftIcon = resolveComponent('IconChevronLeft') 
const ChevronRightIcon = resolveComponent('IconChevronRight')
const scrollRef = ref<HTMLElement>()

const carousel = useCarousel({ 
  itemCount: services.length, 
  autoplayDelay: 4000,
  startIndex: 1
})

const getCardScale = (index: number) => {
  if (index === carousel.currentIndex) return 'scale-100 opacity-100'
  return 'scale-95 opacity-75'
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      carousel.prev()
      break
    case 'ArrowRight':  
      event.preventDefault()
      carousel.next()
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
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