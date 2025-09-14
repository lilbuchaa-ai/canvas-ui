<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 w-full h-full pointer-events-none"
    :style="{ zIndex: 1 }"
  />
</template>

<script setup lang="ts">
interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

const canvasRef = ref<HTMLCanvasElement>()
const { reduced: prefersReducedMotion } = useMotion()

let stars: Star[] = []
let animationId: number

const generateStars = (width: number, height: number) => {
  const starCount = Math.floor((width * height) / 15000)
  stars = []
  
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.8 + 0.2
    })
  }
}

const animate = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.clearRect(0, 0, width, height)
  
  stars.forEach(star => {
    // Create subtle glow
    const gradient = ctx.createRadialGradient(
      star.x, star.y, 0,
      star.x, star.y, star.size * 3
    )
    gradient.addColorStop(0, `rgba(236, 238, 247, ${star.opacity})`)
    gradient.addColorStop(1, 'rgba(236, 238, 247, 0)')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
    ctx.fill()
    
    // Update position for subtle drift
    if (!prefersReducedMotion.value) {
      star.x -= star.speed
      
      // Reset star position when it goes off screen
      if (star.x < -star.size) {
        star.x = width + star.size
        star.y = Math.random() * height
      }
    }
  })
  
  animationId = requestAnimationFrame(() => animate(ctx, width, height))
}

const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const { innerWidth, innerHeight } = window
  canvas.width = innerWidth
  canvas.height = innerHeight
  
  generateStars(innerWidth, innerHeight)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  handleResize()
  animate(ctx, canvas.width, canvas.height)
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>