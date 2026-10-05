<script setup lang="ts">
import AboutCard from '~/components/about/AboutCard.vue'

const { t } = useI18n()
</script>

<template>
  <AboutCard image="https://static.mortis.uno/static/stellar.png">
    <template #header>
      <div class="text-white">
        {{ t("about.statistics.header") }}
      </div>
    </template>
    <div class="text-white grid grid-cols-2 gap-4">
      <div class="flex flex-col items-end w-full gap-1">
        <div class="text-4xl">
          {{ t("about.statistics.today") }}
        </div>
        <div>
          122
        </div>
      </div>
      <div class="flex flex-col items-end w-full gap-1">
        <div class="text-4xl">
          {{ t("about.statistics.month") }}
        </div>
        <div>
          122
        </div>
      </div>
      <div class="flex flex-col items-end w-full gap-1">
        <div class="text-4xl">
          {{ t("about.statistics.yesterday") }}
        </div>
        <div>
          122
        </div>
      </div>
      <div class="flex flex-col items-end w-full gap-1">
        <div class="text-4xl">
          {{ t("about.statistics.year") }}
        </div>
        <div>
          122
        </div>
      </div>
      <div class="flex flex-col items-end w-full gap-1">
        <div class="text-4xl">
          {{ t("about.statistics.week") }}
        </div>
        <div>
          122
        </div>
      </div>
    </div>
  </AboutCard>
</template>

<style scoped>

</style>
