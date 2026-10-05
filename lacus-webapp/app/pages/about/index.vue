<script setup lang="ts">
import AboutHeroCard from '~/components/about/AboutHeroCard.vue'
import AdvantageCard from '~/components/about/AdvantageCard.vue'
import CareerCard from '~/components/about/CareerCard.vue'
import GameCard from '~/components/about/GameCard.vue'
import ImageCard from '~/components/about/ImageCard.vue'
import InfoCard from '~/components/about/InfoCard.vue'
import LocationCard from '~/components/about/LocationCard.vue'
import MettleCard from '~/components/about/MettleCard.vue'
import MottoCard from '~/components/about/MottoCard.vue'
import MusicCard from '~/components/about/MusicCard.vue'
import PursueCard from '~/components/about/PursueCard.vue'
import SkillCard from '~/components/about/SkillCard.vue'
import StatisticsCard from '~/components/about/StatisticsCard.vue'
</script>

<template>
  <div class="grid grid-cols-24 gap-y-4 md:gap-x-4 max-md:px-4">
    <AboutHeroCard class="col-span-24 lg:col-span-13" />
    <PursueCard class="col-span-24 lg:col-span-11" />
    <SkillCard class="col-span-24 lg:col-span-12" />
    <CareerCard class="col-span-24 lg:col-span-12" />
    <MettleCard class="col-span-24 lg:col-span-13" />
    <ImageCard class="col-span-24 lg:col-span-11" />
    <MottoCard class="col-span-24 lg:col-span-11" />
    <AdvantageCard class="col-span-24 lg:col-span-13" />
    <GameCard class="col-span-24 lg:col-span-12" />
    <MusicCard class="col-span-24 lg:col-span-12" />
    <StatisticsCard class="col-span-24 lg:col-span-8" />
    <LocationCard class="col-span-24 lg:col-span-8" />
    <InfoCard class="col-span-24 lg:col-span-8" />
  </div>
</template>

<style scoped>

</style>
