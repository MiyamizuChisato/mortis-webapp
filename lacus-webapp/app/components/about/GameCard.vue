<script setup lang="ts">
import AboutCard from '~/components/about/AboutCard.vue'

const { t } = useI18n()
</script>

<template>
  <AboutCard image="https://static.mortis.uno/static/mhw.jpg" class="min-h-96">
    <template #header>
      <div class="text-white">
        {{ t("about.game.header") }}
      </div>
    </template>
    <template #neck>
      <div class="text-white">
        {{ t("about.game.neck") }}
      </div>
    </template>
    <template #footer>
      <div class="text-white flex gap-4 items-center">
        <div>
          {{ t("about.game.footer") }}
        </div>
        <NuxtImg src="https://static.mortis.uno/static/katana.png" class="h-6" />
      </div>
    </template>
  </AboutCard>
</template>

<style scoped>

</style>
