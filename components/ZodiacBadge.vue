<template>
  <div 
    class="group relative p-6 glass-surface rounded-2xl tilt-hover shimmer transform-gpu transition-all duration-200 ease-cosmic hover:glow-violet opacity-0 translate-y-8"
    :class="{ 'animate-fade-in-up': isVisible }"
    :style="{ animationDelay: `${delay}ms` }"
  >
    <!-- Gradient border overlay -->
    <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
         style="background: var(--gradient-accent); padding: 1px;">
      <div class="w-full h-full bg-bg-950 rounded-2xl"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10 text-center space-y-4">
      <!-- Orbit Icon -->
      <div class="flex justify-center">
        <OrbitIcon :iconName="iconName" size="md" />
      </div>
      
      <!-- Badge Info -->
      <div>
        <h3 class="font-heading font-bold text-lg text-text-base mb-1">
          {{ name }}
        </h3>
        <p class="text-starlight text-sm font-medium mb-3">
          {{ dateRange }}
        </p>
        <p class="text-text-muted text-sm leading-relaxed">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  dateRange: string
  iconName: string
  description: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0
})

const isVisible = ref(false)
const badgeRef = ref<HTMLElement>()

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.1 }
  )

  if (badgeRef.value) {
    observer.observe(badgeRef.value)
  }

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}
</style>