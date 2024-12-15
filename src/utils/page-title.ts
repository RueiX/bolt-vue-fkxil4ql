import defaultSettings from '@/settings'

const title = defaultSettings.title || '管理系统'

export function getPageTitle(pageTitle?: string) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return title
}