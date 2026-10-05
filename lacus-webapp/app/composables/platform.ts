const { width } = useWindowSize()
export const isDesktop = computed(() => width.value >= 1024)
export const isMobile = computed(() => width.value < 1024)
