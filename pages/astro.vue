<template>
  <div class="min-h-screen bg-gradient-subtle">
    <!-- Background -->
    <StarfieldCanvas />
    
    <!-- Header -->
    <AppHeader />
    
    <!-- Main Content -->
    <main class="relative pt-24 pb-12 px-4" style="z-index: 10;">
      <div class="container mx-auto max-w-7xl">
        <!-- Page Header -->
        <div class="text-center mb-12">
          <h1 class="font-heading font-extrabold gradient-text mb-4">
            Cosmic Horoscope
          </h1>
          <p class="text-xl text-text-muted max-w-2xl mx-auto">
            Discover your personalized celestial guidance based on your zodiac sign, timeframe, and cosmic alignments.
          </p>
        </div>
        
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Left Sidebar - Signs -->
          <aside class="lg:w-64 flex-shrink-0">
            <div class="glass-surface rounded-2xl p-6 sticky top-32">
              <h2 class="font-heading font-bold text-lg text-text-base mb-4">Zodiac Signs</h2>
              
              <!-- Loading skeleton -->
              <div v-if="signsLoading" class="space-y-2">
                <div v-for="i in 12" :key="i" class="h-10 bg-surface rounded-lg animate-pulse"></div>
              </div>
              
              <!-- Error state -->
              <div v-else-if="signsError" class="text-center py-8">
                <p class="text-rose text-sm mb-2">Failed to load signs</p>
                <button @click="refreshSigns" class="text-violet hover:text-aurora-teal text-sm">
                  Try Again
                </button>
              </div>
              
              <!-- Signs list -->
              <nav v-else class="space-y-1">
                <button
                  v-for="sign in signs"
                  :key="sign"
                  @click="selectedSign = sign"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-all duration-200 focus-cosmic',
                    selectedSign === sign 
                      ? 'bg-violet/20 text-violet border border-violet/30' 
                      : 'text-text-muted hover:text-text-base hover:bg-surface'
                  ]"
                >
                  {{ sign }}
                </button>
              </nav>
            </div>
          </aside>
          
          <!-- Main Panel -->
          <div class="flex-1 space-y-6">
            <!-- Filters -->
            <div class="glass-surface rounded-2xl p-6">
              <div class="flex flex-col lg:flex-row gap-6">
                <!-- Period tabs -->
                <div class="flex-1">
                  <label class="block text-sm font-medium text-text-muted mb-3">Time Period</label>
                  
                  <!-- Loading skeleton -->
                  <div v-if="periodsLoading" class="flex gap-2">
                    <div v-for="i in 4" :key="i" class="h-10 w-20 bg-surface rounded-lg animate-pulse"></div>
                  </div>
                  
                  <!-- Period tabs -->
                  <div v-else class="flex flex-wrap gap-2">
                    <button
                      v-for="period in periods"
                      :key="period"
                      @click="selectedPeriod = period"
                      :class="[
                        'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 focus-cosmic capitalize',
                        selectedPeriod === period
                          ? 'bg-gradient-cosmic text-white'
                          : 'bg-surface text-text-muted hover:text-text-base hover:bg-violet/10'
                      ]"
                    >
                      {{ period }}
                    </button>
                  </div>
                </div>
                
                <!-- Date picker -->
                <div class="flex-1 lg:max-w-xs">
                  <label class="block text-sm font-medium text-text-muted mb-3">Date (Optional)</label>
                  <input 
                    v-model="selectedDate"
                    type="date" 
                    class="w-full px-4 py-2 glass-surface rounded-lg text-text-base focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
            
            <!-- Horoscope Display -->
            <div class="glass-surface rounded-2xl p-6 lg:p-8">
              <!-- Loading skeleton -->
              <div v-if="horoscopeLoading" class="space-y-4">
                <div class="h-8 bg-surface rounded-lg animate-pulse w-3/4"></div>
                <div class="space-y-2">
                  <div v-for="i in 5" :key="i" class="h-4 bg-surface rounded animate-pulse"></div>
                </div>
              </div>
              
              <!-- Error state -->
              <div v-else-if="horoscopeError" class="text-center py-12">
                <div class="w-16 h-16 bg-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <component :is="AlertCircleIcon" :size="32" class="text-rose" />
                </div>
                <h3 class="font-heading font-bold text-lg text-text-base mb-2">
                  Unable to Load Horoscope
                </h3>
                <p class="text-text-muted mb-4">
                  There was an issue fetching your cosmic guidance. Please try again.
                </p>
                <button 
                  @click="fetchHoroscope"
                  class="btn-cosmic"
                >
                  Retry
                </button>
              </div>
              
              <!-- Empty state -->
              <div v-else-if="!horoscope" class="text-center py-12">
                <div class="w-16 h-16 bg-violet/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <component :is="SparklesIcon" :size="32" class="text-violet" />
                </div>
                <h3 class="font-heading font-bold text-lg text-text-base mb-2">
                  Select Your Sign
                </h3>
                <p class="text-text-muted">
                  Choose your zodiac sign to reveal personalized cosmic insights.
                </p>
              </div>
              
              <!-- Horoscope content -->
              <div v-else class="space-y-6">
                <div class="flex items-center justify-between">
                  <h2 class="font-heading font-bold text-2xl text-text-base">
                    {{ horoscope.sign }} - {{ capitalizedPeriod }}
                  </h2>
                  <div class="text-sm text-text-muted">
                    {{ formatDate(horoscope.date) }}
                  </div>
                </div>
                
                <div class="prose prose-invert max-w-none">
                  <p class="text-lg text-text-base leading-relaxed">
                    {{ horoscope.message }}
                  </p>
                </div>
                
                <!-- Action buttons -->
                <div class="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                  <button 
                    @click="fetchHoroscope"
                    class="btn-cosmic"
                  >
                    <component :is="RefreshIcon" :size="18" class="mr-2" />
                    Refresh Reading
                  </button>
                  
                  <NuxtLink 
                    to="/tarot"
                    class="px-6 py-3 glass-surface glass-hover rounded-full text-text-base hover:text-violet transition-colors duration-200 text-center focus-cosmic"
                  >
                    Get Tarot Reading
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { getSigns, getPeriods, getHoroscope } = useApi()
const SparklesIcon = resolveComponent('IconSparkles')
const RefreshIcon = resolveComponent('IconSparkles') // Using sparkles as refresh
const AlertCircleIcon = resolveComponent('IconTarget') // Using target as alert

