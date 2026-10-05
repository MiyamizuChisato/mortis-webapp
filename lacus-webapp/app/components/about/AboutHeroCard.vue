<script setup lang="ts">
import AboutCard from '~/components/about/AboutCard.vue'

const { t } = useI18n()
</script>

<template>
  <AboutCard class="bg-linear-to-r from-blue-500 to-primary/20">
    <div class="flex flex-col h-full justify-center gap-2">
      <div class="text-white/75">
        {{ t("about.hero.header") }}
      </div>
      <div class="text-4xl text-white font-bold">
        {{ t("about.hero.neck") }}
      </div>
      <div class="text-white/75">
        {{ t("about.hero.content") }}
      </div>
    </div>
  </AboutCard>
</template>

<style scoped>

</style>
