<script setup lang="ts">
import AboutCard from '~/components/about/AboutCard.vue'

const { t } = useI18n()
</script>

<template>
  <AboutCard>
    <template #header>
      <div>
        {{ t("about.info.header") }}
      </div>
    </template>
    <div class="flex gap-8 flex-col items-center justify-around h-full font-bold">
      <div class="text-center">
        <div class="text-xs">
          {{ t("about.info.born") }}
        </div>
        <div class="text-4xl text-amber-500">
          {{ t("about.info.year") }}
        </div>
      </div>
      <div class="text-center">
        <div class="text-xs">
          {{ t("about.info.university") }}
        </div>
        <div class="text-4xl text-emerald-500">
          {{ t("about.info.major") }}
        </div>
      </div>
      <div class="text-center">
        <div class="text-xs">
          {{ t("about.info.profession") }}
        </div>
        <div class="text-4xl text-pink-500">
          {{ t("about.info.job") }}
        </div>
      </div>
    </div>
  </AboutCard>
</template>

<style scoped>

</style>
