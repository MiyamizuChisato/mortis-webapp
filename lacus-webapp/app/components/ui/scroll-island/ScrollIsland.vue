<script lang="ts" setup>
import { cn } from '@inspira-ui/plugins'
import NumberFlow from '@number-flow/vue'
import { motion, MotionConfig } from 'motion-v'
import { computed, onMounted, onUnmounted, ref, useSlots } from 'vue'

interface Props {
  class?: string
  title?: string
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  title: 'Scroll Island',
  height: 44,
})

const open = ref(false)
const slots = useSlots()

const scrollPercentage = ref(0)

const isDark = computed(() => useColorMode().value === 'dark')
const isSlotAvailable = computed(() => !!slots.default)
const borderRadius = computed(() => `${props.height / 2}px`)

onMounted(() => {
  if (window === undefined)
    return

  window.addEventListener('scroll', updatePageScroll)
  updatePageScroll()
})

function updatePageScroll() {
  scrollPercentage.value = Math.abs(window.scrollY / (document.body.scrollHeight - window.innerHeight)) || 0
}
function scrollToTop() {
  scrollTo({ top: 0, behavior: 'smooth' })
}
onUnmounted(() => {
  window.removeEventListener('scroll', updatePageScroll)
})
</script>

<template>
  <MotionConfig
    :transition="{
      duration: 0.7,
      type: 'spring',
      bounce: 0.5,
    }"
  >
    <div
      :class="cn(
        'border-radius border fixed bottom-12 left-1/2 z-2 -translate-x-1/2 backdrop-blur-lg',
        $props.class,
      )"
    >
      <motion.div
        id="motion-id" layout :initial="{
          height: props.height,
          width: 0,
        }" :animate="{
          height: open && isSlotAvailable ? 'auto' : props.height,
          width: open && isSlotAvailable ? 320 : 260,
        }" class="bg-natural-900 relative overflow-hidden"
      >
        <header class="flex h-11 items-center gap-2 px-4">
          <div class="cursor-pointer" @click="scrollToTop">
            <Icon name="icon-[solar--map-arrow-up-bold]" class="absolute left-5.5 top-4 size-3" />
            <AnimatedCircularProgressBar :value="scrollPercentage * 100" :min="0" :max="100" :circle-stroke-width="10" class="w-6" :show-percentage="false" :duration="0.3" :gauge-secondary-color="isDark ? '#6b728055' : '#6b728099'" :gauge-primary-color="isDark ? 'white' : 'black'" />
          </div>
          <NumberFlow
            class="w-10 text-end"
            :value="scrollPercentage" :format="{
              style: 'percent',
            }" locales="en-US"
          />
          <h1 class="grow text-center font-bold">
            {{ title }}
          </h1>
          <Button size="icon" variant="ghost" class="cursor-pointer hover:text-accent-foreground" @click="open = !open">
            <Icon v-show="open" name="icon-[solar--minimize-linear]" />
            <Icon v-show="!open" name="icon-[solar--maximize-linear]" />
          </Button>
        </header>
        <motion.div v-if="isSlotAvailable" class="mb-2 flex h-full max-h-60 flex-col gap-1 overflow-y-auto px-4 text-sm scrollbar-hidden">
          <slot />
        </motion.div>
      </motion.div>
    </div>
  </MotionConfig>
</template>

<style scoped>
.border-radius {
  border-radius: v-bind(borderRadius);
}
</style>
