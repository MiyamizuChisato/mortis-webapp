<script setup lang="ts">
import { toast } from 'vue-sonner'
import 'vue-sonner/style.css'

const { t } = useI18n()
onMounted(() => {
  mitt.on('ServiceError', (data) => {
    toast.error(t(data))
  })
})
</script>

<template>
  <Toaster class="pointer-events-auto" />
</template>
