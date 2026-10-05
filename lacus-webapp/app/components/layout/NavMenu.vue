<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <menu class="flex gap-8">
    <li v-for="item in routes" :key="item.name">
      <NuxtLink class="flex items-center gap-1" active-class="text-primary" :to="localePath({ name: item.name })">
        <Icon :name="item.icon" />
        <span>
          {{ t(`routes.${item.name}`) }}
        </span>
      </NuxtLink>
    </li>
  </menu>
</template>
