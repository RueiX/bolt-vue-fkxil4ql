import store from '@/store'
import defaultSettings from '@/settings'

export function useDynamicTitle() {
  if (store.state.settings.dynamicTitle) {
    document.title = `${store.state.settings.title} - ${defaultSettings.title}`
  } else {
    document.title = defaultSettings.title
  }
}