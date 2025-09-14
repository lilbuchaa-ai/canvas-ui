<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    v-bind="$attrs"
  >
    <path d="M6 3h12l4 6-10 13L2 9Z"/>
    <path d="M11 3 8 9l4 13 4-13-3-6"/>
    <path d="M2 9h20"/>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number
}

withDefaults(defineProps<Props>(), {
  size: 24
})
</script>