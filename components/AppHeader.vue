<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
    :class="{ 'py-4': !isScrolled, 'py-2': isScrolled }"
  >
    <div class="container mx-auto px-4">
      <nav class="glass-surface glass-hover rounded-full px-6 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="relative">
              <!-- Animated stars around logo -->
              <div class="absolute -inset-2">
                <div class="w-1 h-1 bg-starlight rounded-full absolute top-0 left-0 animate-pulse"></div>
                <div class="w-0.5 h-0.5 bg-violet rounded-full absolute top-1 right-0 animate-pulse" style="animation-delay: 0.5s;"></div>
                <div class="w-0.5 h-0.5 bg-magenta rounded-full absolute bottom-0 left-1 animate-pulse" style="animation-delay: 1s;"></div>
              </div>
              <component :is="SparklesIcon" :size="28" class="text-violet group-hover:text-magenta transition-colors duration-200" />
            </div>
            <span class="font-heading font-bold text-xl text-text-base">Cosmic</span>
          </NuxtLink>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            <NuxtLink 
              v-for="item in navItems"
              :key="item.name"
              :to="item.href"
              class="relative text-text-muted hover:text-text-base transition-colors duration-200 py-2"
            >
              {{ item.name }}
              <!-- Active indicator -->
              <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet to-magenta scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
            </NuxtLink>
          </div>
          
          <!-- CTA Button (Desktop) -->
          <button class="hidden md:block cta-button px-6 py-2.5 rounded-full font-medium text-white focus-cosmic">
            Get Reading
          </button>
          
          <!-- Mobile Menu Toggle -->
          <button 
            @click="toggleMenu"
            class="md:hidden p-2 text-text-base hover:text-violet transition-colors duration-200 focus-cosmic"
          >
            <component :is="isMenuOpen ? CloseIcon : MenuIcon" :size="24" />
          </button>
        </div>
      </nav>
    </div>
    
    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-cosmic"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-cosmic"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMenuOpen" class="md:hidden mt-4 mx-4">
        <div class="glass-surface rounded-2xl p-6 space-y-4">
          <NuxtLink 
            v-for="item in navItems"
            :key="item.name"
            :to="item.href"
            @click="closeMenu"
            class="block text-text-muted hover:text-text-base transition-colors duration-200 py-2 text-lg"
          >
            {{ item.name }}
          </NuxtLink>
          <hr class="border-white/10">
          <button 
            @click="closeMenu"
            class="w-full cta-button px-6 py-3 rounded-full font-medium text-white focus-cosmic"
          >
            Get Reading
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const SparklesIcon = resolveComponent('IconSparkles')
const MenuIcon = resolveComponent('IconMenu')
const CloseIcon = resolveComponent('IconX')

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
  { name: 'Readings', href: '#readings' },
  { name: 'About', href: '#about' },
  { name: 'Zodiac', href: '#zodiac' },
  { name: 'Services', href: '#services' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>