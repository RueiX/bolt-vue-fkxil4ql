import type { Directive } from 'vue'

export const preventReClick: Directive = {
  mounted(el: HTMLElement, binding) {
    el.addEventListener('click', () => {
      if (!el.hasAttribute('disabled')) {
        el.setAttribute('disabled', 'true')
        setTimeout(() => {
          el.removeAttribute('disabled')
        }, binding.value || 1000)
      }
    })
  }
}

export default {
  install(app: any) {
    app.directive('preventReClick', preventReClick)
  }
}