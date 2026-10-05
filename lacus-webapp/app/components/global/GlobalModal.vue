<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useAppStore } from '~/store/appStore'

const Modal = computed(() => ({
  Root: isDesktop.value ? Dialog : Drawer,
  Content: isDesktop.value ? DialogContent : DrawerContent,
  Header: isDesktop.value ? DialogHeader : DrawerHeader,
  Title: isDesktop.value ? DialogTitle : DrawerTitle,
  Description: isDesktop.value ? DialogDescription : DrawerDescription,
  Footer: isDesktop.value ? DialogFooter : DrawerFooter,
}))

const appStore = useAppStore()
const { modalState } = storeToRefs(appStore)
</script>

<template>
  <component :is="Modal.Root" v-model:open="modalState.open">
    <component :is="Modal.Content">
      <div class="w-dvw grid grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden max-h-[90vh] lg:w-180">
        <component :is="Modal.Header" class="has-[>_*]:p-4 has-[>_*]:border-b border-dashed">
          <component :is="Modal.Title">
            <div id="modal-title" />
          </component>
          <component :is="Modal.Description">
            <div id="modal-description" />
          </component>
        </component>
        <ScrollArea v-if="modalState.component" tabindex="-1" class="border-dashed border-y">
          <div class="overflow-hidden p-4">
            <Component :is="modalState.component" v-bind="modalState.props" />
          </div>
        </ScrollArea>
        <component :is="Modal.Footer">
          <div id="modal-footer" class="has-[>_*]:p-4 has-[>_*]:border-t border-dashed" />
        </component>
      </div>
    </component>
  </component>
</template>
