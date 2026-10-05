<script setup lang="ts">
import { Button } from '~/components/ui/button'
import Icon from '~/components/ui/icon/Icon.vue'
import { useAppStore } from '~/store/appStore'

const { closePanel } = useAppStore()
const localePath = useLocalePath()
const { t } = useI18n()

function handleRoute() {
  closePanel()
}
</script>

<template>
  <nav class="px-3 py-4 rounded border-dashed border space-y-4">
    <h2 class="flex items-center gap-2">
      <Icon name="icon-[solar--plain-bold]" />
      <span>
        {{ t('panel.nav') }}
      </span>
    </h2>
    <div class="flex flex-wrap gap-4">
      <template v-for="item in routes" :key="item.name">
        <li class="flex flex-col gap-1  justify-center items-center">
          <Button class="size-12 transition-none" as-child variant="outline" size="icon">
            <NuxtLink :to="localePath(item.name)" active-class="bg-primary! text-white!" @click.prevent="handleRoute">
              <Icon class="size-6" :name="item.icon" />
            </NuxtLink>
          </Button>
        </li>
      </template>
    </div>
  </nav>
</template>
