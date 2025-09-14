<template>
  <div class="text-center max-w-3xl mx-auto space-y-4" :class="className">
    <p v-if="subtitle" class="text-starlight font-medium text-sm uppercase tracking-wide">
      {{ subtitle }}
    </p>
    
    <h2 :class="titleClasses">
      {{ title }}
    </h2>
    
    <p v-if="description" class="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
      {{ description }}
    </p>
    
    <div v-if="$slots.default">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  description?: string
  className?: string
  titleGradient?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  titleGradient: false
})

const titleClasses = computed(() => [
  'font-heading font-bold',
  props.titleGradient ? 'gradient-text' : 'text-text-base'
])
</script>