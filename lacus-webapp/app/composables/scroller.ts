export const scrollHolder = new Map<string, number>()
export function autoScroll(key?: string) {
  const { y } = useWindowScroll()
  if (key) {
    onMounted(async () => {
      await nextTick(() => {
        y.value = scrollHolder.get(key) || 0
      })
    })
    onBeforeRouteLeave(async () => {
      await nextTick(() => {
        scrollHolder.set('article', y.value)
      })
    })
  }
  else {
    onMounted(() => {
      y.value = 0
    })
  }
}
