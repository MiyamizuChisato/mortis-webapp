<script setup lang="ts">
import InstantAddModal from '~/components/modal/InstantAddModal.vue'
import SignModal from '~/components/modal/SignModal.vue'
import { useAppStore } from '~/store/appStore.ts'
import { useUserStore } from '~/store/userStore.ts'

const { openModal } = useAppStore()
const userStore = useUserStore()
const { signed } = storeToRefs(userStore)

function open() {
  if (signed.value) {
    openModal(InstantAddModal)
  }
  else {
    openModal(SignModal, { type: 'sign-in' })
  }
}
</script>

<template>
  <Button class="rounded-full size-16" @click="open">
    <Icon class="size-6" name="icon-[solar--pen-new-round-linear]" />
  </Button>
</template>
