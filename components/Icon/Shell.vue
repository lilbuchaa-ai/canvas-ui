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
    <path d="M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0c0 1-1 2-2 2h-4"/>
    <path d="M12 2c7.2 0 13 5.8 13 13s-5.8 13-13 13S-1 22.2-1 15 4.8 2 12 2"/>
    <path d="M12 2v3"/>
    <path d="M12 18v3"/>
    <path d="M4.9 4.9l2.1 2.1"/>
    <path d="M16.9 16.9l2.1 2.1"/>
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