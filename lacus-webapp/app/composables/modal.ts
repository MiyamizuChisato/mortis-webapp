import type { ComponentProps } from 'vue-component-type-helpers'
import { useAppStore } from '~/store/appStore.ts'

export const Modal = {
  open<T extends Component>(component: T, props?: ComponentProps<T>) {
    const modal = markRaw(component)
    useAppStore().openModal(modal, props)
  },
  close() {
    useAppStore().closeModal()
  },
}
