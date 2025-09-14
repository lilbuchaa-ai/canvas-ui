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
    <path d="M16 11c0 2.5-2.5 5-5 5s-5-2.5-5-5"/>
    <path d="M12 2v14"/>
    <path d="m8 8-4.5-1.5L2 10l1.5 3.5L8 12"/>
    <path d="m16 8 4.5-1.5L22 10l-1.5 3.5L16 12"/>
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