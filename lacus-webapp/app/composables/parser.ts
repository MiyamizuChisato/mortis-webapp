import { createMarkdownParser, createShikiHighlighter, rehypeHighlight } from '@nuxtjs/mdc/runtime'
import HtmlLang from 'shiki/langs/html.mjs'
import TsLang from 'shiki/langs/typescript.mjs'
import VueLang from 'shiki/langs/vue.mjs'
import YamlLang from 'shiki/langs/yaml.mjs'
import VitesseDark from 'shiki/themes/vitesse-dark.mjs'
import VitesseLight from 'shiki/themes/vitesse-light.mjs'

const highlighter = createShikiHighlighter({
  bundledThemes: {
    'vitesse-light': VitesseLight,
    'vitesse-dark': VitesseDark,
  },
  bundledLangs: {
    html: HtmlLang,
    vue: VueLang,
    yml: YamlLang,
    ts: TsLang,
    typescript: TsLang,
  },
})

export default function useMarkdownParser() {
  let parser: Awaited<ReturnType<typeof createMarkdownParser>>
  return async (markdown: string) => {
    if (!parser) {
      parser = await createMarkdownParser({
        rehype: {
          plugins: {
            highlight: {
              instance: rehypeHighlight,
              options: {
                // Pass in your desired theme(s)
                theme: {
                  default: 'vitesse-light',
                  dark: 'vitesse-dark',
                },
                highlighter, // Create the Shiki highlighter
              },
            },
          },
        },
      })
    }
    return parser(markdown)
  }
}
