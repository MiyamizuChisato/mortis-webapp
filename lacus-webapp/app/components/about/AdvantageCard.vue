<script setup lang="ts">
import AboutCard from '~/components/about/AboutCard.vue'

const { t } = useI18n()
</script>

<template>
  <AboutCard class="bg-linear-to-r from-red-400 to-pink-400">
    <template #header>
      <div class="text-white">
        {{ t("about.advantage.header") }}
      </div>
    </template>
    <div class="text-4xl font-bold">
      <div class="text-white">
        {{ t("about.advantage.neckA") }}
      </div>
      <div class="text-white/50">
        {{ t("about.advantage.neckB") }}
      </div>
    </div>
  </AboutCard>
</template>

<style scoped>

</style>
