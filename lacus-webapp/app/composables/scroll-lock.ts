const lockCount = ref(0)

export function useScrollLock() {
  function lockScroll() {
    if (!import.meta.client)
      return
    lockCount.value++
    if (lockCount.value > 1)
      return
    const html = document.documentElement
    const body = document.body
    const scrollbarWidth
      = window.innerWidth - html.clientWidth
    html.style.setProperty(
      '--scrollbar-width',
      `${scrollbarWidth}px`,
    )

    // 保存原来的状态
    html.dataset.scrollLock = 'true'

    body.style.overflow = 'hidden'
    body.style.paddingRight = `${scrollbarWidth}px`
  }

  function unlockScroll() {
    if (!import.meta.client)
      return
    lockCount.value--
    // 还有其他弹出层在使用
    if (lockCount.value > 0)
      return
    const html = document.documentElement
    const body = document.body
    body.style.overflow = ''
    body.style.paddingRight = ''
    html.style.removeProperty('--scrollbar-width')
    delete html.dataset.scrollLock
  }
  return {
    lockScroll,
    unlockScroll,
  }
}
