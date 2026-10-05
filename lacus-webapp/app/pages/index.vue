<script setup lang="ts">
import { TypewriterText } from '~/components/ui/typewriter-text'
import CobeBars from '~/components/widget/CobeBars.vue'

definePageMeta({
  layout: 'home',
})
const { t } = useI18n()
const text = [
  t('home.exp'),
  t('home.life'),
  t('home.plan'),
  t('home.future'),
  t('home.idea'),
]
</script>

<template>
  <div class="relative h-[calc(100vh-64px)] px-4 mx-auto max-w-7xl flex items-center justify-center lg:justify-end">
    <div class="space-y-4 absolute z-1 lg:left-12 max-lg:top-12 max-lg:text-center max-lg:left-[50%] max-lg:translate-x-[-50%]">
      <p class="flex items-center gap-2 text-xl max-lg:justify-center">
        <Icon name="icon-[solar--plain-3-bold-duotone]" class="size-8" />
        <span>
          Mortis.uno
        </span>
      </p>
      <p class="whitespace-nowrap text-3xl lg:text-4xl xl:text-7xl font-bold">
        {{ t('home.title') }}
      </p>
      <p class="text-xl">
        <span class="break-all mr-2">
          {{ t('home.slogan') }}
        </span>
        <ClientOnly>
          <TypewriterText
            :text="text"
            :speed="70"
            :initial-delay="0"
            :wait-time="1500"
            :delete-speed="40"
            :loop="true"
            :show-cursor="true"
            :hide-cursor-on-type="false"
            cursor-char="|"
            class="text-pretty text-primary"
          />
        </ClientOnly>
      </p>
    </div>
    <CobeBars class="max-w-3xl" />
  </div>
</template>
