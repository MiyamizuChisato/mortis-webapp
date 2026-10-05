<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

const { t } = useI18n()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

async function changeLocale(code: any) {
  if (!code || code === locale.value) {
    return
  }
  await navigateTo(switchLocalePath(code))
}
</script>

<template>
  <div class="space-y-4 rounded border border-dashed px-3 py-4">
    <h2 class="flex items-center gap-2">
      <Icon name="icon-[solar--global-bold]" />

      <span>
        {{ t('panel.language') }}
      </span>
    </h2>

    <Tabs :model-value="locale" @update:model-value="changeLocale">
      <TabsList class="gap-2">
        <TabsTrigger
          v-for="item in locales" :key="item.code"
          class="transition-none px-2"
          :value="item.code"
        >
          {{ item.name }}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>
