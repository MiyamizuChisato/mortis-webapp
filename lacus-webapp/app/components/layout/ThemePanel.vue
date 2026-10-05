<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

const { t } = useI18n()
const color = useColorMode()
const theme = computed({
  get() {
    return color.preference
  },
  set(value) {
    if (value && value !== color.preference) {
      color.preference = value
    }
  },
})
</script>

<template>
  <div class="px-3 py-4 rounded border-dashed border space-y-4">
    <h2 class="flex items-center gap-2">
      <Icon name="icon-[solar--forbidden-circle-bold]" />
      <span>
        {{ t('panel.theme.label') }}
      </span>
    </h2>
    <div>
      <Tabs v-model="theme">
        <TabsList class="gap-2">
          <TabsTrigger class="transition-none px-3" value="light">
            <Icon name="icon-[solar--sun-bold]" />
          </TabsTrigger>
          <TabsTrigger class="transition-none px-3" value="system">
            <Icon name="icon-[solar--monitor-smartphone-bold]" />
          </TabsTrigger>
          <TabsTrigger class="transition-none px-3" value="dark">
            <Icon name="icon-[solar--moon-bold]" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  </div>
</template>

<style scoped>

</style>
