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
            Tarot Wisdom
          </h1>
          <p class="text-xl text-text-muted max-w-2xl mx-auto">
            Connect with ancient wisdom through the mystical art of tarot. Let the cards reveal insights into your path.
          </p>
        </div>
        
        <!-- Tabs -->
        <div class="flex justify-center mb-8">
          <div class="glass-surface rounded-2xl p-2 flex gap-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 focus-cosmic',
                activeTab === tab.id
                  ? 'bg-gradient-cosmic text-white'
                  : 'text-text-muted hover:text-text-base hover:bg-surface'
              ]"
            >
              {{ tab.name }}
            </button>
          </div>
        </div>
        
        <!-- Daily Tab -->
        <div v-if="activeTab === 'daily'" class="space-y-6">
          <div class="text-center mb-8">
            <h2 class="font-heading font-bold text-2xl text-text-base mb-4">Daily Guidance</h2>
            <p class="text-text-muted">Your cosmic guidance for today</p>
          </div>
          
          <!-- Loading -->
          <div v-if="dailyLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="i in 3" :key="i" class="h-96 bg-surface rounded-2xl animate-pulse"></div>
          </div>
          
          <!-- Error -->
          <div v-else-if="dailyError" class="text-center py-12">
            <div class="w-16 h-16 bg-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <component :is="AlertIcon" :size="32" class="text-rose" />
            </div>
            <h3 class="font-heading font-bold text-lg text-text-base mb-2">
              Unable to Draw Cards
            </h3>
            <p class="text-text-muted mb-4">The cosmic energies are unclear. Please try again.</p>
            <button @click="refreshDaily" class="btn-cosmic">Retry</button>
          </div>
          
          <!-- Daily cards -->
          <div v-else-if="dailyCards" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              v-for="(card, index) in dailyCards" 
              :key="index"
              class="group glass-surface glass-hover rounded-2xl p-6 text-center transform-gpu transition-all duration-300 hover:scale-105 hover:glow-violet"
            >
              <div class="aspect-[2/3] mb-4 rounded-xl overflow-hidden bg-surface border border-violet/20">
                <img 
                  v-if="card.img_url"
                  :src="card.img_url" 
                  :alt="card.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <component :is="GemIcon" :size="48" class="text-violet opacity-50" />
                </div>
              </div>
              
              <h3 class="font-heading font-bold text-lg text-text-base mb-2">
                {{ card.name }}
              </h3>
              
              <p v-if="card.arcana" class="text-starlight text-sm mb-3">
                {{ card.arcana }} • {{ card.orientation }}
              </p>
              
              <p class="text-text-muted text-sm leading-relaxed mb-4">
                {{ card.fortune_telling?.[0] || card.meanings?.[0] || 'Cosmic wisdom flows through this card.' }}
              </p>
              
              <p v-if="card.affirmation" class="text-aurora-teal text-xs font-medium italic">
                "{{ card.affirmation }}"
              </p>
            </div>
          </div>
        </div>
        
        <!-- Draw Tab -->
        <div v-if="activeTab === 'draw'" class="space-y-6">
          <div class="text-center mb-8">
            <h2 class="font-heading font-bold text-2xl text-text-base mb-4">Custom Draw</h2>
            <p class="text-text-muted">Draw cards to answer your questions</p>
          </div>
          
          <!-- Draw controls -->
          <div class="text-center mb-8">
            <div class="flex justify-center gap-4 mb-6">
              <button
                v-for="count in [3, 5, 10]"
                :key="count"
                @click="drawCount = count"
                :class="[
                  'px-6 py-3 rounded-xl font-medium transition-all duration-200 focus-cosmic',
                  drawCount === count
                    ? 'bg-gradient-cosmic text-white'
                    : 'glass-surface glass-hover text-text-muted hover:text-text-base'
                ]"
              >
                {{ count }} Cards
              </button>
            </div>
            
            <button 
              @click="drawCards"
              :disabled="drawLoading"
              class="btn-cosmic"
            >
              <component :is="SparklesIcon" :size="18" class="mr-2" />
              {{ drawLoading ? 'Drawing...' : 'Draw Cards' }}
            </button>
          </div>
          
          <!-- Loading -->
          <div v-if="drawLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="i in drawCount" :key="i" class="h-96 bg-surface rounded-2xl animate-pulse"></div>
          </div>
          
          <!-- Drawn cards -->
          <div v-else-if="drawnCards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="(card, index) in drawnCards" 
              :key="index"
              class="group glass-surface glass-hover rounded-2xl p-6 text-center transform-gpu transition-all duration-300 hover:scale-105 hover:glow-violet"
            >
              <div class="aspect-[2/3] mb-4 rounded-xl overflow-hidden bg-surface border border-violet/20">
                <img 
                  v-if="card.img_url"
                  :src="card.img_url" 
                  :alt="card.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <component :is="GemIcon" :size="48" class="text-violet opacity-50" />
                </div>
              </div>
              
              <h3 class="font-heading font-bold text-lg text-text-base mb-2">
                {{ card.name }}
              </h3>
              
              <p v-if="card.arcana" class="text-starlight text-sm mb-3">
                {{ card.arcana }} • {{ card.orientation }}
              </p>
              
              <p class="text-text-muted text-sm leading-relaxed">
                {{ card.fortune_telling?.[0] || card.meanings?.[0] || 'Cosmic wisdom flows through this card.' }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Personal Tab -->
        <div v-if="activeTab === 'personal'" class="space-y-6">
          <div class="text-center mb-8">
            <h2 class="font-heading font-bold text-2xl text-text-base mb-4">Personal Reading</h2>
            <p class="text-text-muted">Get a personalized tarot reading tailored to your question</p>
          </div>
          
          <!-- Personal form -->
          <div class="glass-surface rounded-2xl p-6 lg:p-8 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-text-muted mb-3">Your Name</label>
                <input 
                  v-model="personalForm.name"
                  type="text" 
                  placeholder="Enter your name"
                  class="w-full px-4 py-3 glass-surface rounded-lg text-text-base focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-text-muted mb-3">Spread Type</label>
                <select 
                  v-model="personalForm.spread_type"
                  class="w-full px-4 py-3 glass-surface rounded-lg text-text-base focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200"
                >
                  <option value="three_card">Three Card Spread</option>
                  <option value="celtic_cross">Celtic Cross</option>
                  <option value="love_spread">Love & Relationships</option>
                  <option value="career_spread">Career Path</option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-text-muted mb-3">Your Question</label>
              <textarea 
                v-model="personalForm.question"
                placeholder="What would you like guidance on?"
                rows="3"
                class="w-full px-4 py-3 glass-surface rounded-lg text-text-base focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-colors duration-200 resize-none"
              ></textarea>
            </div>
            
            <div class="text-center">
              <button 
                @click="getPersonalReading"
                :disabled="personalLoading || !personalForm.name || !personalForm.question"
                class="btn-cosmic"
              >
                <component :is="SparklesIcon" :size="18" class="mr-2" />
                {{ personalLoading ? 'Consulting the Cards...' : 'Get Personal Reading' }}
              </button>
            </div>
          </div>
          
          <!-- Personal reading result -->
          <div v-if="personalReading" class="glass-surface rounded-2xl p-6 lg:p-8 space-y-6">
            <div class="text-center">
              <h3 class="font-heading font-bold text-xl text-text-base mb-2">
                Your Personal Reading
              </h3>
              <p class="text-starlight text-sm">{{ personalForm.spread_type.replace('_', ' ').toUpperCase() }}</p>
            </div>
            
            <div class="prose prose-invert max-w-none">
              <p class="text-lg text-text-base leading-relaxed">
                {{ personalReading.overview }}
              </p>
            </div>
            
            <!-- Cards in spread -->
            <div v-if="personalReading.spread" class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                v-for="(card, index) in personalReading.spread" 
                :key="index"
                class="glass-surface rounded-xl p-4 text-center"
              >
                <div class="w-16 h-24 mx-auto mb-3 bg-gradient-cosmic rounded-lg flex items-center justify-center">
                  <component :is="GemIcon" :size="20" class="text-white" />
                </div>
                <h4 class="font-medium text-text-base text-sm">{{ card.position || `Card ${index + 1}` }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { TarotResponse, TarotPersonalResponse } from '~/types/api'

const { getTarotDaily, drawTarot, postTarotPersonal } = useApi()
const SparklesIcon = resolveComponent('IconSparkles')
const GemIcon = resolveComponent('IconGem')
const AlertIcon = resolveComponent('IconTarget')

const activeTab = ref('daily')
const drawCount = ref(3)

const tabs = [
  { id: 'daily', name: 'Daily' },
  { id: 'draw', name: 'Draw' },
  { id: 'personal', name: 'Personal' }
]

// Personal form
const personalForm = reactive({
  name: '',
  question: '',
  spread_type: 'three_card',
  cards_count: 3,
  context: ''
})

// Daily cards
const { 
  data: dailyCards, 
  pending: dailyLoading, 
  error: dailyError,
  refresh: refreshDaily
} = await useLazyFetch(() => getTarotDaily(), {
  default: () => null,
  server: false
})

// Draw cards
const drawnCards = ref<TarotResponse[] | null>(null)
const drawLoading = ref(false)

const drawCards = async () => {
  drawLoading.value = true
  try {
    drawnCards.value = await drawTarot(drawCount.value)
  } catch (error) {
    console.error('Failed to draw cards:', error)
  } finally {
    drawLoading.value = false
  }
}

// Personal reading
const personalReading = ref<TarotPersonalResponse | null>(null)
const personalLoading = ref(false)

const getPersonalReading = async () => {
  personalLoading.value = true
  try {
    personalReading.value = await postTarotPersonal(personalForm)
  } catch (error) {
    console.error('Failed to get personal reading:', error)
  } finally {
    personalLoading.value = false
  }
}

// SEO
useHead({
  title: 'Tarot Readings - Mystical Card Wisdom',
  meta: [
    { name: 'description', content: 'Discover mystical insights through tarot card readings. Daily guidance, custom draws, and personalized readings.' },
    { name: 'keywords', content: 'tarot, tarot cards, card reading, mystical, divination, spiritual guidance' }
  ]
})
</script>

<style scoped>
.hover\\:glow-violet:hover {
  box-shadow: var(--glow-violet);
}
</style>