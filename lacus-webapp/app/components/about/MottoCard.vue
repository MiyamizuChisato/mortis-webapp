<script setup lang="ts">
import AboutCard from '~/components/about/AboutCard.vue'

const { t } = useI18n()
</script>

<template>
  <AboutCard>
    <template #header>
      {{ t("about.motto.header") }}
    </template>
    <div class="text-4xl font-bold flex items-center h-full">
      {{ t("about.motto.neck") }}
    </div>
  </AboutCard>
</template>

<style scoped>

</style>
