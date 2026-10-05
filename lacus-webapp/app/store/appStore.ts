import type { ComponentProps } from 'vue-component-type-helpers'

export const useAppStore = defineStore('app', () => {
  const { lockScroll, unlockScroll } = useScrollLock()
  const modalState = ref({
    open: false,
    props: {},
    component: {},
  })
  const panelState = ref({
    open: false,
  })

  function openModal<T extends Component>(component: T, props?: ComponentProps<T>) {
    modalState.value.component = markRaw(component)
    modalState.value.props = props ?? {}
    modalState.value.open = true
  }

  function closeModal() {
    modalState.value.open = false
  }

  function openPanel() {
    lockScroll()
    panelState.value.open = true
  }
  function closePanel() {
    panelState.value.open = false
    unlockScroll()
  }

  return { modalState, openModal, closeModal, panelState, openPanel, closePanel }
})
