<script setup lang="ts">
import type { FriendList } from '#server/service/friend.service.ts'
import FriendCard from '~/components/friend/FriendCard.vue'

defineProps<{
  friendCategory: FriendList[number]
}>()

const active = ref(false)
</script>

<template>
  <div @mouseenter="active = true" @mouseleave="active = false">
    <h1
      class="text-center sticky top-20 text-7xl font-[DouyinSans] transition-[color]"
      :class="active ? 'text-muted-foreground/20' : '[-webkit-text-stroke:1px_color-mix(in_srgb,var(--deep)_20%,transparent)] text-transparent'"
    >
      {{ friendCategory.name }}
    </h1>
    <h2 class="text-center text-muted-foreground text-xl leading-0 -translate-y-1">
      {{ friendCategory.sketch }}
    </h2>
    <div class="mt-1 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <FriendCard v-for="friend in friendCategory.friends" :key="friend.id" :friend="friend" />
    </div>
  </div>
</template>

<style scoped>

</style>
