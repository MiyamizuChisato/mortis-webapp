<script setup lang="ts">
import type { Instant, InstantList } from '#server/service/instant.service.ts'
import { MasonryWall } from '@yeger/vue-masonry-wall'
import InstantAdd from '~/components/instant/InstantAdd.vue'
import InstantCard from '~/components/instant/InstantCard.vue'
import InstantCardSkeleton from '~/components/instant/InstantCardSkeleton.vue'
import { clientDelayFn } from '~/composables/delay.ts'
import emitter from '~/composables/mitt.ts'

const pager = {
  page: 1,
  size: 24,
}

const { data, error } = await useAsyncData('instant', async () => {
  const result = await clientDelayFn(async () => {
    return await useHttp().get<InstantList>(`/instant`, pager)
  }, 500)
  if (!result) {
    throw showError({ message: 'not found' })
  }
  else {
    return result
  }
}, {
  deep: true,
  lazy: true,
})
if (error.value) {
  showError({ fatal: true })
}
const list = computed(() => {
  if (!data.value) {
    return [
      { type: 'skeleton' },
      { type: 'skeleton' },
      { type: 'skeleton' },
      { type: 'skeleton' },
      { type: 'skeleton' },
      { type: 'skeleton' },
      { type: 'skeleton' },
      { type: 'skeleton' },
    ]
  }
  if (data.value.total > pager.size * pager.page) {
    return [...data.value.records.map(item => ({ type: 'card', instant: item })), {
      type: 'skeleton',
      load: true,
    }, { type: 'skeleton' }, { type: 'skeleton' }, { type: 'skeleton' }]
  }
  else {
    return data.value.records.map(item => ({ type: 'card', instant: item }))
  }
})

async function loadMore() {
  if (data.value) {
    pager.page += 1
    const result = await delayFn(async () => {
      return await useHttp().get<InstantList>(`/instant?page=${pager.page}&size=${pager.size}`)
    }, 500)
    const { records } = result
    data.value.records = [...data.value.records, ...records]
  }
}

onMounted(() => {
  emitter.on('SaveInstant', (instant: Instant) => {
    if (data.value && instant) {
      data.value.records = [instant, ...data.value.records]
    }
  })
})
onUnmounted(() => {
  emitter.off('SaveInstant')
})
</script>

<template>
  <div class="px-4">
    <InstantAdd class="fixed bottom-10 right-10 z-10" />
    <ClientOnly>
      <MasonryWall :items="list" :ssr-columns="1" :column-width="300" :gap="16">
        <template #default="{ item } : {item:any}">
          <InstantCard v-if="item.type === 'card'" :key="item.instant.id" :instant="item.instant" />
          <InstantCardSkeleton
            v-else-if="item.type === 'skeleton'" :row="9" :load="item.load"
            @loading="loadMore"
          />
        </template>
      </MasonryWall>
    </ClientOnly>
  </div>
</template>
