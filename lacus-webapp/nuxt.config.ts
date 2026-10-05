import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { compression } from 'vite-plugin-compression2'
import { appDescription } from './app/constants/index'
import { locales } from './i18n/locales/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    'shadcn-nuxt',
    'motion-v/nuxt',
    '@nuxt/image',
    '@nuxtjs/mdc',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/i18n',
  ],
  components: {
    global: true,
    dirs: ['./components/content'],
  },
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap',
        },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  css: [
    '~/assets/css/index.css',
    '~/assets/css/tailwind.css',
    '~/assets/css/markdown.css',
  ],

  colorMode: {
    classSuffix: '',
  },
  mdc: {
    components: {
      map: {
        del: 'ProseDel',
      },
    },
  },

  runtimeConfig: {
    databaseUrl: '',
    redisUrl: '',
    jwtSecret: '',
    githubClientId: '',
    githubClientSecret: '',
    githubRedirectUri: '',
    qqClientId: '',
    qqClientSecret: '',
    qqRedirectUri: '',
    giteeClientId: '',
    giteeClientSecret: '',
    giteeRedirectUri: '',
    ossEndpoint: '',
    ossAccessKeyId: '',
    ossSecretAccessKey: '',
    ossRegion: '',
    ossBucket: '',
    ossPrefix: '',
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  compatibilityDate: '2024-08-14',
  nitro: {
    compressPublicAssets: true,
    externals: {
      external: ['pg'],
    },
    rollupConfig: {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-ignore
      plugins: [vue()],
      external: ['pg', 'pg-native'],
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
      compression({
        include: [/\.(js|css|html|json|svg|ico)$/], // 指定需要压缩的文件类型
        threshold: 10240, // 仅对大于 10KB 的文件进行压缩
        deleteOriginalAssets: false, // 是否删除原文件，通常设为 false（保留原文件作为回退）
      }),
    ],

  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
  i18n: {
    strategy: 'prefix',
    defaultLocale: 'zh-CN',
    locales,
    langDir: 'locales',
    detectBrowserLanguage: {
      redirectOn: 'all',
    },
    experimental: {
      localeDetector: './localeDetector.ts',
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui',
  },
})
