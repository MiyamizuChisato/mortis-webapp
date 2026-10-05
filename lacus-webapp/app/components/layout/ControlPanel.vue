<script setup lang="ts">
import { AnimatePresence, Motion, useMotionValue } from 'motion-v'
import LocatePanel from '~/components/layout/LocatePanel.vue'
import NavPanel from '~/components/layout/NavPanel.vue'
import ThemePanel from '~/components/layout/ThemePanel.vue'
import UserPanel from '~/components/layout/UserPanel.vue'
import { Button } from '~/components/ui/button'
import IconButton from '~/components/ui/button/IconButton.vue'
import { Icon } from '~/components/ui/icon'
import { useAppStore } from '~/store/appStore'

const appStore = useAppStore()
const { panelState } = storeToRefs(appStore)

const dragY = useMotionValue(0)
const { t } = useI18n()
function onDragEnd(_: PointerEvent, info: { offset: { y: number }, velocity: { y: number } }) {
  if (info.offset.y < -(window.innerHeight * 0.3) || info.velocity.y < -400) {
    appStore.closePanel()
  }
}
</script>

<template>
  <div>
    <IconButton icon="icon-[solar--widget-5-bold]" :tips="t('setting.board')" @click="appStore.openPanel" />
    <ClientOnly>
      <Teleport to="body" defer>
        <AnimatePresence>
          <Motion
            v-show="panelState.open"
            class="fixed inset-0 z-10 bg-background/70 backdrop-blur-lg will-change-[opacity,transform"
            drag="y"
            :drag-constraints="{ top: 0, bottom: 0 }"
            :drag-elastic="{ top: 0.3, bottom: 0 }"
            :drag-momentum="false"
            drag-snap-to-origin
            :initial="{ y: '-100%', opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :exit="{ y: '-100%', opacity: 0 }"
            :transition="{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }"
            :style="{ y: dragY }"
            @drag-end="onDragEnd"
          >
            <div class="h-full flex flex-col select-none">
              <div class="px-4 border-b border-dashed">
                <div class="max-w-2xl mx-auto px-3 py-4">
                  <div class="flex justify-between">
                    <h1 class="flex items-center gap-2 font-bold text-xl">
                      <Icon name="icon-[solar--settings-bold]" />
                      <span>
                        {{ t('panel.title') }}
                      </span>
                    </h1>
                    <Button variant="ghost" size="icon-lg" @click="appStore.closePanel">
                      <Icon name="icon-[solar--alt-arrow-up-linear]" />
                    </Button>
                  </div>
                  <span class="text-muted-foreground text-sm">
                    {{ t('panel.description') }}
                  </span>
                </div>
              </div>
              <ScrollArea class="flex-1 overflow-y-auto px-4">
                <div class="space-y-4 max-w-2xl mx-auto mt-4">
                  <NavPanel />
                  <ThemePanel />
                  <LocatePanel />
                  <UserPanel />
                </div>
              </ScrollArea>
            </div>
          </Motion>
        </AnimatePresence>
      </Teleport>
    </ClientOnly>
  </div>
</template>
