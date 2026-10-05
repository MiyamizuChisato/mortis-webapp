<script setup lang="ts">
import type { FriendList } from '#server/service/friend.service.ts'
import FriendGroup from '~/components/friend/FriendGroup.vue'
import FriendRule from '~/components/friend/FriendRule.vue'
import { clientDelayFn } from '~/composables/delay.ts'

const { data, error } = await useAsyncData('friend', async () => {
  const result = await clientDelayFn(async () => {
    return await useHttp().get<FriendList>('/friend')
  }, 500)
  if (!result) {
    throw showError({ message: 'not found' })
  }
  else {
    return result
  }
}, {
  lazy: true,
  transform(res) {
    return res.filter((item) => {
      return item.friends.length > 0
    })
  },
})
if (error.value) {
  showError({ fatal: true })
}
</script>

<template>
  <div class="space-y-8 px-4">
    <FriendRule />
    <template v-if="data">
      <FriendGroup v-for="block in data" :key="block.id" :friend-category="block" />
    </template>
  </div>
</template>
