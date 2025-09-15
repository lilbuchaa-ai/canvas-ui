<template>
  <div class="fixed inset-0 pointer-events-none" style="z-index: 1;">
    <!-- Layer A: CSS Starfield -->
    <div class="absolute inset-0 opacity-40" :class="{ 'hidden': motionReduced }">
      <div class="starfield-layer-1"></div>
      <div class="starfield-layer-2"></div>
      <div class="starfield-layer-3"></div>
    </div>
    
    <!-- Layer B: Canvas Drift Dots -->
    <canvas
      ref="canvas"
      class="absolute top-0 left-0 w-full h-full opacity-60"
      :class="{ 'hidden': motionReduced }"
    />
    
    <!-- Layer C: Nebula -->
    <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-96 opacity-20">
      <div class="absolute inset-0 bg-gradient-nebula blur-3xl"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { reduced: motionReduced } = useMotion()

interface DriftDot {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  size: number
  hue: number
}

const canvas = ref<HTMLCanvasElement>()
const dots: DriftDot[] = []
const animationId = ref<number>()

const createDots = (width: number, height: number) => {
  dots.length = 0
  const numDots = Math.floor((width * height) / 15000) // Sparser than before
  
  for (let i = 0; i < numDots; i++) {
    dots.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.1, // Slower drift
      vy: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.4 + 0.1, // More subtle
      size: Math.random() * 1 + 0.3,
      hue: Math.random() * 60 + 240 // Blue to purple range
    })
  }
}

const animate = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  if (motionReduced.value) return
  
  ctx.clearRect(0, 0, width, height)
  
  dots.forEach(dot => {
    dot.x += dot.vx
    dot.y += dot.vy
    
    // Wrap around edges
    if (dot.x < -10) dot.x = width + 10
    if (dot.x > width + 10) dot.x = -10
    if (dot.y < -10) dot.y = height + 10
    if (dot.y > height + 10) dot.y = -10
    
    // Draw with subtle glow
    ctx.fillStyle = `hsla(${dot.hue}, 70%, 70%, ${dot.opacity})`
    ctx.shadowColor = `hsla(${dot.hue}, 70%, 70%, 0.5)`
    ctx.shadowBlur = dot.size * 2
    ctx.beginPath()
    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0
  })
  
  animationId.value = requestAnimationFrame(() => animate(ctx, width, height))
}

const initCanvas = () => {
  if (!canvas.value || motionReduced.value) return
  
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return
  
  const resizeCanvas = () => {
    if (!canvas.value) return
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
    createDots(canvas.value.width, canvas.value.height)
  }
  
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  
  animate(ctx, canvas.value.width, canvas.value.height)
  
  onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas)
    if (animationId.value) {
      cancelAnimationFrame(animationId.value)
    }
  })
}

onMounted(() => {
  if (!motionReduced.value) {
    initCanvas()
  }
})

watch(motionReduced, (newVal) => {
  if (newVal && animationId.value) {
    cancelAnimationFrame(animationId.value)
  } else if (!newVal) {
    initCanvas()
  }
})
</script>

<style scoped>
/* CSS Starfield Layers */
.starfield-layer-1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(1px 1px at 20px 30px, rgba(236,234,247,0.15), transparent),
    radial-gradient(1px 1px at 40px 70px, rgba(185,181,209,0.1), transparent),
    radial-gradient(0.5px 0.5px at 90px 40px, rgba(155,92,255,0.08), transparent),
    radial-gradient(0.5px 0.5px at 130px 80px, rgba(63,224,197,0.06), transparent);
  background-repeat: repeat;
  background-size: 200px 150px, 180px 120px, 160px 100px, 140px 90px;
  animation: drift-1 120s linear infinite;
}

.starfield-layer-2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(0.8px 0.8px at 60px 50px, rgba(240,180,41,0.12), transparent),
    radial-gradient(0.6px 0.6px at 110px 90px, rgba(255,107,203,0.08), transparent);
  background-repeat: repeat;
  background-size: 220px 160px, 190px 130px;
  animation: drift-2 90s linear infinite reverse;
}

.starfield-layer-3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(1.2px 1.2px at 80px 120px, rgba(155,92,255,0.06), transparent),
    radial-gradient(0.4px 0.4px at 150px 60px, rgba(236,234,247,0.08), transparent);
  background-repeat: repeat;
  background-size: 250px 180px, 170px 110px;
  animation: drift-3 150s linear infinite;
}

@keyframes drift-1 {
  from { transform: translateX(0px) translateY(0px); }
  to { transform: translateX(-200px) translateY(-150px); }
}

@keyframes drift-2 {
  from { transform: translateX(0px) translateY(0px); }
  to { transform: translateX(220px) translateY(-160px); }
}

@keyframes drift-3 {
  from { transform: translateX(0px) translateY(0px); }
  to { transform: translateX(-250px) translateY(-180px); }
}

@media (prefers-reduced-motion: reduce) {
  .starfield-layer-1,
  .starfield-layer-2, 
  .starfield-layer-3 {
    animation: none;
  }
}
</style>