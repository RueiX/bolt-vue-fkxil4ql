import { type I18n } from 'vue-i18n'

export function generateTitle(i18n: I18n, title: string) {
  const hasKey = i18n.global.t('route.' + title)

  if (hasKey) {
    return i18n.global.t('route.' + title)
  }
  return title
}