// Reactive state
const selectedSign = ref('')
const selectedPeriod = ref('daily')
const selectedDate = ref('')

// Data fetching
const { 
  data: signs, 
  pending: signsLoading, 
  error: signsError,
  refresh: refreshSigns 
} = await useLazyFetch(() => getSigns(), {
  default: () => [],
  server: false
})

const { 
  data: periods, 
  pending: periodsLoading 
} = await useLazyFetch(() => getPeriods(), {
  default: () => ['daily', 'weekly', 'monthly'],
  server: false
})

const { 
  data: horoscope, 
  pending: horoscopeLoading,
  error: horoscopeError,
  execute: fetchHoroscope
} = await useLazyFetch(() => {
  if (!selectedSign.value || !selectedPeriod.value) return null
  return getHoroscope(selectedPeriod.value, selectedSign.value.toLowerCase(), selectedDate.value || undefined)
}, {
  default: () => null,
  server: false,
  watch: [selectedSign, selectedPeriod, selectedDate]
})

// Computed
const capitalizedPeriod = computed(() => {
  return selectedPeriod.value.charAt(0).toUpperCase() + selectedPeriod.value.slice(1)
})

// Utilities
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  })
}

// Initialize from query params
onMounted(() => {
  const route = useRoute()
  if (route.query.sign) {
    selectedSign.value = String(route.query.sign)
  }
})

// SEO
useHead({
  title: 'Astrology & Horoscope - Cosmic Guidance',
  meta: [
    { name: 'description', content: 'Get personalized horoscope readings and astrological insights based on your zodiac sign.' },
    { name: 'keywords', content: 'horoscope, astrology, zodiac signs, daily horoscope, cosmic guidance' }
  ]
})
</script>