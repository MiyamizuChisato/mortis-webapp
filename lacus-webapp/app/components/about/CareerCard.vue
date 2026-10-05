<script setup lang="ts">
import AboutCard from '~/components/about/AboutCard.vue'

const { t } = useI18n()
</script>

<template>
  <AboutCard class="min-h-100">
    <template #header>
      {{ t("about.career.header") }}
    </template>
    <template #neck>
      {{ t("about.career.neck") }}
    </template>
    <div class="flex items-center h-full -mx-4 xl:-mx-6">
      <div class="relative h-2 w-full bg-muted/50">
        <div class="absolute w-2 h-18 bg-muted/50 rounded-xl left-[10%]">
          <div class="absolute top-20 text-muted-foreground/50 text-xl -translate-x-4">
            2019
          </div>
        </div>
        <div class="absolute w-2 h-18 bg-muted/50 rounded-xl left-[50%]">
          <div class="absolute top-20 text-muted-foreground/50 text-xl -translate-x-4">
            2023
          </div>
        </div>
        <div class="absolute w-2 h-18 bg-muted/50 rounded-xl left-[75%]">
          <div class="absolute top-20 text-muted-foreground/50 text-xl -translate-x-4">
            2025
          </div>
        </div>
        <div class="absolute w-2 h-18 bg-muted/50 rounded-xl left-[90%]">
          <div class="absolute top-20 text-muted-foreground/50 text-xl -translate-x-4">
            NOW
          </div>
        </div>
        <div class="absolute h-8 bg-red-500 rounded-xl translate-y-[-40%] left-[10%] w-[40%]">
          <div class="absolute flex items-center gap-1 text-xl -top-10 translate-x-4 text-red-500 font-bold">
            <Icon name="icon-[solar--square-academic-cap-bold-duotone]" class="size-6" />
            <span>
              CDNU
            </span>
          </div>
        </div>
        <div class="absolute h-8 bg-orange-300 rounded-r-xl translate-y-[-160%] left-[40%] w-[10%]">
          <div class="absolute flex items-center gap-1 text-xl -top-10 translate-x-4 text-orange-300 font-bold">
            <Icon name="icon-[solar--programming-bold]" class="size-6" />
            <span>
              DHC
            </span>
          </div>
        </div>
        <div class="absolute h-8 bg-blue-500 rounded-xl translate-y-[-40%] left-[50%] w-[25%]">
          <div class="absolute flex items-center gap-1 text-xl top-10 translate-x-4 text-blue-500 font-bold">
            <Icon name="icon-[solar--programming-bold]" class="size-6" />
            <span>
              GWD
            </span>
          </div>
        </div>
        <div class="absolute h-8 bg-teal-500 rounded-xl translate-y-[-40%] left-[75%] w-[15%]">
          <div class="absolute flex items-center gap-1 text-xl -top-10 translate-x-4 text-teal-500 font-bold">
            <Icon name="icon-[solar--programming-bold]" class="size-6" />
            <span>
              ZY
            </span>
          </div>
        </div>
      </div>
    </div>
  </AboutCard>
</template>

<style scoped>

</style>
