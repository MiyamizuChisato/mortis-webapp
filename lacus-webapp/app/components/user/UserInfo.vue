<script setup lang="ts">
import type { UserConfig } from '#server/repository/user.repo'
import { Avatar, AvatarImage } from '~/components/ui/avatar'

defineProps<{
  user: UserConfig
  type: 'profile' | 'security'
}>()
const { t } = useI18n()
</script>

<template>
  <div class="relative flex flex-col gap-2 items-center p-4 bg-card rounded-xl">
    <div>
      <Avatar class="size-18">
        <AvatarImage :src="user?.avatar || ''" />
        <AvatarFallback class="text-2xl font-bold">
          {{ user?.nickname.charAt(0) }}
        </AvatarFallback>
      </Avatar>
    </div>
    <div class="text-xl font-bold h-7">
      {{ user?.nickname }}
    </div>
    <p class="text-muted-foreground text-center text-sm">
      {{ user?.motto || t("user.unsetMotto") }}
    </p>
    <div id="user-info-option" class="absolute top-4 right-4" />
  </div>
</template>
