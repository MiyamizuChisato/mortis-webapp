<script setup lang="ts">
import type { Toc, TocLink } from '@nuxtjs/mdc'

const props = defineProps<{
  toc?: Toc
}>()
const { hash } = useRoute()
const { replace } = useRouter()

interface LinkToc {
  index: number
  id: string
  text: string
  depth: number
}

const OFFSET = 80

function flattenToc(toc?: Toc): LinkToc[] {
  if (!toc) {
    return []
  }
  let index = 1
  const flatten = (tocList: TocLink[]): LinkToc[] => {
    return tocList.flatMap((item) => {
      const current: LinkToc = {
        ...item,
        index: index++,
      }
      return [
        current,
        ...(item.children ? flatten(item.children) : []),
      ]
    })
  }
  return flatten(toc.links)
}

function navToc(id: string, behavior: ScrollBehavior = 'smooth') {
  const element = document?.getElementById(id)
  element?.scrollIntoView({
    behavior,
  })
}

const data = computed(() => flattenToc(props.toc))
const activeId = ref('')
const updateActive = useThrottleFn(() => {
  const elements = document.querySelectorAll('[type="toc"]')
  for (let i = 0; i < elements.length; i++) {
    const item = elements[i] as Element
    const target = elements[i - 1] as Element
    const top = item.getBoundingClientRect().top
    const edge = (i === elements.length - 1) || (i === 0)
    if (top > OFFSET) {
      activeId.value = edge ? item.id : target.id
      break
    }
  }
  const element = document?.getElementById(`toc-${activeId.value}`)
  element?.scrollIntoView({
    block: 'nearest',
  })
  replace({
    hash: `#${activeId.value}`,
  })
}, 30)
onMounted(async () => {
  await nextTick()
  window.addEventListener('scroll', updateActive)
  if (hash) {
    navToc(hash.substring(1, hash.length), 'instant')
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateActive)
})
</script>

<template>
  <div class="flex flex-col gap-1 text-sm toc">
    <template v-for="item in data" :key="item.id">
      <NuxtLink
        :id="`toc-${item.id}`"
        :to="`#${item.id}`"
        replace
        class="group"
        @click="navToc(item.id)"
      >
        <div v-if="item.depth === 2" class="flex items-center gap-4">
          <div
            :class="activeId === item.id ? 'bg-primary!' : 'bg-border'"
            class="w-6 h-1 rounded group-hover:bg-muted-foreground"
          />
          <div
            :class="activeId === item.id ? 'text-primary! opacity-100' : 'text-muted-foreground'"
            class="opacity-0 transition-opacity group-hover:text-accent-foreground"
          >
            {{ item.text }}
          </div>
        </div>
        <div v-else class="flex items-center gap-4">
          <div
            :class="activeId === item.id ? 'bg-primary!' : 'bg-border'"
            class="w-4 bg-border h-1 ml-2 rounded group-hover:bg-muted-foreground"
          />
          <div
            :class="activeId === item.id ? 'text-primary! opacity-100' : 'text-muted-foreground'"
            class="opacity-0 transition-opacity group-hover:text-accent-foreground"
          >
            {{ item.text }}
          </div>
        </div>
      </NuxtLink>
    </template>
  </div>
</template>

<style scoped>
.toc:hover div {
  opacity: 1;
}
</style>
