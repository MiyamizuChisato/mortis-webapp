<script setup lang="ts">
import type { Instant } from '#server/service/instant.service.ts'
import dayjs from 'dayjs'
import { toast } from 'vue-sonner'
import { useUserStore } from '~/store/userStore.ts'

const { instant } = defineProps<{
  instant: Instant
}>()
const emits = defineEmits(['thumb'])
const userStore = useUserStore()
const { userInstantThumbList, signed } = storeToRefs(userStore)
const loading = ref(false)
async function handleInstantThumb() {
  if (!signed.value) {
    toast.error('User has not login')
    return
  }
  if (!instant) {
    return
  }
  loading.value = true
  if (userInstantThumbList.value?.has(instant.id)) {
    userInstantThumbList.value?.delete(instant.id)
    emits('thumb', instant.thumbs - 1)
  }
  else {
    userInstantThumbList.value?.add(instant.id)
    emits('thumb', instant.thumbs + 1)
  }
  await userStore.thumbInstant(instant.id)
  loading.value = false
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <Avatar size="lg">
          <AvatarImage :src="instant?.author.avatar || ''" />
        </Avatar>
        <div class="space-2">
          <div>{{ instant?.author.nickname }}</div>
          <div class="text-muted-foreground text-sm">
            {{ dayjs(instant?.createTime).format("YYYY-MM-DD hh:mm") }}
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 text-muted-foreground">
        <Button :disabled="loading" variant="ghost" size="icon" @click="handleInstantThumb">
          <Icon
            v-if="userInstantThumbList?.has(instant?.id || 0)"
            class="text-destructive cursor-pointer"
            name="icon-[solar--like-bold]"
          />
          <Icon
            v-else
            class="hover:text-accent-foreground cursor-pointer"
            name="icon-[solar--like-linear]"
          />
        </Button>
        <span>{{ instant?.thumbs }}</span>
      </div>
    </div>
    <p class="mb-4">
      {{ instant?.content }}
    </p>
  </div>
</template>
