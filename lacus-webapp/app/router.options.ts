import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from) {
    if (to.fullPath === from.fullPath || (to.name === from.name && to.hash !== from.hash)) {
      return false
    }
    return { top: 0 }
  },
} satisfies RouterConfig
