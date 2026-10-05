<script setup lang="ts">
import AboutCard from '~/components/about/AboutCard.vue'
import { Marquee } from '~/components/ui/marquee'

const { t } = useI18n()

const colorMode = useColorMode()
const skills = computed(() => {
  if (colorMode.value === 'dark') {
    return {
      left: [
        'icon-[skill-icons--nginx]',
        'icon-[skill-icons--java-dark]',
        'icon-[skill-icons--spring-dark]',
        'icon-[skill-icons--postgresql-dark]',
        'icon-[skill-icons--docker]',
        'icon-[skill-icons--vuejs-dark]',
        'icon-[skill-icons--nuxtjs-dark]',
        'icon-[skill-icons--react-dark]',
        'icon-[skill-icons--nextjs-dark]',
        'icon-[skill-icons--linux-dark]',
      ],
      right: [
        'icon-[skill-icons--photoshop]',
        'icon-[skill-icons--apple-dark]',
        'icon-[skill-icons--idea-dark]',
        'icon-[skill-icons--redis-dark]',
        'icon-[skill-icons--rabbitmq-dark]',
        'icon-[skill-icons--elasticsearch-dark]',
        'icon-[skill-icons--cloudflare-dark]',
        'icon-[skill-icons--git]',
        'icon-[skill-icons--markdown-dark]',
        'icon-[skill-icons--javascript]',
      ],
    }
  }
  else {
    return {
      left: [
        'icon-[skill-icons--nginx]',
        'icon-[skill-icons--java-light]',
        'icon-[skill-icons--spring-light]',
        'icon-[skill-icons--postgresql-light]',
        'icon-[skill-icons--docker]',
        'icon-[skill-icons--vuejs-light]',
        'icon-[skill-icons--nuxtjs-light]',
        'icon-[skill-icons--react-light]',
        'icon-[skill-icons--nextjs-light]',
        'icon-[skill-icons--linux-light]',
      ],
      right: [
        'icon-[skill-icons--photoshop]',
        'icon-[skill-icons--apple-light]',
        'icon-[skill-icons--idea-light]',
        'icon-[skill-icons--redis-light]',
        'icon-[skill-icons--rabbitmq-light]',
        'icon-[skill-icons--elasticsearch-light]',
        'icon-[skill-icons--cloudflare-light]',
        'icon-[skill-icons--git]',
        'icon-[skill-icons--markdown-light]',
        'icon-[skill-icons--javascript]',
      ],
    }
  }
})
</script>

<template>
  <AboutCard>
    <template #header>
      {{ t("about.skill.header") }}
    </template>
    <template #neck>
      {{ t("about.skill.neck") }}
    </template>
    <div class="-mx-4 xl:-mx-6">
      <ClientOnly>
        <Marquee class="[--duration:30s]">
          <Icon v-for="(item, index) in skills.left" :key="index" :name="item" class="size-24" />
        </Marquee>
        <Marquee reverse class="[--duration:30s]">
          <Icon v-for="(item, index) in skills.right" :key="index" :name="item" class="size-24" />
        </Marquee>
      </ClientOnly>
    </div>
  </AboutCard>
</template>

<style scoped>

</style>
