<template>
  <footer class="border-t border-white/10 mt-32">
    <div class="container mx-auto px-6 py-16">
      <div class="text-center space-y-8">
        <!-- Logo -->
        <div class="flex justify-center">
          <NuxtLink 
            to="/" 
            class="flex items-center space-x-2 font-heading font-bold text-2xl text-white hover:text-starlight transition-colors duration-200"
          >
            <div class="relative">
              <IconSparkles :size="28" class="text-starlight animate-pulse" />
              <div class="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-violet to-magenta rounded-full animate-ping"></div>
            </div>
            <span class="gradient-text">Cosmic</span>
          </NuxtLink>
        </div>
        
        <!-- Navigation Links -->
        <nav class="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.name"
            :to="item.href"
            class="text-text-muted hover:text-starlight transition-colors duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starlight focus-visible:ring-offset-2 focus-visible:ring-offset-bg-950 rounded-md px-2 py-1"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
        
        <!-- Copyright -->
        <div class="text-text-muted text-sm">
          <p>&copy; {{ currentYear }} Cosmic Astrology. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import IconSparkles from '~/components/Icon/Sparkles.vue'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Astro', href: '/astro' },
  { name: 'Tarot', href: '/tarot' },
  { name: 'Compatibility', href: '/compat' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' }
]

const currentYear = new Date().getFullYear()
</script>