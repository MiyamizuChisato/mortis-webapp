<script setup lang="ts">
import AboutCard from '~/components/about/AboutCard.vue'

const { t } = useI18n()
</script>

<template>
  <AboutCard>
    <template #header>
      {{ t("about.pursue.header") }}
    </template>
    <div class="text-4xl font-bold">
      <div>
        {{ t("about.pursue.neckA") }}
      </div>
      <div>
        {{ t("about.pursue.neckB") }}
      </div>
      <div>
        {{ t("about.pursue.neckC") }}
      </div>
    </div>
  </AboutCard>
</template>

<style scoped>

</style>
