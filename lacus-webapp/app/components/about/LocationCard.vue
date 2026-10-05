<script setup lang="ts">
import AboutCard from '~/components/about/AboutCard.vue'

const { t } = useI18n()
</script>

<template>
  <AboutCard image="https://static.mortis.uno/static/location.png" class="min-h-96">
    <template #header>
      <div class="text-white">
        {{ t("about.location.header") }}
      </div>
    </template>
  </AboutCard>
</template>

<style scoped>

</style>
