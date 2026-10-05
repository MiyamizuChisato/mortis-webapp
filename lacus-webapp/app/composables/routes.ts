import type { RouteNamedMapI18n } from 'vue-router/auto-routes'

export const routes: { name: keyof RouteNamedMapI18n, icon: string }[] = [
  {
    name: 'index',
    icon: 'icon-[solar--home-2-linear]',
  },
  {
    name: 'article',
    icon: 'icon-[solar--book-linear]',
  },
  {
    name: 'instant',
    icon: 'icon-[solar--notes-linear]',
  },
  {
    name: 'friend',
    icon: 'icon-[solar--link-round-angle-linear]',
  },
  {
    name: 'about',
    icon: 'icon-[solar--leaf-linear]',
  },
]
