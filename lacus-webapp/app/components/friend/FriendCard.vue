<script setup lang="ts">
import type { FriendList } from '#server/service/friend.service.ts'
import dayjs from 'dayjs'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'

defineProps<{
  friend: FriendList[number]['friends'][number]
}>()
const open = ref(false)
</script>

<template>
  <HoverCard v-model:open="open" :open-delay="200" :close-delay="200">
    <HoverCardTrigger>
      <NuxtLink
        :to="`//${friend.website}`"
        target="_blank"
        class="flex p-1 gap-2 rounded-md items-center transition-[translate,background,box-shadow] duration-200 cursor-pointer
    hover:ring-primary/50 hover:ring-2 hover:bg-primary/20 hover:-translate-y-0.5"
        :class="open ? 'ring-primary/50 ring-2 bg-primary/20 -translate-y-0.5' : ''"
      >
        <Avatar size="lg">
          <AvatarImage :src="friend.avatar" />
        </Avatar>
        <div class="space-x-2">
          <span>
            {{ friend.title }}
          </span>
          <span class="text-muted-foreground text-sm">
            {{ friend.administrator }}
          </span>
        </div>
      </NuxtLink>
    </HoverCardTrigger>
    <HoverCardContent side="top" class="max-w-64 mb-2 p-0 overflow-hidden">
      <div class="grid">
        <div class="flex items-center gap-4 p-2">
          <Avatar class="size-10">
            <AvatarImage class="rounded-md" :src="friend.avatar" />
          </Avatar>
          <div>
            <div class="font-bold text-lg">
              {{ friend.title }}
            </div>
            <div class="text-muted-foreground">
              {{ friend.website }}
            </div>
          </div>
        </div>
        <div class="bg-muted/60 p-2 space-y-2 text-muted-foreground relative">
          <div class="leading-0 text-muted-foreground/10 float-right absolute bottom-1 right-0 font-extrabold text-4xl">
            {{ dayjs(friend.createTime).format("YYYY/MM/DD") }}
          </div>
          <div class="flex items-center gap-2">
            <Icon name="icon-[solar--bell-bing-bold-duotone]" />
            <p class="flex-1">
              {{ friend.description }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Icon name="icon-[solar--chat-dots-bold-duotone]" />
            <p class="flex-1">
              {{ friend.comment }}
            </p>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>

<style scoped>

</style>
