<template>
  <div class="relative" :class="className">
    <!-- Outer orbital ring -->
    <div 
      class="absolute inset-0 rounded-full border border-violet/30 orbit-ring"
      :style="{
        width: 'calc(100% + 16px)',
        height: 'calc(100% + 16px)',
        left: '-8px',
        top: '-8px',
      }"
    >
      <!-- Orbital dot -->
      <div class="absolute w-1 h-1 bg-gradient-to-r from-violet to-magenta rounded-full shadow-glow-violet -top-0.5 left-1/2 transform -translate-x-1/2" />
    </div>
    
    <!-- Icon container -->
    <div :class="iconContainerClasses">
      <component 
        :is="iconComponent" 
        :size="iconSizes[size]" 
        class="text-text-base group-hover:text-violet transition-colors duration-200" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  iconName: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  className: ''
})

// Import icons dynamically
const iconComponent = computed(() => {
  // Map icon names to actual icon components
  const iconMap: Record<string, any> = {
    Flame: resolveComponent('IconFlame'),
    Gem: resolveComponent('IconGem'),
    Twins: resolveComponent('IconTwins'),
    Shell: resolveComponent('IconShell'),
    Crown: resolveComponent('IconCrown'),
    Scales: resolveComponent('IconScales'),
    Zap: resolveComponent('IconZap'),
    Target: resolveComponent('IconTarget'),
    Shield: resolveComponent('IconShield'),
    Wind: resolveComponent('IconWind'),
    Droplet: resolveComponent('IconDroplet'),
    Sparkles: resolveComponent('IconSparkles')
  }
  
  return iconMap[props.iconName] || resolveComponent('IconSparkles')
})

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14', 
  lg: 'w-16 h-16'
}

const iconSizes = {
  sm: 20,
  md: 24,
  lg: 28
}

const iconContainerClasses = computed(() => [
  sizeClasses[props.size],
  'relative flex items-center justify-center',
  'glass-surface glass-hover rounded-full',
  'transform-gpu transition-all duration-200 ease-cosmic',
  'group-hover:scale-110 group-hover:shadow-glow-violet'
])
</script>