interface UseCarouselOptions {
  itemCount: number
  autoplayDelay?: number
  pauseOnHover?: boolean
  startIndex?: number
}

export const useCarousel = (options: UseCarouselOptions) => {
  const { itemCount, autoplayDelay = 4000, pauseOnHover = true, startIndex = 0 } = options
  
  const currentIndex = ref(startIndex)
  const isPlaying = ref(true)
  const isPaused = ref(false)
  let autoplayTimer: ReturnType<typeof setInterval> | null = null
  let resumeTimer: ReturnType<typeof setTimeout> | null = null

  const next = () => {
    currentIndex.value = (currentIndex.value + 1) % itemCount
    restartAutoplay()
  }

  const prev = () => {
    currentIndex.value = (currentIndex.value - 1 + itemCount) % itemCount
    restartAutoplay()
  }

  const goTo = (index: number) => {
    if (index >= 0 && index < itemCount) {
      currentIndex.value = index
      restartAutoplay()
    }
  }

  const startAutoplay = () => {
    if (!isPlaying.value || isPaused.value) return
    
    stopAutoplay()
    autoplayTimer = setInterval(() => {
      if (!isPaused.value) {
        next()
      }
    }, autoplayDelay)
  }

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer)
      autoplayTimer = null
    }
    if (resumeTimer) {
      clearTimeout(resumeTimer)
      resumeTimer = null
    }
  }

  const restartAutoplay = () => {
    if (isPlaying.value) {
      stopAutoplay()
      startAutoplay()
    }
  }

  const pause = () => {
    if (!pauseOnHover) return
    isPaused.value = true
    if (resumeTimer) {
      clearTimeout(resumeTimer)
    }
  }

  const resume = () => {
    if (!pauseOnHover) return
    resumeTimer = setTimeout(() => {
      isPaused.value = false
    }, 2000)
  }

  onMounted(() => {
    startAutoplay()
  })

  onUnmounted(() => {
    stopAutoplay()
  })

  return {
    currentIndex: readonly(currentIndex),
    isPlaying: readonly(isPlaying),
    next,
    prev,
    goTo,
    startAutoplay,
    stopAutoplay,
    pause,
    resume
  }
}