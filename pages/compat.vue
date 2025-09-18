<template>
  <div class="min-h-screen bg-gradient-subtle">
    <!-- Background -->
    <StarfieldCanvas />
    
    <!-- Header -->
    <AppHeader />
    
    <!-- Main Content -->
    <main class="relative pt-24 pb-12 px-4" style="z-index: 10;">
      <div class="container mx-auto max-w-4xl">
        <!-- Page Header -->
        <div class="text-center mb-12">
          <h1 class="font-heading font-extrabold gradient-text mb-4">
            Cosmic Compatibility
          </h1>
          <p class="text-xl text-text-muted max-w-2xl mx-auto">
            Explore the celestial dynamics between two souls. Discover how your cosmic energies align and create harmony.
          </p>
        </div>
        
        <!-- Compatibility Form -->
        <div class="glass-surface rounded-3xl p-8 lg:p-12 mb-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <!-- Person 1 -->
            <div class="space-y-6">
              <div class="text-center">
                <div class="w-20 h-20 bg-gradient-cosmic rounded-full flex items-center justify-center mx-auto mb-4">
                  <component :is="CrownIcon" :size="32" class="text-white" />
                </div>
                <h3 class="font-heading font-bold text-xl text-text-base">First Person</h3>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-text-muted mb-2">Name</label>
                  <input 
                    v-model="person1.name"
                    type="text" 
                    placeholder="Enter name"
                    class="w-full px-4 py-3 glass-surface rounded-lg text-text-base focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-text-muted mb-2">Birth Date</label>
                  <input 
                    v-model="person1.birthDate"
                    type="date" 
                    class="w-full px-4 py-3 glass-surface rounded-lg text-text-base focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-text-muted mb-2">Birth Time (Optional)</label>
                  <input 
                    v-model="person1.birthTime"
                    type="time" 
                    class="w-full px-4 py-3 glass-surface rounded-lg text-text-base focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-text-muted mb-2">Birth Location</label>
                  <input 
                    v-model="person1.birthPlace"
                    type="text" 
                    placeholder="City, Country"
                    class="w-full px-4 py-3 glass-surface rounded-lg text-text-base focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
            
            <!-- Compatibility Visualization -->
            <div class="flex items-center justify-center">
              <div class="relative">
                <!-- Connection arc -->
                <svg width="200" height="120" class="absolute inset-0">
                  <defs>
                    <linearGradient id="compatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" :style="`stop-color:hsl(var(--amethyst));stop-opacity:0.8`" />
                      <stop offset="50%" :style="`stop-color:hsl(var(--aurora-teal));stop-opacity:1`" />
                      <stop offset="100%" :style="`stop-color:hsl(var(--rose));stop-opacity:0.8`" />
                    </linearGradient>
                  </defs>
                  
                  <path 
                    d="M 20 100 Q 100 20 180 100" 
                    stroke="url(#compatGradient)" 
                    stroke-width="3" 
                    fill="none"
                    class="animate-pulse"
                    style="filter: drop-shadow(0 0 8px hsl(var(--aurora-teal) / 0.4));"
                  />
                </svg>
                
                <div class="flex justify-between items-center px-4 py-12 relative z-10">
                  <div class="w-12 h-12 rounded-full bg-violet/20 border-2 border-violet flex items-center justify-center">
                    <span class="text-xs font-bold text-violet">{{ person1.name ? person1.name.charAt(0).toUpperCase() : '?' }}</span>
                  </div>
                  
                  <div class="w-12 h-12 rounded-full bg-aurora-teal/20 border-2 border-aurora-teal flex items-center justify-center ml-32">
                    <span class="text-xs font-bold text-aurora-teal">{{ person2.name ? person2.name.charAt(0).toUpperCase() : '?' }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Person 2 -->
            <div class="space-y-6 lg:col-start-1">
              <div class="text-center">
                <div class="w-20 h-20 bg-gradient-to-r from-aurora-teal to-rose rounded-full flex items-center justify-center mx-auto mb-4">
                  <component :is="GemIcon" :size="32" class="text-white" />
                </div>
                <h3 class="font-heading font-bold text-xl text-text-base">Second Person</h3>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-text-muted mb-2">Name</label>
                  <input 
                    v-model="person2.name"
                    type="text" 
                    placeholder="Enter name"
                    class="w-full px-4 py-3 glass-surface rounded-lg text-text-base focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-text-muted mb-2">Birth Date</label>
                  <input 
                    v-model="person2.birthDate"
                    type="date" 
                    class="w-full px-4 py-3 glass-surface rounded-lg text-text-base focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-text-muted mb-2">Birth Time (Optional)</label>
                  <input 
                    v-model="person2.birthTime"
                    type="time" 
                    class="w-full px-4 py-3 glass-surface rounded-lg text-text-base focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-text-muted mb-2">Birth Location</label>
                  <input 
                    v-model="person2.birthPlace"
                    type="text" 
                    placeholder="City, Country"
                    class="w-full px-4 py-3 glass-surface rounded-lg text-text-base focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <!-- Calculate Button -->
          <div class="text-center mt-8">
            <button 
              @click="calculateCompatibility"
              :disabled="!canCalculate || loading"
              class="btn-cosmic px-12 py-4 text-lg"
            >
              <component :is="SparklesIcon" :size="20" class="mr-2" />
              {{ loading ? 'Consulting the Stars...' : 'Calculate Compatibility' }}
            </button>
          </div>
        </div>
        
        <!-- Results -->
        <div v-if="result" class="space-y-6">
          <!-- Score Display -->
          <div class="text-center">
            <GlowCard class="inline-block">
              <div class="text-center space-y-4 px-8 py-6">
                <div class="text-6xl font-heading font-extrabold gradient-text">
                  {{ result.score }}%
                </div>
                <h2 class="font-heading font-bold text-2xl text-text-base">
                  Compatibility Score
                </h2>
                <p class="text-text-muted">
                  {{ getScoreDescription(result.score) }}
                </p>
              </div>
            </GlowCard>
          </div>
          
          <!-- Summary -->
          <div class="glass-surface rounded-2xl p-6 lg:p-8">
            <h3 class="font-heading font-bold text-xl text-text-base mb-4">Cosmic Analysis</h3>
            <p class="text-lg text-text-base leading-relaxed">
              {{ result.summary }}
            </p>
          </div>
          
          <!-- Strengths & Challenges -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Strengths -->
            <div class="glass-surface rounded-2xl p-6">
              <h3 class="font-heading font-bold text-lg text-text-base mb-4 flex items-center gap-2">
                <component :is="SparklesIcon" :size="20" class="text-aurora-teal" />
                Cosmic Strengths
              </h3>
              <ul class="space-y-2">
                <li 
                  v-for="strength in result.strengths" 
                  :key="strength"
                  class="flex items-start gap-2 text-text-muted"
                >
                  <div class="w-1.5 h-1.5 bg-aurora-teal rounded-full mt-2 flex-shrink-0"></div>
                  {{ strength }}
                </li>
              </ul>
            </div>
            
            <!-- Challenges -->
            <div class="glass-surface rounded-2xl p-6">
              <h3 class="font-heading font-bold text-lg text-text-base mb-4 flex items-center gap-2">
                <component :is="TargetIcon" :size="20" class="text-rose" />
                Growth Areas
              </h3>
              <ul class="space-y-2">
                <li 
                  v-for="challenge in result.challenges" 
                  :key="challenge"
                  class="flex items-start gap-2 text-text-muted"
                >
                  <div class="w-1.5 h-1.5 bg-rose rounded-full mt-2 flex-shrink-0"></div>
                  {{ challenge }}
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Advice -->
          <div class="glass-surface rounded-2xl p-6 lg:p-8">
            <h3 class="font-heading font-bold text-xl text-text-base mb-4 flex items-center gap-2">
              <component :is="CrownIcon" :size="20" class="text-violet" />
              Celestial Guidance
            </h3>
            <p class="text-lg text-text-base leading-relaxed">
              {{ result.advice }}
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { calculate, loading, error } = useCompatibility()

const SparklesIcon = resolveComponent('IconSparkles')
const CrownIcon = resolveComponent('IconCrown')
const GemIcon = resolveComponent('IconGem')
const TargetIcon = resolveComponent('IconTarget')

const person1 = reactive({
  name: '',
  birthDate: '',
  birthTime: '',
  birthPlace: ''
})

const person2 = reactive({
  name: '',
  birthDate: '',
  birthTime: '',
  birthPlace: ''
})

const result = ref(null)

const canCalculate = computed(() => {
  return person1.name && person1.birthDate && person2.name && person2.birthDate
})

const calculateCompatibility = async () => {
  if (!canCalculate.value) return
  
  try {
    result.value = await calculate(person1.birthDate, person2.birthDate)
  } catch (err) {
    console.error('Compatibility calculation failed:', err)
  }
}

const getScoreDescription = (score: number) => {
  if (score >= 90) return 'Cosmic Soulmates ✨'
  if (score >= 80) return 'Celestial Harmony 🌟'
  if (score >= 70) return 'Stellar Connection ⭐'
  if (score >= 60) return 'Promising Alliance 🌙'
  return 'Growth Opportunity 🌱'
}

// SEO
useHead({
  title: 'Compatibility Analysis - Cosmic Connections',
  meta: [
    { name: 'description', content: 'Discover your cosmic compatibility through detailed astrological synastry analysis. Explore how your energies align.' },
    { name: 'keywords', content: 'compatibility, synastry, relationship astrology, cosmic connection, birth chart compatibility' }
  ]
})
</script>