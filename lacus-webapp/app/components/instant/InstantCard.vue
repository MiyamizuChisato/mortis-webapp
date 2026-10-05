<script setup lang="ts">
import type { Instant } from '#server/service/instant.service.ts'
import dayjs from 'dayjs'
import InstantDetailModal from '~/components/modal/InstantDetailModal.vue'
import { useAppStore } from '~/store/appStore.ts'

const { instant } = defineProps<{
  instant: Instant
}>()
const { openModal } = useAppStore()
function handleOpenModal() {
  if (instant) {
    openModal(InstantDetailModal, { id: instant.id })
  }
}
</script>

<template>
  <div class="bg-card p-4 rounded-xl cursor-pointer" @click="handleOpenModal">
    <div class="flex items-center gap-2">
      <Avatar size="lg">
        <AvatarImage :src="instant?.author.avatar || ''" alt="" />
      </Avatar>
      <div class="space-2">
        <div>
          {{ instant?.author.nickname }}
        </div>
        <div class="text-muted-foreground text-sm">
          {{ dayjs(instant?.createTime).format('YYYY-MM-DD hh:mm') }}
        </div>
      </div>
    </div>
    <p class="mt-4 line-clamp-12">
      {{ instant?.content }}
    </p>
  </div>
</template>
