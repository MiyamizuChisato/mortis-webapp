<script setup lang="ts">
import AboutCard from '~/components/about/AboutCard.vue'

const { t } = useI18n()
</script>

<template>
  <AboutCard>
    <template #header>
      {{ t("about.mettle.header") }}
    </template>
    <template #neck>
      <div>
        {{ t("about.mettle.neckA") }}
      </div>
      <div class="text-[#88619a]">
        {{ t("about.mettle.neckB") }}
      </div>
    </template>
    <NuxtImg class="absolute right-0 bottom-0 h-48" src="https://static.mortis.uno/resource/image/architect.svg" />
    <template #footer>
      <Button variant="link" class="p-0 m-0" as-child>
        <NuxtLink to="https://www.16personalities.com/intj-personality" target="_blank">
          {{ t("about.mettle.footer", {
            path: '16personalities',
          }) }}
        </NuxtLink>
      </Button>
    </template>
  </AboutCard>
</template>

<style scoped>

</style>
