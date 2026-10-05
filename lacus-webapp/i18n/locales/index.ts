const files = [
  'article.json',
  'about.json',
  'common.json',
  'error.json',
  'friend.json',
  'home.json',
  'modal.json',
  'template.json',
  'user.json',
  'zod.json',
]
export const locales = [
  {
    code: 'zh-CN',
    name: '简体中文',
    files: files.map(file => `zh-CN/${file}`),
  },

  {
    code: 'en-US',
    name: 'English',
    files: files.map(file => `en-US/${file}`),
  },

  {
    code: 'ja-JP',
    name: '日本語',
    files: files.map(file => `ja-JP/${file}`),
  },
]
