<script setup lang="ts">
import AboutCard from '~/components/about/AboutCard.vue'

const { t } = useI18n()
</script>

<template>
  <AboutCard image="https://static.mortis.uno/static/yorushika.png" class="min-h-96">
    <template #header>
      <div class="text-white">
        {{ t("about.music.header") }}
      </div>
    </template>
    <template #neck>
      <div class="text-white">
        <div>
          {{ t("about.music.neckA") }}
        </div>
        <div>
          {{ t("about.music.neckB") }}
        </div>
      </div>
    </template>
    <template #footer>
      <div class="text-white flex gap-4 items-center">
        <div>
          {{ t("about.music.footer") }}
        </div>
      </div>
    </template>
  </AboutCard>
</template>

<style scoped>

</style>
