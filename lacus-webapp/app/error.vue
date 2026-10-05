<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
const { replace } = useRouter()

async function backHome() {
  await replace({
    name: 'index',
  })
  await clearError()
}
</script>

<template>
  <main class="w-dvw h-dvh flex justify-center items-center">
    <div class="space-y-2">
      <div class="flex gap-4 text-2xl text-muted-foreground">
        <div>500</div>
        <Separator orientation="vertical" class="w-0.5! bg-muted-foreground" />
        <div>Server Error</div>
      </div>
      <Button as-child class="px-0" variant="link">
        <NuxtLink @click.prevent="backHome">
          <Icon name="icon-[solar--arrow-to-top-right-linear]" />
          <span>Back To Home</span>
        </NuxtLink>
      </Button>
    </div>
  </main>
</template>
