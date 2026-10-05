export default defineI18nLocaleDetector((event, config) => {
  const locale = getCookie(event, 'i18n_redirected')
  return locale || config.defaultLocale
})
