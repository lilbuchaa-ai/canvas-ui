<template>
  <div 
    class="relative group"
    :class="className"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Glow effect background -->
    <div 
      class="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300"
      :class="glowClasses"
    />
    
    <!-- Card surface -->
    <div class="relative glass-surface rounded-2xl transform-gpu transition-all duration-200 ease-cosmic"
         :class="{ 'hover:scale-[1.02]': hover3d }">
      <!-- Gradient border overlay -->
      <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
           style="background: var(--gradient-accent); padding: 1px;">
        <div class="w-full h-full bg-surface rounded-2xl"></div>
      </div>
      
      <!-- Shimmer overlay -->
      <div class="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div class="shimmer w-full h-full"></div>
      </div>
      
      <!-- Content -->
      <div class="relative z-10 p-8">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  className?: string
  glowIntensity?: 'low' | 'medium' | 'high'
  hover3d?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  glowIntensity: 'medium',
  hover3d: true
})

const glowClasses = computed(() => {
  const intensityMap = {
    low: 'bg-violet/20',
    medium: 'bg-gradient-to-r from-violet/30 to-magenta/30',
    high: 'bg-gradient-to-r from-violet/50 to-magenta/50'
  }
  return intensityMap[props.glowIntensity]
})

const handleMouseEnter = () => {
  // Optional: Add any mouse enter logic here
}

const handleMouseLeave = () => {
  // Optional: Add any mouse leave logic here
}
</script>