<script setup lang="ts">
import type { COBEOptions } from 'cobe'
import createGlobe from 'cobe'

interface GlobeMarker {
  id: string
  location: [number, number]
  label: string
  description?: string
}

const markers: GlobeMarker[] = [
  {
    id: 'tokyo',
    location: [35.6762, 139.6503],
    label: 'Tokyo',
    description: 'Japan',
  },
  {
    id: 'new-york',
    location: [40.7128, -74.006],
    label: 'New York',
    description: 'United States',
  },
  {
    id: 'london',
    location: [51.5072, -0.1276],
    label: 'London',
    description: 'United Kingdom',
  },
  {
    id: 'singapore',
    location: [1.3521, 103.8198],
    label: 'Singapore',
    description: 'Singapore',
  },
]

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const colorMode = useColorMode()

let globe: ReturnType<typeof createGlobe> | undefined
let animationFrame = 0

/**
 * Globe rotation
 */
let phi = 0
let theta = 0.2

/**
 * Pointer state
 */
let isDragging = false

let pointerStartX = 0
let pointerStartY = 0

let phiStart = 0
let thetaStart = 0

/**
 * Inertia
 */
let velocityX = 0
let velocityY = 0

/**
 * COBE configuration
 */
function getGlobeConfig(): Partial<COBEOptions> {
  if (colorMode.value === 'dark') {
    return {
      dark: 1,
      diffuse: 1.2,

      mapSamples: 16000,
      mapBrightness: 4,
      mapBaseBrightness: 0,

      baseColor: [0.6, 0.6, 0.6],
      glowColor: [0.25, 0.24, 0.25],

      markerColor: [0.25, 0.25, 1],
      markerElevation: 0.02,
    }
  }

  return {
    dark: 0,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    mapBaseBrightness: 0,
    baseColor: [1, 1, 1],
    glowColor: [0.84, 0.87, 0.85],
    markerColor: [0.2, 0.4, 1],
    markerElevation: 0.01,
  }
}

/**
 * Update globe
 */
function updateGlobe() {
  globe?.update({
    phi,
    theta,
  })
}

/**
 * Pointer down
 */
function onPointerDown(event: PointerEvent) {
  if (!canvas.value)
    return

  isDragging = true

  pointerStartX = event.clientX
  pointerStartY = event.clientY

  phiStart = phi
  thetaStart = theta

  velocityX = 0
  velocityY = 0

  canvas.value.setPointerCapture(event.pointerId)
}

/**
 * Pointer move
 */
function onPointerMove(event: PointerEvent) {
  if (!isDragging)
    return

  const deltaX = event.clientX - pointerStartX
  const deltaY = event.clientY - pointerStartY

  const sensitivity = 0.005

  phi = phiStart + deltaX * sensitivity

  theta = Math.max(
    -Math.PI / 2,
    Math.min(
      Math.PI / 2,
      thetaStart + deltaY * sensitivity,
    ),
  )

  velocityX = deltaX * 0.0005
  velocityY = deltaY * 0.0005

  updateGlobe()
}

/**
 * Pointer up
 */
function onPointerUp(event: PointerEvent) {
  if (!isDragging)
    return

  isDragging = false

  canvas.value?.releasePointerCapture(event.pointerId)
}

/**
 * Pointer cancel
 */
function onPointerCancel() {
  isDragging = false
}

/**
 * Animation
 */
function animate() {
  if (!isDragging) {
    phi += velocityX
    theta += velocityY

    velocityX *= 0.64
    velocityY *= 0.64

    /**
     * Restore automatic rotation
     */
    if (Math.abs(velocityX) < 0.00005) {
      velocityX = 0
      phi += 0.002
    }

    if (Math.abs(velocityY) < 0.00005) {
      velocityY = 0
    }

    theta = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, theta),
    )

    updateGlobe()
  }

  animationFrame = requestAnimationFrame(animate)
}

/**
 * Initialize
 */
onMounted(() => {
  if (!canvas.value)
    return

  const canvasElement = canvas.value

  const dpr = Math.min(
    window.devicePixelRatio || 1,
    2,
  )

  const width = canvasElement.clientWidth
  const height = canvasElement.clientHeight
  const options = {
    ...getGlobeConfig(),
    markerElevation: 0,
    devicePixelRatio: dpr,
    width: width * dpr,
    height: height * dpr,
    phi,
    theta,
    markers: markers.map(marker => ({
      id: marker.id,
      location: marker.location,
      size: 0.035,
    })),
  } as COBEOptions
  globe = createGlobe(canvasElement, options)

  animate()
})

const stop = watch(
  () => colorMode.value,
  () => {
    globe?.update({
      ...getGlobeConfig(),
    })
  },
)

/**
 * Cleanup
 */
onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
  stop()
  globe?.destroy()
})
</script>

<template>
  <div class="relative aspect-square w-full touch-none select-none">
    <!-- Globe -->
    <canvas
      ref="canvas"
      class=" block size-full cursor-grab touch-none select-none active:cursor-grabbing "
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerCancel"
    />

    <!-- Marker cards -->
    <div
      v-for="marker in markers"
      :key="marker.id"
      class="pointer-events-none absolute bottom-[anchor(top)] left-[anchor(center)] -translate-x-1/2"
      :style="{
        positionAnchor: `--cobe-${marker.id}`,
      }"
    >
      <div class="flex flex-col items-center">
        <!-- Card -->
        <div
          class="rounded-lg border border-border/60 bg-background/90 px-3 py-1.5 shadow-lg backdrop-blur-md transition-all duration-500F"
          :style="{
            opacity: `var(--cobe-visible-${marker.id}, 0)`,
            transform: `
          translateY(
            calc(
              -10px -
              (1 - var(--cobe-visible-${marker.id}, 0)) * 5px
            )
          )
          scale(
            calc(
              0.9 +
              var(--cobe-visible-${marker.id}, 0) * 0.1
            )
          )
        `,
            filter: `
          blur(
            calc(
              (1 - var(--cobe-visible-${marker.id}, 0)) * 5px
            )
          )
        `,
          }"
        >
          <span class=" whitespace-nowrap font-mono text-[10px] font-medium text-foreground">
            {{ marker.label }}
          </span>
          <br>
          <span
            v-if="marker.description"
            class=" mt-0.5 whitespace-nowrap text-[9px] text-muted-foreground"
          >
            {{ marker.description }}
          </span>
        </div>

        <!-- Line -->
        <div
          class="h-4 w-px bg-border/70"
          :style="{
            opacity: `var(--cobe-visible-${marker.id}, 0)`,
          }"
        />
      </div>
    </div>
  </div>
</template>
