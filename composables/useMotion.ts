export const useMotion = () => {
  const reduced = ref(false)

  onMounted(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = mediaQuery.matches

    const handleChange = (e: MediaQueryListEvent) => {
      reduced.value = e.matches
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    // Cleanup
    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handleChange)
    })
  })

  return {
    reduced: readonly(reduced)
  }
}