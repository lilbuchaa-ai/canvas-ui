<template>
  <section class="py-16 px-4">
    <div class="container mx-auto max-w-4xl">
      <SectionHeader
        subtitle="Compatibility Preview"
        title="Cosmic Connections"
        description="Explore the celestial chemistry between souls through synastry"
        class="mb-12"
      />
      
      <div class="flex flex-col items-center space-y-8">
        <!-- Synastry Arc Visualization -->
        <div 
          class="relative w-80 h-40"
          @mouseenter="pauseAnimations"
          @mouseleave="resumeAnimations"
        >
          <!-- Connection Arc -->
          <svg class="absolute inset-0 w-full h-full" viewBox="0 0 320 160">
            <defs>
              <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" :style="`stop-color:hsl(${amethystHsl});stop-opacity:0.8`" />
                <stop offset="100%" :style="`stop-color:hsl(${auroraTealHsl});stop-opacity:0.8`" />
              </linearGradient>
            </defs>
            <path
              d="M 60 140 Q 160 20 260 140"
              stroke="url(#arcGradient)"
              stroke-width="3"
              fill="none"
              :class="{ 'animate-pulse': !motionReduced && !isPaused }"
              style="filter: drop-shadow(0 0 8px hsl(var(--amethyst) / 0.5))"
            />
            <!-- Floating particles -->
            <circle
              v-for="(particle, i) in particles"
              :key="i"
              :cx="particle.x"
              :cy="particle.y"
              :r="particle.size"
              :fill="`hsl(${particle.hue})`"
              :opacity="particle.opacity"
              :class="{ 'animate-ping': !motionReduced && !isPaused }"
              :style="{ 
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s'
              }"
            />
          </svg>
          
          <!-- Left Circle (Person 1) -->
          <div 
            class="absolute left-0 bottom-0 w-20 h-20 glass-surface rounded-full flex items-center justify-center border border-amethyst/30 transform-gpu"
            :class="{ 
              'animate-pulse': !motionReduced && !isPaused,
              'hover:scale-110': true
            }"
            :style="{ 
              transform: !motionReduced && !isPaused ? `translateY(${floatY}px)` : 'none',
              boxShadow: 'var(--shadow-glow-amethyst)'
            }"
          >
            <component :is="User1Icon" :size="32" class="text-amethyst" />
          </div>
          
          <!-- Right Circle (Person 2) -->
          <div 
            class="absolute right-0 bottom-0 w-20 h-20 glass-surface rounded-full flex items-center justify-center border border-aurora-teal/30 transform-gpu"
            :class="{ 
              'animate-pulse': !motionReduced && !isPaused,
              'hover:scale-110': true
            }"
            :style="{ 
              transform: !motionReduced && !isPaused ? `translateY(${floatY * -1}px)` : 'none',
              boxShadow: 'var(--shadow-glow-teal)'
            }"
          >
            <component :is="User2Icon" :size="32" class="text-aurora-teal" />
          </div>
          
          <!-- Compatibility Score -->
          <div class="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div class="text-center">
              <div class="text-2xl font-heading font-bold gradient-text">
                {{ compatibilityScore }}%
              </div>
              <div class="text-xs text-text-muted font-medium">
                Cosmic Match
              </div>
            </div>
          </div>
        </div>
        
        <!-- Simple Form -->
        <div class="w-full max-w-md space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="birth1" class="block text-sm font-medium text-text-muted mb-2">
                Your Birth Date
              </label>
              <input
                id="birth1"
                v-model="birth1"
                type="date"
                class="w-full px-4 py-2 glass-surface rounded-lg border border-amethyst/20 text-text-base focus-cosmic focus:border-amethyst/50 transition-colors"
              />
            </div>
            <div>
              <label for="birth2" class="block text-sm font-medium text-text-muted mb-2">
                Their Birth Date
              </label>
              <input
                id="birth2"
                v-model="birth2"
                type="date"
                class="w-full px-4 py-2 glass-surface rounded-lg border border-aurora-teal/20 text-text-base focus-cosmic focus:border-aurora-teal/50 transition-colors"
              />
            </div>
          </div>
          
          <div class="text-center pt-4">
            <a
              href="#compat"
              class="inline-flex items-center gap-2 px-8 py-4 cta-button rounded-full font-medium text-white focus-cosmic text-lg w-full justify-center"
              @click="checkCompatibility"
            >
              <component :is="HeartIcon" :size="20" />
              Check Cosmic Compatibility
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { reduced: motionReduced } = useMotion()
const User1Icon = resolveComponent('IconCrown')
const User2Icon = resolveComponent('IconGem') 
const HeartIcon = resolveComponent('IconSparkles')

const birth1 = ref('')
const birth2 = ref('')
const isPaused = ref(false)
const floatY = ref(0)
const compatibilityScore = ref(87) // Demo score

// Color constants for SVG
const amethystHsl = '255 92% 64%'
const auroraTealHsl = '172 78% 57%'

// Floating particles for arc
const particles = ref([
  { x: 120, y: 80, size: 2, opacity: 0.6, hue: amethystHsl },
  { x: 160, y: 40, size: 1.5, opacity: 0.8, hue: '200 95% 70%' },
  { x: 200, y: 60, size: 2.5, opacity: 0.5, hue: auroraTealHsl },
])

let floatInterval: ReturnType<typeof setInterval> | null = null

const startFloatAnimation = () => {
  if (motionReduced.value || isPaused.value) return
  
  floatInterval = setInterval(() => {
    if (!isPaused.value) {
      floatY.value = Math.sin(Date.now() * 0.001) * 6
    }
  }, 50)
}

const stopFloatAnimation = () => {
  if (floatInterval) {
    clearInterval(floatInterval)
    floatInterval = null
  }
}

const pauseAnimations = () => {
  isPaused.value = true
}

const resumeAnimations = () => {
  isPaused.value = false
}

const checkCompatibility = () => {
  // This would normally navigate to compatibility page
  console.log('Checking compatibility...', { birth1: birth1.value, birth2: birth2.value })
}

onMounted(() => {
  if (!motionReduced.value) {
    startFloatAnimation()
  }
})

onUnmounted(() => {
  stopFloatAnimation()
})

watch(motionReduced, (newVal) => {
  if (newVal) {
    stopFloatAnimation()
    floatY.value = 0
  } else {
    startFloatAnimation()
  }
})
</script>