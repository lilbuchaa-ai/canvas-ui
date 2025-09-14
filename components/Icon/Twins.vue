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
    <path d="M9 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0"/>
    <path d="M23 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0"/>
    <path d="M12 9V7a2 2 0 0 1 4 0"/>
    <path d="M8 21V9"/>
    <path d="M16 21V9"/>
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